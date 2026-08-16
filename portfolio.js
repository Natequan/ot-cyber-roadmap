(() => {
  const D = window.PORTFOLIO_DATA;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  $('#headline').textContent = D.profile.headline;
  $('#summary').textContent = D.profile.summary;
  $('#stats').innerHTML = `
    <article class="stat"><strong>${D.caseStudies.length}</strong><span>VERIFIED CASE STUDY</span></article>
    <article class="stat"><strong>${D.backlog.length}</strong><span>PROJECTS IN PIPELINE</span></article>
    <article class="stat"><strong>OT</strong><span>PRIMARY SPECIALIZATION PATH</span></article>`;

  $('#caseGrid').innerHTML = D.caseStudies.map(c => `
    <article class="case-card" data-case="${esc(c.id)}" tabindex="0" role="button" aria-label="Open ${esc(c.title)} case study">
      <div class="case-visual"><img src="${esc(c.topology)}" alt="Topology diagram for ${esc(c.title)}"></div>
      <div class="case-body">
        <div class="case-meta"><span>${esc(c.type)}</span><span>${esc(c.date)}</span></div>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.short)}</p>
        <div class="tags">${c.skills.slice(0,6).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div>
        <div class="case-link">Open technical case study →</div>
      </div>
    </article>`).join('');

  $('#backlogGrid').innerHTML = D.backlog.map(p => `
    <article class="backlog-card"><h3>${esc(p.title)}</h3><p>${esc(p.area)}</p><span class="status">${esc(p.status)}</span></article>`).join('');

  const dialog = $('#caseDialog');
  const open = id => {
    const c = D.caseStudies.find(x => x.id === id);
    if (!c) return;
    $('#dialogContent').innerHTML = `
      <div class="eyebrow">${esc(c.course)} · ${esc(c.type)}</div>
      <h2>${esc(c.title)}</h2>
      <p class="role-note">${esc(c.roleNote)}</p>
      <img class="diagram" src="${esc(c.topology)}" alt="Industrial network topology">
      <h3>What was built</h3><ul>${c.highlights.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
      <h3>System flow</h3><ul>${c.architecture.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
      <h3>Verified result</h3><p class="result">${esc(c.result)}</p>
      <h3>Why it matters professionally</h3><p>${esc(c.professionalValue)}</p>
      <div class="tags">${c.skills.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div>
      <p style="margin-top:24px"><a class="primary" href="https://github.com/Natequan/ot-cyber-roadmap/blob/main/${esc(c.source)}" target="_blank" rel="noopener">Read source case study on GitHub ↗</a></p>`;
    dialog.showModal();
  };

  document.querySelectorAll('[data-case]').forEach(el => {
    el.addEventListener('click', () => open(el.dataset.case));
    el.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el.dataset.case); }});
  });
  $('#closeDialog').onclick = () => dialog.close();
  dialog.addEventListener('click', e => { if(e.target === dialog) dialog.close(); });
})();
