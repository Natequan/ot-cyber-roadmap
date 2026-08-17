# Week 01 · Day 03 — See Packets in Wireshark

**Roadmap stage:** Week 1 → Network fundamentals → See packets in Wireshark  
**Status:** Evidence verified  
**Evidence reviewed:** 2026-08-17  
**Environment:** Windows laptop · active Wi-Fi capture  
**Submitted evidence:** `practice day 3 week 1.pdf` + `cap1.pcapng`

## Objective

Capture real network traffic on the laptop's active interface, generate known traffic, use Wireshark display filters, and identify request/response behavior for ICMP and DNS.

## Evidence reviewed

The submitted PDF shows:

1. Wireshark actively capturing packets from the Wi-Fi interface.
2. An `icmp` display filter isolating ping traffic.
3. ICMP Echo Request and Echo Reply packets between the laptop and `8.8.8.8`.
4. A `dns` display filter isolating DNS traffic and packet details.

The submitted `cap1.pcapng` was also inspected directly as packet-capture data rather than relying only on screenshots.

## Packet capture verification

The capture contains **12,760 packets**.

### IPv4 ICMP verification

The capture contains **8 ICMP packets** corresponding to four complete ping exchanges:

```text
10.22.255.84 -> 8.8.8.8      ICMP Echo Request · seq 1
8.8.8.8      -> 10.22.255.84 ICMP Echo Reply   · seq 1

10.22.255.84 -> 8.8.8.8      ICMP Echo Request · seq 2
8.8.8.8      -> 10.22.255.84 ICMP Echo Reply   · seq 2

10.22.255.84 -> 8.8.8.8      ICMP Echo Request · seq 3
8.8.8.8      -> 10.22.255.84 ICMP Echo Reply   · seq 3

10.22.255.84 -> 8.8.8.8      ICMP Echo Request · seq 4
8.8.8.8      -> 10.22.255.84 ICMP Echo Reply   · seq 4
```

This verifies the learner successfully generated traffic intentionally and identified the request/reply relationship in Wireshark.

### DNS verification

The capture contains **511 DNS packets** parsed over UDP/53.

Observed DNS traffic includes queries and responses between:

- client: `10.22.255.84`
- DNS server: `10.22.255.165`

Domains observed include:

- `example.com`
- `www.google.com`
- `www.msftconnecttest.com`
- `ipv6.msftconnecttest.com`
- `api.teleparty.com`

The capture therefore verifies both DNS queries and corresponding responses were present and filterable.

### Other traffic observed

The capture also contained normal background traffic, including TCP, UDP, ARP and a large amount of IPv6 traffic. This is expected on a real active workstation and is useful evidence that a packet capture generally contains much more than the one protocol currently being studied.

## Concept check

The important interpretation for this stage is:

- **ICMP Echo Request:** the laptop asks whether the destination is reachable.
- **ICMP Echo Reply:** the destination returns a response to the request.
- **DNS query:** the client asks a DNS resolver for information about a hostname.
- **DNS response:** the resolver returns the requested name-resolution information.
- **Display filters:** `icmp` and `dns` do not create traffic; they reduce the visible packet list to packets matching the selected protocol.

## Pass decision

**PASS — evidence verified.**

The evidence satisfies the Week 01 Day 03 requirements: capture on the active interface, generate ICMP traffic, isolate request/reply packets, isolate DNS traffic, inspect source/destination information, and preserve a `.pcapng` capture.

## Evidence integrity

Original packet capture submitted:

```text
File: cap1.pcapng
Size: 10,811,248 bytes
SHA-256: 97bcf3a953fcf92aeb87e766efbeb0b0a364cb35a4192b3fc94e4edc00f3fe55
```

The binary capture is retained as submitted evidence. This public progress note records the verified packet-level findings without publishing every packet or local hardware identifier.

## Next stage

**Week 01 · Day 04 — Build a tiny Python tool**

Create `device_inventory.py`, run it successfully from VS Code/terminal, accept at least one user-entered device, and save the script plus terminal evidence.
