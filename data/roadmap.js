const start = new Date('2026-08-15T12:00:00');
const day = 86400000;
const phaseDefs = [
  {id:'foundation',name:'Networking + Python Foundations',weeks:16,goal:'Understand packets, switching/routing, Python fundamentals and build small engineering scripts.',track:'Networking / Python'},
  {id:'linux-security',name:'Linux + Security Fundamentals',weeks:12,goal:'Become comfortable in Linux and learn defensive security concepts through guided labs.',track:'Linux / Cybersecurity'},
  {id:'ccna',name:'CCNA Build + Labs',weeks:16,goal:'Complete CCNA-level networking labs, troubleshooting and exam preparation.',track:'Networking / CCNA'},
  {id:'ot',name:'OT / ICS Security',weeks:20,goal:'Apply networking and security to PLCs, Modbus, industrial architectures and monitoring.',track:'OT / ICS Security'},
  {id:'portfolio',name:'Portfolio + International Job Launch',weeks:15,goal:'Polish flagship projects, CV, GitHub, interview readiness and international applications.',track:'Career / Portfolio'}
];
const resources = [
  {id:'cisco-skills',track:'Networking',kind:'Official',priority:'Core',title:'Cisco Networking Academy / Skills for All',description:'Use for networking fundamentals, Packet Tracer and structured Cisco practice.',url:'https://www.netacad.com/'},
  {id:'jeremy-ccna',track:'Networking',kind:'Video',priority:'Core',title:"Jeremy's IT Lab — Free CCNA 200-301",description:'Detailed lecture + lab sequence. Pair each video with Packet Tracer practice.',url:'https://www.youtube.com/@JeremysITLab'},
  {id:'packet-tracer',track:'Networking',kind:'Tool',priority:'Core',title:'Cisco Packet Tracer',description:'Build and troubleshoot networks without physical Cisco hardware.',url:'https://www.netacad.com/courses/packet-tracer'},
  {id:'wireshark-learn',track:'Networking',kind:'Official',priority:'Core',title:'Wireshark Learning Center',description:'Capture, filter and inspect network traffic. Start with ICMP, DNS, TCP and ARP.',url:'https://www.wireshark.org/learn'},
  {id:'python-docs',track:'Python',kind:'Official',priority:'Core',title:'Python Documentation',description:'Reference for Python syntax, standard library and networking modules.',url:'https://docs.python.org/3/'},
  {id:'python-fcc',track:'Python',kind:'Video',priority:'Recommended',title:'freeCodeCamp Python Courses',description:'Use a beginner Python course, but always finish by building a small engineering script.',url:'https://www.youtube.com/@freecodecamp/search?query=python%20beginner'},
  {id:'git-book',track:'GitHub',kind:'Official',priority:'Core',title:'Git & GitHub Docs',description:'Learn commits, branches, README writing, pull requests and GitHub Pages.',url:'https://docs.github.com/en/get-started'},
  {id:'linux-journey',track:'Linux',kind:'Guide',priority:'Core',title:'Linux Journey',description:'Progressive Linux command-line lessons covering filesystem, permissions, processes and networking.',url:'https://linuxjourney.com/'},
  {id:'over-the-wire',track:'Linux',kind:'Lab',priority:'Recommended',title:'OverTheWire Bandit',description:'Safe SSH/Linux practice that reinforces command-line fundamentals.',url:'https://overthewire.org/wargames/bandit/'},
  {id:'tryhackme',track:'Cybersecurity',kind:'Lab',priority:'Core',title:'TryHackMe — Cyber Security 101',description:'Guided labs for networking, Linux, Windows and security fundamentals.',url:'https://tryhackme.com/path/outline/cybersecurity101'},
  {id:'nmap-book',track:'Cybersecurity',kind:'Official',priority:'Recommended',title:'Nmap Reference Guide',description:'Use only on your own lab systems or systems you are explicitly authorized to test.',url:'https://nmap.org/book/man.html'},
  {id:'sans-ics',track:'OT / ICS',kind:'Video / Guide',priority:'Core',title:'SANS ICS Security Resources',description:'ICS/OT security foundations, architecture, defensive concepts and practical talks.',url:'https://www.sans.org/profiles/sans-ics/'},
  {id:'nistor',track:'OT / ICS',kind:'Official',priority:'Core',title:'NIST SP 800-82 Rev. 3 — OT Security',description:'Primary defensive reference for operational technology security architecture and risk.',url:'https://csrc.nist.gov/pubs/sp/800/82/r3/final'},
  {id:'mitre-ics',track:'OT / ICS',kind:'Official',priority:'Core',title:'MITRE ATT&CK for ICS',description:'Map adversary behaviors and defensive opportunities in industrial environments.',url:'https://attack.mitre.org/matrices/ics/'},
  {id:'modbus',track:'OT / ICS',kind:'Official',priority:'Core',title:'Modbus Specifications',description:'Understand Modbus addressing, function codes and data models from the source.',url:'https://www.modbus.org/modbus-specifications'},
  {id:'pymodbus',track:'Python / OT',kind:'Docs',priority:'Core',title:'PyModbus Documentation',description:'Build safe read-only Modbus clients for your isolated Schneider lab.',url:'https://pymodbus.readthedocs.io/'},
  {id:'isa62443',track:'OT / ICS',kind:'Official',priority:'Later',title:'ISA/IEC 62443 Overview',description:'Learn lifecycle, zones/conduits, security levels and industrial cybersecurity governance after foundations.',url:'https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards'},
  {id:'github-pages',track:'GitHub',kind:'Official',priority:'Core',title:'GitHub Pages',description:'Publish the roadmap and project portfolio directly from GitHub.',url:'https://docs.github.com/en/pages'}
];
const projectDefs = [
  {id:'eye-tracker',name:'Raspberry Pi Eye Tracker',status:'Existing — document it',track:'Embedded / Computer Vision',summary:'Turn the Raspberry Pi 5 camera project into a professional embedded/computer-vision case study.',deliverables:['Architecture diagram','Hardware/software list','Data flow','Latency/performance notes','Demo media','English README'],securityUpgrade:['Document network interfaces','Threat model the data flow','Describe privacy/security considerations']},
  {id:'pcb-cnc',name:'PCB Sharpie CNC',status:'Existing — document it',track:'Automation / Manufacturing',summary:'Show motion control, mechanics, electronics and fabrication workflow.',deliverables:['Mechanical/electrical architecture','Control explanation','Accuracy test','Failure modes','English README'],securityUpgrade:['Document controller interfaces','Separate safety vs cybersecurity risks','Version configs']},
  {id:'irrigation',name:'IoT Irrigation + Power Electronics',status:'Existing — security V2 candidate',track:'IoT / Cyber-Physical',summary:'Refactor the irrigation project into a cyber-physical case study.',deliverables:['System diagram','Sensor/control logic','Power stage','IoT data flow','Fail-safe behavior'],securityUpgrade:['Authentication review','Network threat model','Sensor spoofing discussion','Safe-state behavior']},
  {id:'robot-arm',name:'Mini Robotic Arm',status:'Existing — networking V2 candidate',track:'Robotics / Embedded',summary:'Document servo/potentiometer control and later add a networked command layer.',deliverables:['Control overview','ATmega/Arduino logic','Wiring diagram','Demo','README'],securityUpgrade:['Networked controller V2','Command validation','Unsafe-state mitigations']},
  {id:'bottling',name:'Bottling System Redesign',status:'Active university project',track:'Industrial Automation',summary:'Use the class redesign as the flagship automation case study.',deliverables:['Process sequence','I/O list','Control architecture','HMI/comms diagram','Failure handling','Final report'],securityUpgrade:['OT network diagram','Zones/conduits','Critical commands/data','Monitoring and segmentation']},
  {id:'modbus',name:'Schneider Modbus Industrial Lab',status:'Start now',track:'OT / ICS Security',summary:'Bridge project from mechatronics to OT security using PLC/HMI/RS-485 plus Python monitoring.',deliverables:['Exact hardware models','RS-485 topology','Serial settings','Register table','Python client','Evidence/logs','English README'],securityUpgrade:['Threat model','Read-only monitoring','Hardening notes','MITRE ATT&CK mapping','NIST 800-82 recommendations']}
];
const weeklyTemplates = {
  foundation:[
    ['Network fundamentals','IP, subnet mask, gateway, MAC, ARP, switch, router, TCP/UDP and ports',['cisco-skills','jeremy-ccna','wireshark-learn'],'Create a one-page network cheat sheet + Wireshark ICMP capture.'],
    ['Wireshark basics','Capture ICMP, DNS, ARP and TCP traffic and explain what you see',['wireshark-learn'],'Save a .pcapng and a short explanation.'],
    ['Python fundamentals','Variables, loops, functions, lists, dictionaries and files',['python-docs','python-fcc'],'Build a device inventory CLI.'],
    ['Git + GitHub','Clone, commit, push, branches and README structure',['git-book','github-pages'],'Create/update one project README in English.'],
    ['IPv4 + subnetting','CIDR, network/broadcast, usable ranges and subnet practice',['jeremy-ccna','cisco-skills'],'Solve 20 subnetting problems.'],
    ['Switching','Ethernet frames, MAC table, VLAN concepts and Packet Tracer',['jeremy-ccna','packet-tracer'],'Build a two-switch VLAN lab.'],
    ['Routing','Default gateway, static routes and packet path reasoning',['jeremy-ccna','packet-tracer'],'Build and verify a routed topology.'],
    ['Python networking','Sockets, requests, ping/port checks and error handling',['python-docs'],'Build a small network-status script.']
  ],
  'linux-security':[
    ['Linux CLI','Filesystem, permissions, users, processes, services and logs',['linux-journey','over-the-wire'],'Complete a Linux command cheat sheet and 5 Bandit levels.'],
    ['Linux networking','ip, ss, ssh, curl, tcpdump, DNS and routing',['linux-journey','wireshark-learn'],'Document a Linux network troubleshooting flow.'],
    ['Security fundamentals','CIA, authentication, authorization, hashing, encryption and risk',['tryhackme'],'Complete guided fundamentals rooms and notes.'],
    ['Recon & scanning in lab','Nmap concepts, service identification and authorization boundaries',['tryhackme','nmap-book'],'Scan only your own lab VM and document findings.'],
    ['Windows fundamentals','Users, services, logs, networking and basic Active Directory concepts',['tryhackme'],'Create Windows/AD fundamentals notes.'],
    ['Defensive mindset','Logging, detection, hardening, least privilege and segmentation',['tryhackme'],'Harden one lab VM and document changes.']
  ],
  ccna:[
    ['CCNA switching lab','VLANs, trunks, STP and EtherChannel',['jeremy-ccna','packet-tracer'],'Complete a graded Packet Tracer switching lab.'],
    ['CCNA routing lab','Static routing, OSPF fundamentals and troubleshooting',['jeremy-ccna','packet-tracer'],'Build a multi-router topology.'],
    ['Network services','DHCP, DNS, NAT, NTP, SNMP and QoS concepts',['jeremy-ccna'],'Create service flow diagrams.'],
    ['Security + ACLs','ACLs, device hardening, port security and secure management',['jeremy-ccna','packet-tracer'],'Build an ACL lab and explain allowed/blocked traffic.'],
    ['Automation concepts','APIs, JSON, controller-based networking and Python review',['jeremy-ccna','python-docs'],'Write a Python script that parses JSON network data.'],
    ['CCNA review','Mixed labs, weak-area review and timed practice',['jeremy-ccna','cisco-skills'],'Complete a timed review and gap list.']
  ],
  ot:[
    ['OT architecture','PLC, HMI, SCADA, engineering workstation, historian, safety and Purdue-style segmentation',['sans-ics','nistor'],'Draw an OT architecture and data-flow diagram.'],
    ['Modbus fundamentals','RTU/TCP, client/server, function codes, coils and registers',['modbus','pymodbus'],'Create a Modbus register-map cheat sheet.'],
    ['Schneider lab inventory','Collect exact models, RS-485 wiring, serial settings and register table',['modbus'],'Commit verified lab inventory to project docs.'],
    ['Python + Modbus','Build a read-only PyModbus client with logging and error handling',['pymodbus','python-docs'],'Read approved lab registers and save evidence.'],
    ['OT packet analysis','Capture/inspect Modbus TCP or related lab traffic when available',['wireshark-learn','nistor'],'Create a protocol analysis note.'],
    ['Threat modeling OT','Assets, trust boundaries, hazards, attack paths and safe states',['nistor','mitre-ics'],'Threat model the Schneider/bottling lab.'],
    ['MITRE ATT&CK for ICS','Learn tactic/technique structure and map a few relevant behaviors',['mitre-ics'],'Create a defensible ATT&CK mapping with mitigations.'],
    ['IEC 62443 concepts','Zones, conduits, lifecycle and security requirements',['isa62443'],'Apply zones/conduits to your bottling architecture.'],
    ['OT monitoring','Logging, baselining, passive monitoring and anomaly concepts',['sans-ics','nistor'],'Define a passive monitoring plan.'],
    ['OT hardening','Segmentation, accounts, backups, patch strategy and remote access',['nistor','sans-ics'],'Create a hardening checklist for the lab.']
  ],
  portfolio:[
    ['Flagship README','Turn the Schneider lab into a recruiter-ready English README',['git-book'],'Publish architecture, evidence, results and limitations.'],
    ['Bottling portfolio','Document process, automation architecture and OT-security extension',['nistor'],'Publish bottling-system case study.'],
    ['Embedded portfolio','Polish eye tracker / robotic arm documentation',['git-book'],'Publish one embedded project with a demo.'],
    ['Career assets','CV, LinkedIn, GitHub profile and concise project stories',['git-book'],'Create a one-page technical CV and pinned repos.'],
    ['Interview prep','Networking, Python, Linux, automation and security explanations',['jeremy-ccna','python-docs'],'Record answers to 10 technical interview questions.'],
    ['International applications','Target OT, product, embedded and automation-security roles',['github-pages'],'Track 10 targeted applications and lessons learned.']
  ]
};
let weeks=[]; let offset=0; let number=1;
for(const p of phaseDefs){
  const templates=weeklyTemplates[p.id];
  for(let i=0;i<p.weeks;i++){
    const t=templates[i%templates.length];
    const ws=new Date(start.getTime()+offset*7*day); const we=new Date(ws.getTime()+6*day);
    const iso=d=>d.toISOString().slice(0,10);
    weeks.push({number,phase:p.id,phaseName:p.name,track:p.track,start:iso(ws),end:iso(we),topic:t[0],targetHours:i%4===3?5:7,steps:[
      {id:`w${number}-learn`,text:`Learn: ${t[1]}`,hours:2},
      {id:`w${number}-lab`,text:`Hands-on: complete a focused lab or exercise for ${t[0]}.`,hours:2.5},
      {id:`w${number}-notes`,text:'Document what worked, what failed, commands/configs used and one question for review.',hours:1},
      {id:`w${number}-publish`,text:'Create evidence: GitHub commit, diagram, capture, script or report.',hours:1.5}
    ],resources:t[2],deliverable:t[3],coachPrompt:`Coach me through Week ${number}: ${t[0]}. Quiz me briefly, then give me the smallest useful lab and review my evidence.`});
    offset++; number++;
  }
}
let cursor=0;
const phases=phaseDefs.map(p=>{const first=weeks[cursor],last=weeks[cursor+p.weeks-1];cursor+=p.weeks;return {...p,start:first.start,end:last.end};});
window.ROADMAP_DATA={profile:{githubUser:'Natequan',githubRepo:'ot-cyber-roadmap',positioning:'Mechatronics → Industrial Automation → OT / Embedded Security',weeklyCapacity:'5–10 focused hours / week',graduationWindow:'early 2028',target:'$200K+ long-term TC'},phases,weeks,resources,projects:projectDefs};
