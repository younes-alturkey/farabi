import './FarabiAvatar.css'
import farabiAvatar from 'static/farabi-avatar.glb'
import React, { useState, useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useLoader, useFrame, Canvas } from '@react-three/fiber'
import CircularProgress from '@mui/material/CircularProgress'
import bhrMark from 'static/mark.svg'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

export default function FarabiAvatar() {
    const [modelIsLoading, setModelIsLoading] = useState(true)
    const [state, setState] = useState({ x: 0, y: 0 })
    const mouseHandler = e => {
        setState({
            x: e.clientX / e.view.innerWidth - 0.5,
            y: e.clientY / e.view.innerHeight - 0.5,
        })
    }

    return (
        <>
            <div
                className="model-loading-container"
                style={{ display: modelIsLoading ? 'flex' : 'none' }}
            >
                <img className="bhr-mark" src={bhrMark} alt="Bhr logo mark" />
            </div>

            <div
                className="farabi-card"
                onMouseMove={mouseHandler}
                style={{ visibility: modelIsLoading ? 'hidden' : 'visible' }}
            >
                <Canvas shadows>
                    <OrbitControls
                        enableRotate={true}
                        enablePan={false}
                        minPolarAngle={1.1}
                        maxPolarAngle={1.1}
                        minDistance={10}
                        maxDistance={10}
                    />
                    <PerspectiveCamera
                        makeDefault={true}
                        position={[0, -10, 2]}
                        fov={3}
                    />

                    <directionalLight
                        castShadow
                        position={[0, 5, 4]}
                        intensity={1}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-far={50}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                    />
                    <directionalLight
                        castShadow
                        position={[0, 5, -4]}
                        intensity={1}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-far={50}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                    />
                    <ambientLight intensity={1} />

                    {/* Objects */}
                    <Scene
                        position={[0, -1.57, 0]}
                        coords={state}
                        setModelIsLoading={setModelIsLoading}
                    />
                    <mesh
                        rotation={[Math.PI / 2, 4, 0]}
                        position={[0, -1.1, 0]}
                        receiveShadow
                    >
                        <meshStandardMaterial
                            side={THREE.DoubleSide}
                            color="#07080B"
                            transparent={true}
                            opacity={0.1}
                        />
                    </mesh>
                </Canvas>
            </div>
        </>
    )
}

function Scene({ position, coords, setModelIsLoading }) {
    const loader: any = useLoader(GLTFLoader, farabiAvatar)
    const { nodes, scene } = loader
    const myMesh: any = useRef()

    useFrame(() => {
        myMesh.current.rotation.y += 0.001
    })

    useMemo(
        () =>
            Object.values(nodes).forEach((obj: any) => {
                if (obj.name === 'head') {
                    obj.rotation.set(coords.y / 4, coords.x / 2, 0)
                }
                obj.isMesh && Object.assign(obj, { castShadow: true })
            }),
        [nodes, coords]
    )

    useEffect(() => {
        if (loader) {
            setModelIsLoading(false)
        }
    }, [loader])

    return (
        <primitive
            object={scene}
            dispose={null}
            position={position}
            ref={myMesh}
        />
    )
}
