// -------------------- Types & Presets --------------------

export type PresetKey = "store" | "polyclinic" | "warehouse";

export type RackCategory = "counter" | "fridge" | "shelf" | "freezer";

export type CounterVariant = "delta" | "mamba" | "gamma";
export type FridgeVariant = "frost" | "polar" | "titan";
export type ShelfVariant = "atlas" | "zephyr" | "nova";
export type FreezerVariant = "arctic" | "blizzard" | "glacier";

// ----------------- Rack Type (Dynamic Union) -----------------
export type RackType =
  | { type: "counter"; variant: CounterVariant }
  | { type: "fridge"; variant: FridgeVariant }
  | { type: "shelf"; variant: ShelfVariant }
  | { type: "freezer"; variant: FreezerVariant };

// ----------------- Asset Types -----------------
export type AssetType =
  | "rack"
  | "machine"
  | "avatar"
  | "toys"
  | "furniture"
  | "decorations";

export interface Asset {
  id: number;
  name: string;
  type: AssetType;
  category: string;
  tags: string[];
  thumbnail: string;
  mountType: "floor" | "wall" | "ceiling" | "free";
  dimensions: { width: number; height: number; depth: number };
  interactive: boolean;
  interactionType?: "click" | "hover" | "drag" | "contextMenu";
  metadata?: Record<string, unknown>;
  variants?: AssetVariant[];
}

export interface AssetVariant {
  id: number;
  name: string;
  color?: string;
  material?: string;
  thumbnail: string;
  metadata?: Record<string, unknown>;
}

export interface AssetPlacement {
  id: number;
  assetId: number;
  variantId?: number;
  spotId: number;
  rotationZ: number;
  metadata?: Record<string, unknown>;
}

export interface Spot {
  id?: number;
  x: number;
  y: number;
  z: number;
  type?: "floor" | "wall" | "ceiling";
  wallDirection?: "north" | "south" | "east" | "west";
  available?: boolean;
  metadata?: Record<string, unknown>;
}

// ----------------- Rack Interface -----------------
export interface Rack {
  id: number;
  name: string;
  position: [number, number, number];
  rotation: number;
  columns: number;
  rows: number;
  color: string;
  rack_type?: RackType;
}

export interface RoomConfig {
  width: number;
  height: number;
  length: number;
  wallColor: string;
  floorColor: string;
  floor: {
    theme: "carpet" | "tiles" | "wood";
    themes: {
      carpet: string;
      tiles: string;
      wood: string;
    };
  };
  headerHeight: number;
  headerColor: string;
  doorWidth: number;
  doorHeight: number;
  doorColor: string;
  doorFrameThickness: number;
  doorFrameColor: string;
  windowHeight: number;
  windowColor: string;
  windowOpacity: number;
  windowTransmission: number;
  windowFrameThickness: number;
  windowFrameColor: string;
  frameThickness: number;
  frameColor: string;
}

export type CenterShortcut = {
  id: number;
  position: [number, number];
};

type CenterType =
  | "hr"
  | "counter"
  | "medical"
  | "xray"
  | "pharmacy"
  | "medical_departments";

export type CenterVariant = "alpha" | "beta" | "gamma";

export type CenterName = {
  name: string;
  position: [number, number, number];
  rotation?: [number, number, number];
};

export interface Panning {
  lookAt: [number, number, number];
  zoom: number;
}

export interface Center {
  id: number;
  name: CenterName;
  shortcut: CenterShortcut;
  panning: Panning;
  position: [number, number, number];
  center_type: CenterType;
  center_variant?: CenterVariant;
  metadata?: Record<string, unknown>;
}

export interface BuilderPreset {
  label: string;
  room: RoomConfig;
  camera: {
    zoom: number;
  };
  rack: {
    slotDepth: number;
    backThickness: number;
  };
  spots: Spot[];
  centers?: Center[];
  assetsPresets?: AssetPlacement[][];
  layout: { rows: number; cols: number; spacing: number };
  lighting: { intensity: number; color: string };
  variantPresets?: AssetVariantPreset[];
}

export interface AssetVariantPreset {
  id: number;
  name: string;
  description: string;
  variants: {
    assetId: number;
    variantId: number;
  }[];
}
