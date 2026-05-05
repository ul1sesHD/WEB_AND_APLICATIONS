(function () {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  document.body.style.overflow = 'hidden';

  const ifEcg   = document.getElementById('if-ecg');
  const ifBlob  = document.getElementById('if-blob');
  const ifTorn  = document.getElementById('if-torn');
  const ifBig   = document.getElementById('if-big');
  const ifFlash = document.getElementById('if-flash');

  // Draw ECG path dynamically on the SVG
  function buildEcgPath() {
    const svg = document.getElementById('ecg-svg');
    if (!svg) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const cy = H / 2;
    const left = W * 0.1;
    const right = W * 0.9;
    const span = right - left;

    // Normalized x positions and y deflections
    const beats = [
      [0, 0], [0.28, 0], [0.33, -H * 0.12], [0.36, H * 0.22],
      [0.40, -H * 0.35], [0.43, H * 0.12], [0.46, 0],
      [0.72, 0], [1, 0]
    ];

    const pts = beats.map(([nx, dy]) => `${left + nx * span},${cy + dy}`).join(' L ');
    const path = document.getElementById('ecg-path');
    if (path) {
      path.setAttribute('d', `M ${pts}`);
      // Reset animation
      path.classList.remove('ecg-line');
      void path.offsetWidth;
      path.classList.add('ecg-line');
    }
  }

  function showOnly(el) {
    [ifEcg, ifBlob, ifTorn, ifBig, ifFlash].forEach(f => {
      if (f) f.classList.remove('active');
    });
    if (el) el.classList.add('active');
  }

  function finish() {
    overlay.classList.add('fade-out');
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 520);
  }

  // Click anywhere to skip
  overlay.addEventListener('click', finish);

  // ── Sequence ──
  buildEcgPath();
  showOnly(ifEcg);

  const t1 = setTimeout(() => showOnly(ifBlob), 750);

  const t2 = setTimeout(() => showOnly(ifTorn), 1200);

  const t3 = setTimeout(() => showOnly(ifBig), 1550);

  // Flash sequence: black → white → black → white
  let flashCount = 0;
  const t4 = setTimeout(() => {
    const flashTimer = setInterval(() => {
      flashCount++;
      ifFlash.classList.toggle('bg-black', flashCount % 2 !== 0);
      ifFlash.classList.toggle('bg-white', flashCount % 2 === 0);
      showOnly(ifFlash);

      if (flashCount >= 6) {
        clearInterval(flashTimer);
        setTimeout(finish, 80);
      }
    }, 100);
  }, 1850);

  // Auto-finish safety (4s max)
  const tSafe = setTimeout(finish, 4000);

  // Clean up timers on manual skip
  overlay.addEventListener('click', () => {
    [t1, t2, t3, t4, tSafe].forEach(clearTimeout);
  }, { once: true });
})();
