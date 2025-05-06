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

        if(window.innerWidth <= 600) {
          gsap.to(camera.position, {
            x:-9,
            y: 50,
            z: 38,
            duration:3,
            ease: "power2.out",
          })
        } else {
          gsap.to(camera.position, {
            x:1.5,
            y: 13,
            z: 25,
            duration:3,
            ease: "power2.out",
          })
          // gsap.to(camera.position, {
          //   x:2.5611305471454915,
          //   y: 8.789112370409582,
          //   z: 24.548538336427537,
          //   duration:3,
          //   ease: "power2.out",
          // })

        }
    }

    useEffect(() => {
      if(window.innerWidth <= 600) {
        if(hashName == "works") {
          moveCamera({x:-4, y:6, z:8})
        } else if(hashName == "labo") {
          moveCamera({x:-6, y:7, z:1.5})
        } else if(hashName == "hobby") {
          moveCamera({x:6.5, y:5, z:4.5})
        } else if(hashName == "vision") {
          moveCamera({x:3, y:4.5, z:5})
        } else if(hashName == "sns") {
          moveCamera({x:3.2, y:1.5, z:12.5})
        } else if(hashName == "intro") {
          moveCamera({x:-1.5, y:20, z:5})
        } else {
          backCamera()
        }
      } else {
        if(hashName == "works") {
          moveCamera({x:-4.8, y:4, z:6})
        } else if(hashName == "labo") {
          moveCamera({x:-8, y:3, z:0})
        } else if(hashName == "hobby") {
          moveCamera({x:7, y:3.5, z:1})
        } else if(hashName == "vision") {
          moveCamera({x:6, y:2.5, z:3.5})
        } else if(hashName == "sns") {
          moveCamera({x:0, y:1.5, z:15})
        } else if(hashName == "intro") {
          moveCamera({x:-3, y:9, z:9})
        } else {
          backCamera()
        }

      }
    }, [ hashName ])

    useEffect(() => {
      window.addEventListener('hashchange', (event) => {
        setHashName(event.srcElement.location.hash.slice(1))
        if(event.srcElement.location.hash.slice(1) != "") {
          const sectionDOM = document.querySelector(`#twoD-content.${event.srcElement.location.hash.slice(1)}`)
          if(sectionDOM) {
            setTimeout(() => {
              sectionDOM.classList.add('show')
            }, 100)
          }
        }
      })
    }, [ ])





  return (
    <>
      {
        !(hashName == "works" || hashName == "labo" || hashName == "hobby" || hashName == "vision" || hashName == "sns" || hashName == "works" || hashName == "intro" ) && window.innerWidth >= 1000  ? (
          <>
            <Html position={ [ -15, -0.9, 2.3 ] } >
              <a className='ThreeeD-Button' href="#works" >
                <div className="text">
                  Works
                </div>
                </a>
            </Html>
            <Html position={ [ - 8, 4, -8 ] }>
              <a className='ThreeeD-Button' href="#labo" >
              <div className="text">
                  Labo
                </div>
              </a>
            </Html>
            <Html position={ [ 6, -0.4, - 7 ] }>
              <a className='ThreeeD-Button' href="#hobby" >
              <div className="text">
                  Hobby
                </div>
              </a>
            </Html>
            <Html position={ [ 11, -1.5, 3 ] }>
              <a className='ThreeeD-Button' href="#vision" >
                <div className="text">
                 Vision
                </div>
              </a>       
            </Html>
            <Html position={ [ - 1.8, 0.6, 12 ] }>   
              <a className='ThreeeD-Button' href="#sns" >
                <div className="text">
                  SNS
                </div>
              </a>    
            </Html>
            <Html position={ [ - 3.8, 1, -1 ] }>   
              <a className='ThreeeD-Button' href="#intro" ><div className="text">
                  Intro
                </div></a>    
            </Html>
        </>
        ) : hashName == "sns" ? (
          <>
            {/* <Html position={ [ 0.75, 1.05, 11.1 ] } rotation={ [ 0, 0, 0 ] }>   
              <a className='sns-links' href="https://instagram.com" ></a>    
            </Html>
            <Html position={ [ 0.4, 1.07, 11.1 ] } rotation={ [ 0, 0, 0 ] }>   
              <a className='sns-links' href="https://x.com" ></a>    
            </Html>
            <Html position={ [ - 1.88, 1.05, 11.1 ] } rotation={ [ 0, 0, 0 ] }>   
              <a className='sns-links' href="https://facebook.com" ></a>    
            </Html> */}
          </>
        ) : (
          <></>
        )
      }   
    </>
  )
}

export default Buttons