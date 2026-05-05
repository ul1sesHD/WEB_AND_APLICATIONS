(function () {
  /* SPA view controller
     Initial: only #hero visible, navbar hidden, nothing else.
     START button → hero disappears, about + contact appear with animation.
     Nav links → only one section visible at a time. */

  const VIEWS = {
    home:     ['about', 'contact'],
    projects: ['projects'],
    services: ['services'],
  };

  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('[data-view]');
  const allSections = document.querySelectorAll('section');
  const startBtn = document.getElementById('hero-start');

  let currentView = null;

  function showView(viewName) {
    const sectionIds = VIEWS[viewName];
    if (!sectionIds) return;

    // Toggle visibility: only sections in VIEWS[viewName] are active
    allSections.forEach(s => {
      s.classList.toggle('view-active', sectionIds.includes(s.id));
    });

    // Update active nav link
    navLinks.forEach(a => {
      a.classList.toggle('nav-active', a.dataset.view === viewName);
    });

    currentView = viewName;

    // Smooth scroll to top after view swap
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function revealNavbar() {
    navbar.classList.add('visible');
  }

  /* ── Initial state: only hero visible, nothing else ── */
  allSections.forEach(s => s.classList.remove('view-active'));
  document.getElementById('hero').classList.add('view-active');

  /* ── START button → hide hero, show about + contact with animation ── */
  if (startBtn) {
    startBtn.addEventListener('click', e => {
      e.preventDefault();
      revealNavbar();
      showView('home');
    });
  }

  /* ── Nav links → switch views (only one section at a time) ── */
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const view = a.dataset.view;
      if (view) {
        if (!navbar.classList.contains('visible')) revealNavbar();
        showView(view);
      }
    });
  });
})();
