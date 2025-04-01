import { Center, useGLTF, useTexture } from "@react-three/drei";
import { TextureLoader, SRGBColorSpace, LinearMipMapLinearFilter, LinearSRGBColorSpace, } from "three";
import React, { useEffect, useRef, useState } from "react";

useGLTF.preload("/assets/models/Rimpei.glb")
const textureNames = [
  "Ground_Gate",
  "Logo",
  "Building",
  "Labolatry",
  "Grage",
  "Log_House",
  "Tree",
  "Bridge",
  "Clam_School"
]

textureNames.forEach((name) => {
  const path = `/assets/textures/Optimized/${name}.webp`
  useTexture.preload(path)
})

const Island = ({ onRendered }) => {
  const gltf = useGLTF("/assets/models/Rimpei_Optimized.glb");
  const nodes = useRef(gltf.nodes)
  console.log(nodes)
 
  // テクスチャの状態
  const [textures, setTextures] = useState({});
  const [loading, setLoading] = useState(true); // 読み込み中フラグ

  useEffect(() => {
    const loader = new TextureLoader();

    const loadTextures = async () => {
      const texturePromises = textureNames.map((name) =>
        new Promise((resolve) => {
            const path = `/assets/textures/Optimized/${name}.webp`

          loader.load(path, (texture) => {
            texture.flipY = false;
            // texture.needsUpdate = true;
            // texture.colorSpace = SRGBColorSpace;
            // texture.generateMipmaps = true;
            // texture.minFilter = LinearMipMapLinearFilter;
            resolve({ name, texture });
          })
        })
      );

      const results = await Promise.all(texturePromises);
      const textureMap = results.reduce((acc, { name, texture }) => {
        acc[name] = texture;
        return acc;
      }, {});

      setTextures(textureMap);
      setLoading(false); // すべてのテクスチャがロードされたらフラグを変更
      onRendered(); // ここで初めて `onRendered` を呼ぶ
    };

    loadTextures();
  }, []);


  return (
    <>
        { loading ? (
            <>
            </>
        ) : (
            <>
                  <Center scale={0.2} position-y={2}>
        {textureNames.map((key) =>
            nodes.current[key] ? (
            <mesh
                key={key}
                geometry={nodes.current[key].geometry}
                position={nodes.current[key].position}
                scale={nodes.current[key].scale}
                rotation={nodes.current[key].rotation}
            >
                <meshBasicMaterial map={textures[key]} />
            </mesh>
            ) : null
        )}
        </Center>
            </>
        ) }
  
    </>
  );
};

export default Island;





