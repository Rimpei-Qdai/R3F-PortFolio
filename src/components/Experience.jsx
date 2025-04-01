import { Html, Loader, OrbitControls, Text } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import './Experience.css'
import Island from './Island'
import Sea from './Sea'
import { useEffect, useRef, useState } from 'react'
import Camera from './Camera'
import { SRGBColorSpace } from 'three'
import { Link, useLocation } from 'react-router-dom'
import Buttons from './Buttons'
import * as THREE from 'three'
import { hash } from 'three/tsl'


const Experience = ({ onLoaded }) => {
  

  const [isRenderd, setIsRendered] = useState(false)
  const hashName = useLocation().hash.slice(1)
  const [cameraPosition, setCameraPosition] = useState(new THREE.Vector3(2.5611305471454915, 8.789112370409582, 24.548538336427537))



  useEffect(() => {
    if(hashName == "works") {
      setCameraPosition(new THREE.Vector3(-4.8, 4, 6))
    } else if(hashName == "labo") {
      setCameraPosition(new THREE.Vector3(-8, 3, 0))
    } else if(hashName == "hobby") {
      setCameraPosition(new THREE.Vector3(7, 3.5, 1))
    } else if(hashName == "philosophy") {
      setCameraPosition(new THREE.Vector3(6, 2.5, 3.5))
    } else if(hashName == "sns") {
      setCameraPosition(new THREE.Vector3(0, 1.5, 15))
    }
    setTimeout(() => {
      if(isRenderd) {
        onLoaded()
      }
    }, 1000)
  }, [ isRenderd ])
  return (
    <>
    <Canvas
        className='webgl'
        camera={ {
        fov: 45,
        near: 0.1,
        far: 2000,
        position: cameraPosition,
        shadows:false,
    } }
    >
        <color args={ [ 0x5ccae6 ] } attach="background" />
        <Island onRendered={ () => setIsRendered(true) }/>
        <Sea />
        <Text
          position={ [ -4, 8, -35 ] }
          fontSize={ 5 }
          fontWeight={ 800 }
          maxWidth={ 55 }
          font='/assets/fonts/LINESeedJP_OTF_Eb.woff'
          
        >
          Welcome to Rimpei's Portfolio!
        </Text>
        <Buttons />

        { isRenderd ? (
      <>
        <Camera />

      </>
    ) : (
      <></>
    ) }
      
    

    </Canvas>
    </>
  )
}

export default Experience