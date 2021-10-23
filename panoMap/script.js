//========== Canvas
const canvas = document.querySelector("canvas.webgl");

//========== Buat Scene
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
const texture = loader.load("../img/pano1.jpg", () => {
  const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
  rt.fromEquirectangularTexture(renderer, texture);
  scene.background = rt.texture;
});

//========== Create Lighting
scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
scene.add(new THREE.AmbientLight(0xffffbb, 0.5));

//========== Create Geometry
const arrGeo = [];
const cube1 = createCube(3, 3, 3);
const cube2 = createCube(3, 3, 3);
cube2.position.x += 7;
const cube3 = createCube(3, 3, 3);
cube3.position.x -= 7;
arrGeo.push(cube1, cube2, cube3);

arrGeo.forEach((geo) => {
  scene.add(geo);
});

// ====== Sizing
const sizes = {
  width: 0.9 * window.innerWidth,
  height: 0.9 * window.innerHeight,
};

//========= Pengaturan Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 20);

const orbitControls = new THREE.OrbitControls(camera, canvas);
orbitControls.target.set(0, 5, 0);
orbitControls.enableZoom = false;
orbitControls.update();

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ================== Interaction
// Sizing canvas
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = 0.9 * window.innerWidth;
  sizes.height = 0.9 * window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const mainLoop = () => {
  arrGeo.forEach((geo) => {
    geo.rotation.x += 0.01;
    geo.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
  window.requestAnimationFrame(mainLoop);
};

mainLoop();
