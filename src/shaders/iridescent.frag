/**
 * IRIDESCENT FRAGMENT SHADER
 * 
 * The fragment shader runs once per pixel of your rendered object.
 * This creates the "oil spill" rainbow metallic effect.
 * 
 * The effect works by:
 * 1. Calculating the angle between view direction and surface normal
 * 2. Using that angle to shift through a rainbow color spectrum
 * 3. Adding a metallic reflective quality
 * 
 * This mimics thin-film interference (like oil on water or soap bubbles).
 */

varying vec3 vNormal;
varying vec3 vViewPosition;

uniform float uTime;
uniform float uIntensity;
uniform float uFrequency;

// Convert HSL to RGB
// We use this because it's easier to shift "hue" through a rainbow
vec3 hsl2rgb(vec3 c) {
  vec3 rgb = clamp(
    abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
    0.0,
    1.0
  );
  return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

void main() {
  // Normalize our vectors
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  
  // Calculate fresnel - how much the surface faces away from camera
  // This is 0 when looking straight at the surface, 1 at grazing angles
  float fresnel = 1.0 - abs(dot(viewDir, normal));
  
  // Create the iridescent hue shift
  // The hue changes based on fresnel AND a subtle time animation
  float hue = fresnel * uFrequency + uTime * 0.1;
  
  // Keep hue in 0-1 range (it wraps around for rainbow effect)
  hue = fract(hue);
  
  // Convert to RGB with high saturation and medium lightness
  vec3 iridescentColor = hsl2rgb(vec3(hue, 0.8, 0.5));
  
  // Add a dark base that the iridescence sits on top of
  // This gives the "dark metallic" look
  vec3 baseColor = vec3(0.02, 0.02, 0.03);
  
  // Mix based on intensity and fresnel
  // More color at edges (grazing angles), darker in center
  float mixFactor = fresnel * uIntensity;
  vec3 finalColor = mix(baseColor, iridescentColor, mixFactor);
  
  // Add a subtle rim light effect
  float rim = pow(fresnel, 3.0) * 0.5;
  finalColor += rim;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
