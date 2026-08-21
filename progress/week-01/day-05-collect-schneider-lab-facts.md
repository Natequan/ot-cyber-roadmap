# Week 01 · Day 05 — Collect the Schneider Lab Facts

**Roadmap stage:** Week 1 → Network fundamentals → Collect the Schneider lab facts  
**Status:** Evidence verified  
**Evidence reviewed:** 2026-08-21  
**Source:** Industrial Networks Laboratory #2 · UNITEC · 2026-08-13  
**Context:** Team laboratory; technical facts below are taken from the submitted report.

## Objective

Turn the real university laboratory into clean OT/industrial-networking evidence by recording the exact devices, serial topology, Modbus settings, register map, PLC memory mapping and verification result instead of relying on memory or guessed parameters.

## Verified hardware and roles

### Schneider Modicon M221 PLC

- Role: **Modbus RTU master**
- Serial interface: **SL1**
- Software: **EcoStruxure Machine Expert - Basic**
- Function: initiate reads from the PowerLogic meter and store returned words in `%MW` memory.

### Schneider Electric PowerLogic PM5110

- Role: **Modbus RTU slave/server**
- Slave address: **1**
- Function: expose internal measurement/register data, including the internal clock registers used in the lab.

## Physical communication link

The report documents a direct serial RS-485 link between the PM5110 and the M221 SL1 RJ45 connector.

| M221 SL1 RJ45 | Signal | PM5110 |
|---|---|---|
| Pin 4 | D1 / Data+ | D1 (+) |
| Pin 5 | D0 / Data− | D0 (−) |
| Pin 8 | Common | C |

The report explicitly states that Ethernet was **not** used for the PM5110 data exchange; the communication path was serial RS-485.

## Verified Modbus RTU parameters

- Protocol: **Modbus RTU**
- PM5110 address: **1**
- Baud rate: **19200 bit/s**
- Parity: **Even**
- PLC mode: **Master**
- PM5110 mode: **Slave/server**

## Register table used

The lab used the PM5110 clock register group consisting of seven consecutive words:

| Register in manufacturer table | Data | PLC destination |
|---:|---|---|
| 1837 | Year | `%MW100` |
| 1838 | Month | `%MW101` |
| 1839 | Day | `%MW102` |
| 1840 | Hour | `%MW103` |
| 1841 | Minute | `%MW104` |
| 1842 | Second | `%MW105` |
| 1843 | Millisecond | `%MW106` |

## READ_VAR configuration

The communication block was configured to read multiple holding registers:

| READ_VAR field | Verified value | Purpose |
|---|---|---|
| Link | `1 - SL1` | Use serial line 1 |
| Id | `1` | PM5110 Modbus address |
| Timeout | `100` | Response timeout |
| ObjType | Read multiple words · Modbus `0x03` | Holding-register read |
| FirstObj | `1836` | Required offset to retrieve manufacturer-table register 1837 |
| Quantity | `7` | Seven consecutive words |
| IndexData | `100` | Store beginning at `%MW100` |

### Troubleshooting result

A key technical finding was the address offset: using **FirstObj = 1836** was required to retrieve the manufacturer-table entry **1837** correctly. This is useful portfolio evidence because it shows actual troubleshooting rather than only nominal configuration.

## Verified result

The animation table displayed:

```text
%MW100 = 2026
%MW101 = 8
%MW102 = 12
%MW103 = 19
%MW104 = 11
%MW105 = 52
%MW106 = 0
```

This corresponds to:

**12 Aug 2026 · 19:11:52**

The result verifies that the M221 successfully read the PM5110 clock data through Modbus RTU and stored the returned seven words in PLC memory.

## Periodic-read behavior understood

The report also documents an important behavior of `READ_VAR`: keeping `EXECUTE` continuously high does not continuously refresh the data. A new activation edge is needed for a new request, and periodic requests must respect the block's `BUSY` state so a new transaction is not started before the previous one finishes.

## Pass decision

**PASS — evidence verified.**

The submitted laboratory report satisfies the Day 05 requirement because the exact hardware, communication medium, master/slave roles, baud rate, parity, slave ID, register table, memory destinations, communication block and working result are all documented from the real lab.

## Portfolio connection

This evidence directly supports the existing portfolio case study:

- **Industrial Modbus RTU Integration — Schneider M221 ↔ PowerLogic PM5110**
- `portfolio/practices/industrial-modbus-rtu-lab-02.md`

## Privacy / attribution handling

The original report is a team university submission and includes student names/account numbers. This public progress note preserves the technical evidence without republishing student account numbers or presenting the team report as an individual-only project.
