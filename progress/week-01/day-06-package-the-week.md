# Week 01 · Day 06 — Package the Week

**Roadmap stage:** Week 1 → Network fundamentals → Package the week  
**Status:** Completed  
**Packaged:** 2026-08-21

## Objective

Turn the week's exercises into organized, traceable evidence rather than leaving the work scattered across screenshots, captures, source files and university reports.

## Week 01 evidence package

### Day 01 — Set up your tools

**Status:** Completed by learner self-report.

The setup stage covered Python, VS Code, Git, Wireshark and Cisco Packet Tracer. A dedicated public evidence record was not created for this setup-only stage.

### Day 02 — Read your own network

**Status:** Evidence verified.

Archived evidence:

- `progress/week-01/day-02-read-your-own-network.md`

Verified work included `ipconfig /all`, `arp -a`, `ping 8.8.8.8`, `tracert 8.8.8.8`, local addressing interpretation and network-path explanation.

### Day 03 — See packets in Wireshark

**Status:** Evidence verified.

Archived evidence:

- `progress/week-01/day-03-see-packets-in-wireshark.md`

Verified work included a real Wi-Fi capture, ICMP request/reply analysis, DNS filtering and preservation of the submitted `.pcapng` evidence metadata.

### Day 04 — Build a tiny Python tool

**Status:** Evidence verified.

Archived evidence:

- `progress/week-01/day-04-build-a-tiny-python-tool.md`
- `progress/week-01/device_inventory.py`

The program stores device/IP pairs, accepts a new device interactively, appends it and prints the updated inventory.

### Day 05 — Collect the Schneider lab facts

**Status:** Evidence verified.

Archived evidence:

- `progress/week-01/day-05-collect-schneider-lab-facts.md`

Verified industrial-networking facts include Schneider M221 master, PowerLogic PM5110 slave address 1, RS-485 SL1 wiring, 19200 bit/s, Even parity, READ_VAR / Modbus 0x03, seven clock registers and validated `%MW100…%MW106` results.

### Supplemental industrial-networking reference

Archived separately:

- `progress/week-01/plc-to-plc-tsend-trcv-reference.md`

This file documents a proposed Siemens S7-1200 `TSEND_C` / `TRCV_C` TCP-native configuration. It is intentionally labeled as a **reference**, not as verified execution evidence, because the submitted guide alone does not prove the field test was completed successfully.

## Portfolio connection

Week 01 already connects the learning roadmap to a real university case study:

- **Industrial Modbus RTU Integration — Schneider M221 ↔ PowerLogic PM5110**
- `portfolio/practices/industrial-modbus-rtu-lab-02.md`

This creates a clean progression from networking fundamentals → packet inspection → basic Python → industrial serial networking / Modbus.

## Packaging decision

**PASS — Week 01 package completed.**

The useful evidence has been converted into public progress notes/source code, sensitive identifiers are not intentionally republished, and claims are separated into:

- verified output/evidence;
- learner self-report;
- technical reference material that is not yet execution-verified.

## Week 01 summary

The first week established a practical foundation in:

- local IPv4 networking;
- ARP and default-gateway behavior;
- reachability and route inspection;
- packet capture and protocol filtering;
- Python lists, dictionaries, input, loops and formatted output;
- industrial RS-485 / Modbus RTU configuration;
- manufacturer register-table lookup;
- PLC memory mapping and communication troubleshooting;
- evidence-driven GitHub documentation.

The consolidated weekly report is maintained at:

- `reports/2026-W01-progress.md`
