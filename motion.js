(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const clickable = 'button, .accent-btn, .small-btn, .ghost-btn, .filter-chip, .nav-item, .course-resource, .cal-event';

  document.addEventListener('click', (event) => {
    const el = event.target.closest(clickable);
    if (!el) return;

    el.classList.remove('is-tapped');
    void el.offsetWidth;
    el.classList.add('is-tapped');
    window.setTimeout(() => el.classList.remove('is-tapped'), 380);
  });

  document.addEventListener('change', (event) => {
    if (!event.target.matches('input[type="checkbox"]')) return;

    const host = event.target.closest('.course-step, .task, .course-check');
    if (!host) return;

    host.animate(
      [
        { transform: 'scale(1)', filter: 'brightness(1)' },
        { transform: 'scale(1.012)', filter: 'brightness(1.08)' },
        { transform: 'scale(1)', filter: 'brightness(1)' }
      ],
      { duration: 360, easing: 'cubic-bezier(.2,.8,.25,1)' }
    );
  });
})();
