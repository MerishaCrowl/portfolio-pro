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
  minIntensity = 0,
  maxIntensity = 0.8 
}) {
  const materialRef = useRef()
  const meshRef = useRef()
  
  // Track current intensity for smooth fading
  const intensityRef = useRef(0)
  const targetIntensityRef = useRef(0)
  
  // Randomly change target intensity
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Every ~10 seconds, maybe change the aurora intensity
    if (Math.floor(time) % 10 === 0 && Math.random() < 0.02) {
      // 70% chance to fade in, 30% chance to fade out
      targetIntensityRef.current = Math.random() < 0.7 
        ? minIntensity + Math.random() * (maxIntensity - minIntensity)
        : minIntensity
    }
    
    // Smoothly interpolate to target
    intensityRef.current += (targetIntensityRef.current - intensityRef.current) * 0.01
    
    if (materialRef.current) {
      materialRef.current.uTime = time
      materialRef.current.uIntensity = intensityRef.current
    }
  })
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {/* Curved plane for aurora */}
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
