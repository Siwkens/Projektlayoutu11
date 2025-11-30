import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Icosahedron, MeshDistortMaterial, Stars } from '@react-three/drei';

// Helper to generate random points in a sphere (replacing maath for stability)
function generateSpherePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = Math.cbrt(Math.random()) * radius; // cbrt for uniform distribution
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

function StarField(props: any) {
  const ref = useRef<any>();
  const sphere = useMemo(() => generateSpherePoints(2000, 1.5), []); // Reduced count for performance

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function SacredGeometry() {
  return (
    <group>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron args={[1, 0]} position={[2, 1, -2]}>
          <MeshDistortMaterial
            color="#a78bfa" // Purple
            envMapIntensity={0.4}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.1}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.2}
            wireframe
          />
        </Icosahedron>
      </Float>
      
      {/* Reduced complexity - removed second icosahedron for performance */}
    </group>
  );
}

export function CosmicScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}> {/* Limit pixel ratio */}
        <fog attach="fog" args={['#0a0a1a', 1, 10]} />
        <ambientLight intensity={0.5} />
        <StarField />
        {/* <SacredGeometry /> - Temporarily removed for max performance or keep simple */}
        <SacredGeometry />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}