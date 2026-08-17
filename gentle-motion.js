(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const start = () => {
    requestAnimationFrame(() => document.body.classList.add('nocturne-ready'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();

  document.addEventListener('click', (event) => {
    const nav = event.target.closest('.nav-item[data-view]');
    if (!nav) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const active = document.querySelector('.view.active');
        if (!active) return;
        active.classList.remove('view-pop');
        void active.offsetWidth;
        active.classList.add('view-pop');
        window.setTimeout(() => active.classList.remove('view-pop'), 700);
      });
    });
  });
})();
