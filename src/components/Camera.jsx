import { useCamera } from '@react-three/drei'
import React from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'

const Camera = () => {
      const { camera } = useThree()
      console.log(camera.position)
      console.log(camera.getWorldDirection(new THREE.Vector3()))
      useFrame((state, delta) => {
        // camera.position.x = Math.sin(state.clock.elapsedTime * 0.1 ) - 0.5
        // camera.position.z = Math.cos(state.clock.elapsedTime * 0.1 ) + 15 
        camera.lookAt( -0.09197187297645354,  2.12531889455056244,  -0.9878442940311131)
      })
  return (
    <></>
  )
}

export default Camera