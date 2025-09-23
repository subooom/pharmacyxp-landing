"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { EXRLoader, RGBELoader } from "three-stdlib";
import { TimeOfDayExclAuto } from "./DayNightCycle";

interface HDRISwitcherProps {
  timeOfDay: TimeOfDayExclAuto;
}

const HDRISwitcher: React.FC<HDRISwitcherProps> = ({ timeOfDay }) => {
  const { scene } = useThree();
  const [error, setError] = useState<string | null>(null);

  // Helper function to try different loaders and formats
  const useTextureLoader = (path: string) => {
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const [loadingError, setLoadingError] = useState<string | null>(null);

    useEffect(() => {
      let isMounted = true;

      const loadTexture = async () => {
        try {
          // Try EXR loader first
          const loader = new EXRLoader();
          const exrTexture = await loader.loadAsync(path);
          if (isMounted) {
            setTexture(exrTexture);
          }
        } catch (exrError) {
          console.warn(`EXR load failed for ${path}, trying HDR:`, exrError);

          try {
            // Fallback to HDR/RGBE loader
            const hdrLoader = new RGBELoader();
            const hdrTexture = await hdrLoader.loadAsync(
              path.replace(".exr", ".hdr"),
            );
            if (isMounted) {
              setTexture(hdrTexture);
            }
          } catch (hdrError) {
            console.warn(`HDR load also failed for ${path}:`, hdrError);
            if (isMounted) {
              setLoadingError(`Failed to load texture: ${path}`);
              setError(`Failed to load HDRI: ${path}`);
            }
          }
        }
      };

      loadTexture();

      return () => {
        isMounted = false;
      };
    }, [path]);

    return { texture, error: loadingError };
  };

  // Load textures with error handling
  const morning = useTextureLoader("/hdri/morning.exr");
  const day = useTextureLoader("/hdri/day.exr");
  const evening = useTextureLoader("/hdri/evening.exr");
  const night = useTextureLoader("/hdri/night.exr");

  const hdriMap: Record<TimeOfDayExclAuto, THREE.Texture | null> =
    useMemo(() => {
      return {
        morning: morning.texture,
        day: day.texture,
        evening: evening.texture,
        night: night.texture,
      };
    }, [morning.texture, day.texture, evening.texture, night.texture]);

  useEffect(() => {
    const currentHDRI = hdriMap[timeOfDay];

    if (currentHDRI) {
      try {
        // Configure HDRI settings
        currentHDRI.mapping = THREE.EquirectangularReflectionMapping;
        currentHDRI.colorSpace = THREE.SRGBColorSpace;

        // Scale the environment to make it appear larger
        currentHDRI.matrixAutoUpdate = true;
        currentHDRI.matrix.scale(0, 0); // Add this line - larger number = larger environment

        // Set environment map
        scene.environment = currentHDRI;
        scene.background = currentHDRI;
        scene.backgroundIntensity = timeOfDay === "night" ? 0.5 : 1;
        scene.environmentIntensity = 0.5;
        setError(null);
      } catch (configError) {
        console.error("Error configuring HDRI:", configError);
        setError("Failed to configure HDRI");
        // Fallback to default background
        scene.environment = null;
        scene.background = new THREE.Color(
          timeOfDay === "night" ? "#0a1428" : "#87CEEB",
        );
      }
    } else {
      // Fallback to colored background if no HDRI is available
      scene.environment = null;
      scene.background = new THREE.Color(
        timeOfDay === "night" ? "#0a1428" : "#87CEEB",
      );
    }

    return () => {
      // Don't completely nullify, just reset to fallback
      scene.environment = null;
      scene.background = new THREE.Color("#87CEEB");
    };
  }, [timeOfDay, scene, hdriMap]);

  // Optional: Debug output
  if (error) {
    console.warn("HDRISwitcher error:", error);
  }

  return null;
};

export default HDRISwitcher;
