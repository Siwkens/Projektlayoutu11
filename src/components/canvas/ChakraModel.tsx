import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';

const AdditiveBlending = 2; // THREE.AdditiveBlending

const lerp = (start: number, end: number, t: number) => {
  return start + (end - start) * t;
};

const chakras = [
  { id: 7, name: 'Korona', color: '#a855f7', position: [0, 3.5, 0], desc: 'Duchowość, Oświecenie' },
  { id: 6, name: 'Trzecie Oko', color: '#4f46e5', position: [0, 2.4, 0], desc: 'Intuicja, Wyobraźnia' },
  { id: 5, name: 'Gardło', color: '#0ea5e9', position: [0, 1.3, 0], desc: 'Komunikacja, Prawda' },
  { id: 4, name: 'Serce', color: '#22c55e', position: [0, 0.2, 0], desc: 'Miłość, Równowaga' },
  { id: 3, name: 'Splot Słoneczny', color: '#eab308', position: [0, -0.9, 0], desc: 'Wola, Moc osobista' },
  { id: 2, name: 'Sakralna', color: '#f97316', position: [0, -2.0, 0], desc: 'Kreatywność, Emocje' },
  { id: 1, name: 'Podstawa', color: '#ef4444', position: [0, -3.1, 0], desc: 'Bezpieczeństwo, Uziemienie' },
];

function ChakraNode({ data, isActive, onClick, onHover }: any) {
  const meshRef = useRef<any>(null);
  const materialRef = useRef<any>(null);
  
  // Animation state
  const targetScale = isActive ? 1.8 : 1;
  const targetEmissiveIntensity = isActive ? 2 : 0.5;

  useFrame((state, delta) => {
    if (meshRef.current && materialRef.current) {
      // Rotation
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2 + data.id) * 0.1;

      // Lerp Scale
      meshRef.current.scale.x = lerp(meshRef.current.scale.x, targetScale, delta * 10);
      meshRef.current.scale.y = lerp(meshRef.current.scale.y, targetScale, delta * 10);
      meshRef.current.scale.z = lerp(meshRef.current.scale.z, targetScale, delta * 10);

      // Lerp Color/Emissive
      // Create target color using the existing color instance to avoid importing Color class
      const targetColor = materialRef.current.color.clone().set(isActive ? '#ffffff' : data.color);
      materialRef.current.color.lerp(targetColor, delta * 5);
      materialRef.current.emissiveIntensity = lerp(materialRef.current.emissiveIntensity, targetEmissiveIntensity, delta * 5);
    }
  });

  return (
    <group position={data.position as any}>
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh 
          ref={meshRef}
          onClick={(e) => { e.stopPropagation(); onClick(data.id); }}
          onPointerOver={() => onHover(data.id)}
          onPointerOut={() => onHover(null)}
        >
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial 
            ref={materialRef}
            color={data.color} 
            emissive={data.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.9}
            wireframe={!isActive}
          />
        </mesh>
        
        {/* Inner glow core */}
        <mesh scale={[0.15, 0.15, 0.15]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>

        {/* Info Label */}
        {isActive && (
          <Html position={[0.8, 0, 0]} center distanceFactor={10} zIndexRange={[100, 0]}>
            <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/20 w-48 text-left animate-in fade-in slide-in-from-left-4 pointer-events-none">
              <h3 className="text-white font-bold text-lg mb-1" style={{ color: data.color }}>{data.name}</h3>
              <p className="text-white/80 text-sm leading-tight">{data.desc}</p>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

function EnergyFlow() {
  // Visualizes the central channel (Sushumna)
  return (
    <mesh position={[0, 0.2, 0]}>
      <cylinderGeometry args={[0.05, 0.05, 7, 16]} />
      <meshStandardMaterial 
        color="white" 
        transparent 
        opacity={0.2} 
        blending={AdditiveBlending} 
      />
    </mesh>
  );
}

export function ChakraSystem() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="purple" intensity={0.5} />
      
      <group rotation={[0, -0.2, 0]}>
        <EnergyFlow />
        {chakras.map((chakra) => (
          <ChakraNode 
            key={chakra.id} 
            data={chakra} 
            isActive={activeId === chakra.id}
            onClick={setActiveId}
            onHover={setActiveId}
          />
        ))}
      </group>
    </Canvas>
  );
}