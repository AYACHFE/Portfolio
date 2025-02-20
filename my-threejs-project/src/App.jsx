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
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
          emissive="#FFA500"
          emissiveIntensity={0.5}
        />
      </Text3D>
    </Center>
  );
}

// Planet colors and properties
const planetColors = [
  '#FF6B6B', // Mars-like red
  '#4A90E2', // Neptune-like blue
  '#FFB347', // Venus-like orange
  '#C39BD3', // Jupiter-like purple
  '#85C1E9', // Uranus-like light blue
  '#F7DC6F', // Saturn-like yellow
  '#AAB7B8', // Mercury-like grey
  '#E8DAEF'  // Pluto-like light purple
];

function OrbitingShapes() {
  const groupRef = useRef();

  const shapes = Array.from({ length: 20 }, (_, i) => ({
    position: [
      Math.sin(i) * (3 + Math.random() * 5),
      Math.cos(i) * (3 + Math.random() * 5),
      Math.sin(i) * Math.cos(i) * (3 + Math.random() * 5)
    ],
    scale: Math.random() * 0.5 + 0.2,
    color: planetColors[i % planetColors.length],
    metalness: Math.random() * 0.5,
    roughness: Math.random() * 0.8
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
            <sphereGeometry args={[shape.scale / 2, 32, 32]} />
          )}
          <meshStandardMaterial 
            color={shape.color}
            metalness={shape.metalness}
            roughness={shape.roughness}
            emissive={shape.color}
            emissiveIntensity={0.2}
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
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight 
          position={[-10, -10, -10]} 
          intensity={0.5}
          angle={0.3}
          penumbra={1}
        />
        <OrbitControls enableZoom={true} />
        <FloatingText />
        <OrbitingShapes />
      </Canvas>
    </div>
  );
}

export default App;