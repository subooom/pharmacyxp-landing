// components/Wall.tsx
import { useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { useRef } from "react";

// 🌀 Config
export const wallConfig = {
  noiseScale: 0.5, // size of the noise blobs
  threshold: 0.9, // how much wall to cut out
  softness: 0.5, // smooth edge of the cutout
  followStrength: 0.01, // how much the hole follows the camera
  color: "#ffffff",
};

// GLSL noise texture trick -> sampled from a pre-generated cloud texture
// (you can swap in perlin/simplex if you like)
const WallShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uThreshold: wallConfig.threshold,
    uSoftness: wallConfig.softness,
    uNoiseScale: wallConfig.noiseScale,
    uFollow: wallConfig.followStrength,
    uCamPos: new THREE.Vector3(),
    uColor: new THREE.Color(wallConfig.color),
    uNoiseTex: new THREE.Texture(),
  },
  /* vertex shader */
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  /* fragment shader */
  `
  uniform float uTime;
  uniform float uThreshold;
  uniform float uSoftness;
  uniform float uNoiseScale;
  uniform float uFollow;
  uniform vec3 uCamPos;
  uniform sampler2D uNoiseTex;
  uniform vec3 uColor;

  varying vec2 vUv;

  void main() {
    // Shift UVs based on camera position
    vec2 uv = vUv * uNoiseScale;
    uv += uCamPos.xy * uFollow;

    // Sample cloud texture
    float n = texture2D(uNoiseTex, uv).r;

    // Apply threshold cutout
    float alpha = smoothstep(uThreshold - uSoftness, uThreshold + uSoftness, n);

    if (alpha < 0.01) discard; // punch the hole

    gl_FragColor = vec4(uColor, alpha);
  }
  `,
);

extend({ WallShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      wallShaderMaterial: ReactThreeFiber.Object3DNode<
        typeof WallShaderMaterial,
        typeof WallShaderMaterial
      >;
    }
  }
}

export default function Wall({
  width,
  height,
  depth = 0.1,
  position,
  noiseTexture,
}: {
  width: number;
  height: number;
  depth?: number;
  position: [number, number, number];
  noiseTexture: THREE.Texture;
}) {
  const matRef = useRef<any>();
  const { camera, clock } = useThree();

  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.uTime = clock.getElapsedTime();
    matRef.current.uCamPos = camera.position;
  });

  return (
    <mesh position={position}>
      <boxGeometry args={[width, height, depth]} />
      <wallShaderMaterial ref={matRef} uNoiseTex={noiseTexture} />
    </mesh>
  );
}
