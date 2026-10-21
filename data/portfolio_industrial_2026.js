(() => {
  const data = window.PORTFOLIO_DATA;
  if (!data || !Array.isArray(data.caseStudies)) return;
  const additions = [
    {
      id: 'horchata-bottling-modernization',
      type: 'Documented team engineering project · 2026',
      course: 'Systems Mechatronics · Industrial Automation',
      date: '2026',
      title: 'Horchata Bottling Line — PLC Recovery, HMI & Cap Feeding',
      short: 'Team modernization of an existing bottling line: recovered Siemens PLC logic, a Python/snap7 browser interface with 18 adjustable cycle times, and a mechanically iterated passive cap dispenser.',
      roleNote: 'Gabriel is explicitly listed on the September 2026 university team handover report. The document does not separate individual tasks, so all reported outcomes are attributed to the team, not sole authorship.',
      skills: ['Siemens S7-1200', 'TIA Portal', 'PLC recovery', 'Python', 'snap7', 'Operator interface', 'Mechanical prototyping', 'Industrial troubleshooting'],
      highlights: [
        'Recovered and reconstructed the Siemens S7-1200 control project from online ladder and timer DB evidence when upload to a programming station was unavailable.',
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
      type: 'Technical station documentation · authorship unconfirmed',
      course: 'Industrial Electrical Control',
      date: '2026',
      title: 'Timed Three-Phase Motor Reversing Training Station',
      short: 'Documented a physical training station and wiring method for direction control of a three-phase motor using reversing contactors, a time relay, pushbuttons and pilot lamps.',
      roleNote: 'Provided technical report documents a training station and demonstration. The submitted document does not carry a byline identifying who built each part; this entry claims documentation/familiarity with the practice only and does not claim independent ownership or measured test performance.',
      skills: ['Three-phase motors', 'Power circuits', 'Control circuits', 'Contactors', 'Time relays', 'Electrical interlocks', 'Industrial safety', 'Technical diagrams'],
      highlights: [
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
      result: 'The supplied technical report contains a photographed control station, power/control diagram descriptions, component functions and supervised verification instructions. It does not substantiate exact motor ratings, timing settings or a complete independently measured commissioning result.',
      professionalValue: 'Reinforces industrial electrical controls, separation of power and command circuits, control logic, motor reversing, protection and safe testing practices.',
      topology: 'portfolio/assets/three-phase-reversal-station.svg',
      source: 'portfolio/projects/three-phase-motor-reversal-station.md'
    }
  ];
  const ids = new Set(data.caseStudies.map(c => c.id));
  for (const entry of additions) if (!ids.has(entry.id)) data.caseStudies.push(entry);
  data.backlog = (data.backlog || []).filter(p => !/Bottling System Redesign/i.test(p.title));
})();
