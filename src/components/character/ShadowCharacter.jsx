import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { IridescentMaterial } from '../effects/IridescentMaterial'

/**
 * SHADOW CHARACTER
 * 
 * Placeholder for your hollow figure character.
 * Currently a simple stick-figure-esque shape made of primitives.
 * 
 * The actual character will be:
 * 1. A custom 3D model with hollow geometry
 * 2. Rigged with bones for animation
 * 3. Using morph targets for aging
 * 
 * For now, this demonstrates:
 * - The iridescent material applied
 * - Basic idle animation
 */

export function ShadowCharacter({ position = [0, 0, 0] }) {
  const groupRef = useRef()
  
  // Simple walking animation
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Gentle bobbing motion (simulates walking)
    groupRef.current.position.y = Math.sin(time * 4) * 0.05 + position[1]
    
    // Subtle swaying
    groupRef.current.rotation.z = Math.sin(time * 2) * 0.03
  })
  
  return (
    <group ref={groupRef} position={position}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <IridescentMaterial intensity={1.2} frequency={1.5} />
      </mesh>
      
      {/* Torso - using a torus to simulate hollow effect */}
      <mesh position={[0, 1.1, 0]}>
        <torusGeometry args={[0.15, 0.05, 16, 32]} />
        <IridescentMaterial intensity={1.0} frequency={1.2} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <torusGeometry args={[0.12, 0.04, 16, 32]} />
        <IridescentMaterial intensity={1.0} frequency={1.2} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <torusGeometry args={[0.1, 0.04, 16, 32]} />
        <IridescentMaterial intensity={1.0} frequency={1.2} />
      </mesh>
      
      {/* Arms - simplified */}
      <mesh position={[-0.25, 1.0, 0]} rotation={[0, 0, -0.5]}>
        <capsuleGeometry args={[0.03, 0.4, 8, 16]} />
        <IridescentMaterial intensity={0.9} frequency={1.3} />
      </mesh>
      <mesh position={[0.25, 1.0, 0]} rotation={[0, 0, 0.5]}>
        <capsuleGeometry args={[0.03, 0.4, 8, 16]} />
        <IridescentMaterial intensity={0.9} frequency={1.3} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.1, 0.3, 0]}>
        <capsuleGeometry args={[0.04, 0.5, 8, 16]} />
        <IridescentMaterial intensity={0.9} frequency={1.3} />
      </mesh>
      <mesh position={[0.1, 0.3, 0]}>
        <capsuleGeometry args={[0.04, 0.5, 8, 16]} />
        <IridescentMaterial intensity={0.9} frequency={1.3} />
      </mesh>
    </group>
  )
}
