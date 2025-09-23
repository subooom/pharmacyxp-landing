import RackComponent from "../../RackComponent";

export type VariantConfig = {
  asset: string | React.ReactElement; // file path to GLB
  pos: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
};

export const counterVariants: Record<
  "alpha" | "beta" | "gamma",
  VariantConfig[]
> = {
  alpha: [
    {
      asset: "/assets/Office Pack-glb/Desk-ISpMh81QGq.glb",
      pos: [0, 0, 0],
      scale: 2.5,
    },
    {
      asset: (
        <RackComponent
          rack={{
            id: 999,
            name: "Demo Rack",
            position: [0, 0, -12.5],
            rotation: 90,
            columns: 4,
            rows: 3,
            color: "lightgrey",
          }}
          size={{
            backThickness: 0.1,
            slotDepth: 1,
            height: 4,
          }}
          isMoveMode={false}
          toggleMoveMode={() => {}}
        />
      ),
      pos: [0, 0, -1.5],
    },
  ],
  beta: [
    { asset: "/assets/Office Pack-glb/Desk-EtJlOllzbf.glb", pos: [0, 0, 0] },
    {
      asset: "/assets/Office Pack-glb/Chair-1MFMOaz3zqe.glb",
      pos: [1, 0, -1.2],
    },
    {
      asset: "/assets/Office Pack-glb/Computer Screen.glb",
      pos: [0.2, 1, 0.3],
    },
  ],
  gamma: [
    { asset: "/assets/Office Pack-glb/Desk-EtJlOllzbf.glb", pos: [0, 0, 0] },
    {
      asset: "/assets/Office Pack-glb/Chair-1MFMOaz3zqe.glb",
      pos: [-1, 0, -1.2],
    },
    { asset: "/assets/Office Pack-glb/Computer Screen.glb", pos: [0, 1, 0.5] },
    {
      asset: "/assets/Office Pack-glb/Computer mouse.glb",
      pos: [-0.3, 0.9, 0.2],
    },
  ],
};
