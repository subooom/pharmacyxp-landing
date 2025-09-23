import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

type GlassDoorProps = {
  width: number;
  height: number;
  depth?: number;
  position?: [number, number, number];
  frameThickness?: number;
  frameColor?: string;
  glassOpacity?: number;
  glassTransmission?: number;
  isOpen?: boolean;
  openAngle?: number; // how far the door swings open (deg)
};

// Door configuration object
const doorConfig = {
  frame: {
    thickness: 0.1,
    color: "#eafeaa",
    metalness: 0.8,
    roughness: 0.3,
  },
  glass: {
    opacity: 0.8,
    transmission: 0.95,
    roughness: 0,
    thickness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    reflectivity: 1,
    metalness: 0,
    color: "white",
  },
  knob: {
    size: 0.45,
    position: { x: 0.3, y: -0.4 }, // Relative to door panel
    color: "#d4af37", // Gold color
    metalness: 0.9,
    roughness: 0.2,
  },
  animation: {
    speed: 0.1,
  },
  openAngle: 90, // degrees
};

export function GlassDoor({
  width,
  height,
  depth = 0.1,
  position = [0, 0, 0],
  frameThickness = doorConfig.frame.thickness,
  frameColor = doorConfig.frame.color,
  glassOpacity = doorConfig.glass.opacity,
  glassTransmission = doorConfig.glass.transmission,
  isOpen = false,
  openAngle = doorConfig.openAngle,
}: GlassDoorProps) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);

  const medicineXPLogo = useTexture("/logo.svg");
  const [open, setOpen] = useState(isOpen);

  useFrame(() => {
    const targetAngle = open ? THREE.MathUtils.degToRad(openAngle) : 0;

    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        targetAngle,
        doorConfig.animation.speed,
      );
    }

    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        -targetAngle,
        doorConfig.animation.speed,
      );
    }
  });

  const panelWidth = (width - frameThickness * 2) / 2;

  // Low poly door knob component
  const DoorKnob = ({
    position: knobPosition,
    side,
  }: {
    position: [number, number, number];
    side: "left" | "right";
  }) => (
    <group position={knobPosition}>
      {/* Knob base */}
      <mesh
        position={[
          side === "left"
            ? -doorConfig.knob.size / 2
            : doorConfig.knob.size / 2,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            doorConfig.knob.size * 0.3,
            doorConfig.knob.size * 0.3,
            doorConfig.knob.size * 0.2,
            8,
          ]}
        />
        <meshStandardMaterial
          color={doorConfig.knob.color}
          metalness={doorConfig.knob.metalness}
          roughness={doorConfig.knob.roughness}
        />
      </mesh>
      {/* Knob handle */}
      <mesh
        position={[
          side === "left" ? -doorConfig.knob.size : doorConfig.knob.size,
          0,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            doorConfig.knob.size * 0.15,
            doorConfig.knob.size * 0.15,
            doorConfig.knob.size * 0.8,
            6,
          ]}
        />
        <meshStandardMaterial
          color={doorConfig.knob.color}
          metalness={doorConfig.knob.metalness}
          roughness={doorConfig.knob.roughness}
        />
      </mesh>
    </group>
  );

  return (
    <group position={position} onClick={() => setOpen((prev) => !prev)}>
      {/* Left Panel - Pivot on left edge */}
      <group
        ref={leftDoorRef}
        position={[-width / 2 + frameThickness, height / 2, 0]}
      >
        {/* Glass */}
        <mesh position={[panelWidth / 2, -height / 2, 0]}>
          <boxGeometry
            args={[
              panelWidth - frameThickness,
              height - frameThickness * 2,
              depth,
            ]}
          />
          <meshPhysicalMaterial
            color={doorConfig.glass.color}
            transparent
            opacity={glassOpacity}
            transmission={glassTransmission}
            roughness={doorConfig.glass.roughness}
            thickness={doorConfig.glass.thickness}
            clearcoat={doorConfig.glass.clearcoat}
            clearcoatRoughness={doorConfig.glass.clearcoatRoughness}
            reflectivity={doorConfig.glass.reflectivity}
            metalness={doorConfig.glass.metalness}
          />
        </mesh>

        {/* Border Frame */}
        {/* Top */}
        <mesh position={[panelWidth / 2, -frameThickness / 2, 0]}>
          <boxGeometry args={[panelWidth, frameThickness, depth]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={doorConfig.frame.metalness}
            roughness={doorConfig.frame.roughness}
          />
        </mesh>
        {/* Bottom */}
        <mesh position={[panelWidth / 2, -height + frameThickness / 2, 0]}>
          <boxGeometry args={[panelWidth, frameThickness, depth]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={doorConfig.frame.metalness}
            roughness={doorConfig.frame.roughness}
          />
        </mesh>
        {/* Left Side - This is the pivot edge */}
        <mesh position={[0, -height / 2, 0]}>
          <boxGeometry args={[frameThickness, height, depth]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={doorConfig.frame.metalness}
            roughness={doorConfig.frame.roughness}
          />
        </mesh>
        {/* Right Side (divider attached to door) */}
        <mesh position={[panelWidth, -height / 2, 0]}>
          <boxGeometry args={[frameThickness, height, depth]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={doorConfig.frame.metalness}
            roughness={doorConfig.frame.roughness}
          />
        </mesh>

        {/* Door Knob */}
        <DoorKnob
          position={[
            panelWidth - doorConfig.knob.position.x,
            -height / 2 + doorConfig.knob.position.y,
            depth / 2 + 0.2,
          ]}
          side="left"
        />
      </group>

      {/* Right Panel - Pivot on right edge */}
      <group
        ref={rightDoorRef}
        position={[width / 2 - frameThickness, height / 2, 0]}
      >
        {/* Glass */}
        <mesh position={[-panelWidth / 2, -height / 2, 0]}>
          <boxGeometry
            args={[
              panelWidth - frameThickness,
              height - frameThickness * 2,
              depth,
            ]}
          />
          <meshPhysicalMaterial
            color={doorConfig.glass.color}
            transparent
            opacity={glassOpacity}
            transmission={glassTransmission}
            roughness={doorConfig.glass.roughness}
            thickness={doorConfig.glass.thickness}
            clearcoat={doorConfig.glass.clearcoat}
            clearcoatRoughness={doorConfig.glass.clearcoatRoughness}
            reflectivity={doorConfig.glass.reflectivity}
            metalness={doorConfig.glass.metalness}
          />
        </mesh>

        {/* Border Frame */}
        {/* Top */}
        <mesh position={[-panelWidth / 2, -frameThickness / 2, 0]}>
          <boxGeometry args={[panelWidth, frameThickness, depth]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={doorConfig.frame.metalness}
            roughness={doorConfig.frame.roughness}
          />
        </mesh>
        {/* Bottom */}
        <mesh position={[-panelWidth / 2, -height + frameThickness / 2, 0]}>
          <boxGeometry args={[panelWidth, frameThickness, depth]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={doorConfig.frame.metalness}
            roughness={doorConfig.frame.roughness}
          />
        </mesh>
        {/* Left Side (divider attached to door) */}
        <mesh position={[-panelWidth, -height / 2, 0]}>
          <boxGeometry args={[frameThickness, height, depth]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={doorConfig.frame.metalness}
            roughness={doorConfig.frame.roughness}
          />
        </mesh>
        {/* Right Side - This is the pivot edge */}
        <mesh position={[0, -height / 2, 0]}>
          <boxGeometry args={[frameThickness, height, depth]} />
          <meshStandardMaterial
            color={frameColor}
            metalness={doorConfig.frame.metalness}
            roughness={doorConfig.frame.roughness}
          />
        </mesh>

        {/* Door Knob */}
        <DoorKnob
          position={[
            -panelWidth + doorConfig.knob.position.x,
            -height / 2 + doorConfig.knob.position.y,
            depth / 2 + 0.2,
          ]}
          side="right"
        />
      </group>
    </group>
  );
}
