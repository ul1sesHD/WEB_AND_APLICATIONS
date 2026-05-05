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
  section.querySelectorAll('[data-cat-go]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      showDetail(el.dataset.catGo);
    });
  });

  // Back buttons → return to categories
  section.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      showCategories();
    });
  });

  // Nav "PROJECTS" link → reset to categories view
  document.querySelectorAll('a[href="#projects"]').forEach(a => {
    a.addEventListener('click', () => showCategories());
  });

  // Initial state
  showCategories();
})();
