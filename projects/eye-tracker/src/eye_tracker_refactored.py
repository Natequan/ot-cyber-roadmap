#!/usr/bin/env python3
"""Raspberry Pi eye tracker for a gaze-controlled typing prototype.

Portfolio refactor of the original university-project code. It keeps the same
core behavior while improving configuration, shutdown, logging, shared-state
handling and OLED refresh behavior.
"""

from __future__ import annotations

import argparse
import logging
import math
import socket
import threading
import time
from collections import deque
from dataclasses import dataclass
from typing import Optional

import cv2
import numpy as np

try:
    import board
    import busio
    from adafruit_ssd1306 import SSD1306_I2C
    from PIL import Image, ImageDraw, ImageFont
    HAS_OLED = True
except Exception:
    HAS_OLED = False

try:
    from filterpy.kalman import KalmanFilter
    HAS_KALMAN = True
except ImportError:
    HAS_KALMAN = False

LOG = logging.getLogger("eye_tracker")


@dataclass
class Config:
    laptop_ip: str = "127.0.0.1"
    udp_port_send: int = 5005
    udp_port_listen: int = 5006
    camera_index: int = 0
    frame_w: int = 640
    frame_h: int = 480
    camera_fps: int = 30
    min_pupil_area: int = 100
    max_pupil_area: int = 10000
    max_aspect_ratio: float = 2.0
    min_circularity: float = 0.2
    min_solidity: float = 0.5
    pupil_darkness_percentile: float = 30.0
    max_jump_distance: float = 0.15
    position_history_size: int = 5
    min_send_interval: float = 0.04
    oled_refresh_interval: float = 0.10
    invert_x: bool = True
    invert_y: bool = True


class SharedState:
    def __init__(self) -> None:
        self.lock = threading.Lock()
        self.current_letter = ""
        self.word_buffer = ""
        self.calibrating = False

    def snapshot(self) -> tuple[str, str, bool]:
        with self.lock:
            return self.current_letter, self.word_buffer, self.calibrating

    def handle_message(self, msg: str) -> None:
        with self.lock:
            if msg.startswith("LETRA:"):
                self.current_letter = msg.split(":", 1)[1]
                self.word_buffer += self.current_letter
            elif msg.startswith("CALIBRANDO:"):
                self.calibrating = True
                self.current_letter = msg.split(":", 1)[1]
            elif msg == "FIN_CALIBRACION":
                self.calibrating = False
                self.current_letter = ""
            elif msg == "BORRAR":
                self.word_buffer = self.word_buffer[:-1]
            elif msg == "LIMPIAR":
                self.word_buffer = ""
                self.current_letter = ""
            elif msg == "ESPACIO":
                self.word_buffer += " "
                self.current_letter = "␣"


class OledDisplay:
    def __init__(self, refresh_interval: float) -> None:
        self.available = False
        self.oled = None
        self.font = None
        self.refresh_interval = refresh_interval
        self._last_refresh = 0.0

        if not HAS_OLED:
            LOG.info("OLED libraries not available; running without OLED.")
            return

        try:
            i2c = busio.I2C(board.SCL, board.SDA)
            self.oled = SSD1306_I2C(128, 64, i2c, addr=0x3C)
            self.font = ImageFont.load_default()
            self.available = True
            LOG.info("OLED detected at I2C address 0x3C.")
        except Exception as exc:
            LOG.warning("OLED initialization failed: %s", exc)

    def update(
        self,
        state: SharedState,
        x_norm: Optional[float] = None,
        y_norm: Optional[float] = None,
        force: bool = False,
    ) -> None:
        if not self.available:
            return

        now = time.monotonic()
        if not force and now - self._last_refresh < self.refresh_interval:
            return
        self._last_refresh = now

        current_letter, word_buffer, calibrating = state.snapshot()

        try:
            image = Image.new("1", (self.oled.width, self.oled.height))
            draw = ImageDraw.Draw(image)

            if calibrating:
                draw.text((0, 0), "CALIBRANDO", font=self.font, fill=255)
                draw.text((0, 20), f"Mira: {current_letter}", font=self.font, fill=255)
            elif current_letter:
                draw.text((0, 0), f"Letra: {current_letter}", font=self.font, fill=255)
                draw.text((0, 20), "Palabra:", font=self.font, fill=255)
                draw.text((0, 40), word_buffer[-16:], font=self.font, fill=255)
            elif x_norm is not None and y_norm is not None:
                draw.text((0, 0), f"X: {x_norm:.3f}", font=self.font, fill=255)
                draw.text((0, 16), f"Y: {y_norm:.3f}", font=self.font, fill=255)
                px = max(4, min(124, int(x_norm * 128)))
                py = max(36, min(60, int(y_norm * 64)))
                draw.ellipse((px - 3, py - 3, px + 3, py + 3), fill=255)
            else:
                draw.text((0, 20), "Buscando ojo...", font=self.font, fill=255)

            self.oled.image(image)
            self.oled.show()
        except Exception as exc:
            LOG.debug("OLED update failed: %s", exc)

    def clear(self) -> None:
        if not self.available:
            return
        try:
            self.oled.fill(0)
            self.oled.show()
        except Exception as exc:
            LOG.debug("OLED clear failed: %s", exc)


class CoordinateSmoother:
    def __init__(self, cfg: Config) -> None:
        self.cfg = cfg
        self.last_valid_position = {"x": 0.5, "y": 0.5}
        self.history_x = deque(maxlen=cfg.position_history_size)
        self.history_y = deque(maxlen=cfg.position_history_size)
        self.kalman = self._create_kalman() if HAS_KALMAN else None

    @staticmethod
    def _create_kalman():
        kf = KalmanFilter(dim_x=4, dim_z=2)
        kf.x = np.array([0.5, 0.5, 0.0, 0.0])
        kf.F = np.array(
            [[1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 0, 0, 1]],
            dtype=float,
        )
        kf.H = np.array([[1, 0, 0, 0], [0, 1, 0, 0]], dtype=float)
        kf.P *= 100
        kf.R = np.eye(2) * 10
        kf.Q = np.eye(4) * 0.01
        return kf

    def _jump_is_reasonable(self, x: float, y: float) -> bool:
        dx = x - self.last_valid_position["x"]
        dy = y - self.last_valid_position["y"]
        return math.hypot(dx, dy) <= self.cfg.max_jump_distance

    def smooth(self, x: float, y: float) -> tuple[float, float]:
        if not self._jump_is_reasonable(x, y):
            x = self.last_valid_position["x"] * 0.8 + x * 0.2
            y = self.last_valid_position["y"] * 0.8 + y * 0.2

        if self.kalman is not None:
            self.kalman.predict()
            self.kalman.update([x, y])
            smooth_x = float(self.kalman.x[0])
            smooth_y = float(self.kalman.x[1])
        else:
            self.history_x.append(x)
            self.history_y.append(y)
            weights = np.exp(np.linspace(-1, 0, len(self.history_x)))
            weights /= weights.sum()
            smooth_x = float(np.average(list(self.history_x), weights=weights))
            smooth_y = float(np.average(list(self.history_y), weights=weights))

        smooth_x = float(np.clip(smooth_x, 0.0, 1.0))
        smooth_y = float(np.clip(smooth_y, 0.0, 1.0))
        self.last_valid_position["x"] = smooth_x
        self.last_valid_position["y"] = smooth_y
        return smooth_x, smooth_y


class EyeTrackerApp:
    def __init__(self, cfg: Config, debug_mode: bool = False) -> None:
        self.cfg = cfg
        self.debug_mode = debug_mode
        self.stop_event = threading.Event()
        self.state = SharedState()
        self.display = OledDisplay(cfg.oled_refresh_interval)
        self.smoother = CoordinateSmoother(cfg)

        self.sock_send = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.sock_listen = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.sock_listen.bind(("", cfg.udp_port_listen))
        self.sock_listen.settimeout(0.20)
        self.last_sent_time = 0.0

    def _listener_loop(self) -> None:
        while not self.stop_event.is_set():
            try:
                data, _addr = self.sock_listen.recvfrom(1024)
            except socket.timeout:
                continue
            except OSError:
                break
            except Exception as exc:
                LOG.warning("UDP listener error: %s", exc)
                time.sleep(0.1)
                continue

            try:
                msg = data.decode("utf-8", errors="strict").strip()
            except UnicodeDecodeError:
                LOG.warning("Ignored non-UTF-8 UDP message.")
                continue

            if len(msg) > 256:
                LOG.warning("Ignored oversized UDP command.")
                continue

            self.state.handle_message(msg)
            self.display.update(self.state, force=True)

    @staticmethod
    def _apply_roi_mask(gray_img: np.ndarray):
        # Original prototype processed the full frame. A calibrated eye ROI is
        # intentionally left as a future improvement rather than invented here.
        return gray_img, (0, 0, gray_img.shape[1], gray_img.shape[0])

    def _find_darkest_region(self, gray_img: np.ndarray):
        nonzero = gray_img[gray_img > 0]
        if nonzero.size == 0:
            return np.zeros_like(gray_img), 0.0

        threshold_value = float(
            np.percentile(nonzero, self.cfg.pupil_darkness_percentile)
        )
        _, binary = cv2.threshold(
            gray_img, threshold_value, 255, cv2.THRESH_BINARY_INV
        )
        return binary, threshold_value

    def _validate_candidate(self, contour, frame_shape) -> bool:
        area = cv2.contourArea(contour)
        if not self.cfg.min_pupil_area <= area <= self.cfg.max_pupil_area:
            return False

        x, y, w, h = cv2.boundingRect(contour)
        if not w or not h:
            return False

        if max(w / h, h / w) > self.cfg.max_aspect_ratio:
            return False

        perimeter = cv2.arcLength(contour, True)
        if perimeter <= 0:
            return False

        circularity = 4 * math.pi * area / (perimeter * perimeter)
        if circularity < self.cfg.min_circularity:
            return False

        hull = cv2.convexHull(contour)
        hull_area = cv2.contourArea(hull) if hull is not None else 0
        if hull_area <= 0 or area / hull_area < self.cfg.min_solidity:
            return False

        margin = 10
        frame_h, frame_w = frame_shape[:2]
        if (
            x < margin
            or y < margin
            or x + w > frame_w - margin
            or y + h > frame_h - margin
        ):
            return False

        return True

    def _detect_pupil(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        masked, _roi = self._apply_roi_mask(gray)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(masked)
        blurred = cv2.GaussianBlur(enhanced, (5, 5), 0)
        binary, threshold_value = self._find_darkest_region(blurred)

        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel, iterations=1)
        binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel, iterations=1)

        contours, _ = cv2.findContours(
            binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
        )
        candidates = []

        for contour in contours:
            if not self._validate_candidate(contour, frame.shape):
                continue

            moments = cv2.moments(contour)
            if moments["m00"] <= 0:
                continue

            cx = int(moments["m10"] / moments["m00"])
            cy = int(moments["m01"] / moments["m00"])
            area = cv2.contourArea(contour)
            mask = np.zeros(gray.shape, dtype=np.uint8)
            cv2.drawContours(mask, [contour], -1, 255, -1)
            mean_intensity = cv2.mean(gray, mask=mask)[0]
            score = area / (mean_intensity + 1)
            candidates.append(
                {"center": (cx, cy), "contour": contour, "score": score}
            )

        if not candidates:
            return None, None, binary, threshold_value

        best = max(candidates, key=lambda item: item["score"])
        return best["center"], best["contour"], binary, threshold_value

    def _send_coordinates(self, x_norm: float, y_norm: float) -> None:
        now = time.monotonic()
        if now - self.last_sent_time < self.cfg.min_send_interval:
            return

        message = f"X:{x_norm:.4f},Y:{y_norm:.4f}".encode("utf-8")
        try:
            self.sock_send.sendto(
                message, (self.cfg.laptop_ip, self.cfg.udp_port_send)
            )
            self.last_sent_time = now
        except OSError as exc:
            LOG.warning("UDP send failed: %s", exc)

    def _normalize(self, cx: int, cy: int) -> tuple[float, float]:
        x = cx / self.cfg.frame_w
        y = cy / self.cfg.frame_h
        if self.cfg.invert_x:
            x = 1.0 - x
        if self.cfg.invert_y:
            y = 1.0 - y
        return float(np.clip(x, 0.0, 1.0)), float(np.clip(y, 0.0, 1.0))

    def run(self) -> None:
        LOG.info("Starting Raspberry Pi eye tracker.")
        LOG.info(
            "Sending coordinates to %s:%d; listening on UDP %d.",
            self.cfg.laptop_ip,
            self.cfg.udp_port_send,
            self.cfg.udp_port_listen,
        )

        listener = threading.Thread(
            target=self._listener_loop, daemon=True, name="udp-listener"
        )
        listener.start()

        cap = cv2.VideoCapture(self.cfg.camera_index)
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.cfg.frame_w)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.cfg.frame_h)
        cap.set(cv2.CAP_PROP_FPS, self.cfg.camera_fps)

        if not cap.isOpened():
            self.stop_event.set()
            raise RuntimeError(
                f"Could not open camera index {self.cfg.camera_index}. "
                "Check the USB camera and permissions."
            )

        frame_count = 0
        fps_window_start = time.monotonic()
        current_fps = 0.0
        no_detection_frames = 0
        self.display.update(self.state, force=True)

        try:
            while not self.stop_event.is_set():
                ok, frame = cap.read()
                if not ok:
                    LOG.warning("Camera frame read failed; retrying.")
                    time.sleep(0.05)
                    continue

                if (
                    frame.shape[1] != self.cfg.frame_w
                    or frame.shape[0] != self.cfg.frame_h
                ):
                    frame = cv2.resize(frame, (self.cfg.frame_w, self.cfg.frame_h))

                pupil_center, pupil_contour, binary, threshold = self._detect_pupil(frame)
                output = frame.copy()

                if pupil_center is not None:
                    no_detection_frames = 0
                    cx, cy = pupil_center
                    x_norm, y_norm = self._normalize(cx, cy)
                    x_smooth, y_smooth = self.smoother.smooth(x_norm, y_norm)
                    self._send_coordinates(x_smooth, y_smooth)

                    current_letter, _word, calibrating = self.state.snapshot()
                    if not current_letter and not calibrating:
                        self.display.update(self.state, x_smooth, y_smooth)

                    if pupil_contour is not None:
                        cv2.drawContours(output, [pupil_contour], -1, (0, 255, 0), 2)
                    cv2.circle(output, pupil_center, 5, (0, 0, 255), -1)
                    cv2.putText(
                        output,
                        f"X:{x_smooth:.3f} Y:{y_smooth:.3f}",
                        (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.7,
                        (0, 255, 0),
                        2,
                    )
                    cv2.putText(
                        output,
                        f"Threshold: {int(threshold)}",
                        (10, self.cfg.frame_h - 10),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.6,
                        (255, 255, 255),
                        1,
                    )
                else:
                    no_detection_frames += 1
                    cv2.putText(
                        output,
                        "Searching for pupil...",
                        (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.7,
                        (0, 0, 255),
                        2,
                    )
                    if no_detection_frames == 30:
                        self.display.update(self.state, force=True)

                frame_count += 1
                elapsed = time.monotonic() - fps_window_start
                if elapsed >= 1.0:
                    current_fps = frame_count / elapsed
                    frame_count = 0
                    fps_window_start = time.monotonic()

                cv2.putText(
                    output,
                    f"FPS: {current_fps:.1f}",
                    (self.cfg.frame_w - 120, 30),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (255, 255, 255),
                    2,
                )

                current_letter, _word, calibrating = self.state.snapshot()
                if calibrating:
                    cv2.putText(
                        output,
                        f"CALIBRATING: {current_letter}",
                        (10, self.cfg.frame_h - 20),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.7,
                        (0, 165, 255),
                        2,
                    )
                elif current_letter:
                    cv2.putText(
                        output,
                        f"Letter: {current_letter}",
                        (10, self.cfg.frame_h - 20),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.7,
                        (255, 255, 0),
                        2,
                    )

                cv2.imshow("Eye Tracker", output)
                if self.debug_mode:
                    cv2.imshow("Binary Image", binary)

                key = cv2.waitKey(1) & 0xFF
                if key == ord("q"):
                    break
                if key == ord("d"):
                    self.debug_mode = not self.debug_mode
                    LOG.info("Debug view: %s", "ON" if self.debug_mode else "OFF")
                    if not self.debug_mode:
                        try:
                            cv2.destroyWindow("Binary Image")
                        except cv2.error:
                            pass

        finally:
            self.stop_event.set()
            cap.release()
            cv2.destroyAllWindows()
            self.display.clear()
            self.sock_send.close()
            self.sock_listen.close()
            listener.join(timeout=0.5)
            LOG.info("Eye tracker stopped cleanly.")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Raspberry Pi pupil tracker + UDP coordinate sender"
    )
    parser.add_argument(
        "--laptop-ip",
        required=True,
        help="IPv4 address of the laptop receiving gaze coordinates",
    )
    parser.add_argument("--send-port", type=int, default=5005)
    parser.add_argument("--listen-port", type=int, default=5006)
    parser.add_argument("--camera-index", type=int, default=0)
    parser.add_argument("--width", type=int, default=640)
    parser.add_argument("--height", type=int, default=480)
    parser.add_argument("--fps", type=int, default=30)
    parser.add_argument("--debug", action="store_true")
    parser.add_argument("--no-invert-x", action="store_true")
    parser.add_argument("--no-invert-y", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
    )

    cfg = Config(
        laptop_ip=args.laptop_ip,
        udp_port_send=args.send_port,
        udp_port_listen=args.listen_port,
        camera_index=args.camera_index,
        frame_w=args.width,
        frame_h=args.height,
        camera_fps=args.fps,
        invert_x=not args.no_invert_x,
        invert_y=not args.no_invert_y,
    )

    try:
        socket.inet_aton(cfg.laptop_ip)
    except OSError:
        LOG.error("Invalid IPv4 address: %s", cfg.laptop_ip)
        return 2

    try:
        EyeTrackerApp(cfg, debug_mode=args.debug).run()
    except KeyboardInterrupt:
        LOG.info("Interrupted by user.")
    except Exception:
        LOG.exception("Fatal eye-tracker error.")
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
