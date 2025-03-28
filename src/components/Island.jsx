import { Center, useGLTF, useTexture } from "@react-three/drei";
import { TextureLoader, SRGBColorSpace, LinearMipMapLinearFilter, LinearSRGBColorSpace, } from "three";
import React, { useEffect, useRef, useState } from "react";

useGLTF.preload("/assets/models/Rimpei.glb")
let textureNames = []
if(window.innerWidth <= 768) {
  textureNames = [
    "Ground",
    "Gate",
    "Gate_Name",
    "Logo",
    "Bridge1",
    "Bridge2",
    "Bridge_Fence",
    "Bridge_Light",
    "Tree_Leaves",
    "Tree_Stem",
   ]
} else {
  textureNames = [
    "Ground",
    "Bridge1",
    "Bridge2",
    "Bridge_Fence",
    "Bridge_Light",
    "Grage_Frame",
    "Grage_Content",
    "Building_Frame",
    "Building_Table",
    "Building_Shell",
    // "Building_Display",
    // "Building_Window_Frame",
    // "Clam_School",
    // "Clam_School_Text",
    // "Lab_Frame",
    // "Lab_Interior",
    // "Lab_Circuit",
    // "Log_House",
    // "Log_deck_Camp",
    // "Log_View_Deck",
    // "Gate",
    // "Gate_Name",
    // "Tree_Leaves",
    // "Tree_Stem",
    // "Logo",
    // "Bike_Frame",
    // "Bike_Foak",
    // "Bike_Wheel",
  ];

}

textureNames.forEach((name) => {
  const path = window.innerWidth <= 768 ? `/assets/textures/mobile/${name}.webp` : `/assets/textures/${name}.webp`
  useTexture.preload(path)
})

const Island = ({ onRendered }) => {
  const gltf = useGLTF("/assets/models/Rimpei.glb");
  const nodes = useRef(gltf.nodes)
 
  // テクスチャの状態
  const [textures, setTextures] = useState({});
  const [loading, setLoading] = useState(true); // 読み込み中フラグ

  useEffect(() => {
    const loader = new TextureLoader();

    const loadTextures = async () => {
      const texturePromises = textureNames.map((name) =>
        new Promise((resolve) => {
          const path = window.innerWidth <= 768 ? `/assets/textures/mobile/${name}.webp` : `/assets/textures/${name}.webp`

          loader.load(path, (texture) => {
            texture.flipY = false;
            texture.needsUpdate = true;
            texture.colorSpace = SRGBColorSpace;
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





