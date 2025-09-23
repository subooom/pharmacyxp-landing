// -------------------- Scene Component --------------------

import { BuilderPreset, Rack } from "../types";
import RackComponent from "./RackComponent";
import DayNightCycle, { TimeOfDay } from "./DayNightCycle";
import { useEffect, useMemo, useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Terrain } from "./Terrain";
import { GlassNavbar } from "./GlassNavbar";

type SceneProps = {
  preset: BuilderPreset;
  racks: Rack[];
  selectedRack: number | null;
  isMoveMode: boolean;
  toggleMoveMode: () => void;
  onRackSelect: (id: number) => void;
  onRackUpdate: (id: number, updates: Partial<Rack>) => void;
  handleRotate: (id: number, newRotation: number) => void;
  onUpdateRackPosition: (position: [number, number, number]) => void;
  timeOfDay: TimeOfDay;
  setTimeOfDay: React.Dispatch<React.SetStateAction<TimeOfDay>>;
};

export default function Scene({
  preset,
  racks,
  selectedRack,
  onRackSelect,
  handleRotate,
  toggleMoveMode,
  isMoveMode,
  onUpdateRackPosition,
  timeOfDay,
}: SceneProps) {
  const { room, rack: rackSize } = preset;
  const currentRack = useMemo(() => {
    return racks.find((item) => item.id === selectedRack);
  }, [selectedRack, racks]);

  const { scene: RoomBase } = useGLTF(
    "/models/base_medicinexp_pharmacy_builder.glb",
  );

  // Camera animation setup
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Animation refs
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const initialPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const initialTargetRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const initialZoomRef = useRef<number>(1);

  useEffect(() => {
    if (!camera || !controlsRef.current) return;

    // Cancel any ongoing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    // Store initial values
    initialPositionRef.current.copy(camera.position);
    initialTargetRef.current.copy(controlsRef.current.target);
    initialZoomRef.current = camera.zoom;

    // Set up animation
    startTimeRef.current = Date.now();
    const duration = 1000; // 1 second transition

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing function (easeOutCubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      // Interpolate camera position
      camera.position.lerpVectors(
        initialPositionRef.current,
        new THREE.Vector3(...preset.camera.position),
        easedProgress,
      );

      // Interpolate controls target
      controlsRef.current.target.lerpVectors(
        initialTargetRef.current,
        new THREE.Vector3(...preset.camera.target),
        easedProgress,
      );

      // Interpolate zoom
      camera.zoom = THREE.MathUtils.lerp(
        initialZoomRef.current,
        preset.camera.zoom,
        easedProgress,
      );
      camera.updateProjectionMatrix();

      // Update controls
      controlsRef.current.update();

      // Continue animation if not complete
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    // Clean up
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [preset, camera]);

  return (
    <>
      <DayNightCycle manualTimeOfDay={timeOfDay} />
      <GlassNavbar />
      {racks.map((rack) => (
        <RackComponent
          key={rack.id}
          rack={rack}
          size={rackSize}
          isMoveMode={isMoveMode}
          toggleMoveMode={toggleMoveMode}
          isSelected={selectedRack === rack.id}
          onClick={onRackSelect}
          onRotate={handleRotate}
        />
      ))}{" "}
      <primitive
        shadeSmooth
        object={RoomBase}
        scale={room.width * 0.7}
        rotation={[0, 2.5, 0]}
        position={[0, -room.width * 0.7 * 0.16 + 6, 3]}
      />
      <Terrain
        roomBaseProps={{
          scale: room.width * 0.6,
          rotation: [0, 2.5, 0],
          position: [0, -room.width * 0.7 * 0.16 + 6, 3],
          room: room,
        }}
        roomProps={{
          size: room,
          preset: preset,
          isMoveMode: isMoveMode,
          onUpdateRackPosition: onUpdateRackPosition,
          toggleMoveMode: toggleMoveMode,
          selectedRack: currentRack,
        }}
        config={{
          size: 620,
          resolution: 220,
          amplitude: 17,
          pedestalHeight: 7.6,
          pedestalRadius: room.width * 2,
          numSeeds: 1,
          noiseScale: 120,
        }}
      />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={true}
        enableRotate={true}
        enableZoom={true}
      />
    </>
  );
}
