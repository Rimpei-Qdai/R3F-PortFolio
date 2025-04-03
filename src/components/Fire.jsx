import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import particleFire from 'three-particle-fire'
import { useFrame, useThree } from 'react-three-fiber'

particleFire.install({ THREE: THREE })

const Fire = () => {
    
    const { scene, camera } = useThree()
    const fireRef = useRef(null) // 🔥 useRef を追加

    useEffect(() => {
        const fireGeometry = new particleFire.Geometry(0.1, 0.6, 15)
        const fireMaterial = new particleFire.Material({ color: "orange" })
        fireMaterial.setPerspective(camera.fov, window.innerHeight)
        const fire = new THREE.Points(fireGeometry, fireMaterial)

        fire.position.set(10.1, 0.6, 3.95)
        fire.scale.set(0.1,0.5, 0.1)
        scene.add(fire)
        fireRef.current = fire // 🔥 useRef に fire を格納

        return () => scene.remove(fire)
    }, [camera, scene]) // 依存配列を追加

    useFrame((_, delta) => {
        if (fireRef.current) {
            fireRef.current.material.update(delta * 0.5)
            fireRef.current.rotation.y += 0.01 // 🔥 useRef を参照して更新
        }
    })

    return (
    <></>
  )
}

export default Fire