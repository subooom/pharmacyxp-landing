"use client";
import React, { useCallback } from "react";
import CounterCenter from "./CounterCenter";
import { Center } from "../../types";

import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

interface CentersProps {
  centers: Center[];
}

function Centers({ centers }: CentersProps) {
  return (
    <>
      {centers.map((center) => {
        const { id, center_type } = center;

        switch (center_type) {
          case "counter":
            return (
              <CenterWrapper center={center} key={id}>
                <CounterCenter centerData={center} />
              </CenterWrapper>
            );

          default:
            return null;
        }
      })}
    </>
  );
}

export default Centers;

interface CenterWrapperProps {
  center: Center;
  children: React.ReactNode;
}

export function CenterWrapper({ center, children }: CenterWrapperProps) {
  const { name, position, panning } = center;
  const { camera, controls } = useThree();

  // Material that is always visible
  const textMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    toneMapped: false,
    depthTest: false,
    depthWrite: false,
  });

  const handleClick = useCallback(() => {
    if (!panning || !controls) return;

    console.log("Center clicked:", name.name);

    // Tween camera position
    gsap.to(camera.position, {
      x: position[0] - 10,
      y: 20 + position[1],
      z: position[2] - 4.3,
      duration: 1.2,
      onUpdate: () => controls.update(),
    });

    // Tween OrbitControls target
    gsap.to(controls.target, {
      x: panning.lookAt[0],
      y: panning.lookAt[1],
      z: panning.lookAt[2],
      duration: 1.2,
      onUpdate: () => controls.update(),
    });
  }, [panning, controls, name.name, camera.position, position]);

  return (
    <group
      position={position}
      onClick={handleClick} // clickable
      onPointerOver={() => textMaterial.color.set("yellow")} // hover feedback
      onPointerOut={() => textMaterial.color.set("white")}
    >
      <Text
        position={[
          name.position[0] - 4.5,
          name.position[1] + 4.2,
          name.position[2] - 3,
        ]} // offset a bit above children
        rotation={name.rotation}
        fontSize={0.7}
        material={textMaterial}
        anchorX="center"
        anchorY="middle"
        font="/Josefin_Sans/static/JosefinSans-Bold.ttf"
        onClick={handleClick} // clickable
        onPointerOver={(e) => textMaterial.color.set("yellow")} // hover feedback
        onPointerOut={(e) => textMaterial.color.set("white")}
      >
        {name.name.toUpperCase()}
      </Text>

      {/* Actual center content */}
      {children}
    </group>
  );
}
