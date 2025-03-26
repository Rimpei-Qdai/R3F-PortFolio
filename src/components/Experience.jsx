import { Loader, OrbitControls, Text } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import './Experience.css'
import Island from './Island'
import Sea from './Sea'
import { useEffect, useRef, useState } from 'react'
import Camera from './Camera'
import { SRGBColorSpace } from 'three'


const Experience = ({ onLoaded }) => {
  const [isRenderd, setIsRendered] = useState(false)
  useEffect(() => {

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
        position: [2.5611305471454915, 8.789112370409582, 24.548538336427537],
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
          maxWidth={ 50 }
          
        >
          Welcome to Rimpei's Portfolio!
        </Text>
        { isRenderd ? (
      <>
        <Camera />
        <OrbitControls /></>
    ) : (
      <></>
    ) }
      
    

    </Canvas>
    </>
  )
}

export default Experience