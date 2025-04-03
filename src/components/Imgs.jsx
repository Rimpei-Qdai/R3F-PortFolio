import React from 'react'
import { Html, useTexture } from '@react-three/drei'
import { SRGBColorSpace } from 'three'

const Imgs = () => {
  const hoshTexture = useTexture("/assets/imgs/Hosh.png")
  hoshTexture.colorSpace = SRGBColorSpace
  return (
    <>
       <mesh position={[ -12.41, 4.55, -0.48 ]} scale={ [ 0.77, 0.44, 1 ] } rotation={[ 0, - Math.PI * 0.058, 0 ]}>
        <planeGeometry />
        <meshBasicMaterial map={ hoshTexture } />
       </mesh>
    </>
  )
}

export default Imgs