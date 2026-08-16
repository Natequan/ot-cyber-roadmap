(() => {
  const guides = {
    'Set up your tools': {
      intro: 'Do these one at a time. You are not expected to know what the programs look like yet. The goal is simply to open each tool and prove that it is ready.',
      groups: [
        {
          title: 'A · Check Python',
          steps: [
            'Press the Windows key on your keyboard, type “Command Prompt”, and open the black Command Prompt window.',
            'Click inside the black window, type: python --version',
            'Press Enter.',
            'If you see something like “Python 3.x.x”, Python is installed. You do not need to understand Python yet.',
            'If Windows says Python was not found, use the setup guide below, install Python, close Command Prompt, open it again, and repeat python --version.'
          ],
          expect: 'A black Command Prompt window showing a line similar to “Python 3.x.x”.',
          links: [
            ['Official Windows Python setup', 'https://learn.microsoft.com/windows/python/'],
            ['Video: Setting Up Python on Windows', 'https://realpython.com/videos/python-windows-setup/']
          ]
        },
        {
          title: 'B · Open VS Code and install the Python extension',
          steps: [
            'Press the Windows key, type “Visual Studio Code”, and open it.',
            'If it is not installed, use the official VS Code Python tutorial link below and install Visual Studio Code first.',
            'In VS Code, look at the vertical icons on the far-left side. Click the Extensions icon. It looks like four small blocks, or press Ctrl + Shift + X.',
            'In the Extensions search box, type “Python”.',
            'Choose the extension named “Python” published by Microsoft and click Install.',
            'You can close the Extensions panel afterward. That is enough for Week 1.'
          ],
          expect: 'VS Code opens normally, and the Microsoft Python extension shows “Installed”.',
          links: [
            ['Official: Getting Started with Python in VS Code', 'https://code.visualstudio.com/docs/python/python-tutorial']
          ]
        },
        {
          title: 'C · Check Git',
          steps: [
            'Open Command Prompt again: Windows key → type “Command Prompt” → Enter.',
            'Type: git --version',
            'Press Enter.',
            'If you see something like “git version 2.x.x”, Git is ready.',
            'If “git” is not recognized, follow the GitHub installation guide below. After installing, close and reopen Command Prompt and repeat the command.'
          ],
          expect: 'Command Prompt prints a Git version number instead of an error.',
          links: [
            ['Official GitHub guide: Install Git', 'https://github.com/git-guides/install-git']
          ]
        },
        {
          title: 'D · Open Wireshark and identify your network interface',
          steps: [
            'Press the Windows key, type “Wireshark”, and click the Wireshark application.',
            'Do NOT worry about all the buttons. On the first screen, look for the section called “Capture”. Under it you should see names such as Wi-Fi, Ethernet, Bluetooth, VPN adapters, or similar.',
            'An “interface” is simply a network connection your computer can use. Wi-Fi means your wireless adapter; Ethernet means a network cable adapter.',
            'If you are currently connected through Wi-Fi, look for the Wi-Fi entry. If you are connected with a cable, look for Ethernet.',
            'Look at the tiny moving graph beside the interface name. The active interface usually has little spikes because traffic is passing through it.',
            'Move your mouse over the interface name. Wireshark can show the IP addresses associated with that interface. Later you can compare this with the IPv4 address from ipconfig.',
            'For THIS setup check, you do not need to capture anything yet. You pass when Wireshark opens and you can point at the interface you would use.'
          ],
          expect: 'The Wireshark welcome screen shows at least one usable interface such as Wi-Fi or Ethernet. You can say “this is the connection my laptop is using.”',
          stuck: 'If the interface list is empty, close Wireshark and run the Wireshark installer again. On Windows, packet capture normally relies on Npcap. Also try opening Wireshark as Administrator once to rule out a permissions problem.',
          links: [
            ['Official Wireshark: First Capture / Getting Started', 'https://www.wireshark.org/learn'],
            ['Official: What the interface list means', 'https://www.wireshark.org/docs/wsug_html_chunked/ChCapInterfaceSection.html'],
            ['Video: Jeremy’s IT Lab Wireshark Demo', 'https://www.youtube.com/watch?v=pJKFahkqMU8']
          ]
        },
        {
          title: 'E · Open Cisco Packet Tracer',
          steps: [
            'Press the Windows key, type “Packet Tracer”, and open Cisco Packet Tracer.',
            'If it is not installed, use the Cisco download page below.',
            'If Packet Tracer asks you to sign in, use the Cisco/Networking Academy account you used to access the download.',
            'Wait until you see the large blank workspace. At the bottom-left you should see categories for network devices/end devices.',
            'You do NOT need to build a network yet. For today, simply confirm that the program opens and the workspace is visible.'
          ],
          expect: 'Packet Tracer opens to its main workspace without an installation error.',
          links: [
            ['Cisco Packet Tracer download / course page', 'https://www.netacad.com/courses/packet-tracer'],
            ['WATCH THIS: Jeremy’s Packet Tracer Introduction (15 min)', 'https://www.youtube.com/watch?v=a1Im6GYaSno']
          ]
        }
      ]
    },
    'Read your own network': {
      intro: 'Here you are not “configuring a network”. You are only asking Windows to show you information about the network your laptop is already using.',
      groups: [
        {
          title: 'A · Open Command Prompt',
          steps: [
            'Press the Windows key.',
            'Type “Command Prompt”.',
            'Open the black Command Prompt window. Keep it open for this entire step.'
          ],
          expect: 'A black terminal window with a blinking cursor.'
        },
        {
          title: 'B · Find your IP, gateway, DNS and MAC',
          steps: [
            'Type: ipconfig /all',
            'Press Enter. A lot of text will appear. That is normal.',
            'Scroll until you find the adapter you are actually using: usually “Wireless LAN adapter Wi-Fi” if you are wireless, or “Ethernet adapter Ethernet” if you are wired.',
            'Inside that adapter, find and write down: IPv4 Address, Subnet Mask, Default Gateway, DNS Servers, and Physical Address.',
            'Physical Address is the MAC address. Do not worry about memorizing the values; just learn how to locate them.'
          ],
          expect: 'You can point to five labeled values: IPv4, Subnet Mask, Default Gateway, DNS Server(s), and Physical Address.'
        },
        {
          title: 'C · Look at the ARP table',
          steps: [
            'Type: arp -a',
            'Press Enter.',
            'You will see a table with Internet Address, Physical Address and Type.',
            'Find your Default Gateway IP from the previous step inside this table if it appears.',
            'For now, understand only this: ARP helps your computer associate a local IPv4 address with a MAC address.'
          ],
          expect: 'A small table of local IP addresses and physical/MAC addresses.'
        },
        {
          title: 'D · Test connectivity and see the path',
          steps: [
            'Type: ping 8.8.8.8',
            'Press Enter. Wait for four replies.',
            'If you see “Reply from 8.8.8.8”, your laptop can reach that destination.',
            'Now type: tracert 8.8.8.8',
            'Press Enter and wait. Each numbered line is one hop along the route. Some hops may show * * *; that does not automatically mean the test failed.'
          ],
          expect: 'ping shows replies, and tracert shows a numbered path with one or more hops.',
          links: [
            ['Jeremy’s IT Lab free CCNA course', 'https://courses.jeremysitlab.com/p/ccna']
          ]
        }
      ]
    },
    'See packets in Wireshark': {
      intro: 'This is your first actual packet capture. You are going to create traffic yourself, then make Wireshark show only that traffic.',
      groups: [
        {
          title: 'A · Start a capture on the correct interface',
          steps: [
            'Open Wireshark: Windows key → type “Wireshark” → Enter.',
            'On the welcome screen, find the active Wi-Fi or Ethernet interface from the previous setup step.',
            'Double-click that interface name.',
            'Rows should immediately begin appearing and scrolling. Each row is a packet.',
            'If almost nothing appears, open a website in your browser to generate some traffic.'
          ],
          expect: 'The large packet list fills with rows containing columns such as Source, Destination, Protocol, Length and Info.',
          links: [
            ['Official Wireshark: Start Capturing', 'https://www.wireshark.org/docs/wsug_html_chunked/ChCapCapturingSection.html'],
            ['WATCH THIS: Jeremy’s Wireshark Demo', 'https://www.youtube.com/watch?v=pJKFahkqMU8']
          ]
        },
        {
          title: 'B · Generate a ping and filter for ICMP',
          steps: [
            'Leave Wireshark capturing.',
            'Open Command Prompt.',
            'Type: ping 8.8.8.8',
            'Return to Wireshark.',
            'Near the top of Wireshark, click the display-filter bar that says something like “Apply a display filter…”.',
            'Type: icmp',
            'Press Enter.',
            'Look in the Info column for “Echo (ping) request” and “Echo (ping) reply”. Click one request, then one reply.'
          ],
          expect: 'After applying the icmp filter, the packet list becomes much shorter and shows ping request/reply packets.'
        },
        {
          title: 'C · Generate DNS traffic and filter for DNS',
          steps: [
            'Clear the icmp filter using the X/clear button beside the filter bar, or select the text and delete it.',
            'In Command Prompt, type: nslookup example.com',
            'Press Enter.',
            'Return to Wireshark and type dns in the display-filter bar.',
            'Press Enter.',
            'Look for a DNS query for example.com and a response. Click them and compare Source and Destination.'
          ],
          expect: 'Wireshark shows DNS packets related to the name lookup. You can point to which machine asked and which server answered.',
          stuck: 'If you do not see DNS packets, make sure the capture is on the same active Wi-Fi/Ethernet interface you used for Internet access, clear the filter, run nslookup again, then reapply dns.'
        },
        {
          title: 'D · Stop and save the capture',
          steps: [
            'Click the red square Stop button near the top-left of Wireshark.',
            'Press Ctrl + Shift + S, or use File → Save As.',
            'Create a folder such as Documents\\Nocturne\\Week-01 if you do not already have one.',
            'Save the file as: week01-first-capture.pcapng'
          ],
          expect: 'You have a .pcapng file you can reopen later and send to me if you want help checking it.'
        }
      ]
    },
    'Build a tiny Python tool': {
      intro: 'You are going to create one small file, type a short program, and run it from VS Code. No software-engineering knowledge is assumed.',
      groups: [
        {
          title: 'A · Create a project folder',
          steps: [
            'Open File Explorer.',
            'Go to Documents and create a folder named Nocturne.',
            'Inside it create another folder named Week-01.',
            'Open VS Code.',
            'Click File → Open Folder, choose Documents\\Nocturne\\Week-01, then click Select Folder.'
          ],
          expect: 'VS Code shows Week-01 in the Explorer panel on the left.'
        },
        {
          title: 'B · Create the Python file',
          steps: [
            'In the VS Code Explorer panel, click the New File icon.',
            'Name the file: device_inventory.py',
            'Paste or type the starter code shown below.',
            'Press Ctrl + S to save.'
          ],
          code: `devices = [\n    {"name": "PLC", "ip": "192.168.1.10"},\n    {"name": "HMI", "ip": "192.168.1.20"}\n]\n\nfor device in devices:\n    print(f"{device['name']} -> {device['ip']}")`,
          expect: 'A file named device_inventory.py appears in the left Explorer panel with no obvious red syntax errors.',
          links: [
            ['Official VS Code Python tutorial', 'https://code.visualstudio.com/docs/python/python-tutorial']
          ]
        },
        {
          title: 'C · Run it',
          steps: [
            'In VS Code click Terminal → New Terminal.',
            'A terminal panel opens at the bottom.',
            'Type: python device_inventory.py',
            'Press Enter.',
            'You should see two lines: PLC -> 192.168.1.10 and HMI -> 192.168.1.20.',
            'Only after this works, continue by adding input() so the user can add another device.'
          ],
          expect: 'The terminal prints the devices and returns to the prompt without a traceback/error.',
          stuck: 'If python is not recognized, go back to Step 1A. If the file is not found, check that the terminal path ends in your Week-01 folder.'
        }
      ]
    },
    'Collect the Schneider lab facts': {
      intro: 'Do not try to memorize the machine. Your job is to collect evidence from the real lab so we can document it correctly later.',
      groups: [
        {
          title: 'A · Photograph the hardware labels',
          steps: [
            'Before changing any wiring, take a clear photo of the Schneider PLC label where the exact model/reference number is readable.',
            'Take a clear photo of the HMI, RS-485 converter, drive, meter, or other device that is communicating with the PLC.',
            'Take one wider photo showing how the devices are connected. Avoid including people or unrelated private information.'
          ],
          expect: 'You have readable model numbers, not guesses such as “a Schneider PLC”.'
        },
        {
          title: 'B · Record the serial communication settings',
          steps: [
            'Open the software/configuration page your class uses for the serial/Modbus link.',
            'Write down the baud rate exactly, for example 9600 or 19200.',
            'Write down parity exactly: None, Even or Odd.',
            'Write down the number of stop bits.',
            'Write down the Modbus slave/server ID (unit address).',
            'Take a screenshot of this settings page if your instructor allows it.'
          ],
          expect: 'You have exact values for baud rate, parity, stop bits and slave ID, all copied from a real configuration screen or manual.'
        },
        {
          title: 'C · Get the register/variable table',
          steps: [
            'Ask your instructor/classmate for the manual or table that lists Modbus variables/registers.',
            'Save the PDF/photo/link instead of trying to copy every row by hand.',
            'If there is no table yet, mark it as MISSING. Do not invent addresses.'
          ],
          expect: 'Either you have the actual register table/manual, or you have clearly written “register table still missing”.',
          links: [
            ['Official Modbus specifications', 'https://www.modbus.org/modbus-specifications']
          ]
        }
      ]
    },
    'Package the week': {
      intro: 'The last step is just organization. You are turning random screenshots and files into evidence that Future You—and a recruiter—can understand.',
      groups: [
        {
          title: 'A · Put the evidence in one place',
          steps: [
            'Open Documents\\Nocturne\\Week-01.',
            'Create folders named screenshots, captures, code and notes.',
            'Put the Wireshark .pcapng in captures.',
            'Put device_inventory.py in code if it is not already there.',
            'Put useful screenshots in screenshots.',
            'Create a simple notes.txt or notes.md and write: what worked, what confused you, and one thing you want me to check.'
          ],
          expect: 'Your Week-01 folder is understandable without hunting around Downloads/Desktop.'
        },
        {
          title: 'B · Generate the report and send it to me',
          steps: [
            'In Nocturne, mark only the tasks you actually verified.',
            'Click Weekly report or Generate report.',
            'Copy the generated report.',
            'Send it to me in ChatGPT together with any screenshots/code you want reviewed.',
            'Say: “Bro, sync Week 1.” I will handle the GitHub-side organization from there.'
          ],
          expect: 'You have a truthful weekly report plus the actual evidence behind the checkmarks.'
        }
      ]
    }
  };

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function groupHtml(group, index) {
    const links = (group.links || []).map(([label, url]) => `<a class="beginner-link" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`).join('');
    return `<details class="beginner-group" ${index === 0 ? 'open' : ''}>
      <summary><span>${esc(group.title)}</span><span class="beginner-chevron">⌄</span></summary>
      <div class="beginner-group-body">
        <ol>${group.steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol>
        ${group.code ? `<div class="beginner-code-wrap"><div class="beginner-label">TYPE THIS</div><pre class="beginner-code"><code>${esc(group.code)}</code></pre></div>` : ''}
        <div class="beginner-expect"><strong>✓ What you should see</strong><p>${esc(group.expect)}</p></div>
        ${group.stuck ? `<div class="beginner-stuck"><strong>Having trouble?</strong><p>${esc(group.stuck)}</p></div>` : ''}
        ${links ? `<div class="beginner-links"><div class="beginner-label">GUIDES / VIDEOS</div>${links}</div>` : ''}
      </div>
    </details>`;
  }

  function enhanceStudy() {
    const study = document.querySelector('#study');
    if (!study || !study.classList.contains('active')) return;

    const intro = study.querySelector('.study-intro');
    if (intro && !intro.querySelector('.beginner-mode-note')) {
      const note = document.createElement('div');
      note.className = 'beginner-mode-note';
      note.innerHTML = '<strong>Beginner mode is ON.</strong><span>Every current step now explains where to click, what you should see, and what to try if it does not work.</span>';
      intro.appendChild(note);
    }

    study.querySelectorAll('.course-step').forEach(step => {
      if (step.querySelector('.beginner-walkthrough')) return;
      const title = step.querySelector('h3')?.textContent.trim();
      const guide = guides[title];
      if (!guide) return;

      const body = step.querySelector('.course-step-body');
      if (!body) return;

      const box = document.createElement('section');
      box.className = 'beginner-walkthrough';
      box.innerHTML = `<div class="beginner-title-row"><div><div class="beginner-label">COMPLETE BEGINNER WALKTHROUGH</div><h4>Do this click by click</h4></div><span class="beginner-badge">START HERE</span></div><p class="beginner-intro">${esc(guide.intro)}</p>${guide.groups.map(groupHtml).join('')}`;
      body.insertBefore(box, body.firstChild);
    });
  }

  let scheduled = false;
  const scheduleEnhance = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      enhanceStudy();
    });
  };

  document.addEventListener('click', event => {
    if (event.target.closest('[data-view="study"], #continueLesson')) setTimeout(scheduleEnhance, 20);
  });

  const observer = new MutationObserver(scheduleEnhance);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', () => setTimeout(scheduleEnhance, 100));
})();
