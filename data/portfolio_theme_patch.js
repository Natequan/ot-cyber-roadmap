(() => {
  const D = window.PORTFOLIO_DATA;
  if (!D || !Array.isArray(D.caseStudies)) return;

  D.caseStudies.forEach(c => {
    if (c.topology) c.topology = c.topology.split('?')[0] + '?v=blue-final-20260816-2';
  });

  window.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('#stats .stat span');
    if (stats[1]) stats[1].textContent = 'HANDS-ON EXPERIENCES DOCUMENTED';

    const section = document.querySelector('#experience');
    if (section) {
      const eyebrow = section.querySelector('.section-head .eyebrow');
      const title = section.querySelector('.section-head h2');
      const description = section.querySelector('.section-head > p');
      const track = section.querySelectorAll('.experience-track span');

      if (eyebrow) eyebrow.textContent = 'FOUNDATIONAL + SECURITY EXPERIENCE';
      if (title) title.textContent = 'Hands-on networking & security experience';
      if (description) description.textContent = 'Progressive university work from physical media and Cisco networking through DHCP, packet analysis, Node-RED / Siemens S7 integration and controlled ARP-security demonstrations.';

      const labels = ['Layer 1', 'LAN / ARP', 'Routing / DHCP', 'Wireshark / OT security'];
      track.forEach((node, i) => { if (labels[i]) node.textContent = labels[i]; });

      section.querySelectorAll('.experience-link').forEach(link => {
        link.textContent = 'Read technical experience ↗';
      });
    }
  });
})();
