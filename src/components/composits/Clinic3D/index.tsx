"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./components/Scene";
import { BuilderPreset, PresetKey, Rack } from "./types";
import { PRESETS } from "./presets";
import { generateId } from "./helpers";
import ControlsPanel from "./components/ControlsPanel";
import { TimeOfDay } from "./components/DayNightCycle";

// -------------------- Main Component --------------------

type BuilderProps = {
  initialPreset?: PresetKey;
};

export default function ClinicBuilder3D({
  initialPreset = "store",
}: BuilderProps) {
  const [presetKey, setPresetKey] = useState<PresetKey>(initialPreset);
  const [wallColor, setWallColor] = useState(
    PRESETS[initialPreset].room.wallColor,
  );
  const [roomDims, setRoomDims] = useState(PRESETS[initialPreset].room);
  const [rackDims, setRackDims] = useState(PRESETS[initialPreset].rack);
  const [layout, setLayout] = useState(PRESETS[initialPreset].layout);
  const [racks, setRacks] = useState<Rack[]>([]);
  const [selectedRack, setSelectedRack] = useState<number | null>(null);
  const [newRackName, setNewRackName] = useState("Rack " + (racks.length + 1));
  const [newRackColumns, setNewRackColumns] = useState(5);
  const [newRackRows, setNewRackRows] = useState(4);
  const [isMoveMode, setIsMoveMode] = useState(false);

  const [floorTheme, setFloorTheme] =
    useState<BuilderPreset["room"]["floor"]["theme"]>("carpet");

  // Sync wall color change into roomDims
  useEffect(() => setRoomDims((r) => ({ ...r, wallColor })), [wallColor]);
  useEffect(
    () =>
      setRoomDims((r) => ({ ...r, floor: { ...r.floor, theme: floorTheme } })),
    [floorTheme],
  );

  // Recompute preset when presetKey changes
  useEffect(() => {
    const p = PRESETS[presetKey];
    setWallColor(p.room.wallColor);
    setFloorTheme(p.room.floor.theme);
    setRoomDims(p.room);
    setRackDims(p.rack);
    setLayout(p.layout);
  }, [presetKey]);

  const preset: BuilderPreset = useMemo(
    () => ({
      ...PRESETS[presetKey],
      room: roomDims,
      rack: rackDims,
      layout,
      lighting: {
        intensity: 0.4,
        color: "#a1c5ea",
      },
    }),
    [presetKey, roomDims, rackDims, layout],
  );

  const handleAddRack = () => {
    const newRack: Rack = {
      id: generateId(),
      name: newRackName,
      position: [0, newRackRows / 2, 0],
      rotation: 0,
      columns: newRackColumns,
      rows: newRackRows,
      color: "teal",
    };

    setRacks([...racks, newRack]);
    setNewRackName("Rack " + (racks.length + 2));
    setSelectedRack(newRack.id);
    toggleIsMoveMode();
  };

  const handleDeleteRack = () => {
    if (selectedRack) {
      setRacks(racks.filter((rack) => rack.id !== selectedRack));
      setSelectedRack(null);
    }
  };

  const handleRackUpdate = (id: number, updates: Partial<Rack>) => {
    setRacks(
      racks.map((rack) => (rack.id === id ? { ...rack, ...updates } : rack)),
    );
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Deselect rack when clicking on empty space
    if (e.target === e.currentTarget) {
      setSelectedRack(null);
    }
  };

  const handleRotate = (id: number, newRotation: number) => {
    setRacks((prev) =>
      prev.map((rack) =>
        rack.id === id
          ? { ...rack, rotation: THREE.MathUtils.radToDeg(newRotation) }
          : rack,
      ),
    );
  };
  const toggleIsMoveMode = () => {
    setIsMoveMode((prev) => !prev);
  };

  const updateRackPosition = (position: [number, number, number]) => {
    if (!selectedRack) return;

    const mutatedRacks = racks;

    mutatedRacks
      .filter((item) => item.id === selectedRack)
      .map((item) => {
        item.position = position;

        return { ...item };
      });

    setRacks(mutatedRacks);
    toggleIsMoveMode();
  };
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("auto");
  return (
    <div className="relative w-full flex gap-8 px-6 pt-6 h-[90dvh] bg-primary-50">
      {/* <ControlsPanel
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
        presetKey={presetKey}
        setPresetKey={setPresetKey}
        wallColor={wallColor}
        setWallColor={setWallColor}
        floorTheme={floorTheme}
        setFloorTheme={setFloorTheme}
        roomDims={roomDims}
        setRoomDims={setRoomDims}
        newRackName={newRackName}
        setNewRackName={setNewRackName}
        newRackColumns={newRackColumns}
        setNewRackColumns={setNewRackColumns}
        newRackRows={newRackRows}
        setNewRackRows={setNewRackRows}
        handleAddRack={handleAddRack}
        selectedRack={selectedRack}
        handleDeleteRack={handleDeleteRack}
      /> */}
      {/* Stats Panel */}
      {/* <div className="bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow">
        <div className="text-sm text-primary-700">
          <div>Racks: {racks.length}</div>
          <div>
            Total Slots:{" "}
            {racks.reduce((sum, rack) => sum + rack.columns * rack.rows, 0)}
          </div>
          <div>
            Room: {roomDims.width}ft × {roomDims.length}ft
          </div>
        </div>
      </div> */}

      {/* Canvas */}
      <div className="w-full h-full" onClick={handleCanvasClick}>
        <Canvas
          shadows
          camera={{ position: [0, 10, 30], fov: 45 }}
          dpr={[1, 2]}
        >
          {/* <OrganicWalls /> */}
          <Scene
            preset={preset}
            racks={racks}
            timeOfDay={timeOfDay}
            setTimeOfDay={setTimeOfDay}
            onUpdateRackPosition={updateRackPosition}
            isMoveMode={isMoveMode}
            toggleMoveMode={toggleIsMoveMode}
            selectedRack={selectedRack}
            onRackSelect={setSelectedRack}
            onRackUpdate={handleRackUpdate}
            handleRotate={handleRotate}
          />
        </Canvas>
      </div>
    </div>
  );
}
