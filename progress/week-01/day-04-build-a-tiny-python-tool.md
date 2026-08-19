# Week 01 · Day 04 — Build a Tiny Python Tool

**Roadmap stage:** Week 1 → Network fundamentals → Build a tiny Python tool  
**Status:** Evidence verified  
**Evidence reviewed:** 2026-08-19  
**Environment:** Windows · Visual Studio Code · Python terminal

## Objective

Create and run a small Python program that stores device name/IP pairs, accepts a user-entered device, appends it to the inventory, and prints the updated device list.

## Evidence reviewed

The submitted screenshot shows `device_inventory.py` open in Visual Studio Code and successful terminal execution.

The program starts with two predefined devices:

```text
PLC  -> 192.168.1.10
HMI  -> 192.168.1.20
```

It then requests:

```text
Ingresa el nombre del dispositivo:
Ingresa la IP del dispositivo:
```

The submitted run added:

```text
PLC2 -> 192.168.1.15
```

and printed the complete updated inventory without an exception.

## Concepts demonstrated

### 1. List of dictionaries

Each device is represented as a dictionary containing `name` and `ip`, while the full inventory is stored in a Python list.

### 2. User input

`input()` is used to collect a new device name and IP address interactively from the terminal.

### 3. Appending structured data

The new device is appended to the list as another dictionary:

```python
devices.append({"name": new_name, "ip": new_ip})
```

### 4. Iteration and formatted output

A `for` loop iterates over the inventory, and an f-string formats each record as:

```text
DEVICE_NAME -> IP_ADDRESS
```

## Verified result

**PASS — evidence verified.**

The screenshot satisfies the Week 01 Day 04 pass condition:

- Python file exists in VS Code.
- Program runs from the terminal without a traceback.
- User input is accepted.
- A new device is appended.
- The complete inventory is printed after the update.

## Source file

A clean copy of the demonstrated script is archived beside this progress note as:

`device_inventory.py`

## Small next-step improvements

These are not required for the Day 04 pass, but are good future exercises:

- reject an empty device name;
- validate IPv4 input before saving it;
- allow multiple devices to be added in one run;
- save/load inventory from JSON or CSV;
- detect duplicate IP addresses.

## Next stage

**Week 01 · Day 05 — Collect the Schneider lab facts**

Record exact hardware models, serial/Modbus parameters, register-table evidence, and the software used in the real Schneider lab.
