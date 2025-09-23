"use client";

import { useFrame } from "@react-three/fiber";
import { Cloud, Sky } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import axios from "axios";
import Rain from "./Rain";
import HDRISwitcher from "./HDRISwitcher";

interface WeatherData {
  main: string;
  description: string;
  rain?: { "1h": number };
  clouds?: { all: number };
  wind?: { speed: number };
}

export type TimeOfDay = "auto" | "morning" | "day" | "evening" | "night";
export type TimeOfDayExclAuto = Exclude<TimeOfDay, "auto">;
interface DayNightConfig {
  sunColors: { [key in TimeOfDayExclAuto]: string };
  ambientColors: { [key in TimeOfDayExclAuto]: string };
  sunIntensity: { [key in TimeOfDayExclAuto]: number };
  ambientIntensity: { [key in TimeOfDayExclAuto]: number };
  sky: {
    turbidity: { [key in TimeOfDayExclAuto]: number };
    rayleigh: { [key in TimeOfDayExclAuto]: number };
    mieCoefficient: { [key in TimeOfDayExclAuto]: number };
  };
  moonColor: string;
  moonIntensity: number;
}

const defaultConfig: DayNightConfig = {
  sunColors: {
    morning: "#ff4500",
    day: "#ffffff",
    evening: "#ff7b38",
    night: "#223344",
  },
  ambientColors: {
    morning: "#ffb88c",
    day: "#ffffff",
    evening: "#ffa666",
    night: "#0a1428",
  },
  sunIntensity: {
    morning: 0.8,
    day: 1.5,
    evening: 0.8,
    night: 0,
  },
  ambientIntensity: {
    morning: 0.2,
    day: 0.3,
    evening: 0.2,
    night: 0.05,
  },
  sky: {
    turbidity: { morning: 10, day: 4, evening: 10, night: 0 },
    rayleigh: { morning: 1, day: 0.5, evening: 1, night: 16 },
    mieCoefficient: { morning: 0.01, day: 0.005, evening: 0.01, night: 0.006 },
  },
  moonColor: "#aaccee",
  moonIntensity: 0.2,
};

const calculateSunPosition = (
  timeProgress: number,
): [number, number, number] => {
  const angle = (timeProgress - 0.25) * Math.PI * 2;
  const distance = 100;
  return [Math.cos(angle) * distance, Math.sin(angle) * distance, 0];
};

const DayNightCycle: React.FC<{ manualTimeOfDay?: TimeOfDay }> = ({
  manualTimeOfDay,
}) => {
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  const moonLightRef = useRef<THREE.DirectionalLight>(null);
  const cloudGroupRef = useRef<THREE.Group>(null);
  const skyRef = useRef<THREE.Mesh>(null);

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [time, setTime] = useState<Date>(new Date());
  const [currentTOD, setCurrentTOD] = useState<TimeOfDayExclAuto>("day");
  const [isNight, setIsNight] = useState(false);

  // Calculate time of day only when time changes
  useEffect(() => {
    if (manualTimeOfDay && manualTimeOfDay !== "auto") {
      setCurrentTOD(manualTimeOfDay);
      setIsNight(manualTimeOfDay === "night");
      return;
    }

    const hours = time.getHours();
    let newTOD: TimeOfDay;

    if (hours >= 5 && hours < 10) newTOD = "morning";
    else if (hours >= 10 && hours < 16) newTOD = "day";
    else if (hours >= 16 && hours < 20) newTOD = "evening";
    else newTOD = "night";

    setCurrentTOD(newTOD);
    setIsNight(newTOD === "night");
  }, [time, manualTimeOfDay]);

  // Update lighting when timeOfDay changes
  useEffect(() => {
    if (
      !ambientLightRef.current ||
      !sunLightRef.current ||
      !moonLightRef.current
    )
      return;

    if (manualTimeOfDay === "auto") return;

    // Set colors and intensity directly
    sunLightRef.current.color.set(defaultConfig.sunColors[currentTOD]);
    ambientLightRef.current.color.set(defaultConfig.ambientColors[currentTOD]);
    sunLightRef.current.intensity = defaultConfig.sunIntensity[currentTOD];
    ambientLightRef.current.intensity =
      defaultConfig.ambientIntensity[currentTOD];

    // Moon visibility
    moonLightRef.current.intensity =
      currentTOD === "night" ? defaultConfig.moonIntensity : 0;
  }, [currentTOD]);

  // Use useMemo to generate cloud positions only when weather changes
  const cloudPositions = useMemo(() => {
    if (weather?.main === "Clouds" || weather?.main === "Rain") {
      const isMobile =
        typeof window !== "undefined" &&
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const cloudCount = isMobile ? 4 : 8;

      return Array.from({ length: cloudCount }).map(() => [
        Math.random() * 40 - 20,
        8 + Math.random() * 4,
        Math.random() * 40 - 20,
      ]) as [number, number, number][];
    }
    return [];
  }, [weather?.main]);

  // Use useMemo to generate clouds only when positions change
  const clouds = useMemo(() => {
    if (!cloudPositions.length) return null;

    return (
      <group ref={cloudGroupRef}>
        {cloudPositions.map((pos, i) => (
          <Cloud
            key={i}
            position={pos}
            scale={1 + Math.random()}
            opacity={0.6}
            speed={0.1}
            segments={6} // Reduced from 8 for performance
          />
        ))}
      </group>
    );
  }, [cloudPositions]);

  // Weather fetching
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const addressJson = localStorage.getItem("address");
        if (!addressJson) {
          setWeather({ main: "Clear", description: "clear sky" });
          return;
        }

        const { lat, lon } = JSON.parse(addressJson);
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

        if (!apiKey) {
          console.warn("OpenWeather API key not found");
          setWeather({ main: "Clear", description: "clear sky" });
          return;
        }

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
        );

        setWeather(res.data.weather[0]);
      } catch (err) {
        console.error("Weather fetch failed", err);
        setWeather({ main: "Clear", description: "clear sky" });
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (!sunLightRef.current || !moonLightRef.current || !cloudGroupRef.current)
      return;

    const hours = manualTimeOfDay
      ? currentTOD === "morning"
        ? 7
        : currentTOD === "day"
          ? 12
          : currentTOD === "evening"
            ? 18
            : 0
      : time.getHours();

    const dayProgress = hours / 24;
    const sunPos = calculateSunPosition(dayProgress);

    // Update sun position
    sunLightRef.current.position.set(sunPos[0], sunPos[1], sunPos[2]);

    // Update moon position (opposite of sun)
    moonLightRef.current.position.set(-sunPos[0], -sunPos[1], sunPos[2]);

    // Update sky parameters directly if skyRef is available
    if (skyRef.current) {
      let turbidity = defaultConfig.sky.turbidity[currentTOD];
      let rayleigh = defaultConfig.sky.rayleigh[currentTOD];
      const mieCoefficient = defaultConfig.sky.mieCoefficient[currentTOD];

      if (weather?.main === "Clouds") {
        turbidity += 2;
        rayleigh += 0.2;
      } else if (weather?.main === "Rain") {
        turbidity += 3;
        rayleigh += 0.3;
      }

      const skyMaterial = (skyRef.current as any).material;
      if (skyMaterial && skyMaterial.uniforms) {
        skyMaterial.uniforms.turbidity.value = turbidity;
        skyMaterial.uniforms.rayleigh.value = rayleigh;
        skyMaterial.uniforms.mieCoefficient.value = mieCoefficient;
        skyMaterial.uniforms.sunPosition.value.set(
          sunPos[0],
          sunPos[1],
          sunPos[2],
        );
      }
    }

    // Animate clouds
    if (
      cloudGroupRef.current &&
      (weather?.main === "Clouds" || weather?.main === "Rain")
    ) {
      cloudGroupRef.current.position.x += delta * 0.5;
      if (cloudGroupRef.current.position.x > 20) {
        cloudGroupRef.current.position.x = -20;
      }
    }
  });

  return (
    <>
      <ambientLight
        ref={ambientLightRef}
        intensity={defaultConfig.ambientIntensity[currentTOD]}
        color={defaultConfig.ambientColors[currentTOD]}
      />
      <directionalLight
        ref={sunLightRef}
        castShadow
        intensity={defaultConfig.sunIntensity[currentTOD]}
        color={defaultConfig.sunColors[currentTOD]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[50, 50, 50]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* <Sky /> */}

      <directionalLight
        ref={moonLightRef}
        intensity={currentTOD === "night" ? defaultConfig.moonIntensity : 0}
        color={defaultConfig.moonColor}
      />
      <HDRISwitcher timeOfDay={currentTOD} />

      {clouds}

      {weather?.main === "Rain" && (
        <Rain intensity={weather.rain?.["1h"] || 1} />
      )}
    </>
  );
};

export default DayNightCycle;
