(() => {
  const D = window.PORTFOLIO_DATA;
  if (!D || !Array.isArray(D.caseStudies)) return;
  D.caseStudies.forEach(c => {
    if (c.topology) c.topology = c.topology.split('?')[0] + '?v=blue-final-20260816-2';
  });
})();
