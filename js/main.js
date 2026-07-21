import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* =========================================================================
   PROJECT DATA
   Replace `model` with a local path (e.g. "assets/models/prop1.glb") once
   you have your own exported .glb. Replace the `renders` placeholders with
   real screenshot paths (e.g. renders.uv = "assets/renders/prop1_uv.jpg")
   and swap the placeholder <div> rendering in renderBreakdownTab() for
   <img src="..."> when real files exist.
   ========================================================================= */
const PROJECTS = [
  {
    id: 'prop',
    title: 'Sci-Fi Container Prop',
    role: 'Hard-surface Prop Artist',
    tools: ['Blender', 'Substance Painter', 'Marmoset'],
    model: 'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
    stats: { tris: '18,420', verts: '11,208', texRes: '4K PBR', engine: 'Unreal Engine 5' },
  },
  {
    id: 'prop2',
    title: 'Stylized Prop — Duck',
    role: 'Stylized Prop Artist',
    tools: ['Maya', 'ZBrush', 'Photoshop'],
    model: 'https://threejs.org/examples/models/gltf/Duck/glTF/Duck.gltf',
    stats: { tris: '2,340', verts: '1,502', texRes: '2K', engine: 'Unity' },
  },
  {
    id: 'char',
    title: 'Game-Ready Character',
    role: 'Character Artist',
    tools: ['ZBrush', 'Maya', 'Substance Painter'],
    model: 'https://threejs.org/examples/models/gltf/Soldier.glb',
    stats: { tris: '42,760', verts: '24,910', texRes: '4K PBR', engine: 'Unreal Engine 5' },
  },
];

const BREAKDOWN_TABS = [
  { key: 'baseColor', label: 'Base Color', desc: 'ผิวโมเดลสุดท้ายพร้อม PBR Texture ครบชุด (Albedo / Roughness / Metallic / Normal).' },
  { key: 'wireframe', label: 'Wireframe', desc: 'โครงสร้าง Topology ของโมเดล — แสดงบนวิวเวอร์จริงแบบ Real-time.' },
  { key: 'uv', label: 'UV Layout', desc: 'การคลี่ UV สำหรับ Bake Texture — จัด Island ให้ใช้พื้นที่ Texture Sheet อย่างมีประสิทธิภาพ' },
  { key: 'highPoly', label: 'High Poly', desc: 'เวอร์ชัน Sculpt ความละเอียดสูงสำหรับ Bake รายละเอียดลง Normal Map' },
  { key: 'lowPoly', label: 'Low Poly', desc: 'เวอร์ชัน Game-Ready ที่ผ่าน Retopology พร้อมใช้งานจริงในเอนจิ้น' },
  { key: 'textures', label: 'Textures', desc: 'ชุด Texture Map ที่ Bake และ Paint (Base Color / Normal / Roughness / Metallic / AO)' },
];

/* =========================================================================
   GALLERY DATA
   Auto-generated — do not edit this array by hand.
   To add photos: drop image files into assets/gallery/<Category>/ (any
   category name works, e.g. assets/gallery/Activity/), then run
   `node scripts/build-gallery.js` (or double-click update-gallery.bat) to
   regenerate the block below from whatever's on disk.
   ========================================================================= */
/* GALLERY_ITEMS:START */
const GALLERY_ITEMS = [
  { category: 'Activity', title: 'Blender training', img: 'assets/gallery/Activity/IMG_5725.JPG' },
  { category: 'Activity', title: 'Blender training', img: 'assets/gallery/Activity/IMG_5726.JPG' },
  { category: 'Activity', title: 'Blender training', img: 'assets/gallery/Activity/IMG_5728.JPG' },
  { category: 'Activity', title: 'UE5 training', img: 'assets/gallery/Activity/IMG_5927.JPG' },
  { category: 'Activity', title: 'UE5 training', img: 'assets/gallery/Activity/IMG_5930.JPG' },
  { category: 'Activity', title: 'UE5 training', img: 'assets/gallery/Activity/IMG_5940.JPG' },
  { category: 'Character', title: 'Hanuman', img: 'assets/gallery/Character/IMG_6393.PNG' },
  { category: 'Character', title: 'Hanuman low', img: 'assets/gallery/Character/IMG_6394.PNG' },
  { category: 'Character', title: 'Demogorgon', img: 'assets/gallery/Character/IMG_6606.PNG' },
  { category: 'Character', title: 'Jinx', img: 'assets/gallery/Character/Jingx.png' },
  { category: 'Character', title: 'Hanuman High', img: 'assets/gallery/Character/Screenshot 2026-03-25 032558.png' },
  { category: 'Environment', title: 'DonutCoffee', img: 'assets/gallery/Environment/Donut8K.png' },
  { category: 'Environment', title: 'WallThaiStyle', img: 'assets/gallery/Environment/WallThai.png' },
  { category: 'Game', title: 'Environment in game engine', img: 'assets/gallery/Game/EnvironmentD.png' },
  { category: 'Game', title: 'Mhee noey game (2D)', img: 'assets/gallery/Game/IMG_1924.PNG' },
  { category: 'Game', title: 'Forrest Guardian (2D)', img: 'assets/gallery/Game/IMG_2320.JPG' },
  { category: 'Game', title: 'Forrest Guardian (2D)', img: 'assets/gallery/Game/Screenshot 2025-10-23 230150.png' },
  { category: 'Game', title: 'Zombie survival (3D)', img: 'assets/gallery/Game/Screenshot 2026-03-14 034525.png' },
  { category: 'Game', title: 'Rama Project (senior project)', img: 'assets/gallery/Game/Screenshot 2026-03-26 203318.png' },
  { category: 'Game', title: 'Rama Project Blueprint (senior project)', img: 'assets/gallery/Game/Screenshot 2026-05-16 015015.png' },
  { category: 'Other', title: 'UX/UI Design App About me', img: 'assets/gallery/Other/IMG_4749.PNG' },
  { category: 'Other', title: 'Name Design', img: 'assets/gallery/Other/IMG_6336.PNG' },
  { category: 'Other', title: 'Jewelry ', img: 'assets/gallery/Other/IMG_6617.JPG' },
  { category: 'Other', title: 'Learn flowgorithm', img: 'assets/gallery/Other/IMG_6664.JPG' },
  { category: 'Prop', title: 'Bed', img: 'assets/gallery/Prop/best.png' },
  { category: 'Prop', title: 'Chair', img: 'assets/gallery/Prop/chair.png' },
  { category: 'Prop', title: 'Trident', img: 'assets/gallery/Prop/image.png' },
  { category: 'Prop', title: 'Kunai', img: 'assets/gallery/Prop/Kunai4k.png' },
  { category: 'Prop', title: 'Table', img: 'assets/gallery/Prop/Screenshot 2026-02-22 035902.png' },
  { category: 'Prop', title: 'Taogas', img: 'assets/gallery/Prop/Taogas.png' },
  { category: 'Prop', title: 'TVS', img: 'assets/gallery/Prop/TVS.png' },
  { category: 'Prop', title: 'Whip Design', img: 'assets/gallery/Prop/whip Design.png' },
];
/* GALLERY_ITEMS:END */
const GALLERY_CATEGORIES = ['All', ...new Set(GALLERY_ITEMS.map(g => g.category))];
let currentGalleryFilter = 'All';

let currentProjectIndex = 0;
let currentTab = 'baseColor';

/* =========================================================================
   NAV
   ========================================================================= */
const navToggle = document.getElementById('navToggle');
const tabBar = document.getElementById('tabBar');

navToggle.addEventListener('click', () => {
  const open = tabBar.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.tab-link').forEach(link => {
  link.addEventListener('click', () => {
    tabBar.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = document.querySelectorAll('main .section');
const navLinks = document.querySelectorAll('.tab-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.target === entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sectionObserver.observe(s));

/* =========================================================================
   REVEAL ON SCROLL
   ========================================================================= */
document.querySelectorAll('.section > *').forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* =========================================================================
   THREE.JS VIEWER
   ========================================================================= */
const canvasHost = document.getElementById('viewerCanvas');
const loadingEl = document.getElementById('viewerLoading');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07161c);

const camera = new THREE.PerspectiveCamera(40, canvasHost.clientWidth / canvasHost.clientHeight, 0.1, 100);
camera.position.set(0, 0.6, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(canvasHost.clientWidth, canvasHost.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
canvasHost.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 3.2;
controls.minDistance = 0.5;
controls.maxDistance = 20;

scene.add(new THREE.HemisphereLight(0xece9e3, 0x0c1e29, 1.1));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(3, 4, 4);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0xfffe15, 1.1);
rimLight.position.set(-4, -1, -3);
scene.add(rimLight);

const loader = new GLTFLoader();
let currentModel = null;
let currentMeshMaterials = [];

function fitCameraToObject(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 1.6 / maxDim;
  object.scale.setScalar(scale);

  const scaledBox = new THREE.Box3().setFromObject(object);
  const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
  object.position.sub(scaledCenter);

  camera.position.set(0, 0.4, 2.6);
  controls.target.set(0, 0, 0);
  controls.update();
}

function loadModel(url) {
  loadingEl.classList.remove('hidden');
  loadingEl.textContent = 'Loading model…';

  if (currentModel) {
    scene.remove(currentModel);
    currentModel.traverse(c => {
      if (c.isMesh) { c.geometry.dispose(); }
    });
    currentModel = null;
    currentMeshMaterials = [];
  }

  loader.load(
    url,
    (gltf) => {
      currentModel = gltf.scene;
      currentModel.traverse(c => {
        if (c.isMesh && c.material) {
          currentMeshMaterials.push(c.material);
          c.material.wireframe = (currentTab === 'wireframe');
        }
      });
      scene.add(currentModel);
      fitCameraToObject(currentModel);
      loadingEl.classList.add('hidden');
    },
    undefined,
    (err) => {
      console.error('Model load failed:', err);
      loadingEl.textContent = 'ไม่สามารถโหลดโมเดลได้ (ตรวจสอบอินเทอร์เน็ต หรือแทนที่ path ด้วยไฟล์ของคุณ)';
    }
  );
}

function setWireframe(on) {
  currentMeshMaterials.forEach(mat => { mat.wireframe = on; });
}

function resizeRenderer() {
  const w = canvasHost.clientWidth;
  const h = canvasHost.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', resizeRenderer);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

/* ---- viewer controls ---- */
const btnAutoRotate = document.getElementById('btnAutoRotate');
btnAutoRotate.addEventListener('click', () => {
  controls.autoRotate = !controls.autoRotate;
  btnAutoRotate.classList.toggle('active', controls.autoRotate);
});

document.getElementById('btnReset').addEventListener('click', () => {
  if (currentModel) fitCameraToObject(currentModel);
});

document.getElementById('btnFullscreen').addEventListener('click', () => {
  const frame = document.querySelector('.viewer-frame');
  if (!document.fullscreenElement) {
    frame.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
});
document.addEventListener('fullscreenchange', () => setTimeout(resizeRenderer, 50));

/* =========================================================================
   PROJECT PICKER + BREAKDOWN TABS + STATS
   ========================================================================= */
const projectPicker = document.getElementById('projectPicker');
const breakdownTabsEl = document.getElementById('breakdownTabs');
const breakdownPanel = document.getElementById('breakdownPanel');
const statsBar = document.getElementById('statsBar');
const projectGrid = document.getElementById('projectGrid');

function renderProjectPicker() {
  projectPicker.innerHTML = PROJECTS.map((p, i) =>
    `<button class="pp-item${i === currentProjectIndex ? ' active' : ''}" data-index="${i}">${p.title}</button>`
  ).join('');
  projectPicker.querySelectorAll('.pp-item').forEach(btn => {
    btn.addEventListener('click', () => selectProject(Number(btn.dataset.index)));
  });
}

function renderStats() {
  const s = PROJECTS[currentProjectIndex].stats;
  statsBar.innerHTML = `
    <div class="stat"><span class="stat-label">Triangles</span><span class="stat-value">${s.tris}</span></div>
    <div class="stat"><span class="stat-label">Vertices</span><span class="stat-value">${s.verts}</span></div>
    <div class="stat"><span class="stat-label">Texture</span><span class="stat-value">${s.texRes}</span></div>
    <div class="stat"><span class="stat-label">Engine</span><span class="stat-value">${s.engine}</span></div>
  `;
}

function renderBreakdownTab() {
  const tab = BREAKDOWN_TABS.find(t => t.key === currentTab);
  const project = PROJECTS[currentProjectIndex];

  breakdownTabsEl.querySelectorAll('.b-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === currentTab);
  });

  if (currentTab === 'textures') {
    breakdownPanel.innerHTML = `
      <div class="bp-title">${tab.label} — ${project.title}</div>
      <div class="bp-desc">${tab.desc}</div>
      <div class="bp-swatches">
        <div class="bp-swatch" style="background:#8a8a86">Base Color</div>
        <div class="bp-swatch" style="background:#5c6b83">Normal</div>
        <div class="bp-swatch" style="background:#3a3a3a">Roughness</div>
        <div class="bp-swatch" style="background:#1c1c1c">Metallic</div>
        <div class="bp-swatch" style="background:#4a4a4a">AO</div>
      </div>
    `;
  } else if (currentTab === 'baseColor' || currentTab === 'wireframe') {
    breakdownPanel.innerHTML = `
      <div class="bp-title">${tab.label} — ${project.title}</div>
      <div class="bp-desc">${tab.desc} (ดูผลได้บนวิวเวอร์ด้านซ้ายแบบ Real-time)</div>
    `;
  } else {
    breakdownPanel.innerHTML = `
      <div class="bp-title">${tab.label} — ${project.title}</div>
      <div class="bp-desc">${tab.desc}</div>
      <div class="bp-placeholder"><span>[ ${tab.label} render placeholder — แทนที่ด้วยรูปจริงใน js/main.js → renders.${tab.key} ]</span></div>
    `;
  }
}

function selectTab(key) {
  currentTab = key;
  setWireframe(key === 'wireframe');
  renderBreakdownTab();
}

breakdownTabsEl.querySelectorAll('.b-tab').forEach(btn => {
  btn.addEventListener('click', () => selectTab(btn.dataset.tab));
});

function selectProject(index) {
  currentProjectIndex = index;
  renderProjectPicker();
  renderStats();
  renderBreakdownTab();
  loadModel(PROJECTS[index].model);
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
}

function renderProjectGrid() {
  projectGrid.innerHTML = PROJECTS.map((p, i) => `
    <div class="project-card" data-index="${i}">
      <div class="pc-thumb">${p.title}</div>
      <div class="pc-body">
        <div class="pc-title">${p.title}</div>
        <div class="pc-meta">${p.role}</div>
        <div class="pc-tags">${p.tools.map(t => `<span class="pc-tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
  projectGrid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      selectProject(Number(card.dataset.index));
      document.getElementById('showcase').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* =========================================================================
   ART GALLERY + LIGHTBOX
   ========================================================================= */
const galleryFilterEl = document.getElementById('galleryFilter');
const galleryGridEl = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxBody = document.getElementById('lightboxBody');

function renderGalleryFilter() {
  galleryFilterEl.innerHTML = GALLERY_CATEGORIES.map(cat =>
    `<button class="gf-item${cat === currentGalleryFilter ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');
  galleryFilterEl.querySelectorAll('.gf-item').forEach(btn => {
    btn.addEventListener('click', () => {
      currentGalleryFilter = btn.dataset.cat;
      renderGalleryFilter();
      renderGallery();
    });
  });
}

function renderGallery() {
  const items = GALLERY_ITEMS.filter(g => currentGalleryFilter === 'All' || g.category === currentGalleryFilter);
  if (!items.length) {
    galleryGridEl.innerHTML = `<p class="gallery-empty">ยังไม่มีรูป — วางไฟล์ภาพไว้ที่ assets/gallery/&lt;ชื่อหมวด&gt;/ (เช่น assets/gallery/Activity/) แล้วรัน scripts/build-gallery.js</p>`;
    return;
  }
  galleryGridEl.innerHTML = items.map((item, i) => `
    <div class="gallery-item" data-index="${i}">
      <div class="gi-thumb"><img src="${item.img}" alt="${item.title}" loading="lazy"></div>
      <div class="gi-caption"><b>${item.title}</b><span>${item.category}</span></div>
    </div>
  `).join('');
  galleryGridEl.querySelectorAll('.gallery-item').forEach((el, i) => {
    el.addEventListener('click', () => openLightbox(items[i]));
  });
}

function openLightbox(item) {
  lightboxBody.innerHTML = `<img src="${item.img}" alt="${item.title}"><div class="lightbox-caption"><b>${item.title}</b> — ${item.category}</div>`;
  lightbox.classList.add('open');
}
function closeLightbox() { lightbox.classList.remove('open'); }

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

/* =========================================================================
   INIT
   ========================================================================= */
renderProjectGrid();
renderProjectPicker();
renderStats();
renderBreakdownTab();
loadModel(PROJECTS[currentProjectIndex].model);
renderGalleryFilter();
renderGallery();
