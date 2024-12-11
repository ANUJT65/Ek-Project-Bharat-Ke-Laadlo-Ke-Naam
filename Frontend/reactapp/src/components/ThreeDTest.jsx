import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function SampleModel({ position, scale }) {
    const group = useRef();
    const { scene } = useGLTF('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb');

    return (
        <group ref={group} position={position} scale={scale}>
            <primitive object={scene} />
        </group>
    );
}

export default function Scene() {
    return (
        <>
            {/* Display loading message outside Canvas */}
            <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', zIndex: 10 }}>Loading...</div>

            <Canvas style={{ height: '100vh', width: '100vw' }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 10, 5]} intensity={1} />
                    <SampleModel position={[0, 0, 0]} scale={[2, 2, 2]} />
                    <OrbitControls />
                </Suspense>
            </Canvas>
        </>
    );
}
