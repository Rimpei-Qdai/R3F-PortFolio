import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Vertex Shader
const fireworkVertexShader = `
uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;
uniform sampler2D uPictureTexture;

attribute float aSize;
attribute float aTimeMultiplier;
attribute vec2 aUv;

varying vec3 vColor;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax) {
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main() {
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;
    
    // Picture intensity from texture
    float pictureIntensity = texture(uPictureTexture, aUv).r;

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
    
    // Final size (influenced by picture intensity)
    // pictureIntensity を最小値0.3に制限して、暗い部分も見えるように
    float visibleIntensity = max(pictureIntensity, 0.3);
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling * visibleIntensity;
    gl_PointSize *= 3.0 / - viewPosition.z;
    
    // Varyings - darker where picture is darker
    vColor = vec3(pictureIntensity);
    
    // サイズが小さすぎる時だけ非表示（しきい値を下げる）
    if(gl_PointSize < 0.5)
        gl_Position = vec4(9999.9);
}
`;

// Fragment Shader
const fireworkFragmentShader = `
uniform vec3 uColor;
varying vec3 vColor;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.3;
    
    // Use vColor to modulate the color based on picture intensity
    vec3 finalColor = uColor * vColor;
    
    gl_FragColor = vec4(finalColor, strength);
}
`;

const Firework = ({ isMobile = false }) => {
  const { scene, size, gl, camera } = useThree();
  const fireworksRef = useRef([]);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  
  // 馬のテクスチャを読み込み
  const horseTexture = useTexture('/assets/textures/fireworks/eto_uma_family.png');
  
  useEffect(() => {
    console.log('🎆 Firework component mounted');
    console.log('📸 Texture loaded:', horseTexture);
    console.log('📏 Texture size:', horseTexture.image?.width, 'x', horseTexture.image?.height);
  }, [horseTexture]);

  const createFirework = (position) => {
    console.log('🎇 Creating firework at:', position);
    // テクスチャベースのパーティクル生成
    // 解像度を設定（より多くのパーティクルで詳細な形を表現）
    const resolution = 128;
    const particleCount = resolution * resolution;
    
    // Geometry
    const positionsArray = new Float32Array(particleCount * 3);
    const sizesArray = new Float32Array(particleCount);
    const timeMultipliersArray = new Float32Array(particleCount);
    const uvsArray = new Float32Array(particleCount * 2);

    let particleIndex = 0;
    
    for (let y = 0; y < resolution; y++) {
      for (let x = 0; x < resolution; x++) {
        const i3 = particleIndex * 3;
        const i2 = particleIndex * 2;
        
        // UV座標（0-1の範囲）
        const u = x / (resolution - 1);
        const v = y / (resolution - 1);
        
        // UV座標を-1から1の範囲に変換（中心を原点に）、スケールを3倍に
        const scale = 3.0;
        const posX = (u - 0.5) * 2.0 * scale;
        const posY = (v - 0.5) * 2.0 * scale;
        const posZ = (Math.random() - 0.5) * 0.3; // 少しの奥行き
        
        positionsArray[i3] = posX;
        positionsArray[i3 + 1] = posY;
        positionsArray[i3 + 2] = posZ;
        
        uvsArray[i2] = u;
        uvsArray[i2 + 1] = v;

        sizesArray[particleIndex] = Math.random() * 0.5 + 0.5;
        timeMultipliersArray[particleIndex] = 1 + Math.random() * 0.3;
        
        particleIndex++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3));
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1));
    geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliersArray, 1));
    geometry.setAttribute('aUv', new THREE.Float32BufferAttribute(uvsArray, 2));

    // Material - ランダムな明るい色
    const hue = Math.random();
    const color = new THREE.Color().setHSL(hue, 1.0, 0.8);
    
    const material = new THREE.ShaderMaterial({
      vertexShader: fireworkVertexShader,
      fragmentShader: fireworkFragmentShader,
      uniforms: {
        uSize: { value: isMobile ? 0.15 : 0.25 }, // デスクトップで大幅増加
        uResolution: { value: new THREE.Vector2(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio()) },
        uProgress: { value: 0.05 }, // 初期状態で少し展開
        uColor: { value: color },
        uPictureTexture: { value: horseTexture }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    points.position.copy(position);
    
    console.log('✨ Points created:', {
      particleCount,
      position: points.position,
      material: material,
      geometry: geometry
    });

    const firework = {
      mesh: points,
      startTime: Date.now(),
      duration: 2500,
      destroy: function() {
        geometry.dispose();
        material.dispose();
        scene.remove(this.mesh);
      }
    };

    scene.add(points);
    fireworksRef.current.push(firework);

    console.log('🎆 Firework added to scene. Total fireworks:', fireworksRef.current.length);

    return firework;
  };

  const handleClick = (event) => {
    console.log('🖱️ Click detected:', event.clientX, event.clientY);
    
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
      position.z = (Math.random() * 10) + 20; 
    } else {
      position.z = 15;
    }

    console.log('📍 Firework position:', position);

    createFirework(position);
  };

  useEffect(() => {
    // クリックイベントリスナーを追加
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      
      // クリーンアップ
      fireworksRef.current.forEach(firework => firework.destroy());
    };
  }, []);

  useFrame(() => {
    const now = Date.now();

    for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
      const firework = fireworksRef.current[i];
      const elapsed = now - firework.startTime;
      const progress = Math.min(elapsed / firework.duration, 1);

      firework.mesh.material.uniforms.uProgress.value = progress;
      
      // 最初のフレームだけログ
      if (elapsed < 100 && i === 0) {
        console.log('🎬 Animating firework:', { progress, elapsed, visible: firework.mesh.visible });
      }

      if (progress >= 1) {
        console.log('💥 Firework finished, removing');
        firework.destroy();
        fireworksRef.current.splice(i, 1);
      }
    }
  });

  return null;
};

export default Firework;
