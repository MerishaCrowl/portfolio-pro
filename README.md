# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


//-----------------------------------------------
//Architecture Overview: The Full Vision
//-----------------------------------------------
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PORTFOLIO APPLICATION                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        SCENE MANAGER                                 │   │
│  │  Controls which mode is active and handles transitions               │   │
│  └──────────────────────────┬──────────────────────────────────────────┘   │
│                             │                                               │
│         ┌───────────────────┼───────────────────┐                          │
│         ▼                   ▼                   ▼                          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                    │
│  │ DARK MODE   │    │   REPLAY    │    │ LIGHT MODE  │                    │
│  │ (Story)     │    │ (Cinematic) │    │ (Free Roam) │                    │
│  └─────────────┘    └─────────────┘    └─────────────┘                    │
│         │                   │                   │                          │
│         └───────────────────┼───────────────────┘                          │
│                             ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      SHARED 3D WORLD                                 │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │  Character  │  │    Path     │  │  Projects   │                  │   │
│  │  │  (Aging)    │  │   Course    │  │  (Objects)  │                  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │   │
│  │  │ Background  │  │   Easter    │  │   Lights    │                  │   │
│  │  │ (Stars/Env) │  │    Eggs     │  │  (Toggle)   │                  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

//-------------------------------------
//The Three Modes
//-------------------------------------

INSERT SCREENSHOT

//--------------------------------------
//The Narrative Loop
//--------------------------------------

START (Dark)
    │
    ▼
┌─────────────────────────────────────┐
│  Character walks in place           │
│  World moves past her               │
│  (Parallax illusion)                │
└─────────────────┬───────────────────┘
                  │
                  ▼
         Project 1 approaches
                  │
                  ▼
┌─────────────────────────────────────┐
│  Character morphs into project      │
│  Project content displays           │
│  User interacts                     │
└─────────────────┬───────────────────┘
                  │
                  ▼
         Character morphs back
         (slightly older)
                  │
                  ▼
         ... Repeat for N projects ...
                  │
                  ▼
┌─────────────────────────────────────┐
│  Final project complete             │
│  Character finds step, flips lights │
│  REPLAY TRIGGERS                    │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  CINEMATIC REPLAY                   │
│  Same path, lights ON               │
│  Character now realistic + aging    │
│  Hidden world revealed              │
│  Returns to start                   │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  FREE ROAM UNLOCKED                 │
│  Toggle light/dark                  │
│  Navigate freely                    │
│  Access all portfolio sections      │
└─────────────────────────────────────┘


//----------------------------
//Project Structure
//----------------------------

portfolio-pro/
├── public/
│   ├── models/
│   │   ├── character/
│   │   │   ├── shadow-girl.glb         # Main character model
│   │   │   └── realistic-girl.glb      # Light mode version
│   │   ├── projects/
│   │   │   ├── project-1.glb
│   │   │   └── project-2.glb
│   │   └── environment/
│   │       └── easter-eggs.glb
│   ├── textures/
│   │   ├── matcap-iridescent.png
│   │   └── star-particle.png
│   ├── animations/
│   │   ├── walking.fbx
│   │   ├── skipping.fbx
│   │   ├── running.fbx
│   │   └── ... more animations
│   └── fonts/
│       └── your-font.json
│
├── src/
│   ├── main.jsx                        # Entry point
│   ├── App.jsx                         # Root component
│   │
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Scene.jsx               # Main R3F Canvas wrapper
│   │   │   ├── SceneManager.jsx        # Mode switching logic
│   │   │   └── CameraController.jsx    # Camera behavior per mode
│   │   │
│   │   ├── character/
│   │   │   ├── Character.jsx           # Character wrapper
│   │   │   ├── ShadowCharacter.jsx     # Dark mode hollow figure
│   │   │   ├── RealisticCharacter.jsx  # Light mode filled figure
│   │   │   ├── AnimationController.jsx # Animation state machine
│   │   │   └── AgingSystem.jsx         # Morph targets for aging
│   │   │
│   │   ├── environment/
│   │   │   ├── StarField.jsx           # Particle star system
│   │   │   ├── Aurora.jsx              # Aurora borealis effect
│   │   │   ├── LightWorld.jsx          # Revealed environment
│   │   │   └── EasterEggs.jsx          # Hidden discoverable items
│   │   │
│   │   ├── path/
│   │   │   ├── JourneyPath.jsx         # The course/road
│   │   │   ├── PathProgress.jsx        # Scroll progress tracking
│   │   │   └── ProjectTriggers.jsx     # Collision zones for projects
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectOrb.jsx          # Project container object
│   │   │   ├── ProjectMorph.jsx        # Character→Project transition
│   │   │   └── ProjectContent.jsx      # Actual project display
│   │   │
│   │   ├── effects/
│   │   │   ├── IridescentMaterial.jsx  # Custom oil-spill shader
│   │   │   ├── GlitterFill.jsx         # Heart/glitter effect
│   │   │   └── TransitionEffects.jsx   # Mode transition VFX
│   │   │
│   │   └── ui/
│   │       ├── LoadingScreen.jsx
│   │       ├── ModeToggle.jsx          # Light/dark switch
│   │       ├── Navigation.jsx          # Free roam menu
│   │       └── ProjectModal.jsx        # Project detail view
│   │
│   ├── hooks/
│   │   ├── useJourneyProgress.js       # Scroll position → progress
│   │   ├── useCharacterState.js        # Current animation/age state
│   │   ├── useSceneMode.js             # Dark/replay/light mode
│   │   └── useProjectTrigger.js        # Project approach detection
│   │
│   ├── stores/
│   │   └── journeyStore.js             # Zustand global state
│   │
│   ├── shaders/
│   │   ├── iridescent.vert
│   │   ├── iridescent.frag
│   │   ├── aurora.vert
│   │   ├── aurora.frag
│   │   └── glitter.frag
│   │
│   ├── utils/
│   │   ├── pathUtils.js                # Path interpolation math
│   │   ├── morphUtils.js               # Morph target helpers
│   │   └── animationUtils.js           # Animation blending
│   │
│   ├── data/
│   │   ├── projects.js                 # Your actual projects
│   │   ├── pathWaypoints.js            # Journey course definition
│   │   └── easterEggs.js               # Hidden content definitions
│   │
│   └── styles/
│       ├── index.css
│       └── ui.css
│
├── index.html
├── vite.config.js
├── package.json
├── tailwind.config.js                  # If using Tailwind for UI
└── README.md


//----------------------------------------------
// Tech Stack
//----------------------------------------------

Insert Screenshot