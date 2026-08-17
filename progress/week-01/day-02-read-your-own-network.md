# Week 01 · Day 02 — Read Your Own Network

**Roadmap stage:** Week 1 → Network fundamentals → Read your own network  
**Status:** Evidence verified  
**Evidence reviewed:** 2026-08-16  
**Environment:** Windows laptop on local Wi-Fi

## Objective

Inspect the laptop's real network configuration and use basic Windows networking commands to connect the concepts of IP addressing, MAC addressing, ARP, reachability and packet path.

## Commands completed

```text
ipconfig /all
arp -a
ping 8.8.8.8
tracert 8.8.8.8
```

## Verified observations

### 1. Local network configuration

The submitted `ipconfig /all` evidence shows an active Wi-Fi adapter with:

- IPv4 address: `192.168.1.4`
- Subnet mask: `255.255.255.0` (`/24`)
- Default gateway: `192.168.1.1`
- DHCP server: `192.168.1.1`
- DNS included the local gateway (`192.168.1.1`) plus IPv6 entries
- A physical/MAC address was successfully identified; the exact value is intentionally omitted from this public progress note.

This confirms the learner can locate the core addressing information requested by the Week 01 guide.

### 2. ARP table

`arp -a` displayed local IPv4-to-MAC mappings for the `192.168.1.0/24` LAN, including an entry for the default gateway at `192.168.1.1`.

**Concept check:** ARP is used on the local IPv4 network to resolve an IP address to the link-layer MAC address needed to deliver the Ethernet/Wi-Fi frame locally. The ARP table is a cache of those learned/static mappings, not simply a history of every device the computer has ever connected to.

### 3. Connectivity test

`ping 8.8.8.8` completed successfully:

- Packets sent: `4`
- Packets received: `4`
- Packet loss: `0%`
- Minimum RTT: `24 ms`
- Maximum RTT: `28 ms`
- Average RTT: `25 ms`

This verifies IP connectivity from the laptop to the public destination used in the lab.

### 4. Route/path inspection

`tracert 8.8.8.8` completed successfully in **11 hops**. The first hop was the local router/default gateway at `192.168.1.1`, followed by upstream provider/transit hops before reaching `dns.google [8.8.8.8]`.

One intermediate hop showed `*` for some probes. That does not mean the route failed; routers may ignore or rate-limit traceroute probes while still forwarding traffic.

## Student explanation captured in the evidence

The submitted note correctly connected the main ideas:

- MAC address → physical/link-layer address of the interface
- IP address → logical network-layer address
- `ping` → reachability/connectivity test
- `tracert` → shows the hop-by-hop path toward a destination
- ARP → relates local IPv4 addresses to MAC addresses
- default gateway → local router used to reach destinations outside the local subnet

Two terminology refinements were made in this public note for technical accuracy: ARP is an IP-to-MAC mapping cache, and the default gateway is specifically the router used for non-local destinations rather than merely a common ISP route.

## Pass decision

**PASS — evidence verified.**

The evidence satisfies the Week 01 stage requirement: identify IPv4/subnet/gateway/MAC information, inspect ARP, verify connectivity with `ping`, trace the route with `tracert`, and explain the purpose of the commands in the learner's own words.

## Evidence handling

The original submitted DOCX contains screenshots of the commands and local network information. This public GitHub note records the useful technical evidence while avoiding publication of the full physical/MAC address.

## Next stage

**Week 01 · Day 03 — See packets in Wireshark**

Capture traffic on the active interface, generate ICMP and DNS traffic, filter it, identify request/reply pairs, and save a `.pcapng` or screenshot as evidence.
