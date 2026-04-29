import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * STAR FIELD
 * 
 * Creates a 3D particle system of stars that move slowly in the background.
 */

// Seeded random number generator for deterministic results
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Generate star data outside of the component to avoid render issues
function generateStarData(count, radius) {
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const colors = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    
    // Use seeded random based on index for deterministic results
    const seed1 = i * 1.1
    const seed2 = i * 2.2
    const seed3 = i * 3.3
    const seed4 = i * 4.4
    const seed5 = i * 5.5
    
    const theta = seededRandom(seed1) * Math.PI * 2
    const phi = Math.acos((seededRandom(seed2) * 2) - 1)
    const r = Math.cbrt(seededRandom(seed3)) * radius
    
    positions[i3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = r * Math.cos(phi)
    
    sizes[i] = seededRandom(seed4) * 2 + 0.5
    
    const colorShift = seededRandom(seed5) * 0.2
    colors[i3] = 0.9 + colorShift * 0.1
    colors[i3 + 1] = 0.9 + colorShift * 0.05
    colors[i3 + 2] = 1.0
  }
  
  return { positions, sizes, colors }
}

export function StarField({ count = 2000, radius = 50 }) {
  const pointsRef = useRef()
  
  // Generate data once using useMemo with stable dependencies
  const { positions, sizes, colors } = useMemo(
    () => generateStarData(count, radius),
    [count, radius]
  )
  
  // Animate the stars
  useFrame((state) => {
    if (!pointsRef.current) return
    
    const time = state.clock.elapsedTime
    
    pointsRef.current.rotation.y = time * 0.02
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
