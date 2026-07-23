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
    id: 'kunai',
    title: 'Kunai Prop',
    role: 'Hard-surface Prop Artist',
    tools: ['Blender', 'Substance Painter', 'Marmoset'],
    model: 'assets/models/kunai.glb',
    stats: { tris: '18,420', verts: '11,208', texRes: '4K PBR', engine: 'Unreal Engine 5' },
    renders: {
      uv: 'assets/renders/kunai_uv.png',
      textures: [
        { part: 'blade', label: 'Blade', maps: {
          baseColor: 'assets/renders/kunai_tex/blade_basecolor.jpg',
          normal: 'assets/renders/kunai_tex/blade_normal.jpg',
          roughness: 'assets/renders/kunai_tex/blade_roughness.jpg',
          metallic: 'assets/renders/kunai_tex/blade_metallic.jpg',
          height: 'assets/renders/kunai_tex/blade_height.jpg',
        }},
        { part: 'dam', label: 'Handle', maps: {
          baseColor: 'assets/renders/kunai_tex/dam_basecolor.jpg',
          normal: 'assets/renders/kunai_tex/dam_normal.jpg',
          roughness: 'assets/renders/kunai_tex/dam_roughness.jpg',
          metallic: 'assets/renders/kunai_tex/dam_metallic.jpg',
          height: 'assets/renders/kunai_tex/dam_height.jpg',
        }},
        { part: 'handle', label: 'Cycle', maps: {
          baseColor: 'assets/renders/kunai_tex/handle_basecolor.jpg',
          normal: 'assets/renders/kunai_tex/handle_normal.jpg',
          roughness: 'assets/renders/kunai_tex/handle_roughness.jpg',
          metallic: 'assets/renders/kunai_tex/handle_metallic.jpg',
          height: 'assets/renders/kunai_tex/handle_height.jpg',
        }},
        { part: 'pra', label: 'Fabric', maps: {
          baseColor: 'assets/renders/kunai_tex/pra_basecolor.jpg',
          normal: 'assets/renders/kunai_tex/pra_normal.jpg',
          roughness: 'assets/renders/kunai_tex/pra_roughness.jpg',
          metallic: 'assets/renders/kunai_tex/pra_metallic.jpg',
          height: 'assets/renders/kunai_tex/pra_height.jpg',
        }},
      ],
    },
  },
];

const BREAKDOWN_TABS = [
  { key: 'baseColor', label: 'Base Color', desc: 'ผิวโมเดลสุดท้ายพร้อม PBR Texture ครบชุด (Albedo / Roughness / Metallic / Normal).' },
  { key: 'wireframe', label: 'Wireframe', desc: 'โครงสร้าง Topology ของโมเดล — แสดงบนวิวเวอร์จริงแบบ Real-time.' },
  { key: 'uv', label: 'UV Layout', desc: 'การคลี่ UV สำหรับ Bake Texture — จัด Island ให้ใช้พื้นที่ Texture Sheet อย่างมีประสิทธิภาพ' },
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
  { category: 'Character', title: 'Demogorgon', img: 'assets/gallery/Character/Demogorgon.png' },
  { category: 'Character', title: 'Hanuman High', img: 'assets/gallery/Character/Hanuman High.png' },
  { category: 'Character', title: 'Hanuman low', img: 'assets/gallery/Character/Hanuman low.png' },
  { category: 'Character', title: 'Hanuman', img: 'assets/gallery/Character/Hanuman.png' },
  { category: 'Character', title: 'Jinx', img: 'assets/gallery/Character/Jinx.png' },
  { category: 'Character', title: 'MongkyKing2K', img: 'assets/gallery/Character/MongkyKing2K.png' },
  { category: 'Environment', title: 'DonutCoffee', img: 'assets/gallery/Environment/DonutCoffee.png' },
  { category: 'Environment', title: 'WallThaiStyle', img: 'assets/gallery/Environment/WallThaiStyle.png' },
  { category: 'Game', title: 'Environment in game engine', img: 'assets/gallery/Game/Environment in game engine.png' },
  { category: 'Game', title: 'Forrest Guardian (2D) 1', img: 'assets/gallery/Game/Forrest Guardian (2D) 1.jpg' },
  { category: 'Game', title: 'Forrest Guardian (2D) 2', img: 'assets/gallery/Game/Forrest Guardian (2D) 2.png' },
  { category: 'Game', title: 'Mhee noey game (2D)', img: 'assets/gallery/Game/Mhee noey game (2D).png' },
  { category: 'Game', title: 'Rama Project (senior project)', img: 'assets/gallery/Game/Rama Project (senior project).png' },
  { category: 'Game', title: 'Rama Project Blueprint (senior project)', img: 'assets/gallery/Game/Rama Project Blueprint (senior project).png' },
  { category: 'Game', title: 'Zombie survival (3D)', img: 'assets/gallery/Game/Zombie survival (3D).png' },
  { category: 'Prop', title: '9mmGun', img: 'assets/gallery/Prop/9mmGun.png' },
  { category: 'Prop', title: 'AmmoBox', img: 'assets/gallery/Prop/AmmoBox.png' },
  { category: 'Prop', title: 'Bed', img: 'assets/gallery/Prop/Bed.png' },
  { category: 'Prop', title: 'Chair', img: 'assets/gallery/Prop/Chair.png' },
  { category: 'Prop', title: 'Kunai', img: 'assets/gallery/Prop/Kunai.png' },
  { category: 'Prop', title: 'Sherriff', img: 'assets/gallery/Prop/Sherriff.png' },
  { category: 'Prop', title: 'Table', img: 'assets/gallery/Prop/Table.png' },
  { category: 'Prop', title: 'Taogas', img: 'assets/gallery/Prop/Taogas.png' },
  { category: 'Prop', title: 'Trident', img: 'assets/gallery/Prop/Trident.png' },
  { category: 'Prop', title: 'TVS', img: 'assets/gallery/Prop/TVS.png' },
  { category: 'Prop', title: 'Whip Design', img: 'assets/gallery/Prop/Whip Design.png' },
  { category: 'Activity', title: 'Blender training 1', img: 'assets/gallery/Activity/Blender training 1.jpg' },
  { category: 'Activity', title: 'Blender training 2', img: 'assets/gallery/Activity/Blender training 2.jpg' },
  { category: 'Activity', title: 'Blender training 3', img: 'assets/gallery/Activity/Blender training 3.jpg' },
  { category: 'Activity', title: 'UE5 training 1', img: 'assets/gallery/Activity/UE5 training 1.jpg' },
  { category: 'Activity', title: 'UE5 training 2', img: 'assets/gallery/Activity/UE5 training 2.jpg' },
  { category: 'Activity', title: 'UE5 training 3', img: 'assets/gallery/Activity/UE5 training 3.jpg' },
  { category: 'Other', title: 'Jewelry', img: 'assets/gallery/Other/Jewelry.jpg' },
  { category: 'Other', title: 'Learn flowgorithm', img: 'assets/gallery/Other/Learn flowgorithm.jpg' },
  { category: 'Other', title: 'Name Design', img: 'assets/gallery/Other/Name Design.png' },
  { category: 'Other', title: 'UX UI Design App About me', img: 'assets/gallery/Other/UX-UI Design App About me.png' },
];
/* GALLERY_ITEMS:END */
const GALLERY_CATEGORIES = ['All', ...new Set(GALLERY_ITEMS.map(g => g.category))];
let currentGalleryFilter = 'All';

const TEXTURE_MAP_LABELS = { baseColor: 'Base Color', normal: 'Normal', roughness: 'Roughness', metallic: 'Metallic', height: 'Height', ao: 'AO' };

let currentProjectIndex = 0;
let currentTab = 'baseColor';
let currentTexturePart = 0;

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

  if (currentTab === 'baseColor' || currentTab === 'wireframe') {
    breakdownPanel.innerHTML = `
      <div class="bp-title">${tab.label} — ${project.title}</div>
      <div class="bp-desc">${tab.desc} (ดูผลได้บนวิวเวอร์ด้านซ้ายแบบ Real-time)</div>
    `;
  } else if (currentTab === 'textures' && project.renders?.textures?.length) {
    const parts = project.renders.textures;
    if (currentTexturePart >= parts.length) currentTexturePart = 0;
    const part = parts[currentTexturePart];
    breakdownPanel.innerHTML = `
      <div class="bp-title">${tab.label} — ${project.title}</div>
      <div class="bp-desc">${tab.desc}</div>
      <div class="bp-part-tabs">
        ${parts.map((p, i) => `<button class="bp-part-tab${i === currentTexturePart ? ' active' : ''}" data-part="${i}">${p.label}</button>`).join('')}
      </div>
      <div class="bp-tex-grid">
        ${Object.entries(part.maps).map(([key, src]) => `
          <div class="bp-tex-item">
            <img class="bp-tex-img" src="${src}" alt="${part.label} ${TEXTURE_MAP_LABELS[key] || key}">
            <span class="bp-tex-label">${TEXTURE_MAP_LABELS[key] || key}</span>
          </div>
        `).join('')}
      </div>
    `;
    breakdownPanel.querySelectorAll('.bp-part-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        currentTexturePart = Number(btn.dataset.part);
        renderBreakdownTab();
      });
    });
    breakdownPanel.querySelectorAll('.bp-tex-img').forEach(img => {
      img.addEventListener('click', () => openLightbox({ img: img.src, title: `${part.label} — ${img.nextElementSibling.textContent}`, category: project.title }));
    });
  } else if (project.renders?.[tab.key]) {
    breakdownPanel.innerHTML = `
      <div class="bp-title">${tab.label} — ${project.title}</div>
      <div class="bp-desc">${tab.desc}</div>
      <img class="bp-render-img" src="${project.renders[tab.key]}" alt="${tab.label} — ${project.title}">
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
  currentTexturePart = 0;
  renderProjectPicker();
  renderStats();
  renderBreakdownTab();
  loadModel(PROJECTS[index].model);
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
renderProjectPicker();
renderStats();
renderBreakdownTab();
loadModel(PROJECTS[currentProjectIndex].model);
renderGalleryFilter();
renderGallery();
