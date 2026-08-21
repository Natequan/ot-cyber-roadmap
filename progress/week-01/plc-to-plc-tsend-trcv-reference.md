# Supplemental Reference — S7-1200 PLC-to-PLC Communication with TSEND_C / TRCV_C

**Evidence type:** Technical setup/reference guide  
**Reviewed:** 2026-08-21  
**Execution status:** **Reference only — successful field execution is not independently proven by this document alone.**

## Purpose

This reference documents a proposed TCP-native communication path between two Siemens S7-1200 PLCs using Open User Communication blocks in TIA Portal.

## Topology described in the guide

| Element | plc_1 | plc_2 |
|---|---|---|
| IP | `10.42.6.116` | `10.42.6.67` |
| Communication block | `TSEND_C` | `TRCV_C` |
| Connection role | Active / initiates | Passive / listens |
| TCP port | Local automatic | Local `2000` |
| Event behavior | Rising edge through `R_TRIG` initiates one send | Receive event generates a timed physical-output pulse |

The guide describes both PLCs on the `10.42.6.0/24` network through a SCALANCE XB005.

## Receiver design — plc_2

The document proposes:

- `DB_Recibido.Buffer : Byte`
- `TRCV_C` in OB1
- TCP native connection
- partner = plc_1 (`10.42.6.116`)
- **Active connection establishment disabled**
- local port = `2000`
- `EN_R := TRUE`
- `DATA := DB_Recibido.Buffer`

For physical output behavior, it recommends using `TRCV_C_DB.NDR` plus `DB_Recibido.Buffer > 0` to trigger a `TP` timer, with an example pulse time of `T#2S`, rather than treating TCP data arrival as a sustained logic level.

## Sender design — plc_1

The document proposes:

- `DB_Enviar.Buffer : Byte`, initial value `1`
- `R_TRIG` on a physical input such as `I0.0`
- rising-edge output stored in an example marker such as `M10.0`
- `TSEND_C` in OB1
- TCP native connection
- partner = plc_2 (`10.42.6.67`)
- **Active connection establishment enabled**
- partner port = `2000`
- `REQ := M10.0`
- `CONT := TRUE`
- `DATA := DB_Enviar.Buffer`

The edge detector is used so one physical button press produces one send request rather than repeated requests across PLC scan cycles.

## Test sequence described

The guide recommends:

1. compile and download plc_2 first so the passive receiver is listening;
2. compile and download plc_1;
3. put both PLCs in RUN;
4. activate the physical input on plc_1;
5. verify that the target output on plc_2 pulses for approximately two seconds.

## Troubleshooting checklist documented

The reference calls out several useful failure modes:

- `TSEND_C.DONE` never activates → verify receiver is running and TCP port matches;
- `TRCV_C_DB.NDR` never activates → verify IP/port and active/passive connection roles;
- output turns on but does not turn off → inspect TP timing/logic;
- block compile error → verify `DATA` points to a valid variable of the correct type.

## Why this is archived

Although this file is not treated as proof that the PLC-to-PLC test was successfully executed, it is useful technical preparation for future Industrial Networks evidence because it documents the intended connection roles, data path, edge-trigger logic, output pulse logic and troubleshooting strategy.

If screenshots/video/report evidence of the real TSEND_C/TRCV_C execution is provided later, this reference can be converted into a verified laboratory case study.
