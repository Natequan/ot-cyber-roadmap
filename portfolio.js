(() => {
  const D = window.PORTFOLIO_DATA;
  const MEDIA = window.PORTFOLIO_MEDIA || {};
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  $('#headline').textContent = D.profile.headline;
  $('#summary').textContent = D.profile.summary;
  $('#stats').innerHTML = `
    <article class="stat reveal"><strong>${D.caseStudies.length}</strong><span>VERIFIED CASE STUDIES</span></article>
    <article class="stat reveal"><strong>${D.experience?.length || 0}</strong><span>NETWORKING LABS DOCUMENTED</span></article>
    <article class="stat reveal"><strong>${D.credentials?.length || 0}</strong><span>COURSES / TRAINING VERIFIED</span></article>
    <article class="stat reveal"><strong>OT</strong><span>PRIMARY SPECIALIZATION PATH</span></article>`;

  const experienceGrid = $('#experienceGrid');
  if (experienceGrid && Array.isArray(D.experience)) {
    experienceGrid.innerHTML = D.experience.map((e,i) => `
      <article class="experience-card reveal" style="--delay:${i*80}ms">
        <div class="experience-top">
          <span class="experience-number">${esc(e.index)}</span>
          <span class="experience-date">${esc(e.date)}</span>
        </div>
        <div class="experience-type">${esc(e.type)}</div>
        <h3>${esc(e.title)}</h3>
        <p>${esc(e.short)}</p>
        <ul class="experience-bullets">${e.bullets.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
        <div class="tags">${e.skills.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div>
        <a class="experience-link" href="https://github.com/Natequan/ot-cyber-roadmap/blob/main/${esc(e.source)}" target="_blank" rel="noopener">Read documented lab series ↗</a>
      </article>`).join('');
  }

  $('#caseGrid').innerHTML = D.caseStudies.map((c,i) => `
    <article class="case-card reveal" style="--delay:${i*70}ms" data-case="${esc(c.id)}" tabindex="0" role="button" aria-label="Open ${esc(c.title)} case study">
      <div class="case-visual"><img src="${esc(c.topology)}" alt="Technical diagram for ${esc(c.title)}"></div>
      <div class="case-body">
        <div class="case-meta"><span>${esc(c.type)}</span><span>${esc(c.date)}</span></div>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.short)}</p>
        <div class="tags">${c.skills.slice(0,6).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div>
        <div class="case-link">Open technical case study →</div>
      </div>
    </article>`).join('');

  const credentialsGrid = $('#credentialsGrid');
  if (credentialsGrid && Array.isArray(D.credentials)) {
    credentialsGrid.innerHTML = D.credentials.map((c,i) => `
      <article class="credential-card reveal" style="--delay:${i*65}ms">
        <div class="credential-top">
          <span class="credential-type">${esc(c.type)}</span>
          <span class="credential-date">${esc(c.date)}</span>
        </div>
        <h3>${esc(c.title)}</h3>
        <p class="credential-issuer">${esc(c.issuer)}</p>
        <p class="credential-note">${esc(c.note)}</p>
        <div class="credential-foot">
          <span class="credential-focus">${esc(c.focus)}</span>
          ${c.verifyUrl ? `<a class="credential-verify" href="${esc(c.verifyUrl)}" target="_blank" rel="noopener">${esc(c.verifyLabel || 'Verify ↗')}</a>` : '<span class="credential-noverify">Certificate on file</span>'}
        </div>
      </article>`).join('');
  }

  $('#backlogGrid').innerHTML = D.backlog.map((p,i) => `
    <article class="backlog-card reveal" style="--delay:${i*60}ms"><h3>${esc(p.title)}</h3><p>${esc(p.area)}</p><span class="status">${esc(p.status)}</span></article>`).join('');

  const observeReveals = root => {
    const els = (root || document).querySelectorAll('.reveal:not(.is-visible)');
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    els.forEach(el => io.observe(el));
  };
  observeReveals();

  const dialog = $('#caseDialog');
  const closeDialog = () => {
    dialog.classList.remove('is-open');
    setTimeout(() => { if (dialog.open) dialog.close(); }, 180);
  };

  const open = id => {
    const c = D.caseStudies.find(x => x.id === id);
    if (!c) return;
    const mediaMap = MEDIA[c.mediaKey] || {};
    const gallery = Array.isArray(c.media) && c.media.length ? `
      <section class="case-section dialog-reveal">
        <h3>Project evidence</h3>
        <p class="section-intro">Selected visuals extracted from the submitted project evidence.</p>
        <div class="project-gallery">
          ${c.media.map((m,idx)=>{
            const src = mediaMap[m.key];
            return src ? `<figure class="project-shot" style="--stagger:${idx*70}ms" data-zoom-src="${src}"><img src="${src}" alt="${esc(m.caption)}"><figcaption>${esc(m.caption)}</figcaption></figure>` : '';
          }).join('')}
        </div>
      </section>` : '';

    $('#dialogContent').innerHTML = `
      <div class="case-hero dialog-reveal">
        <div class="eyebrow">${esc(c.course)} · ${esc(c.type)}</div>
        <h2>${esc(c.title)}</h2>
        <p class="role-note">${esc(c.roleNote)}</p>
      </div>
      <div class="diagram-wrap dialog-reveal"><img class="diagram" src="${esc(c.topology)}" alt="Technical architecture diagram for ${esc(c.title)}"></div>
      ${gallery}
      <section class="case-section dialog-reveal"><h3>What was built</h3><ul class="animated-list">${c.highlights.map((x,i)=>`<li style="--stagger:${i*45}ms">${esc(x)}</li>`).join('')}</ul></section>
      <section class="case-section dialog-reveal"><h3>System flow</h3><div class="flow-list">${c.architecture.map((x,i)=>`<div class="flow-step" style="--stagger:${i*70}ms"><span>${String(i+1).padStart(2,'0')}</span><p>${esc(x)}</p></div>`).join('')}</div></section>
      <section class="case-section dialog-reveal"><h3>Verified result</h3><p class="result">${esc(c.result)}</p></section>
      <section class="case-section dialog-reveal"><h3>Why it matters professionally</h3><p>${esc(c.professionalValue)}</p></section>
      <div class="tags dialog-reveal">${c.skills.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div>
      <p class="dialog-reveal" style="margin-top:26px"><a class="primary" href="https://github.com/Natequan/ot-cyber-roadmap/blob/main/${esc(c.source)}" target="_blank" rel="noopener">Read source case study on GitHub ↗</a></p>`;

    dialog.showModal();
    requestAnimationFrame(() => {
      dialog.classList.add('is-open');
      dialog.querySelectorAll('.dialog-reveal').forEach((el,i)=>{
        el.style.setProperty('--dialog-delay', `${Math.min(i*85, 600)}ms`);
      });
      setTimeout(()=>dialog.querySelectorAll('.dialog-reveal').forEach(el=>el.classList.add('is-visible')), 30);
    });

    dialog.querySelectorAll('[data-zoom-src]').forEach(el => {
      el.addEventListener('click', () => openLightbox(el.dataset.zoomSrc, el.querySelector('figcaption')?.textContent || 'Project evidence'));
    });
  };

  const openLightbox = (src, caption) => {
    const viewer = document.createElement('div');
    viewer.className = 'media-lightbox';
    viewer.innerHTML = `<button class="media-close" aria-label="Close image">×</button><div class="media-frame"><img src="${src}" alt="${esc(caption)}"><p>${esc(caption)}</p></div>`;
    document.body.appendChild(viewer);
    requestAnimationFrame(()=>viewer.classList.add('is-open'));
    const remove = () => { viewer.classList.remove('is-open'); setTimeout(()=>viewer.remove(),180); };
    viewer.addEventListener('click', e => { if (e.target === viewer || e.target.closest('.media-close')) remove(); });
    document.addEventListener('keydown', function escHandler(e){ if(e.key==='Escape'){ remove(); document.removeEventListener('keydown',escHandler); } });
  };

  document.querySelectorAll('[data-case]').forEach(el => {
    el.addEventListener('click', () => open(el.dataset.case));
    el.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el.dataset.case); }});
  });
  $('#closeDialog').onclick = closeDialog;
  dialog.addEventListener('click', e => { if(e.target === dialog) closeDialog(); });
})();
