import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Import to ensure the material is registered
import './iridescentMaterialDef'

/**
 * IRIDESCENT MATERIAL COMPONENT
 * 
 * A React component that renders the custom iridescent material
 * with automatic time-based animation.
 */

export function IridescentMaterial({ intensity = 1.0, frequency = 1.0 }) {
  const materialRef = useRef()
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime
    }
  })
  
  return (
    <iridescentMaterial
      ref={materialRef}
      uIntensity={intensity}
      uFrequency={frequency}
    />
  )
}
