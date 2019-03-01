precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
	vUv = uv;
	vPosition = position;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}