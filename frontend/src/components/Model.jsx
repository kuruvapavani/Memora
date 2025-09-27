import React from 'react';
import { useGLTF } from '@react-three/drei';

const Model = (props) => {
  const { scene } = useGLTF('/assets/memora_capsule.glb');
  return <primitive object={scene} {...props} />;
};

export default Model;
