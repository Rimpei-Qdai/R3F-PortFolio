import { Center, Edges, useGLTF, useTexture } from "@react-three/drei";
import { TextureLoader } from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

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

useGLTF.preload("/assets/models/Rimpei_Optimized.glb")

const Island = ({ onRendered }) => {
  const gltf = useGLTF("/assets/models/Rimpei_Optimized.glb?v=2", false);
  const nodes = useRef(gltf.nodes)

  const brain = useRef()
  useFrame(() => {
    if(brain.current) {
      brain.current.rotation.z += 0.01
    }
  })


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
      {loading ? (
        <>
        </>
      ) : (
        <>
          <Center scale={0.36} position-y={2}>
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
            <mesh
              key={"Emissions"}
              geometry={nodes.current["Emissions"].geometry}
              position={nodes.current["Emissions"].position}
              scale={nodes.current["Emissions"].scale}
              rotation={nodes.current["Emissions"].rotation}
            >
              <meshBasicMaterial color={"whitesmoke"} />
            </mesh>
            <mesh
              key={"Brain"}
              geometry={nodes.current["Brain"].geometry}
              position={nodes.current["Brain"].position}
              scale={ nodes.current["Brain"].scale }
              rotation={nodes.current["Brain"].rotation}
              ref={ brain }
            >
              <meshBasicMaterial color={ 0x569CD6 } />
              <Edges color="white" lineWidth={0.5} />
            </mesh>
          </Center>
        </>
      )}

    </>
  );
};

export default Island;





