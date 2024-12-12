import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

function Model({ modelPath, position, scale }) {
    const group = useRef();
    const { scene } = useGLTF(modelPath);

    return (
        <group ref={group} position={position} scale={scale}>
            <primitive object={scene} />
        </group>
    );
}

// Preload model (optional for optimization)
useGLTF.preload(['/assets/the_polarity_of_water.glb']);
useGLTF.preload(['/assets/chemical_reaction.glb']);
useGLTF.preload(['/assets/calcite_lattice.glb']);

export default Model;
