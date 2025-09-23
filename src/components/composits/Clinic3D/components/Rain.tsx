import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface RainProps {
  intensity?: number;
}

const Rain: React.FC<RainProps> = ({ intensity = 1 }) => {
  // Adjust rain count based on intensity (more subtle)
  const rainCount = Math.floor(100 * Math.min(intensity, 2)); // Cap intensity at 2 for max 200 drops
  const rainRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60; // Reduced spread
      pos[i * 3 + 1] = Math.random() * 40 + 10; // Start higher
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60; // Reduced spread
    }
    return pos;
  }, [rainCount]);

  const velocities = useMemo(() => {
    const vel = new Float32Array(rainCount);
    for (let i = 0; i < rainCount; i++) {
      vel[i] = 0.3 + Math.random() * 0.4; // Variable fall speed
    }
    return vel;
  }, [rainCount]);

  useFrame(() => {
    if (!rainRef.current) return;

    const geometry = rainRef.current.geometry;
    const pos = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < rainCount; i++) {
      const fallSpeed = velocities[i];
      pos[i * 3 + 1] -= fallSpeed;

      // Reset when below ground level
      if (pos[i * 3 + 1] < -5) {
        pos[i * 3] = (Math.random() - 0.5) * 60;
        pos[i * 3 + 1] = 40 + Math.random() * 10; // Reset to random height
        pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      }
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={rainRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a0c8e0" // Light blue-gray, more realistic
        size={0.1} // Smaller droplets
        transparent={true}
        opacity={0.7}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Rain;
