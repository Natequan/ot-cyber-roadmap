(() => {
  const TOPIC = 'Wireshark basics';

  function applyWeek2Walkthrough(){
    const study = document.querySelector('#study');
    if(!study || !study.classList.contains('active')) return;
    const topic = study.querySelector('.study-intro h2')?.textContent.trim();
    if(topic !== TOPIC) return;

    const steps = [...study.querySelectorAll('.course-step')];
    const first = steps[0];
    if(!first || first.querySelector('.week2-walkthrough')) return;
    const body = first.querySelector('.course-step-body');
    if(!body) return;

    const panel = document.createElement('section');
    panel.className = 'week2-walkthrough';
    panel.innerHTML = `
      <div class="wk2-kicker">Beginner walkthrough · what I actually want you to do</div>
      <h4>Do not enroll in a course. Do this small exercise instead.</h4>
      <p>The old “Wireshark Learning Center” button was too vague. For this step, your goal is only to understand four packet types well enough to recognize them in a capture: ICMP, DNS, ARP and TCP.</p>
      <div class="week2-tasklist">
        <div class="week2-task"><div class="n">01</div><div><strong>Watch one short guided tutorial</strong><p>Open the beginner video below. Focus on: starting a capture, the packet-list/details panes, ARP, DNS, ICMP, and the TCP handshake. You do <em>not</em> need to copy the FTP section or watch extra courses.</p></div></div>
        <div class="week2-task"><div class="n">02</div><div><strong>Write only four notes</strong><p><b>ICMP:</b> request/reply traffic used for reachability/diagnostics. <b>DNS:</b> a client asks a resolver for information about a hostname. <b>ARP:</b> a device resolves a local IPv4 address to a MAC address. <b>TCP:</b> connection-oriented transport; recognize SYN → SYN/ACK → ACK.</p></div></div>
        <div class="week2-task"><div class="n">03</div><div><strong>Open Wireshark and find each protocol</strong><p>You can use your existing capture or make a new one. In the display-filter bar, try <span class="week2-code">icmp</span>, <span class="week2-code">dns</span>, <span class="week2-code">arp</span>, and <span class="week2-code">tcp</span>. Click one packet for each and look at Source, Destination, Protocol and Info.</p></div></div>
        <div class="week2-task"><div class="n">04</div><div><strong>Explain what you saw in your own words</strong><p>For each protocol, say one sentence: “this packet came from ___, went to ___, and it was doing ___.” Do not memorize headers yet. We are building recognition first.</p></div></div>
      </div>
      <div class="week2-links">
        <a href="https://www.youtube.com/watch?v=2SYknklVHqU" target="_blank" rel="noopener">▶ Beginner Wireshark tutorial · ARP/DNS/ICMP/TCP ↗</a>
        <a href="https://www.wireshark.org/docs/wsug_html/#ChWorkDisplayFilterSection" target="_blank" rel="noopener">Official: display filters ↗</a>
        <a href="https://www.wireshark.org/docs/man-pages/wireshark-filter.html" target="_blank" rel="noopener">Official filter reference ↗</a>
      </div>
      <div class="week2-pass"><strong>What counts as PASS</strong><p>You can open a capture, filter <span class="week2-code">icmp</span>, <span class="week2-code">dns</span>, <span class="week2-code">arp</span> and <span class="week2-code">tcp</span>, and give me a simple 30–60 second explanation of what each protocol is doing. A screenshot of the four filters or a tiny note is enough evidence for this first stage.</p></div>
    `;
    body.prepend(panel);

    const genericLinks = body.querySelector('.course-resource-row');
    if(genericLinks){
      const label = document.createElement('p');
      label.className = 'muted';
      label.style.cssText = 'font-size:13px;margin:10px 0 6px';
      label.textContent = 'The Wireshark Learning Center below is optional reference material. You do not need to enroll in anything for this step.';
      genericLinks.before(label);
    }
  }

  document.addEventListener('click', e => {
    if(e.target.closest('[data-view="study"], #continueLesson')) setTimeout(applyWeek2Walkthrough, 60);
  });
  document.addEventListener('change', e => {
    if(e.target.matches('.course-check input[type="checkbox"]')) setTimeout(applyWeek2Walkthrough, 40);
  });
  window.addEventListener('load', () => setTimeout(applyWeek2Walkthrough, 180));
})();
