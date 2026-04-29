import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useJourneyStore } from '../../stores/journeyStore'

/**
 * JOURNEY WORLD
 * 
 * This creates the illusion that the character is walking in place
 * while the world moves past her.
 * 
 * As scrollProgress increases, the world translates backwards,
 * creating the illusion of forward movement.
 */

export function JourneyWorld({ children }) {
  const worldRef = useRef()
  const scrollProgress = useJourneyStore((state) => state.scrollProgress)
  const mode = useJourneyStore((state) => state.mode)
  
  // Total "distance" of the journey
  const journeyLength = 100
  
  useFrame(() => {
    if (!worldRef.current) return
    
    if (mode === 'dark') {
      // Move the world backwards as user scrolls
      // This makes the character appear to walk forward
      worldRef.current.position.z = scrollProgress * journeyLength
    }
  })
  
  return (
    <group ref={worldRef}>
      {children}
    </group>
  )
}
