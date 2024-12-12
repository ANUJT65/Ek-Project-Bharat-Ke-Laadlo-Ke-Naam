import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function SampleModel({ modelPath, position, scale }) {
    const group = useRef();
    const { scene } = useGLTF(modelPath);

    return (
        <group ref={group} position={position} scale={scale}>
            <primitive object={scene} />
        </group>
    );
}

// Preload all models (optional for optimization)
useGLTF.preload(['/assets/the_polarity_of_water.glb']);
useGLTF.preload(['/assets/chemical_reaction.glb']);
useGLTF.preload(['/assets/calcite_lattice.glb']);

export default function Scene() {
    // Grid layout positions
    const models = [
        { modelPath: '/assets/the_polarity_of_water.glb', position: [-3, 2, 0], scale: [1, 1, 1] },
        { modelPath: '/assets/chemical_reaction.glb', position: [3, 2, 0], scale: [1, 1, 1] },
        { modelPath: '/assets/calcite_lattice.glb', position: [0, -2, 0], scale: [1, 1, 1] },
    ];

    return (
        <>
            {/* Display loading message outside Canvas */}
            <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', zIndex: 10 }}>Loading...</div>

            <Canvas style={{ height: '100vh', width: '100vw' }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 10, 5]} intensity={1} />

                    {models.map((model, index) => (
                        <SampleModel
                            key={index}
                            modelPath={model.modelPath}
                            position={model.position}
                            scale={model.scale}
                        />
                    ))}

                    <OrbitControls />
                </Suspense>
            </Canvas>
        </>
    );
}
