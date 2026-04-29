import { create } from 'zustand'

/**
 * JOURNEY STORE
 * 
 * Central state management for the entire portfolio experience.
 * Uses Zustand for lightweight, React-friendly global state.
 * 
 * Think of this as the "brain" that knows:
 * - How far along the journey the user is
 * - Which mode we're in (dark story, replay, free roam)
 * - Which projects have been visited
 * - Current character age/evolution state
 */

export const useJourneyStore = create((set, get) => ({
  // ============================================
  // SCROLL & PROGRESS
  // ============================================
  
  // 0 to 1 representing journey completion
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  
  // ============================================
  // SCENE MODE
  // ============================================
  
  // 'dark' | 'replay' | 'light'
  mode: 'dark',
  setMode: (mode) => set({ mode }),
  
  // Has the user completed the dark journey at least once?
  journeyCompleted: false,
  completeJourney: () => set({ journeyCompleted: true }),
  
  // Is the replay cinematic currently playing?
  isReplayPlaying: false,
  setReplayPlaying: (playing) => set({ isReplayPlaying: playing }),
  
  // ============================================
  // CHARACTER STATE
  // ============================================
  
  // Current animation: 'idle' | 'walking' | 'running' | 'skipping' | 'stumbling' | etc.
  characterAnimation: 'idle',
  setCharacterAnimation: (anim) => set({ characterAnimation: anim }),
  
  // 0 to 1 representing character age/evolution
  // Increases as projects are completed
  characterAge: 0,
  setCharacterAge: (age) => set({ characterAge: age }),
  
  // ============================================
  // PROJECT TRACKING
  // ============================================
  
  // Array of project IDs that have been visited
  visitedProjects: [],
  visitProject: (projectId) => set((state) => ({
    visitedProjects: [...new Set([...state.visitedProjects, projectId])],
    // Age increases with each project
    characterAge: Math.min(1, (state.visitedProjects.length + 1) / 5) // Assumes 5 projects = fully aged
  })),
  
  // Currently active/focused project (null if none)
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project }),
  
  // Is character currently morphed into a project?
  isMorphedIntoProject: false,
  setMorphedIntoProject: (morphed) => set({ isMorphedIntoProject: morphed }),
  
  // ============================================
  // UI STATE
  // ============================================
  
  // Is the loading screen still visible?
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  
  // For free roam mode: is the menu open?
  menuOpen: false,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  
  // ============================================
  // COMPUTED / DERIVED STATE
  // ============================================
  
  // Helper to check if we should show certain elements
  shouldShowEasterEggs: () => {
    const state = get()
    return state.mode === 'light' || state.mode === 'replay'
  },
  
  // Get the total number of projects
  getTotalProjects: () => 5, // Update this based on your actual projects
  
  // Calculate completion percentage
  getCompletionPercentage: () => {
    const state = get()
    return (state.visitedProjects.length / state.getTotalProjects()) * 100
  }
}))
