# Timed Three-Phase Motor Reversal — Electrical Training Station

**Context:** University practical station / electrical control documentation  
**Attribution:** Documentation and demonstration evidence supplied for portfolio review. The report does not identify the report author or confirm a specific individual component assignment. Described conservatively as a documented training-station practice rather than sole design authorship.

## Objective
Document an industrial-control teaching station for **timed reversal of a three-phase motor** using a power circuit, a separate low-voltage/command circuit, interlocked contactors, pushbuttons, a timer and pilot lamps.

## Documented architecture
- **Power path:** L1/L2/L3 → switching/protection → forward or reverse power contactor (**KM1 / KM3**) → overload protection → motor terminals U1/V1/W1.
- **Reversal principle:** the reverse contactor swaps two supply phases.
- **Control path:** normal-stop and start/transition switches, contactor auxiliary logic, **K5 timing device**, indicator lamps.
- **Protective earth:** conductor PE to motor enclosure; not switched by the contactors.
- **Commissioning procedure:** isolate power, check wiring/terminal designations, continuity and insulation, confirm interlocks and protective devices, then conduct supervised stepwise testing.

## Evidence and limitations
The report includes a photographed demonstration of the physical training panel, wiring/power-and-command diagrams, a component inventory and a reproducible lab procedure.

The report explicitly warns that motor voltage/current/power, overload settings and exact timer delay cannot be reliably read from the presentation video. It also notes that a nearby VFD appears in footage but is **not documented as part of this reversing circuit**. Therefore, those details are not fabricated or claimed as measured results.

## Professional value
Industrial electrical schematics · power/control separation · contactor logic · reversing starters · time-delay relays · overload and emergency-stop safety · methodical verification.

**Source:** Submitted *Estación de trabajo para inversión temporizada del giro de un motor trifásico — Informe técnico y guía de práctica* (9 pages).
