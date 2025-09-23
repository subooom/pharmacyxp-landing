// -------------------- Rack Component --------------------

import { useRef } from "react";
import { Rack } from "../types";
import * as THREE from "three";
import { Text } from "@react-three/drei";

type RackProps = {
  rack: Rack;
  size: { height: number; slotDepth: number; backThickness: number };
  isSelected?: boolean;
  onClick?: (id: number) => void;
  onRotate?: (id: number, newRotation: number) => void;
  isMoveMode: boolean;
  toggleMoveMode?: () => void;
};

// -------------------- Rack Component --------------------

export default function RackComponent({
  rack,
  size,
  isSelected,
  onClick,
  onRotate,
  isMoveMode,
  toggleMoveMode,
}: RackProps) {
  const { columns, rows, rotation, color, position, name } = rack;
  const { height: roomWidth, height: roomLength } = size;

  const meshRef = useRef<THREE.Group>(null);

  // Rack dims
  const slotSize = 1;
  const width = columns * slotSize;
  const height = rows * slotSize;
  const depth = slotSize;

  const columnWidth = slotSize;
  const rowHeight = slotSize;

  // Prevent racks larger than room
  if (width > roomWidth || depth > roomLength) {
    console.warn(`Rack ${name} is too large for the room`);
    return null;
  }

  // external rotate trigger
  const rotateRack = (dir: "left" | "right") => {
    if (!meshRef.current) return;
    const step = Math.PI / 4; // 45°
    meshRef.current.rotation.y += dir === "left" ? -step : step;
    if (onRotate) onRotate(rack.id, meshRef.current.rotation.y);
  };

  return (
    <>
      <group
        ref={meshRef}
        rotation={[0, rotation * (Math.PI / 180), 0]}
        position={[position[0], position[1] + height / 2, position[2]]}
        onClick={(e) => {
          e.stopPropagation();
          onClick(rack.id);
        }}
        castShadow
      >
        {/* Frame */}
        <mesh position={[0, -height / 2, 0]}>
          <boxGeometry args={[width, 0.1, depth]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[width / 2, 0, 0]}>
          <boxGeometry args={[0.1, height, depth]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[-width / 2, 0, 0]}>
          <boxGeometry args={[0.1, height, depth]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0, 0, -depth / 2]}>
          <boxGeometry args={[width, height, 0.1]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Dividers */}
        {Array.from({ length: columns - 1 }).map((_, i) => (
          <mesh
            key={`v-${i}`}
            position={[-width / 2 + columnWidth * (i + 1), 0, 0]}
          >
            <boxGeometry args={[0.05, height, depth]} />
            <meshStandardMaterial color="#9ca3af" />
          </mesh>
        ))}
        {Array.from({ length: rows - 1 }).map((_, i) => (
          <mesh
            key={`h-${i}`}
            position={[0, -height / 2 + rowHeight * (i + 1), 0]}
          >
            <boxGeometry args={[width, 0.05, depth]} />
            <meshStandardMaterial color="#9ca3af" />
          </mesh>
        ))}

        {/* Label */}
        <Text
          position={[0, height / 2 + 0.3, 0]}
          color="#1f2937"
          fontSize={0.3}
          anchorX="center"
          anchorY="bottom"
        >
          {name}
        </Text>

        {isSelected && (
          <group position={[0, height / 2 + 0.3, 0]}>
            {/* Left Rotate Brick */}
            <group
              position={[-width / 2 + 0.25, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                rotateRack("left");
              }}
            >
              {/* Brick */}
              <mesh>
                <boxGeometry args={[0.7, 0.7, 0.1]} />
                <meshStandardMaterial color="tomato" />
              </mesh>
              {/* Icon */}
              <Text
                position={[0, 0, 0.1]}
                fontSize={0.41}
                color="#fff"
                anchorX="center"
                anchorY="middle"
              >
                ⟲
              </Text>
            </group>

            {/* Right Rotate Brick */}
            <group
              position={[width / 2 - 0.25, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                rotateRack("right");
              }}
            >
              {/* Brick */}
              <mesh>
                <boxGeometry args={[0.7, 0.7, 0.1]} />
                <meshStandardMaterial color="skyblue" />
              </mesh>
              {/* Icon */}
              <Text
                position={[0, 0, 0.1]}
                fontSize={0.41}
                color="#fff"
                anchorX="center"
                anchorY="middle"
              >
                ⟳
              </Text>
            </group>
            <group
              position={[width / 2 + 0.53, -1.1, 0.5]}
              onClick={(e) => {
                e.stopPropagation();
                toggleMoveMode();
              }}
            >
              {/* Brick */}
              <mesh>
                <boxGeometry args={[0.7, 0.7, 0.1]} />
                <meshStandardMaterial color="skyblue" />
              </mesh>
              {/* Icon */}
              <Text
                position={[0, 0, 0.1]}
                fontSize={0.41}
                color="#fff"
                anchorX="center"
                anchorY="middle"
              >
                {isMoveMode ? "Moving" : "Move"}
              </Text>
            </group>
          </group>
        )}
      </group>
    </>
  );
}
