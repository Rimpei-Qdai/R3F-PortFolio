import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'



const Camera = () => {
  const { camera } = useThree()

  //読み込み時にHashを取得
  const hashName = useLocation().hash.slice(1)

  //カメラの目線の初期位置を設定（ホーム画面）
  const firstCameraLookAt = new THREE.Vector3(-0.09197187297645354,  2.12531889455056244,  -0.9878442940311131)
  
  //lerpようにカメラの視線を逐一保存
  const currentLookAt = useRef(firstCameraLookAt)

  //移動先のカメラの視線を保存（最初は初期値と一緒。各セクションのボタンを押してここを変更する）
  const [ targetCameraLookAt, setTargetCameraLookAt ] = useState(firstCameraLookAt)

  //読み込み時の視線の変更
  useEffect(() => {
    
    if(window.innerWidth <= 600) {
      if(hashName == "works") {
        setTargetCameraLookAt(new THREE.Vector3(-16, 0, -1))
      } else if(hashName == "labo") {
        setTargetCameraLookAt(new THREE.Vector3(-6,  1,  -10))
      } else if(hashName == "hobby") {
        setTargetCameraLookAt(new THREE.Vector3(8,  0,  -10))
      } else if(hashName == "vision") {
        setTargetCameraLookAt(new THREE.Vector3(20,  -2.5,  2))
      } else if(hashName == "intro") {
        setTargetCameraLookAt(new THREE.Vector3(-1.5,  0,  0.8))
      } else if(hashName == "sns") {
        setTargetCameraLookAt(new THREE.Vector3(-1,  1.5,  10.5))
      } else {
        setTargetCameraLookAt(new THREE.Vector3(2.2,  9,  -7))
      }
    } else{
      if(hashName == "works") {
        setTargetCameraLookAt(new THREE.Vector3(-20, 2, 4))
      } else if(hashName == "labo") {
        setTargetCameraLookAt(new THREE.Vector3(-8,  1.5,  -10))
      } else if(hashName == "hobby") {
        setTargetCameraLookAt(new THREE.Vector3(20,  -5,  -30))
      } else if(hashName == "vision") {
        setTargetCameraLookAt(new THREE.Vector3(20,  0,  7))
      } else if(hashName == "sns") {
        setTargetCameraLookAt(new THREE.Vector3(-0.5,  0.5,  12))
      } else if(hashName == "intro") {
        setTargetCameraLookAt(new THREE.Vector3(-4.5,  0,  1))
      } else {
        setTargetCameraLookAt(new THREE.Vector3(0,  - 1,  4.5))
      }
    }
  }, [ ])

  window.addEventListener('hashchange', (event) => {
    if(window.innerWidth <= 600) {
      if(event.srcElement.location.hash.slice(1) == "works") {
        setTargetCameraLookAt(new THREE.Vector3(-16, 0, -1))
      } else if(event.srcElement.location.hash.slice(1) == "labo") {
        setTargetCameraLookAt(new THREE.Vector3(-6,  1,  -10))
      } else if(event.srcElement.location.hash.slice(1) == "hobby") {
        setTargetCameraLookAt(new THREE.Vector3(8,  0,  -10))
      } else if(event.srcElement.location.hash.slice(1) == "vision") {
        setTargetCameraLookAt(new THREE.Vector3(20,  -2.5,  2))
      } else if(event.srcElement.location.hash.slice(1) == "sns") {
        setTargetCameraLookAt(new THREE.Vector3(-1,  1.5,  10.5))
      } else if(event.srcElement.location.hash.slice(1) == "intro") {
        setTargetCameraLookAt(new THREE.Vector3(-1.5,  0,  0.8))
      }  else {
        setTargetCameraLookAt(new THREE.Vector3(2.2,  9,  -7))
      }
    } else {
      if(event.srcElement.location.hash.slice(1) == "works") {
        setTargetCameraLookAt(new THREE.Vector3(-15, 1.5, 3))
      } else if(event.srcElement.location.hash.slice(1) == "labo") {
        setTargetCameraLookAt(new THREE.Vector3(-8,  1.5,  -10))
      } else if(event.srcElement.location.hash.slice(1) == "hobby") {
        setTargetCameraLookAt(new THREE.Vector3(20,  -5,  -30))
      } else if(event.srcElement.location.hash.slice(1) == "vision") {
        setTargetCameraLookAt(new THREE.Vector3(20,  0,  7))
      } else if(event.srcElement.location.hash.slice(1) == "sns") {
        setTargetCameraLookAt(new THREE.Vector3(-0.5,  0.5,  12))
      } else if(event.srcElement.location.hash.slice(1) == "intro") {
        setTargetCameraLookAt(new THREE.Vector3(-4.5,  0,  1))
      } else {
        setTargetCameraLookAt(new THREE.Vector3(0,  - 1,  4.5))
      }
    }

  })

      useFrame((state, delta) => {
        // camera.position.x = Math.sin(state.clock.elapsedTime * 0.1 ) - 0.5
        // camera.position.z = Math.cos(state.clock.elapsedTime * 0.1 ) + 15 
        currentLookAt.current.lerp(targetCameraLookAt, 0.03)
        camera.lookAt(currentLookAt.current)
      })
  return (
    <></>
  )
}

export default Camera