(function () {
  const section = document.getElementById('projects');
  if (!section) return;

  const categoriesView = section.querySelector('.projects-categories');
  const detailsContainer = section.querySelector('.projects-details');
  const detailViews = section.querySelectorAll('.projects-detail');

  function showCategories() {
    categoriesView.classList.add('visible');
    detailViews.forEach(v => v.classList.remove('active'));
  }

  function showDetail(cat) {
    categoriesView.classList.remove('visible');
    detailViews.forEach(v => {
      v.classList.toggle('active', v.dataset.cat === cat);
    });
    // Smooth scroll to top of section after the view swap
    requestAnimationFrame(() => {
      const top = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  // Category card → open detail
  section.addEventListener('click', e => {
    const card = e.target.closest('[data-cat-go]');
    if (card) showDetail(card.dataset.catGo);
  });

  // Back buttons → return to categories
  section.addEventListener('click', e => {
    if (e.target.closest('[data-back]')) showCategories();
  });

  // Nav "PROJECTS" link → reset to categories view
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href="#projects"], a[data-section="projects"]');
    if (link) showCategories();
  });

  // Initial state
  showCategories();
})();
