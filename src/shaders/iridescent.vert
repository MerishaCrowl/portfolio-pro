/**
 * IRIDESCENT VERTEX SHADER
 * 
 * The vertex shader runs once per vertex (corner point) of your 3D model.
 * Its job is to:
 * 1. Transform the vertex position from model space to screen space
 * 2. Pass data to the fragment shader (vNormal, vViewPosition)
 * 
 * We need the normal and view direction in the fragment shader
 * to calculate the iridescent color based on viewing angle.
 */

varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  // Transform the normal from model space to view space
  // This is needed for lighting calculations
  vNormal = normalize(normalMatrix * normal);
  
  // Calculate the vertex position in view space
  // We need this to compute the view direction
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  
  // Final position on screen
  gl_Position = projectionMatrix * mvPosition;
}
