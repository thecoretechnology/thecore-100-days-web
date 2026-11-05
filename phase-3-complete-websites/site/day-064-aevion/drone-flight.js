import * as THREE from "./assets/vendor/three.module.min.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const coarsePointer = window.matchMedia("(pointer: coarse)");

const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;

function createBeam(start, end, radius, material) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius * 0.88, direction.length(), 12),
    material,
  );
  beam.position.copy(start).add(end).multiplyScalar(0.5);
  beam.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize(),
  );
  return beam;
}

function createDrone() {
  const drone = new THREE.Group();
  drone.name = "AEVION autonomous inspection drone";

  const shell = new THREE.MeshPhysicalMaterial({
    color: 0xf1f4f2,
    metalness: 0.5,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
  });
  const shellDark = new THREE.MeshStandardMaterial({
    color: 0x151c1d,
    metalness: 0.78,
    roughness: 0.3,
  });
  const carbon = new THREE.MeshStandardMaterial({
    color: 0x090d0e,
    metalness: 0.42,
    roughness: 0.3,
  });
  const metal = new THREE.MeshStandardMaterial({
    color: 0x8b9798,
    metalness: 0.9,
    roughness: 0.2,
  });
  const lens = new THREE.MeshPhysicalMaterial({
    color: 0x071419,
    emissive: 0x0a5366,
    emissiveIntensity: 0.45,
    metalness: 0.45,
    roughness: 0.12,
    clearcoat: 1,
  });
  const accent = new THREE.MeshStandardMaterial({
    color: 0xd7f151,
    emissive: 0x7da31e,
    emissiveIntensity: 0.42,
    metalness: 0.25,
    roughness: 0.28,
  });
  const propellerMaterial = new THREE.MeshStandardMaterial({
    color: 0x111617,
    transparent: true,
    opacity: 0.62,
    metalness: 0.38,
    roughness: 0.3,
    depthWrite: false,
  });

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 20), shellDark);
  body.scale.set(1.42, 0.38, 0.84);
  drone.add(body);

  const upperShell = new THREE.Mesh(new THREE.SphereGeometry(0.66, 32, 18), shell);
  upperShell.scale.set(1.36, 0.34, 0.78);
  upperShell.position.y = 0.12;
  drone.add(upperShell);

  const centerBand = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.17, 1.08), carbon);
  centerBand.position.y = -0.07;
  drone.add(centerBand);

  const topFin = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.54), accent);
  topFin.position.set(0.02, 0.39, 0.02);
  topFin.rotation.y = Math.PI * 0.04;
  drone.add(topFin);

  const motorPositions = [
    new THREE.Vector3(-1.52, 0.02, -0.86),
    new THREE.Vector3(1.52, 0.02, -0.86),
    new THREE.Vector3(-1.52, 0.02, 0.86),
    new THREE.Vector3(1.52, 0.02, 0.86),
  ];
  const propellers = [];

  motorPositions.forEach((position, index) => {
    const anchor = new THREE.Vector3(
      position.x * 0.28,
      position.y,
      position.z * 0.28,
    );
    drone.add(createBeam(anchor, position, 0.085, carbon));

    const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.25, 20), metal);
    motor.position.copy(position);
    drone.add(motor);

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.17, 0.1, 20), shellDark);
    cap.position.copy(position).add(new THREE.Vector3(0, 0.17, 0));
    drone.add(cap);

    const rotor = new THREE.Group();
    rotor.position.copy(position).add(new THREE.Vector3(0, 0.25, 0));
    const bladeA = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.024, 0.105), propellerMaterial);
    bladeA.geometry.translate(0.22, 0, 0);
    const bladeB = bladeA.clone();
    bladeB.rotation.y = Math.PI;
    rotor.add(bladeA, bladeB);

    const rotorBlur = new THREE.Mesh(
      new THREE.RingGeometry(0.2, 0.72, 48),
      new THREE.MeshBasicMaterial({
        color: index % 2 ? 0x9da8a8 : 0xbac5c4,
        transparent: true,
        opacity: 0.09,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    rotorBlur.rotation.x = -Math.PI / 2;
    rotor.add(rotorBlur);
    drone.add(rotor);
    propellers.push({ rotor, direction: index % 2 ? -1 : 1 });
  });

  const gimbal = new THREE.Group();
  gimbal.position.set(0, -0.47, 0.08);
  const gimbalMount = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.21, 20), metal);
  const cameraBody = new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 16), shellDark);
  cameraBody.scale.set(1.05, 0.86, 0.88);
  cameraBody.position.y = -0.2;
  const cameraLens = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.08, 24), lens);
  cameraLens.rotation.x = Math.PI / 2;
  cameraLens.position.set(0, -0.21, 0.25);
  gimbal.add(gimbalMount, cameraBody, cameraLens);
  drone.add(gimbal);

  const lidar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.16, 24), shellDark);
  lidar.rotation.x = Math.PI / 2;
  lidar.position.set(0.54, -0.13, 0.47);
  drone.add(lidar);

  [-0.58, 0.58].forEach((x) => {
    const leg = new THREE.Group();
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.55, 10), carbon);
    strut.position.set(x, -0.46, 0.01);
    strut.rotation.z = x > 0 ? -0.23 : 0.23;
    const foot = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.5, 4, 8), carbon);
    foot.rotation.z = Math.PI / 2;
    foot.position.set(x * 1.08, -0.72, 0.02);
    leg.add(strut, foot);
    drone.add(leg);
  });

  drone.rotation.order = "YXZ";
  drone.rotation.x = 0.1;
  return { drone, propellers, gimbal };
}

function initDroneFlight() {
  if (!document.body || !THREE.WebGLRenderer) return;

  const mount = document.createElement("div");
  mount.className = "drone-flight";
  mount.setAttribute("aria-hidden", "true");
  const canvas = document.createElement("canvas");
  canvas.className = "drone-flight__canvas";
  mount.append(canvas);
  document.body.append(mount);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !coarsePointer.matches,
      powerPreference: "high-performance",
    });
  } catch (error) {
    mount.remove();
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarsePointer.matches ? 1.15 : 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 30);
  camera.position.set(0, 0, 8);

  scene.add(new THREE.HemisphereLight(0xf5fbf8, 0x172123, 2.15));
  const keyLight = new THREE.DirectionalLight(0xffffff, 4.8);
  keyLight.position.set(-4, 6, 6);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x9eefff, 2.6);
  rimLight.position.set(5, 2, -4);
  scene.add(rimLight);
  const accentLight = new THREE.PointLight(0xd8f850, 9, 8);
  accentLight.position.set(0, 2, 3);
  scene.add(accentLight);

  const flightRig = new THREE.Group();
  const { drone, propellers, gimbal } = createDrone();
  flightRig.add(drone);
  scene.add(flightRig);

  const path = [
    { p: 0, x: 0.6, y: 0.46, z: 0.15, s: 1.06 },
    { p: 0.12, x: 0.77, y: 0.3, z: -0.25, s: 0.8 },
    { p: 0.25, x: 0.23, y: 0.64, z: 0.2, s: 0.72 },
    { p: 0.38, x: 0.72, y: 0.51, z: -0.15, s: 0.76 },
    { p: 0.52, x: 0.24, y: 0.29, z: 0.24, s: 0.7 },
    { p: 0.66, x: 0.78, y: 0.68, z: -0.28, s: 0.74 },
    { p: 0.82, x: 0.3, y: 0.48, z: 0.15, s: 0.7 },
    { p: 1, x: 0.7, y: 0.7, z: 0.02, s: 0.78 },
  ];

  const position = new THREE.Vector3();
  const velocity = new THREE.Vector3();
  const target = new THREE.Vector3();
  const pointer = new THREE.Vector2();
  let scaleTarget = 1;
  let initialized = false;
  let frame = 0;
  let lastTime = performance.now();
  let startTime = lastTime;
  let width = 1;
  let height = 1;
  let rafId = 0;
  let visible = true;

  const samplePath = (progress) => {
    const p = clamp(progress, 0, 1);
    let index = path.findIndex((point) => point.p >= p);
    if (index <= 0) index = 1;
    const previous = path[index - 1];
    const next = path[Math.min(index, path.length - 1)];
    const range = Math.max(next.p - previous.p, 0.0001);
    const raw = clamp((p - previous.p) / range, 0, 1);
    const eased = raw * raw * (3 - 2 * raw);
    return {
      x: lerp(previous.x, next.x, eased),
      y: lerp(previous.y, next.y, eased),
      z: lerp(previous.z, next.z, eased),
      s: lerp(previous.s, next.s, eased),
    };
  };

  const normalizedToWorld = (x, y, z) => {
    const distance = camera.position.z - z;
    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance;
    const visibleWidth = visibleHeight * camera.aspect;
    const edgeFactor = width < 760 ? 0.7 : 0.82;
    return new THREE.Vector3(
      (x - 0.5) * visibleWidth * edgeFactor,
      (0.5 - y) * visibleHeight * 0.78,
      z,
    );
  };

  const getScrollProgress = () => {
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    return clamp(window.scrollY / max, 0, 1);
  };

  const resize = () => {
    width = Math.max(window.innerWidth, 1);
    height = Math.max(window.innerHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarsePointer.matches ? 1.15 : 1.6));
  };

  const onPointerMove = (event) => {
    if (coarsePointer.matches) return;
    pointer.x = (event.clientX / width - 0.5) * 2;
    pointer.y = (event.clientY / height - 0.5) * 2;
  };

  const renderStatic = () => {
    const point = samplePath(0);
    target.copy(normalizedToWorld(point.x, point.y, point.z));
    flightRig.position.copy(target);
    flightRig.scale.setScalar(width < 760 ? point.s * 0.58 : point.s);
    drone.rotation.set(0.08, -0.1, -0.04);
    renderer.render(scene, camera);
    requestAnimationFrame(() => mount.classList.add("is-ready"));
  };

  const animate = (now) => {
    rafId = requestAnimationFrame(animate);
    if (!visible) return;

    const dt = Math.min((now - lastTime) / 1000, 0.034);
    lastTime = now;
    const time = (now - startTime) / 1000;
    const scrollProgress = getScrollProgress();
    const point = samplePath(scrollProgress);
    const wanderStrength = width < 760 ? 0.018 : 0.032;
    const nx = point.x + Math.sin(time * 0.38) * wanderStrength + Math.sin(time * 0.17 + 1.6) * wanderStrength * 0.7;
    const ny = point.y + Math.cos(time * 0.45 + 0.7) * wanderStrength * 0.78;
    target.copy(normalizedToWorld(nx, ny, point.z + Math.sin(time * 0.25) * 0.08));
    target.x += pointer.x * 0.1;
    target.y -= pointer.y * 0.06;
    scaleTarget = point.s * (width < 760 ? 0.58 : width < 1100 ? 0.8 : 1);

    if (!initialized) {
      position.copy(target).add(new THREE.Vector3(0.65, -0.45, -1.2));
      initialized = true;
    }

    const acceleration = target.clone().sub(position).multiplyScalar(4.9);
    velocity.addScaledVector(acceleration, dt);
    velocity.multiplyScalar(Math.exp(-3.15 * dt));
    position.addScaledVector(velocity, dt);
    flightRig.position.copy(position);

    const intro = 1 - Math.exp(-Math.max(time, 0) * 1.9);
    const currentScale = flightRig.scale.x || scaleTarget * 0.4;
    const nextScale = lerp(currentScale, scaleTarget * (0.64 + intro * 0.36), 1 - Math.exp(-4.5 * dt));
    flightRig.scale.setScalar(nextScale);

    const desiredRoll = clamp(-velocity.x * 0.14, -0.34, 0.34);
    const desiredPitch = clamp(velocity.y * 0.1 + Math.sin(time * 0.72) * 0.025, -0.24, 0.24);
    const desiredYaw = clamp(-velocity.x * 0.08 + pointer.x * 0.04, -0.28, 0.28);
    const rotationEase = 1 - Math.exp(-3.8 * dt);
    drone.rotation.z = lerp(drone.rotation.z, desiredRoll, rotationEase);
    drone.rotation.x = lerp(drone.rotation.x, desiredPitch, rotationEase);
    drone.rotation.y = lerp(drone.rotation.y, desiredYaw, rotationEase);
    drone.position.y = Math.sin(time * 1.18) * 0.045;
    gimbal.rotation.y = Math.sin(time * 0.42) * 0.18;
    gimbal.rotation.x = Math.cos(time * 0.31) * 0.05;

    propellers.forEach(({ rotor, direction }, index) => {
      rotor.rotation.y += dt * (34 + index * 1.7) * direction;
    });

    if (frame === 0) requestAnimationFrame(() => mount.classList.add("is-ready"));
    frame += 1;
    renderer.render(scene, camera);
  };

  const onVisibilityChange = () => {
    visible = !document.hidden;
    lastTime = performance.now();
  };

  const cleanup = () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    renderer.dispose();
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("pagehide", cleanup, { once: true });

  if (reduceMotion.matches) {
    renderStatic();
  } else {
    rafId = requestAnimationFrame(animate);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDroneFlight, { once: true });
} else {
  initDroneFlight();
}
