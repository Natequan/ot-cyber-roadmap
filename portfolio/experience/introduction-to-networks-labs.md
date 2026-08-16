# Introduction to Networks — Hands-On Cisco Laboratory Series

**Type:** University laboratory series  
**Course:** Introduction to Networks  
**Date:** February 2026  
**Scope:** Three progressively layered networking laboratories covering physical media, LAN switching / ARP, and DHCP / routed connectivity.

## Why this belongs in the portfolio

These laboratories are not presented as flagship engineering projects. They are documented as **technical experience** because they establish practical networking foundations that support later work in industrial networking, OT security, PLC communications and embedded systems.

The reports document work with Cisco routers and Catalyst 2960 switches, direct console access through PuTTY, physical cabling, IP configuration, LAN verification and DHCP configuration.

> Evidence note: Gabriel described these labs as involving Packet Tracer as part of the course context, but the submitted reports themselves specifically document physical Cisco equipment and PuTTY-based configuration. This portfolio entry therefore treats the physical lab work as verified evidence and does not claim Packet Tracer-specific work from these files alone.

---

## Lab 1 — Physical Media, Structured Cabling & Fiber

### Objective

Build familiarity with Layer 1 networking by working with twisted-pair Ethernet cabling, RJ45 termination standards and optical-fiber handling.

### Verified work

- Reviewed twisted-pair Ethernet media and its role in IEEE 802.3 LANs.
- Practiced the TIA/EIA-568 color code used for straight-through and crossover RJ45 cabling.
- Prepared / terminated copper twisted-pair cable during the laboratory exercise.
- Used optical-fiber lab equipment to join fiber; the submitted results include photographs of an optical fiber fusion splicer in use.
- Connected physical network media and observed how cabling quality directly affects network connectivity.

### Skills demonstrated

- Layer 1 troubleshooting mindset
- Copper Ethernet cabling
- RJ45 termination
- TIA/EIA-568 awareness
- Fiber-optic handling / supervised splicing exposure
- IEEE 802.3 physical-media concepts

---

## Lab 2 — Basic LAN, Switch Access, MAC Tables & ARP

### Objective

Build a basic LAN, verify communication between end devices and understand address resolution between Layer 3 IP addresses and Layer 2 MAC addresses.

### Verified work

- Used PuTTY through a COM connection to access Cisco switches / routers from a laptop.
- Changed switch hostnames during basic device configuration.
- Inspected the switch MAC-address table.
- Interconnected two computers through the lab network.
- Verified communication between end devices and exchanged files across the LAN.
- Studied ARP as the mechanism that resolves IPv4 addresses to MAC addresses inside the local network.

### Skills demonstrated

- Cisco CLI exposure through console access
- Switch configuration basics
- MAC address table inspection
- IPv4 LAN configuration
- ARP fundamentals
- End-to-end connectivity verification
- Physical LAN cabling

---

## Lab 3 — DHCP Server, Relay, Client & Routed Connectivity

### Objective

Understand DHCP beyond a single LAN by configuring DHCP server, relay and client roles while routing traffic between multiple networks.

### Verified work

- Connected computers to a switch and router, then used PuTTY to configure Cisco routers.
- Assigned device names and created subnets with different IP networks for local and laboratory computers.
- Connected two routers through an inter-router network and configured routing so the networks could exchange traffic.
- Implemented DHCP in multiple roles: server on a Cisco router, relay across networks and DHCP client behavior.
- Worked with DHCP configuration concepts including `ip dhcp excluded-address`, `ip helper-address` and interface-based DHCP addressing.
- Verified connectivity by pinging between computers on the configured network.
- Reinforced the DHCP DORA process: Discover, Offer, Request and Acknowledge.

### Skills demonstrated

- DHCP server configuration
- DHCP relay / `ip helper-address`
- DHCP client configuration
- IPv4 subnetting practice
- Basic inter-router routing
- DNS / gateway option awareness
- End-to-end ping verification
- Cisco router / switch configuration

---

## Equipment documented across the reports

- Cisco ISR 4321 router
- Cisco 1981 router
- Cisco 2901 router
- Cisco Catalyst 2960 switch
- Ethernet cabling / RJ45 tooling
- Optical fiber fusion-splicing equipment
- Laptop console access using PuTTY

## Professional relevance

Together, these laboratories establish practical networking fundamentals in the order that matters for industrial and OT systems:

```text
Physical media / Layer 1
        ↓
Ethernet LAN + MAC learning
        ↓
ARP / IP-to-MAC resolution
        ↓
IPv4 addressing and subnets
        ↓
Routing between networks
        ↓
DHCP server / relay / client
        ↓
Future industrial networking and OT security
```

This experience complements Gabriel's later Schneider / Modbus work because troubleshooting industrial Ethernet and OT networks still depends on the same underlying concepts: cabling, MAC addressing, IPv4, routing, DHCP behavior and packet-level communication.

## Future evidence upgrades

- add original photos of Cisco switches / routers supplied by Gabriel;
- add Packet Tracer `.pkt` files or screenshots if available;
- add example CLI configurations with sanitized IP addressing;
- connect these fundamentals to the Nocturne CCNA roadmap and future Wireshark exercises.
