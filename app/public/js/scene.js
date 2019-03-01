var scene, camera, renderer;
var particleCount = 256 * 8;
var sceneMousePosition = new THREE.Vector3(0, 0, 0);

var bg_points;

var stacks = [];

var color_1 = new THREE.Color(0x74ebf3);
var color_2 = new THREE.Color(0x8eacce);
var color_3 = new THREE.Color(0x8e5d8c);

var colors = [color_1, color_2, color_3];

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 100;
  camera.lookAt({
    x: 0,
    y: 0,
    z: 0
  });

  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x060b1f, 0);
  document.body.appendChild(renderer.domElement);

  window.addEventListener('resize', resize, false);
  // document.addEventListener('mousemove', pointerMove);
  // document.addEventListener('touchstart', pointerMove);
  // document.addEventListener('touchmove', pointerMove);

  renderer.render(scene, camera);

  createParticleSystem();
  createBackground();
  setStacksPositions();

  for (var i = 0; i < stacks.length; i++) {
    scene.add(stacks[i]);
    stacks[i].geometry.verticesNeedUpdate = true;
  }
}

function createBackground() {
  var bg_material = new THREE.PointsMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    size: 3.5,
    map: THREE.ImageUtils.loadTexture("./assets/particle.png")
  });

  var bg_particleCount = 18000;
  var bg_particles = new THREE.Geometry();

  for (var i = 0; i < bg_particleCount; i++) {
    var px = Math.random() * 2000 - 1000;
    var py = Math.random() * 2000 - 1000;
    var pz = Math.random() * 500 - 600;
    var bg_particle = new THREE.Vector3(px, py, pz);
    bg_particle.velocity = new THREE.Vector3(0, Math.random(), 0);
    bg_particles.vertices.push(bg_particle);
  }

  bg_points = new THREE.Points(bg_particles, bg_material);
  // bg_points.sortParticles = true;
  scene.add(bg_points);
}

function createParticleSystem(count = 3, radius = 30) {
  for (var i = 0; i < count; i++) {
    var particles = new THREE.Geometry();

    for (var p = 0; p < particleCount; p++) {
      var coords = randomSpherePoint(0, 0, 0, 16 + Math.random() * radius);

      var particle = new THREE.Vector3(coords[0], coords[1], coords[2]);

      var x = Math.random();
      var y = (1 - x) * Math.random();
      var z = 1 - x - y;
      particle.axis = new THREE.Vector3(x, y, z);
      particle.angle = Math.PI / 5 * (0.004 + Math.random() * 0.01);
      particle.spherePosition = new THREE.Vector3(coords[0], coords[1], coords[2]);
      particle.lerpSpeed = 0.0001 + Math.random() * 0.005;

      particles.vertices.push(particle);
    }

    THREE.ImageUtils.crossOrigin = '';
    var particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      map: THREE.ImageUtils.loadTexture("./assets/particle.png"),
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      depthWrite: false
    });

    // Create the particle system
    stacks[i] = new THREE.Points(particles, particleMaterial);
    stacks[i].geometry.colorsNeedUpdate = true;

    // stacks[i].position.x = ((Math.random() * 2) - 1) * 100;
    // stacks[i].position.y = ((Math.random() * 2) - 1) * 50;
    // stacks[i].position.z = ((Math.random() * 2) - 1) * 20;

    for (var j = 0; j < particleCount; j++) {
      // color.setHSL((i / 256), 0.5, 0.5);
      stacks[i].geometry.colors[j] = colors[i];
    }
  }
}

function createOneParticleSystem(particleCount = 256 * 8, radius = 10, lerpSpeed = 0.005, color = new THREE.Color(0x74ebf3)) {
  const particles = new THREE.Geometry();

  for (var p = 0; p < particleCount; p++) {
    var coords = randomSpherePoint(0, 0, 0, 16 + Math.random() * radius);

    var particle = new THREE.Vector3(coords[0], coords[1], coords[2]);

    var x = Math.random();
    var y = (1 - x) * Math.random();
    var z = 1 - x - y;
    particle.axis = new THREE.Vector3(x, y, z);
    particle.angle = Math.PI / 5 * (0.004 + Math.random() * 0.01);
    particle.spherePosition = new THREE.Vector3(coords[0], coords[1], coords[2]);
    particle.lerpSpeed = 0.0001 + Math.random() * lerpSpeed;

    particles.vertices.push(particle);
  }

  THREE.ImageUtils.crossOrigin = '';
  var particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1,
    map: THREE.ImageUtils.loadTexture("./assets/particle.png"),
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    depthWrite: false
  });

  // Create the particle system
  const stack = new THREE.Points(particles, particleMaterial);
  stack.geometry.colorsNeedUpdate = true;

  for (var j = 0; j < particleCount; j++) {
    // color.setHSL((i / 256), 0.5, 0.5);
    stack.geometry.colors[j] = color;
  }
  return stack
}

function setStacksPositions() {
  stacks[0].position.set(-40, -30, 0);
  stacks[1].position.set(10, 40, 10);
  stacks[2].position.set(100, -10, -10);
}

function animateParticles() {
  for (var q = 0; q < stacks.length; q++) {
    var verts = stacks[q].geometry.vertices;
    for (var i = 0; i < verts.length; i++) {
      var axis = new THREE.Vector3(0.1, 0.1, 0);
      verts[i].spherePosition.applyAxisAngle(verts[i].axis, verts[i].angle);
      verts[i].x += 0.15 * (sceneMousePosition.x + verts[i].spherePosition.x - verts[i].x) * verts[i].lerpSpeed;
      verts[i].y += 0.15 * (sceneMousePosition.y + verts[i].spherePosition.y - verts[i].y) * verts[i].lerpSpeed;
      verts[i].z += 0.15 * (sceneMousePosition.z + verts[i].spherePosition.z - verts[i].z) * verts[i].lerpSpeed;
    }
    stacks[q].geometry.verticesNeedUpdate = true;
  }
}

function animate() {
  for (var i = 0; i < stacks.length; i++) {
    stacks[i].geometry.colorsNeedUpdate = true;
  }
  animateParticles();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  bg_points.rotation.y += 0.00002;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  TWEEN.update();
}

function randomSpherePoint(x0, y0, z0, radius) {
  var u = Math.random();
  var v = Math.random();
  var theta = 2 * Math.PI * u;
  var phi = Math.acos(2 * v - 1);
  var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
  var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
  var z = z0 + (radius * Math.cos(phi));
  return [x, y, z, u, v];
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}