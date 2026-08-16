window.PORTFOLIO_DATA = {
  profile: {
    name: 'Gabriel Nathan',
    headline: 'Mechatronics Engineer in Training · Industrial Automation · OT / Embedded Security',
    summary: 'Building a portfolio around PLCs, industrial networks, embedded systems, electronics and cybersecurity. Each entry is based on real university or personal work and is documented without overstating individual contribution.'
  },
  caseStudies: [
    {
      id: 'industrial-modbus-rtu-lab-02',
      type: 'Team laboratory',
      course: 'Industrial Networks',
      date: '2026-08-13',
      title: 'Industrial Modbus RTU Integration — Schneider M221 ↔ PowerLogic PM5110',
      short: 'Configured and validated serial Modbus RTU communication over RS-485 between a Schneider M221 PLC and a PowerLogic PM5110 energy meter.',
      roleNote: 'This was a team laboratory. The public case study documents the verified technical work from the submitted report; Gabriel’s exact individual contribution can be refined later.',
      skills: ['Modbus RTU','RS-485','Schneider M221','PowerLogic PM5110','EcoStruxure Machine Expert - Basic','Register mapping','Industrial networking','PLC troubleshooting'],
      highlights: [
        'M221 configured as Modbus master on serial port SL1; PM5110 configured as slave/server address 1.',
        'Serial link used D1 / Data+, D0 / Data− and Common through the M221 RJ45 SL1 connection.',
        'Communication parameters verified at 19200 bit/s with Even parity.',
        'Mapped seven clock registers into PLC memory %MW100 through %MW106.',
        'Used READ_VAR with Modbus function 0x03 to read multiple holding registers.',
        'Resolved an addressing offset by using FirstObj 1836 to retrieve register-table entry 1837 correctly.',
        'Validated the received date/time in the PLC animation table.'
      ],
      architecture: [
        'PowerLogic PM5110 → RS-485 (D1, D0, Common) → Schneider M221 SL1',
        'M221 initiates READ_VAR request → PM5110 returns seven clock words',
        'PLC stores values in %MW100…%MW106 → animation table verifies the result'
      ],
      result: 'A verified read returned 2026 / 8 / 12 / 19 / 11 / 52 / 0, corresponding to 12 Aug 2026 at 19:11:52. Periodic refresh requires a new EXECUTE edge while respecting READ_VAR BUSY state.',
      professionalValue: 'This practice demonstrates industrial serial networking, protocol configuration, PLC memory mapping, use of manufacturer register tables, and troubleshooting an address-offset issue — all directly relevant to automation and future OT-security work.',
      topology: 'portfolio/assets/modbus-lab-topology.svg',
      source: 'portfolio/practices/industrial-modbus-rtu-lab-02.md'
    }
  ],
  backlog: [
    {title:'Raspberry Pi 5 Eye Tracker',area:'Embedded / Computer Vision',status:'Documentation queued'},
    {title:'PCB Sharpie CNC',area:'Automation / Digital Manufacturing',status:'Documentation queued'},
    {title:'IoT Irrigation + Power Electronics',area:'IoT / Cyber-Physical',status:'Documentation queued'},
    {title:'Mini Robotic Arm',area:'Embedded / Robotics',status:'Documentation queued'},
    {title:'Bottling System Redesign',area:'Industrial Automation',status:'Active university work'},
    {title:'Schneider Modbus Industrial Lab',area:'OT / Industrial Networking',status:'Active / evolving'}
  ]
};
