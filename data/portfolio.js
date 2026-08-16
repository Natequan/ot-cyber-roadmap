window.PORTFOLIO_DATA = {
  profile: {
    name: 'Gabriel Nathan',
    headline: 'Mechatronics Engineer in Training · Industrial Automation · OT / Embedded Security',
    summary: 'Building a portfolio around PLCs, industrial networks, embedded systems, electronics and cybersecurity. Each entry is based on real university or personal work and is documented without overstating individual contribution.'
  },
  experience: [
    {
      id: 'intro-networks-lab-01',
      index: '01',
      date: '2026-02',
      title: 'Physical Media, Structured Cabling & Fiber',
      type: 'Introduction to Networks · Laboratory',
      short: 'Worked with Layer 1 networking concepts through twisted-pair Ethernet, RJ45 termination standards and supervised optical-fiber handling.',
      skills: ['Layer 1','TIA/EIA-568','RJ45','Twisted pair','Fiber optics','IEEE 802.3'],
      bullets: [
        'Reviewed twisted-pair Ethernet media and the TIA/EIA-568 color code for straight-through and crossover cabling.',
        'Prepared / terminated copper Ethernet cabling during the laboratory exercise.',
        'Used optical-fiber lab equipment to join fiber, with report evidence showing an optical fiber fusion splicer in use.'
      ],
      source: 'portfolio/experience/introduction-to-networks-labs.md'
    },
    {
      id: 'intro-networks-lab-02',
      index: '02',
      date: '2026-02',
      title: 'Basic LAN, Switch Access, MAC Tables & ARP',
      type: 'Introduction to Networks · Laboratory',
      short: 'Configured and verified a small LAN using Cisco equipment, PuTTY console access, MAC-table inspection and end-device communication.',
      skills: ['Cisco CLI','LAN','MAC table','ARP','IPv4','PuTTY'],
      bullets: [
        'Accessed Cisco switches / routers from a laptop through PuTTY over a COM connection and performed basic device configuration.',
        'Changed switch hostnames and inspected the switch MAC-address table.',
        'Interconnected two computers, verified communication and reinforced ARP as the IPv4-to-MAC resolution mechanism inside a LAN.'
      ],
      source: 'portfolio/experience/introduction-to-networks-labs.md'
    },
    {
      id: 'intro-networks-lab-03',
      index: '03',
      date: '2026-02',
      title: 'DHCP Server, Relay, Client & Routed Connectivity',
      type: 'Introduction to Networks · Laboratory',
      short: 'Configured multi-network connectivity with Cisco routers while practicing DHCP server, relay and client roles plus basic routing and verification.',
      skills: ['DHCP','DHCP Relay','ip helper-address','Subnetting','Routing','Ping'],
      bullets: [
        'Created multiple IPv4 subnets, connected two routers through an inter-router network and configured connectivity between networks.',
        'Practiced DHCP server, relay and client behavior, including excluded addresses, helper addressing and dynamic interface addressing.',
        'Verified end-to-end connectivity with ping and reinforced the DHCP Discover / Offer / Request / Acknowledge exchange.'
      ],
      source: 'portfolio/experience/introduction-to-networks-labs.md'
    }
  ],
  caseStudies: [
    {
      id: 'raspberry-pi-eye-tracker',
      type: 'Solo software implementation · Team academic project',
      course: 'Sensors and Actuators',
      date: '2025',
      title: 'Raspberry Pi Eye-Tracking Writing System',
      short: 'Built the Raspberry Pi 4B software for a low-cost gaze-controlled writing prototype using OpenCV pupil tracking, UDP communication and OLED feedback.',
      roleNote: 'The broader university project was submitted and presented as team work. Gabriel reports that he independently implemented the Raspberry Pi Python eye-tracking software represented in this case study; the academic team context is retained separately from that individual software contribution.',
      skills: ['Python','OpenCV','Raspberry Pi 4B','Computer vision','UDP sockets','Threading','Kalman filtering','I2C / OLED','Embedded systems','HCI'],
      highlights: [
        'Captured camera frames and detected pupil candidates with grayscale conversion, CLAHE, Gaussian blur, percentile thresholding and morphology.',
        'Filtered contours using area, aspect ratio, circularity and solidity checks before choosing a pupil candidate.',
        'Converted the detected pupil center into normalized gaze coordinates and smoothed motion with jump suppression plus optional Kalman filtering.',
        'Sent gaze coordinates from the Raspberry Pi 4B to a laptop over UDP and listened on a second UDP port for calibration/typing feedback.',
        'Integrated an SSD1306 128×64 OLED to display calibration status, selected letters, the current word buffer or tracking coordinates.',
        'Included live FPS/debug visualization and a binary-image debug mode for tuning the computer-vision pipeline.',
        'Created a separate portfolio refactor that improves configuration, shutdown, logging, state synchronization and OLED refresh behavior without pretending that software cleanup improved measured eye-tracking accuracy.'
      ],
      architecture: [
        'GC0308 camera → Raspberry Pi 4B / OpenCV pupil-detection pipeline',
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
    },
    {
      id: 'rapid-pcb-cell',
      type: 'Team university project · full-process participation',
      course: 'Automated Manufacturing / Digital Fabrication',
      date: '2026',
      title: 'Low-Cost Automated Cell for Rapid PCB and Enclosure Prototyping',
      short: 'Developed a hybrid digital-manufacturing cell that combines an Arduino-based CNC plotter, PCB etching, PETG 3D printing, laser processes and ShopBot fabrication to accelerate early-stage hardware prototyping.',
      roleNote: 'This was collaborative team work. Gabriel reports full-process participation rather than a narrow task assignment, including design review, fabrication-flow execution, PCB prototyping support, evidence gathering and project documentation. Public plan evidence is sanitized so another teammate’s title-block authorship does not appear as if it belonged to Gabriel.',
      skills: ['Arduino Uno','CNC plotter','G-code','Proteus 8 Professional','Autodesk Fusion 360','NEMA 17','SG90','3D printing','Laser cutting','ShopBot','PCB prototyping','Manufacturing economics'],
      highlights: [
        'Integrated a five-stage manufacturing flow: digital design, automated PCB tracing, supervised chemical etching, support-part fabrication and verification.',
        'Used an Arduino Uno-controlled CNC plotter with NEMA 17 stepper motors on X/Y and an SG90 servomotor on Z to trace PCB patterns onto copper-clad board using a permanent Sharpie marker.',
        'Designed PCB geometry in Proteus 8 Professional and used Autodesk Fusion 360 / CAD-CAM tooling for structural, enclosure and base components.',
        'Integrated PETG 3D printing, laser cutting / engraving and CNC/ShopBot machining to manufacture structural parts, enclosure support, cable-management elements and the work base.',
        'Produced a functional PCB prototype with visible and defined traces after the supervised etching process.',
        'Documented an estimated 15–20 minute basic-PCB fabrication time, HNL 4,869.27 total prototype budget, 61.2% pilot OEE and an estimated break-even of about 18 PCBs under the project assumptions.'
      ],
      architecture: [
        'Proteus 8 Professional / Fusion 360 → STL + G-code outputs → Arduino-based CNC plotter',
        'Sharpie tracing on copper-clad board → supervised chemical etching → PCB with visible traces',
        'PETG 3D print / laser / ShopBot support path → structural and enclosure components → integrated prototype cell'
      ],
      result: 'The team built a functional CNC plotter and produced a basic PCB on copper-clad board. The paper reports visible and defined traces after etching, with an estimated 15–20 minute fabrication time. The result is intentionally positioned as a successful university-scale prototype; trace uniformity, cleanliness and repeatability still have room to improve.',
      professionalValue: 'This project demonstrates systems-level mechatronics work across CAD/CAM, machine motion, electronics prototyping, materials processing, manufacturing economics and validation. It is especially useful evidence for automation, digital manufacturing and cyber-physical systems roles.',
      topology: 'portfolio/assets/pcb-cell-topology.svg',
      source: 'portfolio/projects/rapid-pcb-cell.md',
      mediaKey: 'rapid-pcb-cell',
      media: [
        {key:'fusion3', caption:'Fusion 360 architecture / CAD evidence from the project paper.'},
        {key:'machine3', caption:'Physical CNC plotter prototype with work surface and marker tooling.'},
        {key:'pcb3', caption:'Final PCB result after the supervised etching stage.'}
      ]
    }
  ],
  backlog: [
    {title:'IoT Irrigation + Power Electronics',area:'IoT / Cyber-Physical',status:'Documentation queued'},
    {title:'Mini Robotic Arm',area:'Embedded / Robotics',status:'Documentation queued'},
    {title:'Bottling System Redesign',area:'Industrial Automation',status:'Active university work'},
    {title:'Schneider Modbus Industrial Lab',area:'OT / Industrial Networking',status:'Active / evolving'}
  ]
};
