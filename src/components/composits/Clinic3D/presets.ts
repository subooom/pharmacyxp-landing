import { BuilderPreset, PresetKey } from "./types";

export const PRESETS: Record<PresetKey, BuilderPreset> = {
  store: {
    label: "Small",
    camera: {
      zoom: 15,
    },
    room: {
      width: 24,
      length: 18,
      height: 10,
      wallColor: "#c6d8fb",
      floorColor: "#dc2626",
      floor: {
        theme: "carpet" as "carpet" | "tiles" | "wood",
        themes: {
          carpet: "#cbd5e1",
          tiles: "#94a3b8",
          wood: "#b45309",
        },
      },

      headerHeight: 1.2,
      headerColor: "#111827",

      doorWidth: 9,
      doorHeight: 8.8,
      doorColor: "#374151",
      doorFrameThickness: 0.15,
      doorFrameColor: "white",

      windowHeight: 9,
      windowColor: "#fafafa",
      windowOpacity: 0.5,
      windowTransmission: 0.9,
      windowFrameThickness: 0.5,
      windowFrameColor: "#1f2937",

      frameThickness: 0.2,
      frameColor: "#1f2937",
    }, // NEW: define exact spots where racks can go

    centers: [
      {
        id: 1,
        shortcut: { id: 1, position: [0, -1] },
        center_type: "counter",
        center_variant: "alpha",
        position: [-2.6, 0, 7.5],
        name: {
          name: "Counter",
          position: [0, 0, 0],
        },
        panning: {
          lookAt: [24, 4, 0],
          zoom: 0,
        },
      },
    ],
    // Spots arranged in a grid pattern with appropriate spacing for a 24x18 room
    spots: [
      // First row (z = -6)
      { x: -9, y: 0, z: -6 },
      { x: -6, y: 0, z: -6 },
      { x: -3, y: 0, z: -6 },
      { x: 0, y: 0, z: -6 },
      { x: 3, y: 0, z: -6 },
      { x: 6, y: 0, z: -6 },
      { x: 9, y: 0, z: -6 },

      // Second row (z = -3)
      { x: -9, y: 0, z: -3 },
      { x: -6, y: 0, z: -3 },
      { x: -3, y: 0, z: -3 },
      { x: 0, y: 0, z: -3 },
      { x: 3, y: 0, z: -3 },
      { x: 6, y: 0, z: -3 },
      { x: 9, y: 0, z: -3 },

      // Center row (z = 0)
      { x: -9, y: 0, z: 0 },
      { x: -6, y: 0, z: 0 },
      { x: -3, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 },
      { x: 6, y: 0, z: 0 },
      { x: 9, y: 0, z: 0 },

      // Fourth row (z = 3)
      { x: -9, y: 0, z: 3 },
      { x: -6, y: 0, z: 3 },
      // { x: -3, y: 0, z: 3 },
      // { x: 0, y: 0, z: 3 },
      // { x: 3, y: 0, z: 3 },
      { x: 6, y: 0, z: 3 },
      { x: 9, y: 0, z: 3 },

      // Fifth row (z = 6)
      { x: -9, y: 0, z: 6 },
      { x: -6, y: 0, z: 6 },
      // { x: -3, y: 0, z: 6 },
      // { x: 0, y: 0, z: 6 },
      // { x: 3, y: 0, z: 6 },
      { x: 6, y: 0, z: 6 },
      { x: 9, y: 0, z: 6 },
    ],
    rack: { slotDepth: 1, backThickness: 0.1 },
    layout: { rows: 2, cols: 4, spacing: 3 },
    lighting: { intensity: 0.7, color: "#fef3c7" },
  },
  polyclinic: {
    label: "Medium",
    camera: {
      zoom: 20.5,
    },
    room: {
      width: 36,
      length: 28,
      height: 12,
      wallColor: "#85ffd6",
      floorColor: "#dc2626",
      floor: {
        theme: "carpet" as "carpet" | "tiles" | "wood",
        themes: {
          carpet: "#cbd5e1",
          tiles: "#94a3b8",
          wood: "#b45309",
        },
      },

      headerHeight: 1.2,
      headerColor: "#111827",

      doorWidth: 6,
      doorHeight: 10,
      doorColor: "#374151",
      doorFrameThickness: 0.15,
      doorFrameColor: "white",

      windowHeight: 10,
      windowColor: "#60a5fa",
      windowOpacity: 0.5,
      windowTransmission: 0.9,
      windowFrameThickness: 0.5,
      windowFrameColor: "#1f2937",

      frameThickness: 0.2,
      frameColor: "#1f2937",
    },
    // Spots arranged in a grid pattern with appropriate spacing for a 36x28 room
    spots: [
      // First row (z = -10.5)
      { x: -13.5, y: 0, z: -10.5 },
      { x: -9, y: 0, z: -10.5 },
      { x: -4.5, y: 0, z: -10.5 },
      { x: 0, y: 0, z: -10.5 },
      { x: 4.5, y: 0, z: -10.5 },
      { x: 9, y: 0, z: -10.5 },
      { x: 13.5, y: 0, z: -10.5 },

      // Second row (z = -7)
      { x: -13.5, y: 0, z: -7 },
      { x: -9, y: 0, z: -7 },
      { x: -4.5, y: 0, z: -7 },
      { x: 0, y: 0, z: -7 },
      { x: 4.5, y: 0, z: -7 },
      { x: 9, y: 0, z: -7 },
      { x: 13.5, y: 0, z: -7 },

      // Third row (z = -3.5)
      { x: -13.5, y: 0, z: -3.5 },
      { x: -9, y: 0, z: -3.5 },
      { x: -4.5, y: 0, z: -3.5 },
      { x: 0, y: 0, z: -3.5 },
      { x: 4.5, y: 0, z: -3.5 },
      { x: 9, y: 0, z: -3.5 },
      { x: 13.5, y: 0, z: -3.5 },

      // Center row (z = 0)
      { x: -13.5, y: 0, z: 0 },
      { x: -9, y: 0, z: 0 },
      { x: -4.5, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 4.5, y: 0, z: 0 },
      { x: 9, y: 0, z: 0 },
      { x: 13.5, y: 0, z: 0 },

      // Fifth row (z = 3.5)
      { x: -13.5, y: 0, z: 3.5 },
      { x: -9, y: 0, z: 3.5 },
      { x: -4.5, y: 0, z: 3.5 },
      { x: 0, y: 0, z: 3.5 },
      { x: 4.5, y: 0, z: 3.5 },
      { x: 9, y: 0, z: 3.5 },
      { x: 13.5, y: 0, z: 3.5 },

      // Sixth row (z = 7)
      { x: -13.5, y: 0, z: 7 },
      { x: -9, y: 0, z: 7 },
      { x: -4.5, y: 0, z: 7 },
      { x: 0, y: 0, z: 7 },
      { x: 4.5, y: 0, z: 7 },
      { x: 9, y: 0, z: 7 },
      { x: 13.5, y: 0, z: 7 },

      // Seventh row (z = 10.5)
      { x: -13.5, y: 0, z: 10.5 },
      { x: -9, y: 0, z: 10.5 },
      { x: -4.5, y: 0, z: 10.5 },
      { x: 0, y: 0, z: 10.5 },
      { x: 4.5, y: 0, z: 10.5 },
      { x: 9, y: 0, z: 10.5 },
      { x: 13.5, y: 0, z: 10.5 },
    ],
    rack: { slotDepth: 1, backThickness: 0.1 },
    layout: { rows: 3, cols: 5, spacing: 3.5 },
    lighting: { intensity: 0.8, color: "#f0f9ff" },
  },
  warehouse: {
    label: "Large",
    camera: {
      zoom: 30.5,
    },
    room: {
      width: 60,
      length: 40,
      height: 18,
      wallColor: "#b8d3ff",
      floorColor: "#dc2626",
      floor: {
        theme: "carpet" as "carpet" | "tiles" | "wood",
        themes: {
          carpet: "#cbd5e1",
          tiles: "#94a3b8",
          wood: "#b45309",
        },
      },

      headerHeight: 1.2,
      headerColor: "#111827",

      doorWidth: 9,
      doorHeight: 16.9,
      doorColor: "#374151",
      doorFrameThickness: 0.15,
      doorFrameColor: "white",

      windowHeight: 16.9,
      windowColor: "#60a5fa",
      windowOpacity: 0.5,
      windowTransmission: 0.9,
      windowFrameThickness: 0.5,
      windowFrameColor: "#1f2937",

      frameThickness: 0.2,
      frameColor: "#1f2937",
    },
    spots: [
      // First row (z = -15)
      { x: -22.5, y: 0, z: -15 },
      { x: -15, y: 0, z: -15 },
      { x: -7.5, y: 0, z: -15 },
      { x: 0, y: 0, z: -15 },
      { x: 7.5, y: 0, z: -15 },
      { x: 15, y: 0, z: -15 },
      { x: 22.5, y: 0, z: -15 },

      // Second row (z = -10)
      { x: -22.5, y: 0, z: -10 },
      { x: -15, y: 0, z: -10 },
      { x: -7.5, y: 0, z: -10 },
      { x: 0, y: 0, z: -10 },
      { x: 7.5, y: 0, z: -10 },
      { x: 15, y: 0, z: -10 },
      { x: 22.5, y: 0, z: -10 },

      // Third row (z = -5)
      { x: -22.5, y: 0, z: -5 },
      { x: -15, y: 0, z: -5 },
      { x: -7.5, y: 0, z: -5 },
      { x: 0, y: 0, z: -5 },
      { x: 7.5, y: 0, z: -5 },
      { x: 15, y: 0, z: -5 },
      { x: 22.5, y: 0, z: -5 },

      // Center row (z = 0)
      { x: -22.5, y: 0, z: 0 },
      { x: -15, y: 0, z: 0 },
      { x: -7.5, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 7.5, y: 0, z: 0 },
      { x: 15, y: 0, z: 0 },
      { x: 22.5, y: 0, z: 0 },

      // Fifth row (z = 5)
      { x: -22.5, y: 0, z: 5 },
      { x: -15, y: 0, z: 5 },
      { x: -7.5, y: 0, z: 5 },
      { x: 0, y: 0, z: 5 },
      { x: 7.5, y: 0, z: 5 },
      { x: 15, y: 0, z: 5 },
      { x: 22.5, y: 0, z: 5 },

      // Sixth row (z = 10)
      { x: -22.5, y: 0, z: 10 },
      { x: -15, y: 0, z: 10 },
      { x: -7.5, y: 0, z: 10 },
      { x: 0, y: 0, z: 10 },
      { x: 7.5, y: 0, z: 10 },
      { x: 15, y: 0, z: 10 },
      { x: 22.5, y: 0, z: 10 },

      // Seventh row (z = 15)
      { x: -22.5, y: 0, z: 15 },
      { x: -15, y: 0, z: 15 },
      { x: -7.5, y: 0, z: 15 },
      { x: 0, y: 0, z: 15 },
      { x: 7.5, y: 0, z: 15 },
      { x: 15, y: 0, z: 15 },
      { x: 22.5, y: 0, z: 15 },
    ],
    rack: { slotDepth: 1, backThickness: 0.1 },
    layout: { rows: 4, cols: 8, spacing: 4 },
    lighting: { intensity: 2.0, color: "red" },
  },
};
