import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as THREE from "three";

import { ValidationError } from "joi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function hasDeepKeys(obj: any, keys: string[]): boolean {
  return keys.every((path) => {
    const segments = path.split(".");
    let current = obj;

    for (const segment of segments) {
      if (current && typeof current === "object" && segment in current) {
        current = current[segment];
      } else {
        return false;
      }
    }

    return true;
  });
}

export function mapJoiErrorToFieldMessages(
  error?: ValidationError | null,
): Record<string, string> {
  if (!error || !error.details) return {};

  return error.details.reduce(
    (acc, curr) => {
      const key = curr.path?.[0]; // For flat schemas
      if (typeof key === "string") {
        acc[key] = curr.message;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}
export function getCurrencySymbol(
  locale: Intl.LocalesArgument,
  currency: string,
) {
  return (0)
    .toLocaleString(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
}
/**
 * Linear interpolation with cubic Bezier easing
 *
 * @param {number} start - starting value
 * @param {number} end - ending value
 * @param {number} t - current time (0..duration)
 * @param {number} duration - total duration
 * @param {number[]} bezier - cubic bezier control points [x1, y1, x2, y2]
 */
type LerpBrezier = (
  start: number,
  end: number,
  t: number,
  duration: number,
  brezier?: [number, number, number, number],
) => number;
export const lerpBezier: LerpBrezier = (
  start,
  end,
  t,
  duration,
  bezier = [0.25, 0.1, 0.25, 1.0],
) => {
  const progress = Math.min(Math.max(t / duration, 0), 1); // normalize 0–1

  const eased = cubicBezier(progress, ...bezier);
  return start + (end - start) * eased;
};

// Cubic Bezier easing implementation
export function cubicBezier(
  t: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  // Use the y-values of cubic bezier curve for easing
  // const cx = 3 * x1;
  // const bx = 3 * (x2 - x1) - cx;
  // const ax = 1 - cx - bx;

  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  // Solve for x (progress)
  // const x = ((ax * t + bx) * t + cx) * t;

  // Solve for y (easing output)
  const y = ((ay * t + by) * t + cy) * t;

  return y;
}

export const setLocalPlan = (plan_id: number) => {
  localStorage.setItem("plan_id", plan_id + "");
};
export const getLocalPlan = () => {
  const plan_id = localStorage.getItem("plan_id");
  return plan_id ? parseInt(plan_id) : null;
};

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  immediate?: boolean,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);

    if (callNow) func.apply(context, args);
  };
}
// Add this helper to interpolate colors
export const lerpColor = (color1: string, color2: string, t: number) => {
  const c1 = new THREE.Color(color1);
  const c2 = new THREE.Color(color2);
  return c1.lerp(c2, t);
};
export function generateGrassPalette(base = "#22C55E", levels = 5) {
  const palette = [];
  const color = new THREE.Color(base);

  for (let i = 0; i < levels; i++) {
    const shade = color.clone();
    const factor = 0.8 + (i / levels) * 0.4; // brightness variation
    shade.multiplyScalar(factor);
    palette.push({ height: i, color: `#${shade.getHexString()}` });
  }

  return palette;
}

// Helper function to find closest vertex
export function findClosestVertexIndex(
  x: number,
  z: number,
  vertices: Float32Array,
): number {
  let closestIndex = 0;
  let minDistance = Infinity;

  for (let i = 0; i < vertices.length; i += 3) {
    const dx = x - vertices[i];
    const dz = z - vertices[i + 2];
    const distance = dx * dx + dz * dz;

    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i / 3;
    }
  }

  return closestIndex;
}
