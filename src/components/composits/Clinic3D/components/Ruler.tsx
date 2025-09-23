import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { JSX, useState } from "react";
import * as THREE from "three";

interface RulerProps {
  width: number; // X (ft)
  length: number; // Z (ft)
  height: number; // Y (ft)
  unit?: string; // e.g., "ft" or "m"
  step?: number; // spacing between ticks
  padding?: number; // distance outside room
  labelGap?: number; // gap between line and text
  tickSize?: number; // how long the tick marks are
}

// Inside your Ruler component
const getFontSize = (currentStep: number, baseStep: number, baseSize = 0.4) => {
  // If step is bigger than base, increase font size
  return baseSize * (currentStep / (baseStep * 1.7));
};
// Utility to ensure first/last ticks are added
const ensureLast = (values: number[], max: number): number[] => {
  const set = new Set(values.map((v) => Math.round(v * 1000) / 1000)); // round for float safety
  set.add(0);
  set.add(max);
  return Array.from(set).sort((a, b) => a - b);
};
export function Ruler({
  width,
  length,
  height,
  unit = "ft",
  step: gStep = 2,
  padding = 1,
  labelGap = 0.4,
  tickSize = 0.3,
}: RulerProps) {
  const material = new THREE.LineBasicMaterial({ color: "black" });

  const [step, setStep] = useState(gStep);
  const { camera } = useThree();

  useFrame(() => {
    let newStep = gStep;

    // Orthographic camera: scale step smoothly
    if (camera.type === "OrthographicCamera") {
      const z = camera.zoom;
      if (z < 0.25) newStep = gStep * 8;
      else if (z < 0.5) newStep = gStep * 4;
      else if (z < 0.75) newStep = gStep * 3;
      else if (z < 1) newStep = gStep * 2;
      else if (z < 1.5) newStep = gStep * 1.5;
      else if (z < 2) newStep = gStep;
      else if (z < 3) newStep = gStep / 1.5;
      else newStep = gStep / 2;
    }

    // Perspective camera: scale based on distance
    if (camera.type === "PerspectiveCamera") {
      const dist = camera.position.length(); // distance from origin
      if (dist > 80) newStep = gStep * 8;
      else if (dist > 60) newStep = gStep * 4;
      else if (dist > 40) newStep = gStep * 3;
      else if (dist > 30) newStep = gStep * 2;
      else if (dist > 20) newStep = gStep * 1.5;
      else if (dist > 15) newStep = gStep;
      else if (dist > 10) newStep = gStep / 1.5;
      else newStep = gStep / 2;
    }

    if (newStep !== step) setStep(newStep);
  });

  const createLine = (
    base: [number, number, number],
    orientation: "x" | "y" | "z",
  ) => {
    const [x, y, z] = base;
    let end: [number, number, number] = [x, y, z];

    if (orientation === "x") end = [x, -tickSize, z]; // upright tick
    if (orientation === "y") end = [x + tickSize, y, z]; // stick out in +X
    if (orientation === "z") end = [x, y, z + tickSize]; // stick out in +Z

    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(...end),
    ]);

    return <line geometry={geometry} material={material} />;
  };

  const ticks: JSX.Element[] = [];
  const labels: JSX.Element[] = [];

  const xTicks = ensureLast(
    Array.from({ length: Math.floor(width / step) + 1 }, (_, i) => i * step),
    width,
  );
  // Z-axis ticks
  const zTicks = ensureLast(
    Array.from({ length: Math.floor(length / step) + 1 }, (_, i) => i * step),
    length,
  );

  // Y-axis ticks
  const yTicks = ensureLast(
    Array.from({ length: Math.floor(height / step) + 1 }, (_, i) => i * step),
    height,
  );
  // ---------------- X-axis Ruler ----------------

  for (const x of xTicks) {
    const worldX = -width / 2 + x;
    ticks.push(createLine([worldX, 0, length / 2 + padding], "x"));
    labels.push(
      <Text
        key={`x-label-${x}`}
        position={[worldX - 0.3, -labelGap - 0.2, length / 2 + padding]}
        fontSize={getFontSize(step, gStep)} // scale font with step
        color="black"
        font="/Josefin_Sans/static/JosefinSans-Regular.ttf"
        anchorX="left"
        anchorY="middle"
      >
        {x} {unit}
        <meshStandardMaterial color="hotpink" />
      </Text>,
    );
  }

  // ---------------- Z-axis Ruler ----------------
  for (const z of zTicks) {
    const worldZ = -length / 2 + z;
    ticks.push(createLine([width / 2 + padding, 0, worldZ], "z"));
    labels.push(
      <Text
        key={`z-label-${z}`}
        position={[width / 2 + padding, -labelGap, worldZ]}
        fontSize={getFontSize(step, gStep)} // scale font with step
        color="black"
        anchorX="left"
        anchorY="middle"
        font="/Josefin_Sans/static/JosefinSans-Regular.ttf"
        rotation={[0, Math.PI / 2, 0]} // flat on floor
      >
        {z} {unit}
      </Text>,
    );
  }

  // ---------------- Y-axis Ruler ----------------
  for (const y of yTicks) {
    ticks.push(createLine([width / 2 + padding, y, length / 2 + padding], "y"));
    labels.push(
      <Text
        key={`y-label-${y}`}
        position={[width / 2 + padding + labelGap, y, length / 2 + padding]}
        fontSize={getFontSize(step, gStep)} // scale font with step
        color="black"
        anchorX="left"
        anchorY="middle"
        font="/Josefin_Sans/static/JosefinSans-Regular.ttf"
      >
        {y} {unit}
      </Text>,
    );
  }

  return (
    <group position={[0, 7, 0]}>
      {/* Base ruler lines */}
      <line
        geometry={new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-width / 2, 0, length / 2 + padding),
          new THREE.Vector3(width / 2, 0, length / 2 + padding),
        ])}
        material={material}
      />
      <line
        geometry={new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(width / 2 + padding, 0, -length / 2 - 1),
          new THREE.Vector3(width / 2 + padding, 0, length / 2),
        ])}
        material={material}
      />
      <line
        geometry={new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(width / 2 + padding, 0, length / 2 + padding),
          new THREE.Vector3(width / 2 + padding, height, length / 2 + padding),
        ])}
        material={material}
      />

      {ticks}
      {labels}
    </group>
  );
}
