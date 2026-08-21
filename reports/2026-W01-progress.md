# Week 01 Progress — Foundations

**Week:** 2026-08-15 → 2026-08-21  
**Status:** Complete

## Completed

- [x] **Step 1 — Set up your tools**
  - Completion was self-reported.
  - This setup-only step does not have a dedicated public evidence note.

- [x] **Step 2 — Read your own network**
  - Evidence verified and archived.
  - `progress/week-01/day-02-read-your-own-network.md`

- [x] **Step 3 — See packets in Wireshark**
  - Evidence verified from screenshots and the submitted packet capture.
  - `progress/week-01/day-03-see-packets-in-wireshark.md`

- [x] **Step 4 — Build a tiny Python tool**
  - Evidence verified from VS Code/terminal output.
  - `progress/week-01/day-04-build-a-tiny-python-tool.md`
  - `progress/week-01/device_inventory.py`

- [x] **Step 5 — Collect the Schneider lab facts**
  - Evidence verified from the Industrial Networks laboratory report.
  - `progress/week-01/day-05-collect-schneider-lab-facts.md`

- [x] **Step 6 — Package the week**
  - Evidence organized into progress notes, source code, weekly report and portfolio links.
  - `progress/week-01/day-06-package-the-week.md`

## Week 01 technical outcomes

### Networking fundamentals

- Located and interpreted IPv4 address, subnet mask, gateway, DNS and MAC information.
- Inspected the ARP cache.
- Verified external reachability with `ping`.
- Inspected the hop-by-hop route with `tracert`.

### Wireshark

- Captured real Wi-Fi traffic.
- Isolated ICMP request/reply traffic.
- Isolated DNS queries/responses.
- Preserved packet-capture evidence and documented packet-level findings.

### Python

Built a small interactive `device_inventory.py` utility using:

- lists;
- dictionaries;
- `input()`;
- `append()`;
- a `for` loop;
- f-string output.

### Industrial networking / OT

Verified facts from the Schneider M221 ↔ PowerLogic PM5110 laboratory:

- Modbus RTU over RS-485;
- M221 configured as master;
- PM5110 configured as slave address `1`;
- `19200 bit/s` and Even parity;
- SL1 serial interface;
- `READ_VAR` using Modbus function `0x03`;
- manufacturer clock-register table mapped into `%MW100…%MW106`;
- `FirstObj = 1836` required to retrieve manufacturer-table register 1837 correctly;
- date/time values verified in the PLC animation table.

## Supplemental reference archived

A Siemens S7-1200 PLC-to-PLC `TSEND_C` / `TRCV_C` configuration guide was also archived:

- `progress/week-01/plc-to-plc-tsend-trcv-reference.md`

It is explicitly classified as **technical reference material**, not as proof of successful execution, because the submitted guide itself does not contain independent field-validation evidence.

## Portfolio connection

The Industrial Networks work supports the existing professional case study:

- **Industrial Modbus RTU Integration — Schneider M221 ↔ PowerLogic PM5110**
- `portfolio/practices/industrial-modbus-rtu-lab-02.md`
- Portfolio page: `portfolio.html`

## Week 01 evidence index

1. `progress/week-01/day-02-read-your-own-network.md`
2. `progress/week-01/day-03-see-packets-in-wireshark.md`
3. `progress/week-01/day-04-build-a-tiny-python-tool.md`
4. `progress/week-01/device_inventory.py`
5. `progress/week-01/day-05-collect-schneider-lab-facts.md`
6. `progress/week-01/day-06-package-the-week.md`
7. `progress/week-01/plc-to-plc-tsend-trcv-reference.md`

## Closing note

Week 01 is complete. The important work is no longer only stored as screenshots or class submissions: the verified pieces have been converted into traceable GitHub evidence that can later support project READMEs, portfolio case studies and recruiter-facing material.
