import { useEffect, useRef } from 'react'
import { useJourneyStore } from '../stores/journeyStore'

/**
 * useJourneyProgress
 * 
 * Converts scroll position into journey progress (0 to 1).
 * This is how we drive the "walking in place" illusion:
 * - User scrolls down the page
 * - We calculate how far they've scrolled as a percentage
 * - That percentage drives the world movement and animations
 * 
 * The character appears stationary while the world moves past her.
 */
export function useJourneyProgress() {
  const setScrollProgress = useJourneyStore((state) => state.setScrollProgress)
  const scrollProgress = useJourneyStore((state) => state.scrollProgress)
  const mode = useJourneyStore((state) => state.mode)
  
  // Ref to store the scroll container element
  const scrollRef = useRef(null)
  
  useEffect(() => {
    // Only track scroll in dark (story) mode
    if (mode !== 'dark') return
    
    const handleScroll = () => {
      if (!scrollRef.current) return
      
      const scrollTop = scrollRef.current.scrollTop
      const scrollHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight
      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
      
      setScrollProgress(progress)
    }
    
    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [mode, setScrollProgress])
  
  return { scrollRef, scrollProgress }
}
