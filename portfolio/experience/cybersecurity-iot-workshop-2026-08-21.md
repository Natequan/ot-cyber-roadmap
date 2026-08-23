# Cybersecurity & IoT Workshop — Wireshark, Node-RED & ARP

**Type:** University cybersecurity / IoT workshop  
**Date:** 21 August 2026  
**Scope:** Guided technical session covering packet inspection, Node-RED integration with Siemens S7 nodes, and a controlled Python-based ARP-poisoning demonstration.

## Why this belongs in the portfolio

This entry is documented as **technical experience**, not as a standalone security project. The session connected networking fundamentals already practiced in university labs with packet-level inspection, PLC/IoT tooling and the security implications of ARP manipulation.

The goal of this page is to preserve what was actually practiced and observed without overstating the result. In particular, the supplied Node-RED evidence shows a configured Siemens S7 flow, but the captured runtime state was offline with a transport timeout. That is recorded as troubleshooting evidence rather than a successful PLC communication claim.

---

## 1. Wireshark — packet inspection

The workshop introduced Wireshark as a practical way to inspect network traffic and relate protocol theory to real frames and packets.

### Experience gained

- Used Wireshark in a guided university environment to inspect network communication.
- Reinforced the relationship between Ethernet, IP and ARP behavior at packet level.
- Connected packet capture to troubleshooting and security analysis rather than treating protocols only as configuration concepts.
- Discussed how packet inspection can help identify unexpected local-network behavior.

No `.pcap` file was supplied with this portfolio update, so this entry does not claim a specific captured trace or packet-analysis finding.

---

## 2. Node-RED + Siemens S7 integration

A Node-RED flow was created using `node-red-contrib-s7` version `3.1.3`.

### Verified configuration from the exported flow

- S7 transport: `iso-on-tcp`
- PLC address: `192.168.0.10`
- TCP port: `102`
- Rack: `0`
- Slot: `1`
- Cycle time: `1000 ms`
- Timeout: `2000 ms`
- PLC variable name: `estado`
- PLC address mapped to the variable: `M0.0`
- One S7 input node reads `estado` and sends it to a debug node.
- One S7 output node receives Boolean `true` / `false` values from Inject nodes and targets the same `estado` variable.

The exported flow is preserved here:

[`cybersecurity-iot-workshop-node-red-flows.json`](./evidence/cybersecurity-iot-workshop-node-red-flows.json)

### Troubleshooting result

The session screenshot showed the S7 nodes in an **offline** state and the Node-RED debug panel repeatedly reported a transport connection timeout. Because of that, the portfolio describes this as **configuration + troubleshooting experience**, not as a validated PLC read/write exchange.

That distinction is useful professionally: understanding how to represent failed communication honestly is part of engineering evidence, especially when future work will involve OT and industrial-network troubleshooting.

---

## 3. ARP poisoning — controlled security demonstration

The workshop also covered ARP poisoning using Python scripts in an authorized classroom environment.

### Security concepts reinforced

- ARP maps IPv4 addresses to MAC addresses on a local network.
- Because ARP does not provide strong authenticity by itself, forged ARP information can be used to alter a host's local address-resolution view.
- A successful poisoning scenario can place an attacker-controlled system in a man-in-the-middle position if the environment permits it.
- Wireshark and other packet-analysis tools are useful for observing and investigating this kind of abnormal local-network behavior.

This portfolio entry intentionally describes the activity as a **guided demonstration / workshop exercise**. No Python attack script was supplied with the evidence package, so it does not claim independent exploit development or a specific successful interception.

---

## Skills and tools touched

- Wireshark
- Node-RED
- `node-red-contrib-s7`
- Siemens S7 communication concepts
- ISO-on-TCP / TCP port 102
- PLC memory-bit addressing (`M0.0`)
- ARP behavior and ARP-poisoning concepts
- Python security scripting exposure
- Network troubleshooting
- OT / IoT security foundations

## Professional relevance

This workshop is a useful bridge between the networking and industrial-automation sides of Nocturne:

```text
Ethernet / IPv4 / ARP fundamentals
            ↓
Wireshark packet inspection
            ↓
Node-RED ↔ Siemens S7 / PLC integration
            ↓
Communication troubleshooting
            ↓
ARP abuse / MITM security concepts
            ↓
Future OT / ICS network monitoring and defensive analysis
```

It strengthens the transition from basic networking toward OT / ICS security because the same local-network protocols and troubleshooting tools used to make systems communicate are also needed to understand how industrial and IoT environments can fail or be attacked.

## Evidence boundaries

- The Node-RED exported flow is committed as reproducible configuration evidence.
- The captured Node-RED state showed a transport timeout, so successful S7 communication is **not** claimed.
- Wireshark participation is documented from the workshop description, but no PCAP was supplied.
- ARP poisoning is documented as a guided, authorized university demonstration; no attack script is published or attributed as independently developed.
