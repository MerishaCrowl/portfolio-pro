/**
 * AURORA VERTEX SHADER
 * 
 * Simple pass-through that provides UV coordinates
 * to the fragment shader for the aurora effect.
 */

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
