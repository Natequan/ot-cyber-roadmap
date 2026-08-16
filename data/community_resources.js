(() => {
  if (!window.ROADMAP_DATA || !Array.isArray(window.ROADMAP_DATA.resources)) return;

  const drops = [
    {
      id:'community-drop-tiktok-01',
      track:'Community Drops',
      kind:'Source Video',
      priority:'To Review',
      title:'TikTok resource drop #1 — repos/sites to extract',
      description:'Shared by Gabriel for the learning routine. The TikTok short-link is saved here so it is not lost; replace this entry with the exact repositories/sites shown in the video once identified.',
      url:'https://vt.tiktok.com/ZSVYu3Smp/'
    },
    {
      id:'community-drop-tiktok-02',
      track:'Community Drops',
      kind:'Source Video',
      priority:'To Review',
      title:'TikTok resource drop #2 — repos/sites to extract',
      description:'Shared by Gabriel for the learning routine. The TikTok short-link is saved here so it is not lost; replace this entry with the exact repositories/sites shown in the video once identified.',
      url:'https://vt.tiktok.com/ZSVYupN4P/'
    }
  ];

  const existing = new Set(window.ROADMAP_DATA.resources.map(r => r.id));
  drops.forEach(r => { if (!existing.has(r.id)) window.ROADMAP_DATA.resources.push(r); });
})();
