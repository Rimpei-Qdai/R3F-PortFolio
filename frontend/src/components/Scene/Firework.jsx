import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex Shader
const fireworkVertexShader = `
uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aSize;
attribute float aTimeMultiplier;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax) {
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main() {
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;

    // Exploding
    float explodingProgress = remap(progress, 0.0, 0.1, 0.0, 1.0);
    explodingProgress = clamp(explodingProgress, 0.0, 1.0);
    explodingProgress = 1.0 - pow(1.0 - explodingProgress, 3.0);
    newPosition *= explodingProgress;

    // Falling
    float fallingProgress = remap(progress, 0.1, 1.0, 0.0, 1.0);
    fallingProgress = clamp(fallingProgress, 0.0, 1.0);
    fallingProgress = 1.0 - pow(1.0 - fallingProgress, 3.0);
    newPosition.y -= fallingProgress * 0.2;

    // Scaling
    float sizeOpeningProgress = remap(progress, 0.0, 0.125, 0.0, 1.0);
    float sizeClosingProgress = remap(progress, 0.125, 1.0, 1.0, 0.0);
    float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
    sizeProgress = clamp(sizeProgress, 0.0, 1.0);

    // Twinkling
    float twinklingProgress = remap(progress, 0.2, 0.8, 0.0, 1.0);
    twinklingProgress = clamp(twinklingProgress, 0.0, 1.0);
    float sizeTwinkling = sin(progress * 30.0) * 0.5 + 0.5;
    sizeTwinkling = 1.0 - sizeTwinkling * twinklingProgress;

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    
    // Final size
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling;
    gl_PointSize *= 1.2 / - viewPosition.z;
    
    if(gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);
}
`;

// Fragment Shader
const fireworkFragmentShader = `
uniform vec3 uColor;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.3;
    
    gl_FragColor = vec4(uColor, strength);
}
`;

const Firework = ({ isMobile = false }) => {
  const { scene, size, gl, camera } = useThree();
  const fireworksRef = useRef([]);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const createFirework = (position) => {
    const count = Math.round(300 + Math.random() * 400);
    const radius = 1.0 + Math.random() * 1.5;
    
    // Geometry
    const positionsArray = new Float32Array(count * 3);
    const sizesArray = new Float32Array(count);
    const timeMultipliersArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const spherical = new THREE.Spherical(
        radius * (0.75 + Math.random() * 0.25),
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2
      );
      
      const particlePosition = new THREE.Vector3();
      particlePosition.setFromSpherical(spherical);
      
      positionsArray[i3] = particlePosition.x;
      positionsArray[i3 + 1] = particlePosition.y;
      positionsArray[i3 + 2] = particlePosition.z;

      sizesArray[i] = Math.random();
      timeMultipliersArray[i] = 1 + Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3));
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1));
    geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliersArray, 1));

    // Material - ランダムな色
    const hue = Math.random();
    const color = new THREE.Color().setHSL(hue, 1.0, 0.7);
    
    const material = new THREE.ShaderMaterial({
      vertexShader: fireworkVertexShader,
      fragmentShader: fireworkFragmentShader,
      uniforms: {
        uSize: new THREE.Uniform(0.4),
        uResolution: new THREE.Uniform(new THREE.Vector2(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio())),
        uColor: new THREE.Uniform(color),
        uProgress: new THREE.Uniform(0)
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    // Points
    const firework = new THREE.Points(geometry, material);
    firework.position.copy(position);
    scene.add(firework);

    // Create firework data for animation
    const fireworkInfo = {
      points: firework,
      material: material,
      geometry: geometry,
      startTime: Date.now(),
      duration: 2500,
      id: Math.random()
    };

    fireworksRef.current.push(fireworkInfo);
  };

  // アニメーションループ
  useFrame(() => {
    const currentTime = Date.now();
    
    // 各花火のプログレスを更新
    fireworksRef.current = fireworksRef.current.filter((fireworkInfo) => {
      const elapsed = currentTime - fireworkInfo.startTime;
      const progress = Math.min(elapsed / fireworkInfo.duration, 1);
      
      // マテリアルのuProgressを更新
      fireworkInfo.material.uniforms.uProgress.value = progress;
      
      // アニメーション完了時にクリーンアップ
      if (progress >= 1) {
        scene.remove(fireworkInfo.points);
        fireworkInfo.geometry.dispose();
        fireworkInfo.material.dispose();
        return false; // 配列から削除
      }
      
      return true; // 配列に保持
    });
  });

  const handleClick = (event) => {
    // マウス座標を正規化デバイス座標に変換
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // レイキャストを使って3D空間の位置を取得
    raycaster.current.setFromCamera(mouse.current, camera);
    
    // カメラから一定距離の位置に花火を配置
    const distance = 15; // カメラからの距離
    const direction = new THREE.Vector3();
    raycaster.current.ray.direction.normalize();
    direction.copy(raycaster.current.ray.direction).multiplyScalar(distance);
    
    const position = new THREE.Vector3().copy(camera.position).add(direction);
    
    // Y座標を調整（地面より上に）
    position.y = Math.max(position.y, 2);

    // Z軸をランダムに調整（-5から5の範囲）
    if(isMobile) {
      position.z = (Math.random()  * 10) + 20; 
    } else {
      position.z = 15
    }
    console.log(position.z)

    createFirework(position);
  };

  useEffect(() => {
    // クリックイベントリスナーを追加
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      
      // クリーンアップ
      fireworksRef.current.forEach(fireworkInfo => {
        scene.remove(fireworkInfo.points);
        fireworkInfo.geometry.dispose();
        fireworkInfo.material.dispose();
      });
      fireworksRef.current = [];
    };
  }, []);

  return null;
};

export default Firework;
