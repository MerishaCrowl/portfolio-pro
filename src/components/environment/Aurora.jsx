import { useRef} from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

import vertexShader from '../../shaders/aurora.vert?raw'
import fragmentShader from '../../shaders/aurora.frag?raw'

/**
 * AURORA BOREALIS
 * 
 * A curved plane in the sky that displays flowing aurora effects.
 * Randomly fades in and out to create that occasional appearance you wanted.
 */

// Create the aurora material
const AuroraMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uIntensity: 0.5,
  },
  vertexShader,
  fragmentShader
)
extend({ AuroraMaterial: AuroraMaterialImpl })
export function Aurora({ 
  position = [0, 20, -30], 
  scale = [60, 15, 1],
  minIntensity = 0.1,
  maxIntensity = 0.8 
}) {
  const materialRef = useRef()
  const intensityRef = useRef(maxIntensity * 0.5)  // Start at half intensity
  const targetIntensityRef = useRef(maxIntensity * 0.5)
  const lastChangeRef = useRef(0)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Change intensity every 8-15 seconds
    if (time - lastChangeRef.current > 8 + Math.sin(time) * 3.5) {
      lastChangeRef.current = time
      // Random target between min and max
      const range = maxIntensity - minIntensity
      targetIntensityRef.current = minIntensity + (Math.sin(time * 0.1) * 0.5 + 0.5) * range
    }
    
    // Smooth interpolation
    intensityRef.current += (targetIntensityRef.current - intensityRef.current) * 0.005
    
    if (materialRef.current) {
      materialRef.current.uTime = time
      materialRef.current.uIntensity = intensityRef.current
    }
  })
  
  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <auroraMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}