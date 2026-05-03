import { Scene } from './components/canvas/Scene'
import { useJourneyProgress } from './hooks/useJourneyProgress'
import { useJourneyStore } from './stores/journeyStore'

/**
 * MAIN APP
 * 
 * Combines:
 * 1. The 3D Canvas (fixed position, full screen)
 * 2. The scroll container (creates scroll height for journey progress)
 * 3. UI overlays (loading, menus, etc.)
 */

function LoadingScreen() {
  const isLoading = useJourneyStore((state) => state.isLoading)
  
  if (!isLoading) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-white text-center">
        <div className="animate-pulse text-2xl mb-4">✦</div>
        <p className="text-sm opacity-60">Entering the void...</p>
        <div className="bg-red-500 text-white p-4">
  Tailwind test
</div>
      </div>
    </div>
  )
}

function ScrollContainer() {
  const { scrollRef } = useJourneyProgress()
  const mode = useJourneyStore((state) => state.mode)
  
  // Only show scroll container in story mode
  if (mode !== 'dark') return null
  
  return (
    <div ref={scrollRef} className="scroll-container">
      <div className="scroll-content">
        {/* This div just creates scrollable height */}
        {/* The actual content is in the 3D scene */}
      </div>
    </div>
  )
}

function ProgressIndicator() {
  const scrollProgress = useJourneyStore((state) => state.scrollProgress)
  const mode = useJourneyStore((state) => state.mode)
  
  if (mode !== 'dark') return null
  
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white/40 rounded-full transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      <p className="text-white/40 text-xs text-center mt-2">
        Scroll to journey forward
      </p>
    </div>
  )
}

function ModeToggle() {
  const mode = useJourneyStore((state) => state.mode)
  const setMode = useJourneyStore((state) => state.setMode)
  const journeyCompleted = useJourneyStore((state) => state.journeyCompleted)
  
  // Only show after journey is complete
  if (!journeyCompleted) return null
  
  return (
    <div className="fixed top-4 right-4 z-20">
      <button
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        className="px-4 py-2 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors"
      >
        {mode === 'dark' ? '☀️ Enter Light' : '🌙 Return to Dark'}
      </button>
    </div>
  )
}

export default function App() {
  return (
    <div className="w-full h-full">
      {/* Loading screen */}
      <LoadingScreen />
      
      {/* 3D Canvas - always rendered */}
      <div className="canvas-container">
        <Scene />
      </div>
      
      {/* Scroll container for journey progress */}
      <ScrollContainer />
      
      {/* UI overlays */}
      <ProgressIndicator />
      <ModeToggle />
    </div>
  )
}
