"use client";

import "./globals.css";

import { useEffect } from "react";

import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div
      className={`${josefinSans.variable} min-h-screen flex items-center justify-center px-6 bg-background`}
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-white dark:bg-background p-8 text-center shadow-sm">
        {/* Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <span className="text-xl">🛑</span>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Application error
        </h1>

        {/* Message */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          A critical error occurred and the application couldn’t continue.
          Please reload the page to restore functionality.
        </p>

        {/* Action */}
        <button
          onClick={reset}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Reload application
        </button>

        {/* Support hint */}
        <p className="mt-6 text-xs text-muted-foreground">
          If this problem persists, contact support.
        </p>
      </div>
    </div>
  );
}
