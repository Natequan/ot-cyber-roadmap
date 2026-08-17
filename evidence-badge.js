(() => {
  const verified = {
    'Read your own network': {
      label: 'Evidence archived · Week 01 Day 02',
      href: 'https://github.com/Natequan/ot-cyber-roadmap/blob/main/progress/week-01/day-02-read-your-own-network.md'
    },
    'See packets in Wireshark': {
      label: 'Evidence archived · Week 01 Day 03',
      href: 'https://github.com/Natequan/ot-cyber-roadmap/blob/main/progress/week-01/day-03-see-packets-in-wireshark.md'
    }
  };

  const apply = () => {
    const study = document.querySelector('#study');
    if (!study || !study.classList.contains('active')) return;
    study.querySelectorAll('.course-step').forEach(step => {
      const title = step.querySelector('h3')?.textContent.trim();
      const item = verified[title];
      if (!item || step.querySelector('.evidence-archive-row')) return;
      const body = step.querySelector('.course-step-body');
      if (!body) return;
      const row = document.createElement('div');
      row.className = 'evidence-archive-row';
      row.innerHTML = `<a class="evidence-archive-chip" href="${item.href}" target="_blank" rel="noopener">${item.label} ↗</a>`;
      body.appendChild(row);
    });
  };

  document.addEventListener('click', event => {
    if (event.target.closest('[data-view="study"], #continueLesson')) setTimeout(apply, 50);
  });
  document.addEventListener('change', event => {
    if (event.target.matches('.course-check input[type="checkbox"]')) setTimeout(apply, 30);
  });
  window.addEventListener('load', () => setTimeout(apply, 150));
})();
