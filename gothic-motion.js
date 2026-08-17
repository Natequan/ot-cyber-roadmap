(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.remove('custom-cursor');
  document.querySelectorAll('.nocturne-cursor,.nocturne-cursor-dot,.cursor-ripple').forEach(el=>el.remove());
  document.body.classList.add('page-ready');

  // Lightweight SPA section transition only. No pointer-follow loops or cursor replacement.
  document.querySelectorAll('.view').forEach(view => {
    new MutationObserver(() => {
      if (view.classList.contains('active')) {
        view.classList.remove('gothic-enter');
        if(!reduce){ void view.offsetWidth; view.classList.add('gothic-enter'); }
      }
    }).observe(view,{attributes:true,attributeFilter:['class']});
  });

  // Keep a short same-origin page transition between Nocturne and portfolio.
  if (!reduce) addEventListener('click', e => {
    const a=e.target.closest('a[href]');
    if(!a || a.target==='_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url=new URL(a.href,location.href);
    if(url.origin!==location.origin || (url.pathname===location.pathname && url.hash)) return;
    if(url.protocol!=='http:' && url.protocol!=='https:') return;
    e.preventDefault();
    document.body.classList.add('page-leave');
    setTimeout(()=>location.href=url.href,220);
  });
})();
