"use client";
import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { createNoise3D } from "simplex-noise";
import { useGLTF } from "@react-three/drei";

// Fish type definitions
interface FishType {
  name: string;
  color: string;
  size: number;
  speed: number;
  count: number;
  path: string;
}

interface Fish {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  type: FishType;
  noiseOffset: number;
  path: string;
}

interface PondProps {
  width?: number;
  depth?: number;
  height?: number;
  fishTypes?: FishType[];
  terrainVertices?: Float32Array;
}

// Default fish types
const defaultFishTypes: FishType[] = [
  {
    name: "Goldfish",
    color: "#ff9900",
    size: 0.05,
    speed: 0.5,
    count: 18,
    path: "/models/fish/1.glb",
  },
  {
    name: "Koi",
    color: "#ff6600",
    size: 0.08,
    speed: 0.4,
    count: 14,
    path: "/models/fish/2.glb",
  },
  {
    name: "Blue Tang",
    color: "#0066ff",
    size: 0.6,
    speed: 0.6,
    count: 16,
    path: "/models/fish/3.glb",
  },
  {
    name: "Angerfish",
    color: "#ffff00",
    size: 0.07,
    speed: 0.5,
    count: 43,
    path: "/models/fish/4.glb",
  },
  {
    name: "Angelfish",
    color: "#ffff00",
    size: 0.07,
    speed: 0.3,
    count: 43,
    path: "/models/fish/5.glb",
  },
];

export default function Pond({
  width = 100,
  depth = 6,
  height = -5,
  fishTypes = defaultFishTypes,
  terrainVertices,
}: PondProps) {
  const groupRef = useRef<THREE.Group>(null);
  const noise3D = useMemo(() => createNoise3D(), []);
  const fishesRef = useRef<Fish[]>([]);

  // Precompute a height map for efficient terrain height lookup
  const heightMap = useMemo(() => {
    if (!terrainVertices) return null;

    const vertexCount = terrainVertices.length / 3;
    const gridSize = Math.sqrt(vertexCount);
    const map = new Float32Array(gridSize * gridSize);

    const xStep = width / (gridSize - 1);
    const zStep = depth / (gridSize - 1);

    for (let z = 0; z < gridSize; z++) {
      for (let x = 0; x < gridSize; x++) {
        const idx = (z * gridSize + x) * 3;
        map[z * gridSize + x] = terrainVertices[idx + 1];
      }
    }

    return { map, gridSize, xStep, zStep, minX: -width / 2, minZ: -depth / 2 };
  }, [terrainVertices, width, depth]);

  // Efficient terrain height lookup
  const getTerrainHeightAt = useMemo(() => {
    if (!heightMap) return () => height;

    return (x: number, z: number) => {
      const gx = (x - heightMap.minX) / heightMap.xStep;
      const gz = (z - heightMap.minZ) / heightMap.zStep;

      const x0 = Math.floor(gx);
      const z0 = Math.floor(gz);
      const x1 = Math.min(x0 + 1, heightMap.gridSize - 1);
      const z1 = Math.min(z0 + 1, heightMap.gridSize - 1);

      const sx = gx - x0;
      const sz = gz - z0;

      const h00 = heightMap.map[z0 * heightMap.gridSize + x0];
      const h10 = heightMap.map[z0 * heightMap.gridSize + x1];
      const h01 = heightMap.map[z1 * heightMap.gridSize + x0];
      const h11 = heightMap.map[z1 * heightMap.gridSize + x1];

      const h0 = h00 * (1 - sx) + h10 * sx;
      const h1 = h01 * (1 - sx) + h11 * sx;

      return h0 * (1 - sz) + h1 * sz;
    };
  }, [heightMap, height]);

  // Initialize fishes
  useEffect(() => {
    const newFishes: Fish[] = [];

    fishTypes.forEach((fishType) => {
      for (let i = 0; i < fishType.count; i++) {
        newFishes.push({
          position: new THREE.Vector3(
            (Math.random() - 0.5) * width * 0.8,
            height + Math.random() * 0.5,
            (Math.random() - 0.5) * depth * 0.8,
          ),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            0,
            (Math.random() - 0.5) * 0.1,
          ),
          type: fishType,
          noiseOffset: Math.random() * 1000,
          path: fishType.path,
        });
      }
    });

    fishesRef.current = newFishes;
  }, [width, depth, height, fishTypes]);

  // Fish animation - optimized version
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const halfWidth = width / 2;
    const halfDepth = depth / 2;

    fishesRef.current = fishesRef.current.map((fish) => {
      const newFish = { ...fish };

      // --- Noise-based swimming ---
      const noiseX = noise3D(
        newFish.position.x * 0.1,
        newFish.position.y * 0.1,
        time * 0.3 + newFish.noiseOffset,
      );
      const noiseZ = noise3D(
        newFish.position.z * 0.1,
        time * 0.3,
        newFish.noiseOffset,
      );

      newFish.velocity.x += noiseX * 0.01;
      newFish.velocity.z += noiseZ * 0.01;
      newFish.velocity.y += noiseX * 0.005 - 0.002;

      // Normalize & scale velocity
      if (newFish.velocity.length() > 0) {
        newFish.velocity.normalize().multiplyScalar(newFish.type.speed * 0.05);
      }

      // Apply damping for smoother motion
      newFish.velocity.multiplyScalar(0.95);

      // --- Update position ---
      newFish.position.add(newFish.velocity);

      // --- Boundary checking (X/Z) ---
      if (newFish.position.x < -halfWidth || newFish.position.x > halfWidth) {
        newFish.velocity.x *= -1;
        newFish.position.x = THREE.MathUtils.clamp(
          newFish.position.x,
          -halfWidth,
          halfWidth,
        );
      }

      if (newFish.position.z < -halfDepth || newFish.position.z > halfDepth) {
        newFish.velocity.z *= -1;
        newFish.position.z = THREE.MathUtils.clamp(
          newFish.position.z,
          -halfDepth,
          halfDepth,
        );
      }

      // --- Terrain / Pond floor constraint ---
      if (Math.abs(newFish.velocity.y) > 0.001 || time % 1 < 0.05) {
        const terrainHeight = getTerrainHeightAt(
          newFish.position.x,
          newFish.position.z,
        );

        // Pond bottom is always the minimum
        const floor = Math.max(height, terrainHeight);
        // Ceiling is just below terrain surface
        const ceiling = terrainHeight - 0.2;

        if (ceiling > floor) {
          // Valid swim zone between floor and ceiling
          if (newFish.position.y > ceiling || newFish.position.y < floor) {
            newFish.velocity.y *= -0.5;
            newFish.position.y = THREE.MathUtils.clamp(
              newFish.position.y,
              floor,
              ceiling,
            );
          }
        } else {
          // Terrain is lower than pond → fallback to pond bottom only
          if (newFish.position.y < height) {
            newFish.velocity.y *= -0.5;
            newFish.position.y = height;
          }
        }
      }

      return newFish;
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Pond water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshPhysicalMaterial
          color="#4da6ff"
          transparent
          opacity={0.6}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Fish group */}
      <group ref={groupRef}>
        {fishesRef.current.map((fish, index) => (
          <FishComponent key={index} fish={fish} />
        ))}
      </group>
    </group>
  );
}

// Individual fish component - simplified version
function FishComponent({ fish }: { fish: Fish }) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(fish.type.path);

  const fishModel = useMemo(() => scene.clone(), [scene]);
  // When rendering fish
  useFrame(() => {
    if (!meshRef.current) return;

    const offsetY = 1.5; // vertical offset
    const adjustedPos = fish.position.clone();
    adjustedPos.y -= offsetY;

    meshRef.current.position.copy(adjustedPos);

    if (fish.velocity.lengthSq() > 0.0001) {
      const lookTarget = fish.position.clone().add(fish.velocity);
      lookTarget.y = meshRef.current.position.y; // keep level, no pitching
      meshRef.current.lookAt(lookTarget);
    }
  });

  return (
    <group ref={meshRef} scale={fish.type.size}>
      <primitive object={fishModel} />
    </group>
  );
}

// Preload all fish models
useGLTF.preload("/models/fish/1.glb");
useGLTF.preload("/models/fish/2.glb");
useGLTF.preload("/models/fish/3.glb");
useGLTF.preload("/models/fish/4.glb");
useGLTF.preload("/models/fish/5.glb");
