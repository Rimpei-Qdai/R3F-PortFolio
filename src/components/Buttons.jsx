import { Html } from '@react-three/drei'
import gsap from 'gsap'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFrame, useThree } from 'react-three-fiber'

const Buttons = () => {
      const { camera } = useThree()
    const moveCamera = () => {
        gsap.to(camera.position, {
          x:-5.53,
          y:4.56,
          z:4.95,
          duration:1.5,
          ease: "power2.out",
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