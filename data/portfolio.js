window.PORTFOLIO_DATA = {
  profile: {
    name: 'Gabriel Nathan',
    headline: 'Mechatronics Engineer in Training · Industrial Automation · OT / Embedded Security',
    summary: 'Building a portfolio around PLCs, industrial networks, embedded systems, electronics and cybersecurity. Each entry is based on real university or personal work and is documented without overstating individual contribution.'
  },
  caseStudies: [
    {
      id: 'raspberry-pi-eye-tracker',
      type: 'Solo software implementation · Team academic project',
      course: 'Sensors and Actuators',
      date: '2025',
      title: 'Raspberry Pi Eye-Tracking Writing System',
      short: 'Built the Raspberry Pi software for a low-cost gaze-controlled writing prototype using OpenCV pupil tracking, UDP communication and OLED feedback.',
      roleNote: 'The broader university project was submitted and presented as team work. Gabriel reports that he independently implemented the Raspberry Pi Python eye-tracking software represented in this case study; the academic team context is retained separately from that individual software contribution.',
      skills: ['Python','OpenCV','Raspberry Pi','Computer vision','UDP sockets','Threading','Kalman filtering','I2C / OLED','Embedded systems','HCI'],
      highlights: [
        'Captured camera frames and detected pupil candidates with grayscale conversion, CLAHE, Gaussian blur, percentile thresholding and morphology.',
        'Filtered contours using area, aspect ratio, circularity and solidity checks before choosing a pupil candidate.',
        'Converted the detected pupil center into normalized gaze coordinates and smoothed motion with jump suppression plus optional Kalman filtering.',
        'Sent gaze coordinates from the Raspberry Pi to a laptop over UDP and listened on a second UDP port for calibration/typing feedback.',
        'Integrated an SSD1306 128×64 OLED to display calibration status, selected letters, the current word buffer or tracking coordinates.',
        'Included live FPS/debug visualization and a binary-image debug mode for tuning the computer-vision pipeline.',
        'Created a separate portfolio refactor that improves configuration, shutdown, logging, state synchronization and OLED refresh behavior without pretending that software cleanup improved measured eye-tracking accuracy.'
      ],
      architecture: [
        'GC0308 camera → Raspberry Pi / OpenCV pupil-detection pipeline',
        'Pupil center → normalized + smoothed gaze coordinates → UDP port 5005 → laptop virtual-keyboard/calibration application',
        'Laptop feedback → UDP port 5006 → Raspberry Pi state → OLED letter/word/calibration display'
      ],
      result: 'The project artifacts document a functional wearable prototype that could interact with the virtual keyboard. Lighting conditions and per-user calibration remained important limitations. No raw test dataset accompanied the files, so this portfolio does not claim a measured accuracy percentage, typing speed or end-to-end latency.',
      professionalValue: 'This project combines embedded hardware, classical computer vision, networking, concurrency and human-machine interaction in one working prototype. It is strong evidence for embedded systems, robotics/computer vision and future cyber-physical or product-security work.',
      topology: 'portfolio/assets/eye-tracker-topology.svg',
      source: 'portfolio/projects/raspberry-pi-eye-tracker.md'
    },
    {
      id: 'industrial-modbus-rtu-lab-02',
      type: 'Team laboratory · full-process participation',
      course: 'Industrial Networks',
      date: '2026-08-13',
      title: 'Industrial Modbus RTU Integration — Schneider M221 ↔ PowerLogic PM5110',
      short: 'Configured and validated serial Modbus RTU communication over RS-485 between a Schneider M221 PLC and a PowerLogic PM5110 energy meter.',
      roleNote: 'This was collaborative team work rather than a task-split exercise. Gabriel participated across laptop/PLC setup, IP verification, USB engineering connection, Ladder communication programming, Modbus configuration, RS-485 wiring, Schneider register-table lookup, validation and troubleshooting.',
      skills: ['Modbus RTU','RS-485','Schneider M221','PowerLogic PM5110','EcoStruxure Machine Expert - Basic','Register mapping','Ladder communication','Industrial networking','PLC troubleshooting'],
      highlights: [
        'M221 configured as Modbus master on serial port SL1; PM5110 configured as slave/server address 1.',
        'Verified laptop/PLC engineering connectivity before configuring the serial exchange.',
        'Built the Ladder communication logic and configured the serial Modbus parameters.',
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
      professionalValue: 'This practice demonstrates industrial serial networking, protocol configuration, PLC memory mapping, use of manufacturer register tables, Ladder communication programming and troubleshooting an address-offset issue — all directly relevant to automation and future OT-security work.',
      topology: 'portfolio/assets/modbus-lab-topology.svg',
      source: 'portfolio/practices/industrial-modbus-rtu-lab-02.md'
    }
  ],
  backlog: [
    {title:'PCB Sharpie CNC',area:'Automation / Digital Manufacturing',status:'Documentation queued'},
    {title:'IoT Irrigation + Power Electronics',area:'IoT / Cyber-Physical',status:'Documentation queued'},
    {title:'Mini Robotic Arm',area:'Embedded / Robotics',status:'Documentation queued'},
    {title:'Bottling System Redesign',area:'Industrial Automation',status:'Active university work'},
    {title:'Schneider Modbus Industrial Lab',area:'OT / Industrial Networking',status:'Active / evolving'}
  ]
};
