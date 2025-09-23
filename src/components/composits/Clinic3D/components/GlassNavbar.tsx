"use client";

import * as THREE from "three";
import { Billboard, Text } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";

// CONFIGURATION - Easily customize the navbar here
const NAVBAR_CONFIG = {
  // Colors
  primaryColor: "#dbdbf4",
  backgroundColor: "#7a7aff",
  hoverBgColor: "#0b092c",
  hoverTextColor: "#dbdbf4",

  // Dimensions
  width: 15, // Total width of navbar
  height: 0.8, // Height of navbar
  borderRadius: 0.4, // Border radius

  // Text settings
  fontSize: 0.2, // Font size for links
  centerFontSize: 0.25, // Font size for center text
  sphereFontSize: 0.25, // Font size for sphere text

  // Spacing
  linkSpacing: 1.5, // Space between links
  verticalPadding: 0.2, // Vertical padding inside navbar
  horizontalPadding: 0.5, // Horizontal padding inside navbar
  hoverPadding: 0.5, // Additional hover area padding

  // Glass appearance
  glassTransmission: 0.85,
  glassOpacity: 1.0,
  glassRoughness: 0.05,
  glassThickness: 1.5,
  glassBlur: 0.8, // Blur intensity (0-1)

  // Hover effects
  hoverOpacity: 0.8,
  hoverBgRadius: 0.2,

  // Positioning
  scale: 0.7,
  verticalOffset: 2.5, // Vertical position from center
  depthOffset: -8, // Z position from camera

  // Animation
  sphereRotationSpeed: 0.1,
  sphereBobSpeed: 1,
  sphereBobHeight: 0.05,

  // Link appearance
  linkHoverScale: 1, // Scale effect on hover
};

type CenterLinks = {
  [center: string]: {
    left: string[];
    right: string[];
  };
};

// Updated center links with more options
const centerLinks: CenterLinks = {
  pharmacy: {
    left: ["Dashboard", "Inventory", "Orders", "Suppliers"],
    right: ["Reports", "Settings", "Help", "Logout"],
  },
  clinic: {
    left: ["Dashboard", "Doctors", "Patients", "Appointments"],
    right: ["Records", "Billing", "Profile", "Settings"],
  },
  lounge: {
    left: ["Home", "Chat", "Friends", "Groups"],
    right: ["Events", "Profile", "Settings", "Exit"],
  },
  dashboard: {
    left: ["Overview", "Analytics", "Reports", "Documents"],
    right: ["Notifications", "Settings", "Account", "Logout"],
  },
};

interface GlassNavbarProps {
  activeCenter: keyof typeof centerLinks;
}

// Create rounded rectangle geometry function
function createRoundedRectGeometry(
  width: number,
  height: number,
  radius: number,
) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x, y + radius);
  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);

  return new THREE.ShapeGeometry(shape);
}

export function GlassNavbar({ activeCenter = "dashboard" }: GlassNavbarProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const sphereRef = useRef<THREE.Group>(null!);

  const links = centerLinks[activeCenter];
  const config = NAVBAR_CONFIG;

  // Calculate dynamic spacing based on number of links
  const leftLinksCount = links.left.length;
  const rightLinksCount = links.right.length;
  const maxLinks = Math.max(leftLinksCount, rightLinksCount);

  // Adjust spacing based on number of links
  const dynamicLinkSpacing = config.linkSpacing * (4 / maxLinks);
  const navbarWidth = Math.max(
    config.width + config.horizontalPadding * 2,
    maxLinks * dynamicLinkSpacing + 2, // Add padding for center area
  );

  // Create materials with useMemo to prevent recreation on every render
  const { glassMaterial, outlineMaterial, hoverMaterial, blurMaterial } =
    useMemo(() => {
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        transmission: config.glassTransmission,
        transparent: true,
        opacity: config.glassOpacity,
        roughness: config.glassRoughness,
        thickness: config.glassThickness,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        envMapIntensity: 2,
        color: new THREE.Color(config.backgroundColor),
        ior: 1.52,
        specularColor: new THREE.Color(0xffffff),
        specularIntensity: 1,
      });

      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: config.primaryColor,
        transparent: true,
        opacity: 0.6,
        side: THREE.BackSide,
      });

      const hoverMaterial = new THREE.MeshBasicMaterial({
        color: config.hoverBgColor,
        transparent: true,
        opacity: config.hoverOpacity,
      });

      // Blur material (using a slightly opaque white layer)
      const blurMaterial = new THREE.MeshBasicMaterial({
        color: config.backgroundColor,
        transparent: true,
        opacity: config.glassBlur * 0.3,
      });

      return { glassMaterial, outlineMaterial, hoverMaterial, blurMaterial };
    }, [config]);

  // Keep navbar fixed in viewport
  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Position the navbar relative to camera but slightly in front
      groupRef.current.position.copy(camera.position);
      groupRef.current.quaternion.copy(camera.quaternion);

      // Position navbar at bottom center of view
      groupRef.current.translateY(config.verticalOffset);
      groupRef.current.translateZ(config.depthOffset);
    }
  });

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y =
        clock.getElapsedTime() * config.sphereRotationSpeed;
      sphereRef.current.position.y =
        Math.sin(clock.getElapsedTime() * config.sphereBobSpeed) *
        config.sphereBobHeight;
    }
  });

  // Handle hover events
  const handleHover = (item: string | null) => {
    setHoveredItem(item);
  };

  // Calculate hover area dimensions
  const hoverWidth = dynamicLinkSpacing * 0.9;
  const hoverHeight = config.height - config.verticalPadding * 2;

  return (
    <group ref={groupRef} scale={config.scale} position={[0, 0, 0]}>
      {/* Background with outline for better visibility */}
      <group>
        {/* Outline - slightly larger than main panel for border effect */}
        <mesh position={[0, 0, -0.03]}>
          <bufferGeometry
            attach="geometry"
            {...createRoundedRectGeometry(
              navbarWidth + 0.1,
              config.height + 0.1,
              config.borderRadius + 0.02,
            )}
          />
          <primitive object={outlineMaterial} attach="material" />
        </mesh>

        {/* Blur layer */}
        <mesh position={[0, 0, -0.01]}>
          <bufferGeometry
            attach="geometry"
            {...createRoundedRectGeometry(
              navbarWidth,
              config.height,
              config.borderRadius,
            )}
          />
          <primitive object={blurMaterial} attach="material" />
        </mesh>

        {/* Main glass panel */}
        <mesh position={[0, 0, -0.02]}>
          <bufferGeometry
            attach="geometry"
            {...createRoundedRectGeometry(
              navbarWidth,
              config.height + config.verticalPadding / 2,
              config.borderRadius,
            )}
          />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
      </group>

      {/* Left links with hover effects */}
      {links.left.map((label, i) => {
        const positionX =
          -(navbarWidth / 2 - dynamicLinkSpacing / 2) +
          i * dynamicLinkSpacing +
          config.horizontalPadding / 2;
        const isHovered = hoveredItem === label;

        return (
          <group
            key={label}
            position={[positionX, 0, 0.1]}
            scale={isHovered ? config.linkHoverScale : 1}
          >
            {/* Hover background (only visible on hover) */}
            {isHovered && (
              <mesh position={[0, 0, -0.01]}>
                <bufferGeometry
                  attach="geometry"
                  {...createRoundedRectGeometry(
                    hoverWidth,
                    hoverHeight,
                    config.hoverBgRadius,
                  )}
                />
                <primitive object={hoverMaterial} attach="material" />
              </mesh>
            )}
            <Text
              font="/Josefin_Sans/static/JosefinSans-Regular.ttf"
              fontSize={config.fontSize}
              color={isHovered ? config.hoverTextColor : config.primaryColor}
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.05]}
              onPointerOver={() => handleHover(label)}
              onPointerOut={() => handleHover(null)}
              renderOrder={1}
            >
              {label}
            </Text>
          </group>
        );
      })}

      {/* Center area with text and 3D sphere */}
      <group position={[0, 0, 0.2]}>
        <Text
          font="/Josefin_Sans/static/JosefinSans-Regular.ttf"
          fontSize={config.centerFontSize}
          color={config.primaryColor}
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0.1]}
          renderOrder={1}
        >
          {activeCenter.toUpperCase()}
        </Text>

        {/* 3D Sphere with "3D" text inside */}
        <group ref={sphereRef} position={[0, config.height / 2 + 0.3, 0]}>
          {/* Light source sphere */}
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshPhysicalMaterial
              transmission={0.95}
              transparent={true}
              opacity={0.7}
              roughness={0.02}
              thickness={0.5}
              clearcoat={1}
              clearcoatRoughness={0.01}
              envMapIntensity={2}
              color={new THREE.Color(config.backgroundColor)}
              emissive={new THREE.Color(0x4a3bff)} // Subtle blue emission
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Point light inside the sphere */}
          <pointLight
            position={[0, 0.1, 0.1]}
            color={0x4a3bff}
            intensity={1.6}
            distance={1.2}
            decay={2}
          />

          {/* "3D" text that acts as a light source */}
          <Billboard position={[0.04, 0.7, 0.43]} renderOrder={2}>
            {/* Text with emissive properties */}
            <Text
              font="/Josefin_Sans/static/JosefinSans-Bold.ttf"
              fontSize={config.sphereFontSize}
              color={config.primaryColor}
              anchorX="center"
              anchorY="middle"
              renderOrder={3}
              // Enhanced glow effect
              strokeColor={0x4a3bff}
              strokeWidth={0.003}
              strokeOpacity={0.5}
              // Slight shadow for better readability
              outlineColor={0x000000}
              outlineWidth={0.001}
              outlineOpacity={0.3}
              // Add emissive properties to the text material
              material={
                new THREE.MeshBasicMaterial({
                  color: new THREE.Color(config.primaryColor),
                  transparent: true,
                  emissive: new THREE.Color(0x4a3bff),
                  emissiveIntensity: 0.8,
                })
              }
            >
              3D
            </Text>

            {/* Additional point light at text position */}
            <pointLight
              position={[0, 0.6, 0.1]}
              color={0x4a3bff}
              intensity={0.8}
              distance={0.8}
              decay={2}
            />
          </Billboard>
        </group>
      </group>

      {/* Right links with hover effects */}
      {links.right.map((label, i) => {
        const positionX =
          navbarWidth / 2 -
          dynamicLinkSpacing / 2 -
          i * dynamicLinkSpacing -
          config.horizontalPadding / 2;
        const isHovered = hoveredItem === label;

        return (
          <group
            key={label}
            position={[positionX, 0, 0.1]}
            scale={isHovered ? config.linkHoverScale : 1}
          >
            {/* Hover background (only visible on hover) */}
            {isHovered && (
              <mesh position={[0, 0, -0.01]}>
                <bufferGeometry
                  attach="geometry"
                  {...createRoundedRectGeometry(
                    hoverWidth,
                    hoverHeight,
                    config.hoverBgRadius,
                  )}
                />
                <primitive object={hoverMaterial} attach="material" />
              </mesh>
            )}
            <Text
              font="/Josefin_Sans/static/JosefinSans-Regular.ttf"
              fontSize={config.fontSize}
              color={isHovered ? config.hoverTextColor : config.primaryColor}
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.05]}
              onPointerOver={() => handleHover(label)}
              onPointerOut={() => handleHover(null)}
              renderOrder={1}
            >
              {label}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
