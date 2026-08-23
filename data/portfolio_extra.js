(() => {
  const D = window.PORTFOLIO_DATA;
  if (!D) return;

  const eye = D.caseStudies.find(x => x.id === 'raspberry-pi-eye-tracker');
  if (eye) {
    eye.mediaKey = 'raspberry-pi-eye-tracker';
    eye.media = [
      {key:'eyeHardware', caption:'Physical wearable eye-tracker prototype with glasses-mounted electronics and OLED display.'},
      {key:'eyeDetection', caption:'Live computer-vision debugging view showing the eye / pupil-detection pipeline running during development.'}
    ];
  }

  if (!D.caseStudies.some(x => x.id === 'iot-irrigation-power')) {
    D.caseStudies.push({
      id: 'iot-irrigation-power',
      type: 'University prototype · evidence-backed system description',
      course: 'Power Electronics / IoT Control',
      date: '2026',
      title: 'IoT Irrigation System with Embedded Moisture Control & AC Power Stage',
      short: 'Integrated soil-moisture sensing, embedded control, remote IoT monitoring and an optically isolated TRIAC power stage to regulate irrigation demand.',
      roleNote: 'Current evidence includes a physical breadboard prototype photo, Proteus design files, a routed-layout export and Gabriel’s technical description. The individual/team task split has not yet been documented, so this entry does not claim exclusive authorship. One supplied bench photo visibly uses an Arduino Uno; because Gabriel describes the intended/final controller as ESP32 and the Proteus project includes an ESP32-S3 model, that image is presented as bench-prototype evidence rather than proof of the final controller hardware.',
      skills: ['ESP32-S3','IoT','Capacitive moisture sensing','MOC3021','BTA12-600B','TRIAC control','Proteus','Power electronics','Embedded control','Cyber-physical systems'],
      highlights: [
        'Used a capacitive soil-moisture sensor as the main process variable for irrigation demand.',
        'Implemented embedded control logic intended around an ESP32-class controller, with the supplied Proteus project containing an ESP32-S3-DEVKITC-1 simulation model.',
        'Designed an isolated AC load-control stage in Proteus using a MOC3021 optotriac driver and BTA12-600B TRIAC.',
        'Configured the system so pump output could be reduced or increased rather than behaving only as a fixed on/off actuator.',
        'Added an IoT-facing interface concept for viewing process variables and adjusting control values from a phone or tablet in real time.',
        'Produced physical breadboard evidence plus a routed PCB/layout export from the Proteus workflow.'
      ],
      architecture: [
        'Capacitive soil-moisture sensor → ESP32-S3 control logic → irrigation demand / command',
        'ESP32-S3 control output → isolated MOC3021 gate-drive stage → BTA12-600B TRIAC → AC pump / sprinkler flow',
        'Phone or tablet ↔ Wi-Fi / IoT interface ↔ controller variables and remote setpoints'
      ],
      result: 'The available evidence supports a functional university-scale irrigation prototype combining sensing, embedded control, remote monitoring and power electronics. The exact variable-pump modulation method is not documented in the submitted files, so the portfolio does not label it as phase-angle control, PWM or another specific strategy until the firmware or final schematic is reviewed.',
      professionalValue: 'This is strong cyber-physical-systems evidence because software/networked control directly changes a physical process. It also creates a natural future OT/IoT-security exercise around command authorization, telemetry integrity, safe fallback behavior and loss-of-network handling.',
      topology: 'portfolio/assets/irrigation-topology.svg',
      source: 'portfolio/projects/iot-irrigation-power.md',
      mediaKey: 'iot-irrigation-power',
      media: [
        {key:'irrigationBench', caption:'Physical breadboard / controller bench prototype used during system development.'},
        {key:'irrigationLayout', caption:'Proteus routed PCB/layout export supplied with the project evidence.'}
      ]
    });
  }

  if (Array.isArray(D.experience) && !D.experience.some(x => x.id === 'cyber-iot-workshop-2026-08-21')) {
    D.experience.push({
      id: 'cyber-iot-workshop-2026-08-21',
      index: '04',
      date: '2026-08-21',
      title: 'Wireshark, Node-RED & ARP Security Workshop',
      type: 'University Cybersecurity & IoT Workshop · Guided session',
      short: 'Participated in a university workshop connecting packet inspection, live Node-RED / Siemens S7 PLC integration and a controlled Python-based ARP-poisoning demonstration.',
      skills: ['Wireshark','Node-RED','Siemens S7','ISO-on-TCP','ARP','Python','OT / IoT security'],
      bullets: [
        'Used Wireshark in a guided lab context to inspect network traffic and connect packet-level behavior to ARP and local-network fundamentals.',
        'Configured Node-RED with node-red-contrib-s7 for PLC bit M0.0 over ISO-on-TCP and successfully tested the live PLC connection during an instructor-guided exercise; the supplied screenshot captures a separate transport-timeout state encountered during setup/troubleshooting.',
        'Observed a controlled Python-based ARP-poisoning demonstration in an authorized classroom environment and connected the behavior to man-in-the-middle risk and defensive packet analysis.'
      ],
      source: 'portfolio/experience/cybersecurity-iot-workshop-2026-08-21.md'
    });
  }

  D.backlog = D.backlog.filter(p => p.title !== 'IoT Irrigation + Power Electronics');
})();
