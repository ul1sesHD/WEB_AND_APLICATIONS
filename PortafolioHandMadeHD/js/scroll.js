(function () {
  // Navbar compact on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(0,0,0,0.55)';
      navbar.style.backdropFilter = 'blur(24px)';
      navbar.style.padding = '0.9rem 5%';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.backdropFilter = 'none';
      navbar.style.padding = '1.5rem 5%';
    }
  }, { passive: true });

  // Fade-in sections on scroll
  const sections = document.querySelectorAll('section');
  sections.forEach(s => s.classList.add('fade-section'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(s => io.observe(s));
})();
