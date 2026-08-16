# Raspberry Pi Eye Tracker — Portfolio Code

This directory contains a cleaned, public version of the Raspberry Pi software from Gabriel Nathan's university eye-tracking writing prototype.

The original project code was reviewed to build this refactor, but the public version removes machine-specific local configuration and adds clearer structure, logging and shutdown behavior.

## Architecture

```text
GC0308 camera
    ↓
Raspberry Pi + OpenCV
    ↓
pupil detection
    ↓
normalized / smoothed gaze coordinates
    ↓ UDP :5005
Laptop virtual keyboard / calibration
    ↓ UDP :5006
Raspberry Pi state
    ↓
SSD1306 OLED
```

## Main file

- `src/eye_tracker_refactored.py`

## Install

Create a virtual environment if desired, then install the dependencies:

```bash
python3 -m pip install -r requirements.txt
```

On Raspberry Pi OS, OpenCV can alternatively be installed through the system package manager:

```bash
sudo apt update
sudo apt install python3-opencv
```

The OLED and Kalman-filter dependencies are optional. The program can still run without them.

## Run

Pass the laptop's IPv4 address explicitly instead of storing it in source code:

```bash
python3 src/eye_tracker_refactored.py --laptop-ip 192.168.1.50
```

Useful options:

```text
--send-port 5005
--listen-port 5006
--camera-index 0
--width 640
--height 480
--fps 30
--debug
--no-invert-x
--no-invert-y
```

Press `q` to quit and `d` to toggle the binary debug view.

## UDP protocol used by the prototype

### Raspberry Pi → laptop

```text
X:0.5123,Y:0.4388
```

### Laptop → Raspberry Pi

```text
LETRA:A
CALIBRANDO:B
FIN_CALIBRACION
BORRAR
LIMPIAR
ESPACIO
```

These plain-text messages match the behavior of the original prototype. A future version could replace them with a versioned structured message format.

## Important portfolio note

This refactor improves maintainability and runtime robustness. It does **not** claim better gaze accuracy than the original university prototype because no controlled benchmark dataset was supplied for an A/B comparison.

See the full case study at:

`portfolio/projects/raspberry-pi-eye-tracker.md`
