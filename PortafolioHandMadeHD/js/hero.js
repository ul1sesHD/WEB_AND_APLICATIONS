(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 9;

  // Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dir = new THREE.DirectionalLight(0xffffff, 2);
  dir.position.set(5, 5, 5);
  scene.add(dir);
  const rim = new THREE.PointLight(0xaaaaff, 3, 25);
  rim.position.set(-6, -3, 3);
  scene.add(rim);

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xcccccc,
    metalness: 0.15,
    roughness: 0.05,
    transmission: 0.88,
    thickness: 0.6,
    transparent: true,
    opacity: 0.75,
  });

  // Chain links: alternating rotated tori
  const geo = new THREE.TorusGeometry(0.55, 0.13, 16, 48);
  const links = [];
  const positions = [
    [-2.5, 1.5, 0], [-1.5, 0.3, -1], [-0.4, 1.2, 0.5],
    [0.8, -0.5, -0.5], [2, 0.8, 0], [3, -1, 1],
    [-3.5, -1, 0.5], [1.5, -2, -0.5],
  ];

  positions.forEach((pos, i) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      i % 2 === 0 ? 0 : Math.PI / 2
    );
    const s = 0.7 + Math.random() * 0.9;
    mesh.scale.setScalar(s);
    links.push({ mesh, vy: 0.001 + Math.random() * 0.002, rx: 0.003 + Math.random() * 0.004, offset: Math.random() * Math.PI * 2 });
    scene.add(mesh);
  });

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function resize() {
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.008;

    links.forEach(({ mesh, vy, rx, offset }) => {
      mesh.rotation.x += rx;
      mesh.rotation.y += rx * 0.65;
      mesh.position.y += Math.sin(t + offset) * vy;
    });

    camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();
})();
