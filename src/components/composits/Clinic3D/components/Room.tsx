"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";

import * as THREE from "three";
import { Text, useTexture } from "@react-three/drei";
import { GlassPanelWithFrame } from "./Window";
import { GlassDoor } from "./Door";
import { BuilderPreset, Rack } from "../types";
import SpotMarker from "./Spot";
import Centers from "./centers";

// -------------------- Types --------------------

const wallThickness = 0.8; // thickness of walls

type RoomProps = {
  size: { width: number; length: number; height: number };
  preset: BuilderPreset;
  name: string;
  pharmacyLogoUrl?: string;
  medicineXPLogoUrl?: string;
  isMoveMode: boolean;
  toggleMoveMode: () => void;
  selectedRack?: Rack;
  onUpdateRackPosition: (position: [number, number, number]) => void;
};

// -------------------- Room Component --------------------

export default function Room({
  size,
  preset,
  name = "Hello Pharmacy",
  pharmacyLogoUrl = "/logo.svg",
  medicineXPLogoUrl = "/logo.svg",
  onUpdateRackPosition,
  selectedRack,
  isMoveMode,
}: RoomProps) {
  const { width, length, height } = size;
  const { camera } = useThree();
  const { room: roomConfig } = preset;
  const { wallColor } = roomConfig;

  const wallMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: wallColor }),
    [wallColor],
  );

  const floorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: roomConfig.floor.themes[roomConfig.floor.theme],
        roughness: 0.6,
        metalness: 0.1,
      }),
    [roomConfig.floor.theme, roomConfig.floor.themes],
  );

  const pharmacyLogo = useTexture(pharmacyLogoUrl);
  const medicineXPLogo = useTexture(medicineXPLogoUrl);

  // Calculate dynamic layout
  const availableWidth =
    width - roomConfig.frameThickness * 4 - roomConfig.doorFrameThickness * 7;
  const windowWidth = (availableWidth - roomConfig.doorWidth) / 2;
  const windowXOffset =
    windowWidth / 2 + roomConfig.doorWidth / 2 + roomConfig.frameThickness * 2;

  // Refs for wall visibility
  const walls = {
    right: useRef<THREE.Mesh>(null),
    top: useRef<THREE.Mesh>(null),
    left: useRef<THREE.Mesh>(null),
    front: useRef<THREE.Group>(null),
    back: useRef<THREE.Mesh>(null),
  };
  const [autoHideWalls] = useState(false);

  // Hide walls based on camera
  useFrame(() => {
    const camPos = camera.position;
    if (!autoHideWalls) return;
    if (walls.top.current) walls.top.current.visible = camPos.z > height / 2;
    if (walls.right.current) walls.right.current.visible = camPos.x < width / 2;
    if (walls.left.current) walls.left.current.visible = camPos.x > -width / 2;
    if (walls.back.current) walls.back.current.visible = camPos.z > -length / 2;
  });

  // In your main component, add state for tracking hover and selection
  const [hoveredSpot, setHoveredSpot] = useState<number | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);

  // Function to handle spot clicks
  const handleSpotClick = (index: number) => {
    if (preset?.spots?.[index]) {
      const currentSlot = preset.spots[index];

      onUpdateRackPosition([currentSlot.x, currentSlot.y, currentSlot.z]);

      setSelectedSpot(index);
      // racks.position = spot.position
      // Here you would also move the rack to this position
      console.log(
        `Moving rack to spot ${index} at position:`,
        preset.spots[index],
      );
    }
  };

  return (
    <group position={[0, 7, 0]}>
      {/* Top wall (ceiling) */}
      <mesh
        ref={walls.top}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, height + wallThickness / 2, -wallThickness / 2]}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            width + wallThickness * 2,
            length + wallThickness + 1,
            wallThickness,
          ]}
        />
        <meshStandardMaterial {...floorMat} />
      </mesh>

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -wallThickness * 1.5, -wallThickness / 2]}
        receiveShadow
        castShadow
      >
        <boxGeometry
          args={[
            width + wallThickness * 2,
            length + wallThickness,
            wallThickness * 3,
          ]}
        />
        <meshStandardMaterial {...floorMat} />
      </mesh>

      {/* Real Ceiling Lights */}
      {Array.from({ length: 4 }).map((_, i) => (
        <rectAreaLight
          width={width * 1.22}
          height={4}
          intensity={2}
          color={"#ffffff"}
          lookAt={[0, height, height]}
          rotation={[-Math.PI / 2, 0, 0]} // rotate 90° on X to point downward
          key={i}
          position={[-width / 2 + (i + 1) * (width / 6) - 4, height, 0]}
        />
      ))}

      {/* Side & Back Walls */}
      <mesh
        ref={walls.right}
        position={[
          width / 2 + wallThickness / 2,
          height / 2,
          -wallThickness / 2,
        ]}
      >
        <boxGeometry args={[wallThickness, height, length + wallThickness]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      <mesh
        ref={walls.left}
        position={[
          -width / 2 - wallThickness / 2,
          height / 2,
          -wallThickness / 2,
        ]}
      >
        <boxGeometry args={[wallThickness, height, length + wallThickness]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      <mesh
        ref={walls.back}
        position={[0, height / 2, -length / 2 - wallThickness / 2]}
      >
        <boxGeometry args={[width, height, wallThickness]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      <Centers centers={preset.centers || []} />
      {isMoveMode &&
        preset?.spots?.map((spot, index) => (
          <SpotMarker
            key={index}
            spot={spot}
            index={index}
            isSelected={selectedSpot === index}
            onHover={setHoveredSpot}
            onClick={handleSpotClick}
            isMoveMode={true} // You need to pass this from parent
          />
        ))}
      {hoveredSpot !== null && isMoveMode && (
        <mesh
          position={[
            preset.spots[hoveredSpot].x,
            preset.spots[hoveredSpot].y + (selectedRack?.rows || 4) / 2,
            preset.spots[hoveredSpot].z,
          ]}
        >
          <boxGeometry
            args={[selectedRack?.columns || 5, selectedRack?.rows || 4, 1]}
          />
          <meshPhongMaterial color="#4ade80" transparent opacity={0.3} />
        </mesh>
      )}

      {/* Front Wall Group */}
      <group ref={walls.front} position={[0, 0, length / 2]}>
        {/* Top header strip */}
        <mesh position={[0, height - roomConfig.headerHeight / 2, 0]}>
          <boxGeometry
            args={[width - wallThickness / 2, roomConfig.headerHeight, 0.1]}
          />
          <meshStandardMaterial color={roomConfig.headerColor} />
        </mesh>

        {/* Name + Logos inside header */}
        <group position={[0, height - roomConfig.headerHeight / 2, 0.2]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.7}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="Josefin_Sans/static/JosefinSans-Bold.ttf"
          >
            {name}
          </Text>

          <mesh
            position={[-width / 4, 0, 0]}
            scale={[
              1.2,
              1.2 *
                (pharmacyLogo.image?.height / pharmacyLogo.image?.width || 1),
              1,
            ]}
          >
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial map={pharmacyLogo} transparent />
          </mesh>

          <mesh
            position={[width / 4, 0, 0]}
            scale={[
              1.2,
              1.2 *
                (medicineXPLogo.image?.height / medicineXPLogo.image?.width ||
                  1),
              1,
            ]}
          >
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial map={medicineXPLogo} transparent />
          </mesh>
        </group>

        {/* Left window */}
        <GlassPanelWithFrame
          width={windowWidth}
          height={roomConfig.height - wallThickness - roomConfig.headerHeight}
          frameThickness={roomConfig.windowFrameThickness}
          frameColor={roomConfig.windowFrameColor}
          glassColor={roomConfig.windowColor}
          opacity={roomConfig.windowOpacity}
          transmission={roomConfig.windowTransmission}
          position={[
            -windowXOffset,
            roomConfig.height / 2 +
              roomConfig.windowFrameThickness -
              wallThickness -
              wallThickness / 2,
            0,
          ]}
        />

        {/* Right window */}
        <GlassPanelWithFrame
          width={windowWidth}
          height={roomConfig.height - wallThickness - roomConfig.headerHeight}
          frameThickness={roomConfig.windowFrameThickness}
          frameColor={roomConfig.windowFrameColor}
          glassColor={roomConfig.windowColor}
          opacity={roomConfig.windowOpacity}
          transmission={roomConfig.windowTransmission}
          position={[
            windowXOffset,
            roomConfig.height / 2 +
              roomConfig.windowFrameThickness -
              wallThickness -
              wallThickness / 2,
            0,
          ]}
        />
        <mesh
          position={[
            width / 2 - (3.0 * width) / 16,
            1.1 * ((3.0 * width) / 32),
            0.1,
          ]}
          scale={[
            (3.0 * width) / 32,
            ((3.0 * width) / 32) *
              (medicineXPLogo.image?.height / medicineXPLogo.image?.width || 1),
            1,
          ]}
        >
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial map={medicineXPLogo} transparent />
        </mesh>
        {/* Door */}
        <GlassDoor
          width={roomConfig.doorWidth}
          height={
            roomConfig.height -
            wallThickness -
            roomConfig.doorFrameThickness * 2 -
            0.1
          }
          position={[
            0,
            roomConfig.height / 2 -
              wallThickness +
              roomConfig.doorFrameThickness,
            0,
          ]}
          frameThickness={roomConfig.doorFrameThickness}
          frameColor={roomConfig.doorFrameColor}
          isOpen={false}
        />

        {/* Side wall frames */}
        <mesh
          position={[-width / 2 + roomConfig.frameThickness / 2, height / 2, 0]}
        >
          <boxGeometry args={[roomConfig.frameThickness, height, 0.1]} />
          <meshStandardMaterial color={roomConfig.frameColor} />
        </mesh>
        <mesh
          position={[width / 2 - roomConfig.frameThickness / 2, height / 2, 0]}
        >
          <boxGeometry args={[roomConfig.frameThickness, height, 0.1]} />
          <meshStandardMaterial color={roomConfig.frameColor} />
        </mesh>
      </group>
    </group>
  );
}
