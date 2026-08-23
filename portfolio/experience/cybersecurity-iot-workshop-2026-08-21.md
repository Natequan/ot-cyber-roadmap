# Cybersecurity & IoT Workshop — Wireshark, Node-RED & ARP

**Type:** University cybersecurity / IoT workshop  
**Date:** 21 August 2026  
**Scope:** Guided technical session covering packet inspection, live Node-RED integration with a Siemens S7 PLC, and a controlled Python-based ARP-poisoning demonstration.

## Why this belongs in the portfolio

This entry is documented as **technical experience**, not as a standalone security project. The session connected networking fundamentals already practiced in university labs with packet-level inspection, PLC/IoT tooling and the security implications of ARP manipulation.

The Node-RED flow was successfully connected to the PLC during a live instructor-guided exercise at the front of the classroom. No screenshot was taken at the moment of the successful test. The supplied screenshot instead captures a separate point in the session where the S7 nodes were offline and reporting a transport timeout, so both the successful live test and the troubleshooting state are documented distinctly.

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

A Node-RED flow was created using `node-red-contrib-s7` version `3.1.3` and tested against a PLC during the workshop.

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

### Live result and troubleshooting

The Node-RED ↔ PLC communication was successfully tested during a live instructor-guided exercise. The available screenshot does not show that successful moment because the test was performed at the front of the classroom and no screenshot was taken there.

A separate screenshot from the session shows the S7 nodes in an **offline** state and the Node-RED debug panel reporting a transport connection timeout. That image is kept as troubleshooting evidence rather than treated as the final result of the exercise.

This is useful professional evidence because it shows both sides of industrial communication work: configuring and validating a live connection, and recognizing / troubleshooting a failed transport state.

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
Live PLC validation + communication troubleshooting
            ↓
ARP abuse / MITM security concepts
            ↓
Future OT / ICS network monitoring and defensive analysis
```

It strengthens the transition from basic networking toward OT / ICS security because the same local-network protocols and troubleshooting tools used to make systems communicate are also needed to understand how industrial and IoT environments can fail or be attacked.

## Evidence boundaries

- The Node-RED exported flow is committed as reproducible configuration evidence.
- Successful live Node-RED ↔ PLC communication was achieved during an instructor-guided classroom test; there is no screenshot of the successful moment.
- The supplied screenshot documents a separate transport-timeout state encountered during the session and is retained as troubleshooting evidence.
- Wireshark participation is documented from the workshop description, but no PCAP was supplied.
- ARP poisoning is documented as a guided, authorized university demonstration; no attack script is published or attributed as independently developed.
