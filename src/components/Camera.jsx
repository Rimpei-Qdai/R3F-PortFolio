import { useCamera } from '@react-three/drei'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'



const Camera = () => {
  const { camera } = useThree()
  const [hashName, setHashName] = useState(useLocation().hash.slice(1))
  const [cameraLookAt, setCameraLookAt] = useState(new THREE.Vector3(-0.09197187297645354,  2.12531889455056244,  -0.9878442940311131))
  const currentLookAt = useRef(cameraLookAt)
  const [ targetCameraLookAt, setTargetCameraLookAt ] = useState(cameraLookAt)
  useEffect(() => {
    if(hashName == "works") {
      setTargetCameraLookAt(new THREE.Vector3(-20, 2, 4))
    }
  }, [ ])
  window.addEventListener('hashchange', () => {
    console.log('hash changed!')

    setTargetCameraLookAt(new THREE.Vector3(-20, 2, 4))
    console.log(camera.getWorldDirection(new THREE.Vector3()))
  })

      useFrame((state, delta) => {
        // camera.position.x = Math.sin(state.clock.elapsedTime * 0.1 ) - 0.5
        // camera.position.z = Math.cos(state.clock.elapsedTime * 0.1 ) + 15 
        currentLookAt.current.lerp(targetCameraLookAt, 0.1)
        camera.lookAt(currentLookAt.current)
      })
  return (
    <></>
  )
}

export default Camera