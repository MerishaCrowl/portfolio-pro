import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
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
    // THIS is your ref
  const groupRef = useRef()

    const { scene, animations } = useGLTF('/models/character/character.glb')
    const { actions } = useAnimations(animations, groupRef)
  
  useEffect(() => {
  if (!actions) return

  console.log('Available animations:', actions)

  const first = Object.values(actions)[0]
  first?.reset().fadeIn(0.5).play()

  return () => first?.fadeOut(0.5)
}, [actions])
  
  return (
    <group ref={groupRef} position={position}>
      <primitive object={scene} />
    </group>
  )
}
