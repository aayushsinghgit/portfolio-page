import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.9}
        emissive={new THREE.Color('#3b82f6')}
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <AnimatedSphere />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}