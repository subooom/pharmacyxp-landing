// components/ModeToggle.tsx
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import "@theme-toggles/react/css/Within.css";
import { Within } from "@theme-toggles/react";
import { Skeleton } from "./ui/skeleton";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Ensure we only render after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setLoading(true);
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);

    // Use a shorter delay or remove it entirely
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  // Show skeleton until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="text-xl p-[0px_!important] h-fit relative overflow-hidden">
        <Skeleton className="w-12 h-12 rounded" />
      </div>
    );
  }

  return (
    <div
      className="text-xl p-[0px_!important] h-fit relative overflow-hidden cursor-pointer"
      onClick={handleToggle}
      role="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {loading ? (
        <Skeleton className="absolute inset-0 z-0 bg-primary-500/20 dark:bg-white/5" />
      ) : null}
      <Within
        className="z-20 p-3 text-primary border border-gray-50 bg-primary"
        duration={750}
        toggled={theme === "dark"}
      />
    </div>
  );
}
