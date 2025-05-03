import React, { useEffect } from "react";
import waterNormal from "/src/textures/water/Water_1_M_Normal.jpg";
import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { Water } from "three/examples/jsm/objects/Water2.js";
import { texture } from "three/src/nodes/TSL.js";
import { useTexture } from "@react-three/drei";

extend({ Water })


const Sea = () => {
  const { scene } = useThree()

  useEffect(() => {
    const waterMesh = new THREE.CircleGeometry(140)
  
    const textureLoader = new THREE.TextureLoader()
  
    const water = new Water(waterMesh, {
      textureWidth:256,
      textureHeight:256,
      color:"#ffffff",
      flowDirection: new THREE.Vector2(1, 1),
      scale:5,
      flowSpeed:0.01,
      normalMap0:textureLoader.load("/src/textures/water/Water_1_M_Normal.jpg"),
      normalMap1:textureLoader.load("/src/textures/water/Water_2_M_Normal.jpg")
    })
    
    water.rotateX( - Math.PI * 0.5)
    water.position.y = - 0.8
    scene.add(water)
    

    return () => scene.remove(water)

  }, [ scene ])

  return (
    <mesh rotation={ [- Math.PI * 0.5, 0, 0] } position={ [0, -3, 0] } scale={140} >
      <circleGeometry />
      <meshBasicMaterial color={ 0x001B4C } transparent opacity={ 1 }/>
    </mesh>
  )
}

export default Sea