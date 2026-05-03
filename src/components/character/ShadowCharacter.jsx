import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { IridescentMaterial } from '../effects/IridescentMaterial'


/**
 * SHADOW CHARACTER
 * The actual character will be:
 * 1. A custom 3D model with hollow mesh
 * 2. Rigged with bones for animation
 * 3. Using morph targets for aging
 * 
 * For now, this demonstrates:
 * - The iridescent material applied
 * - Basic animation
 **/

const CHARACTER_ANIMATIONS = {
  idle: '/models/character/character_Catching_Breath.glb',
  walk: '/models/character/character_Walking.glb',
  run: '/models/character/character_Running.glb',
  angry: '/models/character/character_Angry_Stomp.glb',
  happyJump: '/models/character/character_Happy_jump_f.glb',
  sad: '/models/character/character_Depressed_Full_Turn_Left.glb',
  limping: '/models/character/character_Limping_Walk_1.glb',
  strut: '/models/character/character_Confident_Strut.glb',
  climb: '/models/character/character_Slow_Ladder_Climb.glb',
  climbFinish: '/models/character/character_Ladder_Climb_Finish.glb'
}
//React creates character component, position places her in the world
    export function ShadowCharacter({ position = [0, 0, 0] }) {
//This is my ref > pointer to my 3D object > puts my character in the scene
    const groupRef = useRef()

//Loads my .glb file, scene = model, animations
    const { scene, animations } = useGLTF('/models/character/character_Walking.glb')
//Attaches animations to my character
    const { actions } = useAnimations(animations, groupRef)

//useEffect runs after everything loads adn actions are available 
    useEffect(() => {
    if (!actions) return

  console.log(Object.keys(actions))

// 1. Stop all previous animations
    Object.values(actions).forEach((action) => {
    action.stop()
    })

// 2. Picks one animation and loads it
  const action = actions['Boxing_Warmup']

    if (!action) {
        console.log ('Animation not found')
        return
    }
// 3. Play it clean, start from frame 0, smooth blend in and start animation
    action?.reset().fadeIn(0.5).play()

// 4. Cleanup Smoothly fades out same animation (optional but good practice)
  return () => {
    action?.fadeOut(0.5)
  }
}, [actions])

//Character container in 3D space, model scale, rotation, and position
  return (
    <group 
    ref={groupRef} 
    position={position} 
    scale={0.75}
    rotation={[0, Math.PI / 2, 0]}>

//Draw the model in the world        
      <primitive object={scene} />
    </group>
  )
}
