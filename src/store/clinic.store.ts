// stores/useClinicBuilderStore.ts
import { TimeOfDay } from "@/components/composits/Clinic3D/components/ControlsPanel";
import { generateId } from "@/components/composits/Clinic3D/helpers";
import { PRESETS } from "@/components/composits/Clinic3D/presets";
import {
  BuilderPreset,
  PresetKey,
  Rack,
  RoomConfig,
} from "@/components/composits/Clinic3D/types";
import { create } from "zustand";

interface ClinicBuilderState {
  // State
  presetKey: PresetKey;
  wallColor: string;
  roomDims: RoomConfig;
  rackDims: BuilderPreset["rack"];
  layout: BuilderPreset["layout"];
  racks: Rack[];
  selectedRack: number | null;
  newRackName: string;
  newRackColumns: number;
  newRackRows: number;
  isMoveMode: boolean;
  floorTheme: BuilderPreset["room"]["floor"]["theme"];
  timeOfDay: TimeOfDay;

  // Actions
  setPresetKey: (presetKey: PresetKey) => void;
  setWallColor: (wallColor: string) => void;
  setRoomDims: (roomDims: RoomConfig) => void;
  setRackDims: (rackDims: BuilderPreset["rack"]) => void;
  setLayout: (layout: BuilderPreset["layout"]) => void;
  setRacks: (racks: Rack[]) => void;
  setSelectedRack: (selectedRack: number | null) => void;
  setNewRackName: (newRackName: string) => void;
  setNewRackColumns: (newRackColumns: number) => void;
  setNewRackRows: (newRackRows: number) => void;
  setIsMoveMode: (isMoveMode: boolean) => void;
  setFloorTheme: (floorTheme: BuilderPreset["room"]["floor"]["theme"]) => void;
  setTimeOfDay: (timeOfDay: TimeOfDay) => void;

  // Complex actions
  handleAddRack: () => void;
  handleDeleteRack: () => void;
  handleRackUpdate: (id: number, updates: Partial<Rack>) => void;
  handleRotate: (id: number, newRotation: number) => void;
  updateRackPosition: (position: [number, number, number]) => void;
  toggleIsMoveMode: () => void;
  syncPreset: (presetKey: PresetKey) => void;
}

export const useClinicBuilderStore = create<ClinicBuilderState>((set, get) => ({
  // Initial state
  presetKey: "store",
  wallColor: PRESETS.store.room.wallColor,
  roomDims: PRESETS.store.room,
  rackDims: PRESETS.store.rack,
  layout: PRESETS.store.layout,
  racks: [],
  selectedRack: null,
  newRackName: "Rack 1",
  newRackColumns: 5,
  newRackRows: 4,
  isMoveMode: false,
  floorTheme: "carpet",
  timeOfDay: "auto",

  // Setters
  setPresetKey: (presetKey) => set({ presetKey }),
  setWallColor: (wallColor) => set({ wallColor }),
  setRoomDims: (roomDims) => set({ roomDims }),
  setRackDims: (rackDims) => set({ rackDims }),
  setLayout: (layout) => set({ layout }),
  setRacks: (racks) => set({ racks }),
  setSelectedRack: (selectedRack) => set({ selectedRack }),
  setNewRackName: (newRackName) => set({ newRackName }),
  setNewRackColumns: (newRackColumns) => set({ newRackColumns }),
  setNewRackRows: (newRackRows) => set({ newRackRows }),
  setIsMoveMode: (isMoveMode) => set({ isMoveMode }),
  setFloorTheme: (floorTheme) => set({ floorTheme }),
  setTimeOfDay: (timeOfDay) => set({ timeOfDay }),

  // Complex actions
  handleAddRack: () => {
    const { newRackName, newRackColumns, newRackRows, racks } = get();

    const newRack: Rack = {
      id: generateId(),
      name: newRackName,
      position: [0, newRackRows / 2, 0],
      rotation: 0,
      columns: newRackColumns,
      rows: newRackRows,
      color: "teal",
    };

    set({
      racks: [...racks, newRack],
      newRackName: `Rack ${racks.length + 2}`,
      selectedRack: newRack.id,
    });

    get().toggleIsMoveMode();
  },

  handleDeleteRack: () => {
    const { selectedRack, racks } = get();
    if (selectedRack) {
      set({
        racks: racks.filter((rack) => rack.id !== selectedRack),
        selectedRack: null,
      });
    }
  },

  handleRackUpdate: (id, updates) => {
    const { racks } = get();
    set({
      racks: racks.map((rack) =>
        rack.id === id ? { ...rack, ...updates } : rack,
      ),
    });
  },

  handleRotate: (id, newRotation) => {
    const { racks } = get();
    set({
      racks: racks.map((rack) =>
        rack.id === id ? { ...rack, rotation: newRotation } : rack,
      ),
    });
  },

  updateRackPosition: (position) => {
    const { selectedRack, racks } = get();
    if (!selectedRack) return;

    const updatedRacks = racks.map((rack) =>
      rack.id === selectedRack ? { ...rack, position } : rack,
    );

    set({ racks: updatedRacks });
    get().toggleIsMoveMode();
  },

  toggleIsMoveMode: () => {
    set((state) => ({ isMoveMode: !state.isMoveMode }));
  },

  syncPreset: (presetKey) => {
    const p = PRESETS[presetKey];
    set({
      wallColor: p.room.wallColor,
      floorTheme: p.room.floor.theme,
      roomDims: p.room,
      rackDims: p.rack,
      layout: p.layout,
    });
  },
}));
