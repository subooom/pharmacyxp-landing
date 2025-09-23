"use client";
import * as THREE from "three";
import { useEffect, useMemo, useState } from "react";
import { createNoise2D } from "simplex-noise";
import { voronoi } from "d3-voronoi";
import { generateGrassPalette } from "@/lib/utils";
import Room from "./Room";
import { useGLTF } from "@react-three/drei";
import { BuilderPreset, Rack } from "../types";
import { Ruler } from "./Ruler";
import Pond from "./Pond";

export interface TerrainConfig {
  size?: number;
  resolution?: number;
  noiseScale?: number;
  amplitude?: number;
  desnity?: number; // how dense the terrain features are
  pedestalHeight?: number;
  pedestalRadius?: number;
  numSeeds?: number; // how many Voronoi cells
}
// Base folder for environment models
const basePath = "/models/environment";

// List of folders from your screenshot
const environmentFolders = [
  "Bush_1",
  "Bush_2",
  "Bush_3",
  "Grass_1",
  "Grass_2",
  "Log_1",
  "Log_2",
  "Log_3",
  "Plant_1",
  "Plant_2",
  "Plant_3",
  "Plant_4",
  "Plant_5",
  "Plant_6",
  "Plant_7",
  "Rock_1",
  "Rock_2",
  "Rock_3",
  "Rock_4",
  "Rock_5",
  "Rock_6",
  "Stone_1",
  "Tree_1",
  "Tree_2",
  "Tree_3",
];

const getConfigForFolder = (folder: string): ModelPlacement => {
  // Base values
  let scale = 1;
  let density = 0.001;
  let minHeight = 0.2;
  let maxHeight = 0.9;
  let offsetY = 0.0;

  // Adjust values based on folder name patterns
  if (/^Tree/i.test(folder)) {
    scale = 0.1;
    offsetY = 0.1;
    density = 0.0004;
  } else if (/^Plant/i.test(folder)) {
    scale = 0.1;
    offsetY = 0.002;
    density = 0.008;
  } else if (/^(Rock|Stone)/i.test(folder)) {
    scale = 0.1;
    offsetY = 0;
    density = 0.0008;
  } else if (/^Grass/i.test(folder)) {
    scale = 0.3;
    offsetY = 0;
    density = 0.1;
    minHeight = 0.3;
    maxHeight = 0.4;
  } else if (/^Bush/i.test(folder)) {
    scale = 0.05;
    offsetY = 0;
    density = 0.01;
    minHeight = 0.1;
    maxHeight = 0.3;
  } else if (/^Log/i.test(folder)) {
    scale = 0.002;
    offsetY = 0;
    density = 0.009;
  }

  return {
    glbPath: `${basePath}/${folder}/result.gltf`,
    minHeight,
    maxHeight,
    density,
    scale: scale * 0.2, // keep your existing scale multiplier
    offsetY,
  };
};

// Generate modelConfigs automatically
const modelConfigs: ModelPlacement[] =
  environmentFolders.map(getConfigForFolder);

interface RoomProps {
  size: { width: number; length: number; height: number };
  preset: BuilderPreset;
  pharmacyLogoUrl?: string;
  medicineXPLogoUrl?: string;
  isMoveMode: boolean;
  toggleMoveMode: () => void;
  selectedRack?: Rack;
  onUpdateRackPosition: (position: [number, number, number]) => void;
}
interface RoomBaseProps {
  room: { width: number; length: number; height: number };
  scale: number;
  rotation: [number, number, number];
  position: [number, number, number];
}

export function Terrain({
  config = {},
  roomProps,
  roomBaseProps,
}: {
  config?: TerrainConfig;
  roomProps: RoomProps;
  roomBaseProps: RoomBaseProps;
}) {
  const {
    size = 500,
    resolution = 50,
    noiseScale = 10,
    amplitude = 8,
    pedestalHeight = 1,
    pedestalRadius = 20,
    numSeeds = 20,
  } = config;

  const noise2D = createNoise2D();
  const { scene: RoomBase } = useGLTF(
    "/models/base_medicinexp_pharmacy_builder.glb",
  );

  // 🔹 Generate Voronoi centroids (shared for pedestals + facilities)
  const centroids = useMemo(() => {
    const seeds = Array.from({ length: numSeeds }, () => [
      Math.random() * size - size / 2,
      Math.random() * size - size / 2,
    ]) as [number, number][];

    const v = voronoi().extent([
      [-size / 2, -size / 2],
      [size / 2, size / 2],
    ]);
    const diagram = v(seeds);

    return diagram
      .polygons()
      .map((cell) => {
        if (!cell || cell.length === 0) return null;
        let x = 0,
          y = 0;
        cell.forEach(([cx, cy]) => {
          x += cx;
          y += cy;
        });
        return [x / cell.length, y / cell.length];
      })
      .filter(Boolean) as [number, number][];
  }, [size, numSeeds]);

  // 🔹 Terrain geometry with noise + pedestals
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, resolution, resolution);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors: number[] = [];
    const color = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      const palette = generateGrassPalette("#22C55E", 5);
      if (!palette) continue;

      // Noise hills
      const nx = x / noiseScale;
      const ny = y / noiseScale;
      let z = noise2D(nx, ny) * amplitude;

      // Pedestal flattening
      let inPedestal = false;
      for (const [cx, cy] of centroids) {
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (dist <= pedestalRadius) {
          const t = dist / pedestalRadius;

          if (t <= 0.7) {
            z = pedestalHeight;
          } else {
            const slopeT = (t - 0.7) / 0.3;
            z = pedestalHeight * (1 - slopeT) + z * slopeT;
          }

          inPedestal = true;
        }
      }
      pos.setZ(i, z);

      // Smooth shade color selection (based on height interpolation)
      // let chosen = inPedestal ? "#232aea" : palette[0].color;
      let chosen = palette[0].color;
      if (!inPedestal) {
        for (let j = 0; j < palette.length; j++) {
          if (z >= palette[j].height) chosen = palette[j].color;
        }
      }

      color.set(chosen);
      colors.push(color.r, color.g, color.b);
    }

    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    // Ensure smooth shading across triangles
    geo.computeVertexNormals();

    return geo;
  }, [
    size,
    resolution,
    noiseScale,
    amplitude,
    pedestalHeight,
    pedestalRadius,
    centroids,
  ]);

  // Add this state and effect inside your Terrain component (after the centroids memo)
  const [modelInstances, setModelInstances] = useState<
    {
      url: string;
      position: [number, number, number];
      scale: number | [number, number, number];
      rotation?: [number, number, number];
      offsetY?: number;
      isCollection?: boolean; // new flag to indicate if it's a collection
      scatterCount?: number; // number of instances to scatter if it's a collection
    }[]
  >([]);

  // Add this useEffect to place models based on height
  useEffect(() => {
    const instances: {
      url: string;
      position: [number, number, number];
      scale: number | [number, number, number];
      rotation?: [number, number, number];
      offsetY?: number;
      isCollection?: boolean; // new flag to indicate if it's a collection
      scatterCount?: number; // number of instances to scatter if it's a collection
    }[] = [];

    // Get height data from your geometry
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const heightData: number[][] = [];

    // Create a 2D array of height values
    for (let i = 0; i <= resolution; i++) {
      heightData[i] = [];
      for (let j = 0; j <= resolution; j++) {
        const idx = i * (resolution + 1) + j;
        heightData[i][j] = pos.getZ(idx) / amplitude; // Normalize height
      }
    }

    // Place models based on height
    modelConfigs.forEach((config) => {
      for (let z = 0; z <= resolution; z++) {
        for (let x = 0; x <= resolution; x++) {
          const normalizedHeight = heightData[z][x];

          // Check if height is within range for this model
          if (
            normalizedHeight >= config.minHeight &&
            normalizedHeight <= config.maxHeight
          ) {
            // Check density probability
            if (Math.random() < config.density) {
              const posX = (x / resolution) * size - size / 2;
              const posZ = (z / resolution) * size - size / 2;
              const posY = normalizedHeight * amplitude;

              // if it falls within pedestal area, skip placement
              let skip = false;
              for (const [cx, cy] of centroids) {
                const dist = Math.sqrt((posX - cx) ** 2 + (posZ - cy) ** 2);
                if (dist <= pedestalRadius) {
                  skip = true;
                  break;
                }
              }
              if (skip) continue;
              instances.push({
                url: config.glbPath,
                position: [posX, posY, posZ],
                scale: config.scale,
                rotation: config.rotation || [
                  0,
                  Math.random() * Math.PI * 2,
                  0,
                ],
                offsetY: config.offsetY,
                isCollection: config.isCollection,
                scatterCount: config.scatterCount,
              });
            }
          }
        }
      }
    });

    setModelInstances(instances);
  }, [geometry, size, resolution, amplitude]);

  return (
    <>
      {/* Terrain */}
      <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          flatShading={false}
          vertexColors
          side={THREE.DoubleSide}
        />
      </mesh>

      <Pond
        width={size}
        depth={size}
        terrainVertices={geometry.attributes.position.array as Float32Array}
      />
      {modelInstances.map((instance, index) => (
        <Model
          key={index}
          url={instance.url}
          position={instance.position}
          scale={instance.scale}
          rotation={instance.rotation}
          offsetY={instance.offsetY}
        />
      ))}
      {/* Facilities placed at centroids */}
      {centroids.map(([x, y], i) => (
        <group
          key={i}
          position={[x, pedestalHeight + roomBaseProps.room.width / 120, y]}
        >
          <Ruler
            height={roomBaseProps.room.height}
            width={roomBaseProps.room.width}
            length={roomBaseProps.room.length}
            labelGap={0.6}
          />

          <Room name="Mero Pharmacy Builder" {...roomProps} />
          <primitive shadeSmooth object={RoomBase} {...roomBaseProps} />
        </group>
      ))}
    </>
  );
}
// Add these imports at the top of your file
import { GLTF } from "three-stdlib";

// Add this interface definition near your other interfaces
interface ModelPlacement {
  glbPath: string;
  minHeight: number;
  maxHeight: number;
  density: number;
  scale: number | [number, number, number];
  rotation?: [number, number, number];
  offsetY?: number;
  isCollection?: boolean; // new flag to indicate if it's a collection
  scatterCount?: number; // number of instances to scatter if it's a collection
}
function Model({
  url,
  position,
  scale,
  rotation,
  offsetY = 0,
}: {
  url: string;
  position: [number, number, number];
  scale: number | [number, number, number];
  rotation?: [number, number, number];
  offsetY?: number;
}) {
  const { scene } = useGLTF(url) as GLTF & { scene: THREE.Group };
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <primitive
      object={clonedScene}
      position={[position[0], position[1] + offsetY, position[2]]}
      scale={scale}
      rotation={rotation || [0, 0, 0]}
    />
  );
}

// Preload models
useGLTF.preload("/models/particles_collection.glb");
useGLTF.preload("/models/Tree_1_B_Color1.gltf");
useGLTF.preload("/models/Rock_1_G_Color1.gltf");
useGLTF.preload("/models/Tree_3_B_Color1.gltf");
