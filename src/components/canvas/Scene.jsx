import { Canvas } from '@react-three/fiber'
import { 
  Environment, 
  AdaptiveDpr,
  AdaptiveEvents,
  Preload
} from '@react-three/drei'
import { Suspense } from 'react'

import { StarField } from '../environment/StarField'
import { Aurora } from '../environment/Aurora'
import { ShadowCharacter } from '../character/ShadowCharacter'
import { JourneyWorld } from '../path/JourneyWorld'
import { useJourneyStore } from '../../stores/journeyStore'

/**
 * MAIN SCENE
 * 
 * The root 3D scene component.
 * Sets up:
 * - Canvas with proper settings
 * - Lighting
 * - Environment
 * - All 3D elements
 */

function SceneContent() {
  const mode = useJourneyStore((state) => state.mode)
  
  return (
    <>
      {/* Lighting - very subtle in dark mode */}
      <ambientLight intensity={mode === 'dark' ? 0.1 : 0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={mode === 'dark' ? 0.2 : 1}
        castShadow
      />
      
      {/* Environment - affects reflections on iridescent material */}
      <Environment preset="night" />
      
      {/* Background elements - only in dark mode */}
      {mode === 'dark' && (
        <>
          <StarField count={3000} radius={60} />
          <Aurora 
            position={[0, 25, -40]} 
            scale={[80, 20, 1]}
            minIntensity={0}
            maxIntensity={0.6}
          />
        </>
      )}
      
      {/* The character stays fixed in view */}
      <ShadowCharacter position={[0, 0, 0]} />
      
      {/* The world moves around her */}
      <JourneyWorld>
        {/* Project markers and environmental objects go here */}
        {/* We'll add these in the next phase */}
      </JourneyWorld>
      
      {/* Ground plane - barely visible in dark */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#050505" 
          transparent 
          opacity={mode === 'dark' ? 0.3 : 1}
        />
      </mesh>
    </>
  )
}

export function Scene() {
  const setLoading = useJourneyStore((state) => state.setLoading)
  
  return (
    <Canvas
      shadows
      camera={{ 
        position: [0, 2, 8], 
        fov: 45,
        near: 0.1,
        far: 1000
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      }}
      onCreated={() => {
        // Scene is ready, hide loading screen
        setTimeout(() => setLoading(false), 500)
      }}
    >
      {/* Performance optimizations */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      
      <Suspense fallback={null}>
        <SceneContent />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
