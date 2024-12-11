import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function SampleModel({ position, scale }) {
    const group = useRef();
    const { scene } = useGLTF('/assets/the_polarity_of_water.glb'); // Adjust the path as needed

    return (
        <group ref={group} position={position} scale={scale}>
            <primitive object={scene} />
        </group>
    );
}

// Preload the model (optional for optimization)
useGLTF.preload('/assets/the_polarity_of_water.glb');

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
