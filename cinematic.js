(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function installDrawer(){
    const oldBtn=document.getElementById('mobileMenu');
    if(!oldBtn) return;

    // Clone to remove old menu listeners and own the drawer interaction cleanly.
    const btn=oldBtn.cloneNode(true);
    oldBtn.replaceWith(btn);
    btn.innerHTML='<span class="menu-orb" aria-hidden="true"></span><span>Menu</span>';
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-controls','sidebar');

    let scrim=document.querySelector('.drawer-scrim');
    if(!scrim){
      scrim=document.createElement('div');
      scrim.className='drawer-scrim';
      scrim.setAttribute('aria-hidden','true');
      document.body.appendChild(scrim);
    }

    const close=()=>{
      document.body.classList.remove('nav-open');
      btn.setAttribute('aria-expanded','false');
    };
    const toggle=()=>{
      const open=document.body.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded',String(open));
    };

    btn.addEventListener('click',toggle);
    scrim.addEventListener('click',close);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
    document.querySelectorAll('#sidebar .nav-item').forEach(item=>item.addEventListener('click',()=>setTimeout(close,40)));
  }

  function heroMarkup(){
    return `
      <section class="cinematic-hero" aria-label="Nocturne introduction">
        <div class="cinematic-orb-wrap" aria-hidden="true">
          <div class="orbit-line"></div><div class="orbit-line two"></div><div class="cinematic-orb"></div>
        </div>
        <div class="cinematic-copy">
          <span class="cinematic-kicker">Mechatronics · Automation · Embedded · OT Security</span>
          <h2 class="cinematic-title"><span>Nocturne</span><span>Study System</span></h2>
          <p class="cinematic-subtitle">Learn deliberately. Build real systems. Keep the evidence. Turn university work into an engineering profile that compounds over time.</p>
          <div class="cinematic-actions">
            <button class="enter-roadmap" type="button">Enter roadmap ↓</button>
            <button class="open-study" type="button">Continue Week 01</button>
          </div>
        </div>
        <div class="cinematic-scroll" aria-hidden="true">scroll to enter</div>
      </section>`;
  }

  function installHero(){
    const dash=document.getElementById('dashboard');
    if(!dash || dash.querySelector('.cinematic-hero')) return;
    dash.insertAdjacentHTML('afterbegin',heroMarkup());

    dash.querySelector('.enter-roadmap')?.addEventListener('click',()=>{
      const target=dash.querySelector(':scope > .hero:not(.cinematic-hero)') || dash.querySelector('.continue-card');
      target?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    });
    dash.querySelector('.open-study')?.addEventListener('click',()=>{
      document.querySelector('.nav-item[data-view="study"]')?.click();
      scrollTo({top:0,behavior:reduce?'auto':'smooth'});
    });
  }

  function installReveals(){
    if(reduce) return;
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}
      });
    },{threshold:.10,rootMargin:'0px 0px -8% 0px'});

    const wire=()=>{
      document.querySelectorAll('#dashboard > :not(.cinematic-hero):not(.cinematic-reveal)').forEach(el=>{
        el.classList.add('cinematic-reveal');io.observe(el);
      });
    };
    wire();
    const dash=document.getElementById('dashboard');
    if(dash) new MutationObserver(()=>requestAnimationFrame(()=>{installHero();wire()})).observe(dash,{childList:true});
  }

  installDrawer();
  installHero();
  installReveals();
})();
