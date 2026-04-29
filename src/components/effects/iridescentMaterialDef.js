import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

import vertexShader from '../../shaders/iridescent.vert?raw'
import fragmentShader from '../../shaders/iridescent.frag?raw'

/**
 * IRIDESCENT MATERIAL DEFINITION
 * 
 * Creates the custom Three.js material using our GLSL shaders.
 * This file just defines and extends the material.
 */

const IridescentMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uIntensity: 1.0,
    uFrequency: 1.0,
  },
  vertexShader,
  fragmentShader
)

// Make it available as <iridescentMaterial /> in JSX
extend({ IridescentMaterial: IridescentMaterialImpl })

export { IridescentMaterialImpl }
