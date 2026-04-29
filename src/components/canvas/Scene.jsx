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

function SceneContent() {
  const mode = useJourneyStore((state) => state.mode)
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={mode === 'dark' ? 0.1 : 0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={mode === 'dark' ? 0.2 : 1}
      />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Background elements */}
      {mode === 'dark' && (
        <>
          <StarField count={3000} radius={80} />
          <Aurora 
            position={[0, 15, -50]} 
            scale={[100, 25, 1]}
            minIntensity={0.2}
            maxIntensity={0.7}
          />
        </>
      )}
      
      {/* Character at ground level */}
      <ShadowCharacter position={[0, 0, 0]} />
      
      {/* World container */}
      <JourneyWorld>
        {/* Future project markers go here */}
      </JourneyWorld>
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial 
          color="#030303" 
          transparent 
          opacity={0.5}
        />
      </mesh>
    </>
  )
}

export function Scene() {
  const setLoading = useJourneyStore((state) => state.setLoading)
  
  return (
    <Canvas
      shadows="basic"
      camera={{ 
        position: [0, 1.5, 6],  // Lower and closer
        fov: 50,
        near: 0.1,
        far: 500
      }}
      gl={{
        antialias: true,
        alpha: false,  // Changed to false for solid black background
        powerPreference: 'high-performance'
      }}
      style={{ background: '#000' }}
      onCreated={() => {
        setTimeout(() => setLoading(false), 500)
      }}
    >
      <color attach="background" args={['#000000']} />
      
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      
      <Suspense fallback={null}>
        <SceneContent />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
