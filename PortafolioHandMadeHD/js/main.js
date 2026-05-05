(function () {
  // Highlight active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill a');

  function updateActive() {
    const y = window.scrollY + 140;
    sections.forEach(sec => {
      if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
        const id = sec.getAttribute('id');
        navLinks.forEach(a => {
          a.style.opacity = a.getAttribute('href') === '#' + id ? '1' : '0.5';
        });
      }
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
})();
