"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

interface GLBViewerProps {
  src: string;
}

export default function GLBViewer({ src }: GLBViewerProps) {
  const { scene } = useGLTF(src);

  return (
    <div className="w-40 h-40">
      <Canvas camera={{ position: [0, 1, 3] }}>
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />
        <primitive object={scene} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
