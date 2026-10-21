(() => {
  const data = window.PORTFOLIO_DATA;
  if (!data || !Array.isArray(data.caseStudies)) return;
  const additions = [
    {
      id: 'horchata-bottling-modernization',
      type: 'Documented team engineering project · 2026',
      course: 'Systems Mechatronics · Industrial Automation',
      date: '2026',
      title: 'Horchata Bottling Line — Bottle Positioning & Cap Feeding',
      short: 'Contributed to bottle stabilization and cap-guidance mechanisms in a team modernization of an existing bottling line; the wider project also recovered Siemens PLC logic and implemented a Python/snap7 interface.',
      roleNote: 'Gabriel is named in the September 2026 team report and clarifies his own role as designing bottle-positioning/stabilization and cap-guidance mechanisms. PLC reconstruction, 18 timer parameters and the HMI are documented team outcomes, not independently attributed to him.',
      skills: ['Mechanism design', 'Bottle positioning', 'Cap feeding', 'Mechanical prototyping', 'Siemens S7-1200', 'TIA Portal', 'Python / snap7', 'Industrial troubleshooting'],
      highlights: [
        'Gabriel contributed to a mechanism intended to hold bottles in position during bottling and to a cap-guiding concept so caps could be delivered to bottle mouths for the closing step.',
        'The wider team recovered and reconstructed the Siemens S7-1200 control project from online ladder and timer DB evidence when upload to a programming station was unavailable.',
        'Validated 31 of 31 PLC tag addresses and produced a reconstructed project that compiled without errors or warnings.',
        'Moved 18 cycle times into a readable/writable global DB and verified browser-to-PLC setpoint changes through Python snap7.',
        'Developed a browser control bridge while preserving existing physical controls and stop priority.',
        'Modeled and refined a passive cap feeder, checking clearances and the route through 227 chute positions before fabrication.',
        'Diagnosed an ABB drive undervoltage alarm that prevented a complete automatic cycle.'
      ],
      architecture: [
        'Physical sensors and operator controls → Siemens S7-1200 PLC → conveyor, pump and pneumatic stages.',
        'Operator browser → local Python/snap7 server → adjustable PLC timing DB (18 parameters) and approved HMI functions.',
        'Bottle neck → gravity-fed cap chute → passive cap pickup → proposed leveling stage before screw-capping.'
      ],
      result: 'The report verifies 31/31 tag matches, 0 compilation errors/warnings, successful read-back of timer changes and a cap pickup prototype. The line did not complete a validated end-to-end run: the ABB drive undervoltage condition prevented conveyor motion, and the cap-leveling part still required physical testing.',
      professionalValue: 'Demonstrates realistic PLC recovery, industrial control/HMI integration, parameter management, electromechanical design iteration and honest engineering validation under imperfect field conditions.',
      topology: 'portfolio/assets/horchata-bottling-modernization.svg',
      source: 'portfolio/projects/horchata-bottling-line-modernization.md'
    },
    {
      id: 'three-phase-motor-reversal-training-station',
      type: 'Hands-on electrical wiring & functional testing',
      course: 'Industrial Electrical Control',
      date: '2026',
      title: 'Timed Three-Phase Motor Reversing Training Station',
      short: 'Personally wired and function-tested a three-phase motor reversing training station with contactors, a time relay, pushbuttons and pilot lamps; no voltage/current measurements were taken.',
      roleNote: 'Gabriel confirms he personally connected the station and participated in testing; its expected control behavior worked. There were no measured voltages/currents, and the original wiring-diagram authorship is not independently established.',
      skills: ['Three-phase motors', 'Power circuits', 'Control circuits', 'Contactors', 'Time relays', 'Electrical interlocks', 'Industrial safety', 'Technical diagrams'],
      highlights: [
        'Personally connected the training station and confirmed the motor-control sequence functioned during the class test, without collecting voltage/current measurements.',
        'Documented a physical didactic station with DIN-rail switching/protection, a separate command panel, a motor and pilot-lamp indications.',
        'Mapped three-phase power delivery through KM1 and KM3 reversing contactors and motor overload protection.',
        'Explained how swapping two supply phases changes rotation direction.',
        'Mapped start/stop/transition pushbuttons and K5 time relay into the command sequence.',
        'Outlined pre-energization checks, interlocking and supervised commissioning practices.'
      ],
      architecture: [
        'Three-phase supply (L1/L2/L3) → isolator and protection → forward KM1 / reverse KM3 contactors.',
        'Pushbuttons and interlocking control → K5 timer → permitted contactor energization and status lamps.',
        'Selected phase order → overload protection → three-phase motor; PE remains connected to the enclosure.'
      ],
      result: 'Gabriel reports successfully wiring and function-testing the station. The supplied report provides photos, power/control descriptions and procedures. No actual voltage/current readings were taken, and no measured motor ratings or timer values are claimed.',
      professionalValue: 'Reinforces industrial electrical controls, separation of power and command circuits, control logic, motor reversing, protection and safe testing practices.',
      topology: 'portfolio/assets/three-phase-reversal-station.svg',
      source: 'portfolio/projects/three-phase-motor-reversal-station.md'
    }
  ];
  const ids = new Set(data.caseStudies.map(c => c.id));
  for (const entry of additions) if (!ids.has(entry.id)) data.caseStudies.push(entry);
  data.backlog = (data.backlog || []).filter(p => !/Bottling System Redesign/i.test(p.title));
})();
