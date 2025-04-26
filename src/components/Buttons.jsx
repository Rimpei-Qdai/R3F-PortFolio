import { Float, Html } from '@react-three/drei'
import gsap from 'gsap'
import { useLocation } from 'react-router-dom'
import { useThree } from 'react-three-fiber'
import '../styles/buttons.css'
import { useEffect, useState } from 'react'
import { hash } from 'three/tsl'

const Buttons = () => {
    const { camera } = useThree()
    const [ hashName, setHashName ] = useState(useLocation().hash.slice(1))
    const moveCamera = (cameraPosition) => {
        gsap.to(camera.position, {
          x:cameraPosition.x,
          y:cameraPosition.y,
          z:cameraPosition.z,
          duration:3,
          ease: "power2.out",
        })
    }
    const backCamera = () => {
        gsap.to(camera.position, {
          x:2.5611305471454915,
          y: 8.789112370409582,
          z: 24.548538336427537,
          duration:3,
          ease: "power2.out",
        })
    }

    useEffect(() => {
      if(hashName == "works") {
        moveCamera({x:-4.8, y:4, z:6})
      } else if(hashName == "labo") {
        moveCamera({x:-8, y:3, z:0})
      } else if(hashName == "hobby") {
        moveCamera({x:7, y:3.5, z:1})
      } else if(hashName == "philosophy") {
        moveCamera({x:6, y:2.5, z:3.5})
      } else if(hashName == "sns") {
        moveCamera({x:0, y:1.5, z:15})
      } else {
        backCamera()
      }
    }, [ hashName ])


    window.addEventListener('hashchange', (event) => {
      setHashName(event.srcElement.location.hash.slice(1))
    })


  return (
    <>
      {
        hashName == "" ? (
          <>
          <Float
            speed={0.5} // 回転速度。デフォルトでは1
            rotationIntensity={0.1} // 回転強度。デフォルトでは1
            floatIntensity={0.1} // 上下の Float の強度。デフォルトでは1
            floatingRange={[-0.01, 0.01]} // オブジェクトが浮動する Y 軸値の範囲。デフォルトは [-0.1,0.1]
          >
            <Html position={ [ -12, 6.5, 2.5 ] }>
              <a className='ThreeeD-Button' href="#works" >Works</a>
            </Html>
          </Float>
            <Html position={ [ - 7, 4.2, -9 ] }>
              <a className='ThreeeD-Button' href="#labo" >Labo</a>
            </Html>
            <Html position={ [ 6.4, 4.3, - 8 ] }>
              <a className='ThreeeD-Button' href="#hobby" >Hobby</a>
            </Html>
            <Html position={ [ 10.5, 3.3, 3 ] }>
              <a className='ThreeeD-Button' href="#philosophy" >Phil</a>       
            </Html>
            <Html position={ [ - 0.7, 2.8, 12 ] }>   
              <a className='ThreeeD-Button' href="#sns" >SNS</a>    
            </Html>
        </>
        ) : hashName == "sns" ? (
          <>
            <Html position={ [ 0.75, 1.05, 11.1 ] } rotation={ [ 0, 0, 0 ] }>   
              <a className='sns-links' href="https://instagram.com" ></a>    
            </Html>
            <Html position={ [ 0.4, 1.07, 11.1 ] } rotation={ [ 0, 0, 0 ] }>   
              <a className='sns-links' href="https://x.com" ></a>    
            </Html>
            <Html position={ [ - 1.88, 1.05, 11.1 ] } rotation={ [ 0, 0, 0 ] }>   
              <a className='sns-links' href="https://facebook.com" ></a>    
            </Html>
          </>
        ) : (
          <></>
        )
      }   
    </>
  )
}

export default Buttons