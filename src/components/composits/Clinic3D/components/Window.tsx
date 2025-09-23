export type GlassPanelWithFrameProps = {
  width: number;
  height: number;
  depth?: number;
  glassColor?: string;
  opacity?: number;
  transmission?: number;
  frameThickness: number;
  frameColor: string;
  position?: [number, number, number];
};

export function GlassPanelWithFrame({
  width,
  height,
  depth = 0.05,
  glassColor = "white",
  opacity = 0.1,
  transmission = 1,
  frameThickness,
  frameColor,
  position = [0, 0, 0],
  ...props
}: GlassPanelWithFrameProps) {
  return (
    <group position={position} {...props}>
      {/* Glass */}
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial
          color={glassColor}
          transparent
          opacity={opacity}
          transmission={transmission}
          roughness={0}
          thickness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          reflectivity={1}
          metalness={0}
        />
      </mesh>

      {/* Frame - top */}
      <mesh position={[0, height / 2 + frameThickness / 2, 0]}>
        <boxGeometry
          args={[width + frameThickness * 2, frameThickness, depth]}
        />
        <meshStandardMaterial color={frameColor} />
      </mesh>

      {/* Frame - bottom */}
      <mesh position={[0, -height / 2 - frameThickness / 2, 0]}>
        <boxGeometry
          args={[width + frameThickness * 2, frameThickness, depth]}
        />
        <meshStandardMaterial color={frameColor} />
      </mesh>

      {/* Frame - left */}
      <mesh position={[-width / 2 - frameThickness / 2, 0, 0]}>
        <boxGeometry args={[frameThickness, height, depth]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>

      {/* Frame - right */}
      <mesh position={[width / 2 + frameThickness / 2, 0, 0]}>
        <boxGeometry args={[frameThickness, height, depth]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
    </group>
  );
}
