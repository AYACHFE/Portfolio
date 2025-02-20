import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Text3D } from '@react-three/drei';
import * as THREE from 'three';

function FloatingText() {
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Center>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={1.5}
        height={0.4}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
          AYMANE
        <meshNormalMaterial />
      </Text3D>
    </Center>
  );
}

function OrbitingShapes() {
  const groupRef = useRef();

  const shapes = Array.from({ length: 20 }, (_, i) => ({
    position: [
      Math.sin(i) * 4,
      Math.cos(i) * 4,
      Math.sin(i) * Math.cos(i) * 4
    ],
    scale: Math.random() * 0.5 + 0.2
  }));

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.2;
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position}>
          {i % 2 === 0 ? (
            <boxGeometry args={[shape.scale, shape.scale, shape.scale]} />
          ) : (
            <sphereGeometry args={[shape.scale / 2, 16, 16]} />
          )}
          <meshStandardMaterial 
            color={new THREE.Color().setHSL(i * 0.1, 0.7, 0.5)}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
 
function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75, near: 0.1, far: 1000 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        <OrbitControls 
          enableZoom={true}
          minDistance={5}
          maxDistance={20}
          enableDamping={true}
          dampingFactor={0.05}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={1} />
        
        <FloatingText />
        <OrbitingShapes />
      </Canvas>
    </div>
  );
}

export default App;