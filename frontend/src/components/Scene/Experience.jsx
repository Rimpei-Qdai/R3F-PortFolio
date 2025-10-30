// モジュールインポート
import { DeviceOrientationControls, OrbitControls, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState, useRef } from 'react'
import Camera from './Camera'
import { useLocation } from 'react-router-dom'
import Island from './Island'
import Sea from './Sea'
import Shokora from './Shokora'
import Fire from './Fire'
import Imgs from './Imgs'
import Firework from './Firework'
import '../../styles/Experience.css'

// コンポーネント
import Buttons from './Buttons'
import * as THREE from 'three'



const Experience = ({ onLoaded }) => {
  
  const orbitControlsRef = useRef()
  const [isRenderd, setIsRendered] = useState(false)
  const [ isRenderedShokora, setIsRenderedShokora ] = useState(false)
  const location = useLocation()
  const [hashName, setHashName] = useState(location.hash.slice(1))
  const [cameraPosition] = useState(new THREE.Vector3(2.5611305471454915, 8.789112370409582, 24.548538336427537))
  
  // 角度制限の設定（ホーム画面かどうかで切り替え）
  const [angleConstraints, setAngleConstraints] = useState({
    minPolarAngle: window.innerWidth <= 600 ? Math.PI / 8 : Math.PI / 4,
    maxPolarAngle: window.innerWidth <= 600 ? Math.PI / 4.8 : Math.PI / 3,
    minAzimuthAngle: -Math.PI / 6,
    maxAzimuthAngle: Math.PI / 6
  })

  // hashが変わったら角度制限を更新
  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1)
      setHashName(newHash)
      
      if (newHash === "") {
        // ホーム画面：角度制限あり
        setAngleConstraints({
          minPolarAngle: window.innerWidth <= 600 ? Math.PI / 8 : Math.PI / 4,
          maxPolarAngle: window.innerWidth <= 600 ? Math.PI / 4 : Math.PI / 3,
          minAzimuthAngle: -Math.PI / 6,
          maxAzimuthAngle: Math.PI / 6
        })
      } else {
        // 各セクション：角度制限なし
        setAngleConstraints({
          minPolarAngle: 0,
          maxPolarAngle: Math.PI,
          minAzimuthAngle: -Infinity,
          maxAzimuthAngle: Infinity
        })
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // 初期化時にも実行

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])



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
        <Camera orbitControlsRef={orbitControlsRef} />
        <OrbitControls 
          ref={orbitControlsRef}
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={ angleConstraints.minPolarAngle }
          maxPolarAngle={ angleConstraints.maxPolarAngle }
          minAzimuthAngle={ angleConstraints.minAzimuthAngle }
          maxAzimuthAngle={ angleConstraints.maxAzimuthAngle }
          rotateSpeed={ 0.03 }
          makeDefault
          target={[0, 0, 0]}
          enableDamping={true}
        />
        {hashName === "" && <Firework isMobile={window.innerWidth <= 600} />}
      </>
    ) : (
      <></>
    ) }
      
    

    </Canvas>
    </>
  )
}

export default Experience