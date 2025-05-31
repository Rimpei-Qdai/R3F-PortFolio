import { useEffect } from "react";
import * as THREE from "three";
import { extend, useThree } from "@react-three/fiber";
import { Water } from "three/examples/jsm/objects/Water2.js";

extend({ Water })


const Sea = () => {
  const { scene } = useThree()

  
  useEffect(() => {
    let waterMesh = new THREE.CircleGeometry(120)
  
    const textureLoader = new THREE.TextureLoader()
  
    const water = new Water(waterMesh, {
      textureWidth:256,
      textureHeight:256,
      color:"#ffffff",
      flowDirection: new THREE.Vector2(1, 1),
      scale:10,
      flowSpeed:0.03,
      normalMap0:textureLoader.load("/assets/textures/water/Water_1_M_Normal.jpg"),
      normalMap1:textureLoader.load("/assets/textures/water/Water_2_M_Normal.jpg")
    })
    
    water.rotateX( - Math.PI * 0.5)
    water.position.y = - 0.8
    scene.add(water)
    

    return () => scene.remove(water)

  }, [ scene ])

  return (
    <>
      <mesh rotation={ [- Math.PI * 0.5, 0, 0] } position={ [0, -2, 0] } scale={120} >
        <circleGeometry />
        <meshBasicMaterial color={ 0x001B4C } transparent opacity={ 1 }/>
      </mesh>
    </>

  )
}

export default Sea