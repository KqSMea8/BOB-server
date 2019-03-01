var canvas2    = document.getElementById('d'),
	ctx2       = canvas2.getContext('2d')

var perlin    = new ClassicalNoise(),
	variation = .003,
	amp       = 200,
	variators = [],
	max_lines = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 25 : 30,
	start_y;

for (var i = 0, u = 0; i < max_lines; i++, u+=.02) {
variators[i] = u;
}

function draw(){
ctx2.shadowColor = "rgba(43, 205, 255, 1)";
ctx2.shadowBlur = 0;

for (var i = 0; i <= max_lines; i++){
ctx2.beginPath();
ctx2.moveTo(0, start_y);
for (var x = 0; x <= canvas2Width; x++) {
  var y = perlin.noise(x*variation+variators[i], x*variation, 0);
  ctx2.lineTo(x, start_y + amp*y);
}
var color = Math.floor(150*Math.abs(y));
var alpha = Math.min(Math.abs(y), .8)+.1;
ctx2.strokeStyle = "rgba(80,210,240,"+alpha+")";
ctx2.lineWidth = .07
ctx2.stroke();
ctx2.closePath();
variators[i] += .005;
}
}

// (function init() {
//     setTimeout(() => {
//         resizecanvas2();
//         animate();  
//     }, 4000);
// })();

function animate() {
draw();
requestAnimationFrame(animate);
}

function resizecanvas2(){
	canvas2Width = document.documentElement.clientWidth,
	canvas2Height = document.documentElement.clientHeight; 

	canvas2.setAttribute("width", canvas2Width);
	canvas2.setAttribute("height", canvas2Height);

	start_y = canvas2Height/2;
}