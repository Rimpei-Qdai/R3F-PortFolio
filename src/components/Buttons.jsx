import { Html } from '@react-three/drei'
import gsap from 'gsap'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useFrame, useThree } from 'react-three-fiber'

const Buttons = () => {
    const { camera } = useThree()
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
    window.addEventListener('hashchange', (event) => {
      console.log('hashChanged in Button.jsx!')
      if(event.srcElement.location.hash.slice(1) == "works") {
        moveCamera({x:-4.8, y:4, z:6})
      } else if(event.srcElement.location.hash.slice(1) == "labo") {
        moveCamera({x:-8, y:3, z:0})
      } else if(event.srcElement.location.hash.slice(1) == "hobby") {
        moveCamera({x:7, y:3.5, z:1})
      } else {
        backCamera()
      }
    })
  return (
    <>
        <Html position={ [ -12, 5, 2.5 ] }>
          {
            useLocation().hash.slice(1) == "" ? (
              <>
                <a href="#works" >Works</a>
              </>
            ) : (
              <></>
            ) 
          }
        </Html>
        <Html position={ [ -6.5, 1, -9 ] }>
          {
            useLocation().hash.slice(1) == "" ? (
              <>
                <a href="#labo" >Labo</a>
              </>
            ) : (
              <></>
            ) 
          }
        </Html>
        <Html position={ [ 7, 1.5, - 8 ] }>
          {
            useLocation().hash.slice(1) == "" ? (
              <>
                <a href="#hobby" >Hobby</a>
              </>
            ) : (
              <></>
            ) 
          }
        </Html>
    </>
  )
}

export default Buttons