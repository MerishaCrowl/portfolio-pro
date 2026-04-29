/**
 * AURORA FRAGMENT SHADER
 * 
 * Creates a flowing, ethereal aurora borealis effect.
 * 
 * The effect uses layered sine waves with different frequencies
 * to create organic, flowing curtains of light.
 * 
 * Colors shift through greens, teals, and purples like real auroras.
 */

varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uIntensity;

// Simple noise function for organic variation
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  // Create flowing wave patterns
  float wave1 = sin(vUv.x * 3.0 + uTime * 0.5 + noise(vUv * 2.0 + uTime * 0.1) * 2.0);
  float wave2 = sin(vUv.x * 5.0 - uTime * 0.3 + noise(vUv * 3.0 - uTime * 0.15) * 1.5);
  float wave3 = sin(vUv.x * 2.0 + uTime * 0.7 + noise(vUv * 4.0 + uTime * 0.2) * 1.0);
  
  // Combine waves
  float combinedWave = (wave1 + wave2 * 0.5 + wave3 * 0.3) / 1.8;
  
  // Create vertical gradient (aurora appears in upper portion)
  float verticalGradient = smoothstep(0.3, 0.8, vUv.y);
  
  // Aurora colors (green, teal, purple)
  vec3 green = vec3(0.2, 0.9, 0.4);
  vec3 teal = vec3(0.2, 0.8, 0.8);
  vec3 purple = vec3(0.6, 0.2, 0.8);
  
  // Blend colors based on position and time
  float colorMix = sin(vUv.x * 2.0 + uTime * 0.2) * 0.5 + 0.5;
  vec3 auroraColor = mix(green, teal, colorMix);
  auroraColor = mix(auroraColor, purple, sin(vUv.x * 4.0 - uTime * 0.3) * 0.3 + 0.2);
  
  // Calculate final intensity
  float intensity = combinedWave * verticalGradient * uIntensity;
  intensity = max(0.0, intensity);
  intensity = pow(intensity, 1.5); // Soften the falloff
  
  // Add some sparkle/shimmer
  float sparkle = noise(vUv * 50.0 + uTime) * 0.1;
  intensity += sparkle * verticalGradient;
  
  // Apply color with intensity
  vec3 finalColor = auroraColor * intensity;
  
  // Alpha fades at edges
  float alpha = intensity * 0.6;
  
  gl_FragColor = vec4(finalColor, alpha);
}
