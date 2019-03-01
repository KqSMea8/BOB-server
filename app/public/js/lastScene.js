var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _THREE =



THREE,WebGLRenderer = _THREE.WebGLRenderer,Scene = _THREE.Scene,PerspectiveCamera = _THREE.PerspectiveCamera,Object3D = _THREE.Object3D,Mesh = _THREE.Mesh,MeshToonMaterial = _THREE.MeshToonMaterial,Color = _THREE.Color,SphereGeometry = _THREE.SphereGeometry,PlaneGeometry = _THREE.PlaneGeometry,MeshLambertMaterial = _THREE.MeshLambertMaterial,Vector3 = _THREE.Vector3,AmbientLight = _THREE.AmbientLight,PointLight = _THREE.PointLight,DirectionalLight = _THREE.DirectionalLight,Fog = _THREE.Fog;

var getRandomFloat = function getRandomFloat(min, max) {return Math.random() * (max - min) + min;};
var radians = function radians(degrees) {return degrees * Math.PI / 180;};
var getNormalizedPosFromScreen = function getNormalizedPosFromScreen(x, y) {return new Vector3(
  x / window.innerWidth * 2 - 1,
  -(y / window.innerHeight * 2) + 1,
  0.5);};

var getDistanceBetweenNormalizedMousePosAndPos = function getDistanceBetweenNormalizedMousePosAndPos(normalizedMousePos, pos, camera) {
  var nm = normalizedMousePos.clone();
  nm.unproject(camera);
  var dir = nm.sub(camera.position).normalize();
  var distance = (pos.z - camera.position.z) / dir.z;
  var mousePos = camera.position.clone().add(dir.multiplyScalar(distance));
  return pos.clone().sub(mousePos);
};


/**/ /* ---- CORE ---- */
var mainColor = '#070707';
var secondaryColor = '#7e44a1';
var bgColor = 0x0c111d;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var Webgl = function () {
function Webgl(w, h) {_classCallCheck(this, Webgl);
  this.meshCount = 0;
  this.meshListeners = [];
  this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setClearColor(bgColor);
  this.scene = new Scene();
  this.scene.fog = new Fog(bgColor, 0, 350);
  this.camera = new PerspectiveCamera(50, w / h, 1, 1000);
  this.camera.position.set(0, 0, 10);
  this.dom = this.renderer.domElement;
  this.update = this.update.bind(this);
  this.resize = this.resize.bind(this);
  this.resize(w, h); // set render size
}

  _createClass(Webgl, [{ key: 'add', value: function add(mesh) {
    this.scene.add(mesh);
    if (!mesh.update) return;
    this.meshListeners.push(mesh.update);
    this.meshCount++;
  }
}, { key: 'update', value: function update() {
    var i = this.meshCount;
    while (--i >= 0) {
      this.meshListeners[i].apply(this, null);
  }

    this.camera.position.x += (normalizedMouse.x * 2 - this.camera.position.x) * 0.08;
    this.camera.position.y += (normalizedMouse.y * 1.5 - this.camera.position.y) * 0.08;
    this.camera.lookAt(new Vector3());

    this.renderer.render(this.scene, this.camera);
}
 }, { key: 'resize', value: function resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    }
 }]);return Webgl;}();
var webgl = new Webgl(windowWidth, windowHeight);
document.body.appendChild(webgl.dom);

/* ---- CREATING ZONE ---- */

var SCALE_FORCE = 0.1;
var SCALE_VEL = 0.8;

var MOUSE_VEL = 0.06;

var ATTRACTION_FORCE = 0.035;
var ATTRACTION_VEL = 0.1;

var NBR_OF_BALLS = 1300;
var COLORS = [
'#53D8FB',
'#DE1A1A',
'#43efd5',
'#ED217C',
'#EDAE49'];


// OBJECTS
var Ball = function (_Mesh) {_inherits(Ball, _Mesh);
  function Ball()

  {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$size = _ref.size,size = _ref$size === undefined ? getRandomFloat(0.2, 0.3) : _ref$size,_ref$position = _ref.position,position = _ref$position === undefined ? new Vector3(getRandomFloat(-8, 8), getRandomFloat(-5, 5), getRandomFloat(-7, 2)) : _ref$position,_ref$color = _ref.color,color = _ref$color === undefined ? secondaryColor : _ref$color;_classCallCheck(this, Ball);
    var material = new MeshToonMaterial({
      color: new Color(color),
      // flatShading: FlatShading,
      shininess: 10 });

    var geometry = new SphereGeometry(0.02, 32, 32);var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this,
    geometry, material));

    _this.normalizedMouseVec = new Vector3();
    _this.attractionRadius = size * 10;
    _this.force = {
      scale: 0,
      position: new Vector3() };


    _this.initialPosition = position;
    _this.position.copy(_this.initialPosition);
    _this.scale.multiplyScalar(0.001);

    _this.update = _this.update.bind(_this);return _this;
  }_createClass(Ball, [{ key: 'update', value: function update()

    {
      // this.rotation.x += 0.005;
      // this.rotation.y += 0.005;

      this.updateScale();
      this.updateMouseAttractionForce();
    } }, { key: 'updateScale', value: function updateScale()

    {
      this.force.scale += (1 - this.scale.x) * SCALE_FORCE;
      this.scale.addScalar(this.force.scale);
      this.force.scale *= SCALE_VEL;
    } }, { key: 'updateMouseAttractionForce', value: function updateMouseAttractionForce()

    {
      // mousePosition force
      var vecForce = getDistanceBetweenNormalizedMousePosAndPos(this.normalizedMouseVec, this.position, webgl.camera);
      var force = Math.max(0, this.attractionRadius - vecForce.length());
      this.force.position.add(vecForce.multiplyScalar(force * MOUSE_VEL));
      // dist force
      this.force.position.sub(this.initialPosition.clone().sub(this.position).multiplyScalar(ATTRACTION_FORCE));
      // apply
      this.position.sub(this.force.position);
      // reduce force
      this.force.position.multiplyScalar(ATTRACTION_VEL);
    } }]);return Ball;}(Mesh);


// #######
// START
// #######

// #######
// plane
// var plane = new Mesh(
// new PlaneGeometry(800, 800, 32),
// new MeshLambertMaterial({ color: 0x0c111d }));
//
// plane.position.y = -20;
// plane.rotation.x = -radians(90);
// webgl.add(plane);
// #######
// lights
var ambiantLight = new AmbientLight(0xffffff, 0.8);
webgl.add(ambiantLight);
var directionalLight = new DirectionalLight(0xffffff, 0.15);
directionalLight.position.set(0, 1, 0);
webgl.add(directionalLight);
var pointLight = new PointLight(0xfff7d7, 0.05);
pointLight.position.set(1, 0, 0);
webgl.add(pointLight);

// #######
// balls
var j = 0;
var normalizedMouse = new Vector3();
var balls = [];

// push new balls each 20 ms
var interval = setInterval(function () {
  var b = new Ball({ color: COLORS[Math.floor(Math.random() * COLORS.length)] });
  balls.push(b);
  webgl.add(b);
  j++;

  if (j === NBR_OF_BALLS) {
    clearInterval(interval);
  }
}, 1);

// target mouse position in the 3D view
document.body.addEventListener('mousemove', function (e) {
  normalizedMouse = getNormalizedPosFromScreen(e.clientX, e.clientY);
  var normalizedMouse2 = getNormalizedPosFromScreen(300, 300);
  var normalizedMouse3 = getNormalizedPosFromScreen(700, 700);
  var l = balls.length;
  for (var i = 0; i < l; i++) {
    balls[i].normalizedMouseVec = normalizedMouse2;
  }

  var q = balls.length;
  for (var j = 0; j < q; j++) {
    balls[j].normalizedMouseVec = normalizedMouse3;
  }
});

// createStack();
//
// //create stack
// function createStack() {
//   var normalizedMouse = getNormalizedPosFromScreen(100, 100);
//   var l = balls.length;
//   for (var i = 0; i < l; i++) {
//     balls[i].normalizedMouseVec = normalizedMouse;
//   }
// }

/* ---- CREATING ZONE END ---- */
/**/
/**/
/**/ /* ---- ON RESIZE ---- */
/**/function _onResize() {
  /**/windowWidth = window.innerWidth;
  /**/windowHeight = window.innerHeight;
  /**/webgl.resize(windowWidth, windowHeight);
  /**/}
/**/window.addEventListener('resize', _onResize);
/**/window.addEventListener('orientationchange', _onResize);
/**/ /* ---- LOOP ---- */
/**/function _loop() {
  /**/webgl.update();
  /**/requestAnimationFrame(_loop);
  /**/}
/**/_loop();
