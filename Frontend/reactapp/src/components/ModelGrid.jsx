import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Model from './Model'; // Adjust the path if necessary

const ModelGrid = () => {
    // Grid layout positions
    const models = [
        { modelPath: '/assets/the_polarity_of_water.glb', position: [-20, 2, 0], scale: [2.8, 2.8, 2.8] },
        { modelPath: '/assets/chemical_reaction.glb', position: [30, 2, 0], scale: [3, 3, 3] },
        { modelPath: '/assets/calcite_lattice.glb', position: [-80, -2, 0], scale: [0.4, 0.4, 0.4] },
    ];

    return (
        <>
            {/* Display loading message outside Canvas */}
            <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', zIndex: 10 }}>Loading...</div>

            <Canvas style={{ height: '100vh', width: '100vw' }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 10, 5]} intensity={1} />

                {models.map((model, index) => (
                    <Model
                        key={index}
                        modelPath={model.modelPath}
                        position={model.position}
                        scale={model.scale}
                    />
                ))}

                <OrbitControls />
            </Canvas>
        </>
    );
};

export default ModelGrid;
