"use client";
import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { counterVariants, VariantConfig } from "./variants";
import { Center, CenterVariant } from "../../../types";

interface CounterCenterProps {
  centerData: Center;
}

function CounterCenter({ centerData }: CounterCenterProps) {
  const { center_variant = "alpha" as CenterVariant, position } = centerData;

  const layout = counterVariants[center_variant];

  return (
    <group position={new THREE.Vector3(...position)}>
      {layout.map((item, i) => {
        if (typeof item.asset === "string") {
          return (
            <CounterCenterAsset item={item as VariantConfigAsset} key={i} />
          );
        } else {
          return <React.Fragment key={i}>{item.asset}</React.Fragment>;
        }
      })}
    </group>
  );
}

// make a type where item.asset is always a string
interface VariantConfigAsset extends VariantConfig {
  asset: string;
}

const CounterCenterAsset = ({
  item,
  key,
}: {
  item: VariantConfigAsset;
  key: number;
}) => {
  const { scene } = useGLTF(item.asset);
  return (
    <primitive
      key={key}
      object={scene}
      scale={item.scale}
      rotation={item.rotation as [number, number, number]}
      position={item.pos}
    />
  );
};

export default CounterCenter;
