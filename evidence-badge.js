(() => {
  const verified = {
    'Read your own network': {
      label: 'Evidence archived · Week 01 Day 02',
      href: 'https://github.com/Natequan/ot-cyber-roadmap/blob/main/progress/week-01/day-02-read-your-own-network.md'
    },
    'See packets in Wireshark': {
      label: 'Evidence archived · Week 01 Day 03',
      href: 'https://github.com/Natequan/ot-cyber-roadmap/blob/main/progress/week-01/day-03-see-packets-in-wireshark.md'
    },
    'Build a tiny Python tool': {
      label: 'Evidence archived · Week 01 Day 04',
      href: 'https://github.com/Natequan/ot-cyber-roadmap/blob/main/progress/week-01/day-04-build-a-tiny-python-tool.md',
      autoComplete: true
    },
    'Collect the Schneider lab facts': {
      label: 'Evidence archived · Week 01 Day 05',
      href: 'https://github.com/Natequan/ot-cyber-roadmap/blob/main/progress/week-01/day-05-collect-schneider-lab-facts.md',
      autoComplete: true
    },
    'Package the week': {
      label: 'Week 01 packaged · Day 06',
      href: 'https://github.com/Natequan/ot-cyber-roadmap/blob/main/progress/week-01/day-06-package-the-week.md',
      autoComplete: true
    }
  };

  const apply = () => {
    const study = document.querySelector('#study');
    if (!study || !study.classList.contains('active')) return;

    for (const step of study.querySelectorAll('.course-step')) {
      const title = step.querySelector('h3')?.textContent.trim();
      const item = verified[title];
      if (!item) continue;

      const checkbox = step.querySelector('.course-check input[type="checkbox"]');
      if (item.autoComplete && checkbox && !checkbox.checked) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', {bubbles:true}));
        return;
      }

      if (step.querySelector('.evidence-archive-row')) continue;
      const body = step.querySelector('.course-step-body');
      if (!body) continue;
      const row = document.createElement('div');
      row.className = 'evidence-archive-row';
      row.innerHTML = `<a class="evidence-archive-chip" href="${item.href}" target="_blank" rel="noopener">${item.label} ↗</a>`;
      body.appendChild(row);
    }
  };

  document.addEventListener('click', event => {
    if (event.target.closest('[data-view="study"], #continueLesson')) setTimeout(apply, 50);
  });
  document.addEventListener('change', event => {
    if (event.target.matches('.course-check input[type="checkbox"]')) setTimeout(apply, 30);
  });
  window.addEventListener('load', () => setTimeout(apply, 150));
})();
