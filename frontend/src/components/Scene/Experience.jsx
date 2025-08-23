// モジュールインポート
import { OrbitControls, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import Camera from './Camera'
import { useLocation } from 'react-router-dom'
import Island from './Island'
import Sea from './Sea'
import Shokora from './Shokora'
import Fire from './Fire'
import Imgs from './Imgs'
import '../../styles/Experience.css'

// コンポーネント
import Buttons from './Buttons'
import * as THREE from 'three'



const Experience = ({ onLoaded }) => {
  

  const [isRenderd, setIsRendered] = useState(false)
  const [ isRenderedShokora, setIsRenderedShokora ] = useState(false)
  const hashName = useLocation().hash.slice(1)
  const [cameraPosition, setCameraPosition] = useState(new THREE.Vector3(2.5611305471454915, 8.789112370409582, 24.548538336427537))



  useEffect(() => {

    if(hashName != "") {
      const twoDContentDOM = document.querySelector(`#twoD-content.${hashName}`)
      if(twoDContentDOM) {
        twoDContentDOM.classList.add('show')
      }
    }
    setTimeout(() => {
      if(isRenderd && isRenderedShokora) {
        onLoaded()
      }
    }, 1000)
  }, [ isRenderd, isRenderedShokora ])
  return (
    <>
    <Canvas
        style={ { zIndex:0 } }
        className='webgl'
        camera={ {
        fov: 45,
        near: 0.1,
        far: 2000,
        position: cameraPosition,
        shadows:false,
    } }
    >
        <color args={ [0x74C2E8] }  attach="background" />
        <Island onRendered={ () => setIsRendered(true) }/>
        <Shokora onRendered={ () => setIsRenderedShokora(true) } />
        <Sea />
        <Fire />
        { window.innerWidth <= 600 ? (
          <>
            <Text
            position={ [ 6, 0.6, -38 ] }
            fontSize={ 7 }
            fontWeight={ 800 }
            maxWidth={ 28 }
            font='/assets/fonts/LINESeedJP_OTF_Eb.woff'
            textAlign='center'
            fillOpacity={ 0.85 }
            rotation={ [ - Math.PI * 0.3, - Math.PI * 0.03, - Math.PI * 0.06 ] }
            // rotation={ [ - Math.PI * 0.5, 0, - Math.PI * 0.08 ] }
            
            >
            Rimpei's
          </Text>
            <Text
            position={ [ 6, 0.2, -22 ] }
            fontSize={ 7 }
            fontWeight={ 800 }
            maxWidth={ 28 }
            font='/assets/fonts/LINESeedJP_OTF_Eb.woff'
            textAlign='center'
            fillOpacity={ 0.85 }
            rotation={ [ - Math.PI * 0.3, - Math.PI * 0.03, - Math.PI * 0.03 ] }
            // rotation={ [ - Math.PI * 0.5, 0, - Math.PI * 0.08 ] }
            
            >
             Portfolio
          </Text>
          </>
        ) : (
          <>
            <Text
            position={ [ 0, -0.5, 14 ] }
            fontSize={ 1.5 }
            fontWeight={ 800 }
            maxWidth={ 55 }
            font='/assets/fonts/LINESeedJP_OTF_Eb.woff'
            rotation={ [ - Math.PI * 0.25, - Math.PI * 0.0, - Math.PI * 0.005 ] }
          >
            Rimpei's Portfolio!
          </Text>
          </>
        ) }
        
        <Buttons />
        <Imgs />
        {/* <OrbitControls
          // enableZoom={false}
          // enablePan={false}
          // minPolarAngle={ 0 }
          // maxPolarAngle={ Math.PI/ 4 }
          // minAzimuthAngle={ - Math.PI / 12 }
          // maxAzimuthAngle={ Math.PI / 36 }
          // rotateSpeed={ 0.05 }
        /> */}
        {/* <OrbitControls /> */}

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