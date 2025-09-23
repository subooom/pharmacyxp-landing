import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Add this type definition if you don't have it
interface Spot {
  x: number;
  y: number;
  z: number;
  occupied?: boolean;
}

// Add this to your component
const SpotMarker: React.FC<{
  spot: Spot;
  index: number;
  isSelected: boolean;
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
  isMoveMode: boolean;
}> = ({ spot, index, isSelected, onHover, onClick, isMoveMode }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hoverState: boolean) => {
    setIsHovered(hoverState);
    onHover(hoverState ? index : null);
  };

  // Determine color based on state
  let color = "hotpink";
  if (spot.occupied) {
    color = "#ff3e3e"; // Red for occupied spots
  } else if (isSelected) {
    color = "#4ade80"; // Green for selected spot
  } else if (isHovered) {
    color = "#60a5fa"; // Blue for hovered spot
  }

  // Only show markers in move mode or when developing
  if (!isMoveMode) return null;

  return (
    <mesh
      ref={meshRef}
      position={[spot.x, spot.y + 0.1, spot.z]}
      onPointerOver={() => handleHover(true)}
      onPointerOut={() => handleHover(false)}
      onClick={() => !spot.occupied && onClick(index)}
      castShadow
    >
      <cylinderGeometry args={[1, 0.3, 0.05, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={spot.occupied ? 0.6 : 0.9}
        emissive={isHovered ? color : "#000000"}
        emissiveIntensity={isHovered ? 0.5 : 0}
      />
    </mesh>
  );
};

// Optional: Add a helper text UI component
{
  /* <div className="spot-helper-text">
  {isMoveMode && (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '5px',
      fontSize: '14px',
      zIndex: 1000
    }}>
      {hoveredSpot !== null ? (
        preset?.spots?.[hoveredSpot]?.occupied ? (
          "This spot is occupied"
        ) : (
          "Click to place rack here"
        )
      ) : (
        "Hover over a spot to place rack"
      )}
    </div>
  )}
</div> */
}

export default SpotMarker;
