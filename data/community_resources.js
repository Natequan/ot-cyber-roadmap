(() => {
  if (!window.ROADMAP_DATA || !Array.isArray(window.ROADMAP_DATA.resources)) return;

  const drops = [
    {
      id:'90-days-cyber',
      track:'Cybersecurity',
      kind:'GitHub Curriculum',
      priority:'Recommended',
      title:'90 Days of CyberSecurity — farhanashrafdev',
      description:'Structured daily path covering networking, Security+, Linux, Python, traffic analysis, Git, SIEM/cloud topics and ethical hacking. Nocturne will use selected sections as reinforcement rather than blindly following all 90 days.',
      url:'https://github.com/farhanashrafdev/90DaysOfCyberSecurity'
    },
    {
      id:'project-based-learning',
      track:'Programming / Projects',
      kind:'GitHub Library',
      priority:'Recommended',
      title:'Project Based Learning — practical-tutorials',
      description:'Large curated collection of tutorials where you learn by building complete artifacts. Use it as a project idea bank when a Nocturne week needs a practical Python, C/C++ or systems exercise.',
      url:'https://github.com/practical-tutorials/project-based-learning'
    },
    {
      id:'build-your-own-x',
      track:'Programming / Systems',
      kind:'GitHub Library',
      priority:'Later',
      title:'Build Your Own X — CodeCrafters',
      description:'Step-by-step guides for rebuilding technologies such as Git, shells, network stacks, databases and more from scratch. Excellent for deeper systems understanding after the programming foundations are comfortable.',
      url:'https://github.com/codecrafters-io/build-your-own-x'
    },
    {
      id:'30-days-python',
      track:'Python',
      kind:'GitHub Curriculum',
      priority:'Core',
      title:'30 Days of Python — Asabeneh',
      description:'Beginner-friendly step-by-step Python curriculum with daily explanations and exercises. This is now a primary supplement for our Python-foundations weeks; follow at our pace, not necessarily one lesson per calendar day.',
      url:'https://github.com/Asabeneh/30-Days-Of-Python'
    },
    {
      id:'ml-for-beginners',
      track:'Machine Learning',
      kind:'Official GitHub Curriculum',
      priority:'Later',
      title:'Machine Learning for Beginners — Microsoft',
      description:'Microsoft project-based classic ML curriculum: 12 weeks, 26 lessons and 52 quizzes. Saved for later because ML can complement computer vision/embedded work, but it is not more important than networking, Python, Linux and OT right now.',
      url:'https://github.com/microsoft/ML-For-Beginners'
    },
    {
      id:'sql-murder-mystery',
      track:'Databases / SQL',
      kind:'Interactive Lab',
      priority:'Recommended',
      title:'SQL Murder Mystery — Knight Lab',
      description:'Learn and practice SQL by investigating a fictional murder through real database queries. Good low-friction database practice when we introduce SQL or need a fun side lab.',
      url:'https://mystery.knightlab.com/'
    },
    {
      id:'roadmap-sh',
      track:'Career / Reference',
      kind:'Roadmap Library',
      priority:'Recommended',
      title:'roadmap.sh — Developer Roadmaps',
      description:'Community-maintained visual roadmaps for Cyber Security, DevOps, backend, AI and other roles. Use as a reference/checklist against Nocturne, not as a second competing schedule.',
      url:'https://roadmap.sh/'
    },
    {
      id:'odin-project',
      track:'Web Development',
      kind:'Free Curriculum',
      priority:'Later / Optional',
      title:'The Odin Project',
      description:'Free project-driven full-stack web curriculum. Valuable if we later need stronger web fundamentals for dashboards or security tooling, but not part of the core OT-security path right now.',
      url:'https://www.theodinproject.com/'
    },
    {
      id:'full-stack-open',
      track:'Web Development',
      kind:'University Course',
      priority:'Later / Optional',
      title:'Full Stack Open — University of Helsinki',
      description:'Modern web-development course covering React, Node.js, REST, GraphQL, TypeScript, testing, containers and more. Strong resource, but best used later after core programming fundamentals if we build richer web interfaces.',
      url:'https://fullstackopen.com/en/'
    },
    {
      id:'polish-resume-unverified',
      track:'Career',
      kind:'TikTok Mention',
      priority:'Needs exact link',
      title:'“Polish” — AI resume optimizer (exact product not verified yet)',
      description:'The TikTok describes an AI tool that tailors a resume to a job description, but the screenshot alone is not enough to identify the exact product reliably. Kept here so we do not lose it; we will replace this placeholder only after finding the exact site.',
      url:'https://vt.tiktok.com/ZSVYupN4P/'
    }
  ];

  const existing = new Set(window.ROADMAP_DATA.resources.map(r => r.id));
  drops.forEach(r => { if (!existing.has(r.id)) window.ROADMAP_DATA.resources.push(r); });

  // Integrate the strongest resources into the existing routine without bloating it.
  window.ROADMAP_DATA.weeks.forEach(w => {
    if (w.topic === 'Python fundamentals' && !w.resources.includes('30-days-python')) {
      w.resources.push('30-days-python');
    }
    if (w.topic === 'Security fundamentals' && !w.resources.includes('90-days-cyber')) {
      w.resources.push('90-days-cyber');
    }
    if (w.topic === 'Career assets' && !w.resources.includes('roadmap-sh')) {
      w.resources.push('roadmap-sh');
    }
  });
})();
