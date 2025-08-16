import { Center, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { TextureUtils } from 'three';
import { TextureLoader } from "three";

const Shokora = () => {
      const gltf = useGLTF("/assets/models/Shokora.glb?v=2", false);
      const nodes = useRef(gltf.nodes)


      const [texture, setTexture] = useState(false);
      const [loaded, setLoaded] = useState(false);

      useEffect(() => {
        const loader = new TextureLoader();
        loader.load("/assets/textures/Optimized/Shokora.webp", (texture) => {
            texture.flipY = false
            console.log(nodes)
            setTexture(texture)
            console.log(texture)
        })

        setLoaded(true)

      }, [ ])

  return (
   <>
    {
        loaded ? (
            <>
                <Center>
                    <mesh
                        geometry={ nodes.current['Shokora'].geometry }
                        position={ [10.8, 1.3, 4.7] }
                        scale={ [0.06, 0.06 , 0.06] }
                        rotation={ [ 0, Math.PI * - 0.25, 0 ] }
                    >
                        <meshBasicMaterial map={ texture } />
                    </mesh>
                </Center>
            </>
        ) : null
    }
   </>
  )
}

export default Shokora