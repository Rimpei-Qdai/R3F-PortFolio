import { Html } from '@react-three/drei'
import gsap from 'gsap'
import React from 'react'
import { useThree } from 'react-three-fiber'

const Buttons = () => {
      const { camera } = useThree()
    const moveCamera = () => {
        gsap.to(camera.position, {
            x:1,
            y:1,
            z:0,
            duration:2
        })
    }
  return (
    <>
        <Html>
          <a href="#works" onClick={() => {moveCamera()}} >Works</a>
        </Html>
    </>
  )
}

export default Buttons