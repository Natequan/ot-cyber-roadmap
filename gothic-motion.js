(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('page-ready');

  // Cursor-following ambient glow for both mouse and pen; no custom cursor on touch.
  addEventListener('pointermove', e => {
    document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
    document.documentElement.style.setProperty('--my', `${e.clientY}px`);
  }, {passive:true});

  if (matchMedia('(pointer:fine)').matches && !reduce) {
    const ring = document.createElement('div');
    const dot = document.createElement('div');
    ring.className = 'nocturne-cursor';
    dot.className = 'nocturne-cursor-dot';
    document.body.append(ring, dot);
    document.body.classList.add('custom-cursor');

    let tx = innerWidth/2, ty = innerHeight/2, x = tx, y = ty;
    addEventListener('mousemove', e => { tx=e.clientX; ty=e.clientY; dot.style.left=`${tx}px`; dot.style.top=`${ty}px`; }, {passive:true});
    const tick = () => { x += (tx-x)*.18; y += (ty-y)*.18; ring.style.left=`${x}px`; ring.style.top=`${y}px`; requestAnimationFrame(tick); };
    tick();

    const hot = 'a,button,input,textarea,select,label,[role="button"],summary,.project-shot,.case-card,.experience-card';
    addEventListener('mouseover', e => ring.classList.toggle('is-hot', !!e.target.closest(hot)));
    addEventListener('mouseout', e => { if (!e.relatedTarget?.closest?.(hot)) ring.classList.remove('is-hot'); });
    addEventListener('mousedown', e => {
      const r=document.createElement('span'); r.className='cursor-ripple'; r.style.left=`${e.clientX-5}px`; r.style.top=`${e.clientY-5}px`; document.body.appendChild(r); setTimeout(()=>r.remove(),600);
    });
  }

  // Animate SPA views each time Nocturne changes section.
  document.querySelectorAll('.view').forEach(view => {
    new MutationObserver(() => {
      if (view.classList.contains('active')) {
        view.classList.remove('gothic-enter');
        void view.offsetWidth;
        view.classList.add('gothic-enter');
      }
    }).observe(view,{attributes:true,attributeFilter:['class']});
  });

  // Soft spotlight that follows the pointer inside recruiter-facing project cards.
  document.querySelectorAll('.case-card,.experience-card,.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r=card.getBoundingClientRect();
      card.style.setProperty('--card-x',`${e.clientX-r.left}px`);
      card.style.setProperty('--card-y',`${e.clientY-r.top}px`);
    }, {passive:true});
  });

  // Same-origin page transition between Nocturne and the portfolio.
  if (!reduce) addEventListener('click', e => {
    const a=e.target.closest('a[href]');
    if(!a || a.target==='_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url=new URL(a.href,location.href);
    if(url.origin!==location.origin || url.pathname===location.pathname && url.hash) return;
    if(url.protocol!=='http:' && url.protocol!=='https:') return;
    e.preventDefault();
    document.body.classList.add('page-leave');
    setTimeout(()=>location.href=url.href,240);
  });
})();
