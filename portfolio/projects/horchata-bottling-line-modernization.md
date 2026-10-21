# Horchata Bottling Line Modernization — Siemens S7-1200, Operator Interface & Cap Feeding

**Context:** Systems Mechatronics final project, UNITEC, Q3 2026  
**Attribution:** Group university project. Gabriel Nathan Altamirano is listed among the project participants in the submitted September 2026 final company-handover report. Gabriel clarified his own participation in the team work: **designing a mechanism to stabilize the bottles during the bottling process and guide caps down onto the bottles before closing**. Other outcomes described below belong to the team as a whole; individual authorship of the PLC recovery or Python HMI is not claimed.

## Gabriel's specific contribution (self-reported)

Gabriel participated in the mechanical design of a bottle-positioning/retention concept intended to prevent bottle displacement during operation, alongside a cap-guiding/dispensing mechanism that brings caps to bottle mouths for the subsequent closing stage. The project was collaborative. This description is based on Gabriel's clarification, whereas the remaining engineering results are drawn from the submitted team report. **Do not claim a production-validated holding mechanism**: the submitted report documents limitations to complete-line verification.

## Engineering objective
Improve an existing horchata bottling machine through a recoverable PLC project, editable cycle timing, a browser-based operator interface and a mechanically feasible cap-delivery mechanism.

## Control architecture and implemented work
- Reconstructed and backed up the existing Siemens S7-1200 program after the original project could not be uploaded to the programming station. The team read online ladder networks and timer DBs, reconstructed logic in SCL and rebuilt a compilable TIA Portal project.
- Cross-checked **31/31 PLC tag addresses** against printed ladder documentation.
- Exposed **18 cycle timing parameters** through global `DB_TIEMPOS`, avoiding recompilation for routine calibration.
- Developed an operator-facing browser application mediated by a **Python / snap7** service communicating with the PLC; this exposes relevant I/O, timing parameters, start/stop and simulated sensor inputs.
- Preserved physical controls and gave stop priority when concurrent start/stop requests are present.
- Iterated a mechanical cap-delivery design, including a passive gravity chute and bottle-pickup head, using measurement-driven geometry checks and interference simulations.

## Evidence and verification from the submitted report
- The reconstructed PLC program compiled with **0 errors and 0 warnings**.
- All **18** parameter values were checked against original timers.
- Tests wrote/read back **5,500 ms; 4,200 ms; 5,800 ms**, then restored the original **5,000 ms**.
- Interface rejected out-of-range inputs and validated PLC feedback.
- Geometry review sampled **227 positions** along the cap chute, correcting clearance issues before printing.
- Video evidence documented bottle pickup of a cap, **but the cap was not yet consistently seated**; a leveling plate remained to be fabricated and tested.

## Critical limitations
**Do not claim the complete upgraded bottling line passed an end-to-end production run.** The report states that the ABB drive had an undervoltage alarm (**A2003**) that prevented conveyor movement. The final cap-leveling plate and proposed two-bottle carriage were not verified on the operating machine.

The project also identified a difference between PLC hardware/firmware versions at different inspection dates, a useful example of real industrial troubleshooting. Exact MAC addresses and internal site identifiers are intentionally omitted from this public summary.

## Portfolio value
PLC recovery and verification · TIA Portal · S7-1200 · industrial HMI/browser interface · Python snap7 · timing calibration · electromechanical prototyping · safety-minded troubleshooting.

**Source:** Submitted 50-page *Mejora en embotelladora de horchata — Dosificación de tapas, recuperación del programa del PLC e interfaz de operación* (2026). Original report includes other students’ names and student numbers and is not republished publicly here.

**Related material:** A separate 2025 bottling monoblock report and paper were supplied as project background, not presented as Gabriel's authored 2026 work.
