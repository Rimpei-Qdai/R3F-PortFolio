import { Center, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { TextureUtils } from 'three';
import { TextureLoader } from "three";

const Shokora = ({ onRendered }) => {
      const gltf = useGLTF("/assets/models/Shokora.glb?v=2", false);
      const nodes = useRef(gltf.nodes)


      const [texture, setTexture] = useState(false);
      const [loaded, setLoaded] = useState(false);

      useEffect(() => {
        const loader = new TextureLoader();
        loader.load("/assets/textures/Optimized/Shokora.webp", (texture) => {
            texture.flipY = false
            setTexture(texture)
        })

        setLoaded(true)
        onRendered()


      }, [ ])

  return (
   <>
    {
        loaded ? (
            <>
                {/* <Center> */}
                    <mesh
                        geometry={ nodes.current['Shokora'].geometry }
                        // position={ [nodes.current['Shokora'].position.x + 10, nodes.current['Shokora'].position.y, nodes.current['Shokora'].position.z ]  }
                        position={ [11, 1.2, 4.8] }
                        scale={ [0.05, 0.05 , 0.05] }
                        rotation={ [ 0, Math.PI * - 0.3, 0] }
                    >
                        <meshBasicMaterial map={ texture } />
                    </mesh>
                {/* </Center> */}
            </>
        ) : null
    }
   </>
  )
}

export default Shokora