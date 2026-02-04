"use client";

import "./globals.css";

import { useEffect } from "react";
import Link from "next/link";

import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className={`${josefinSans.variable} min-h-screen flex items-center justify-center px-6 bg-background`}
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-white dark:bg-background p-8 text-center shadow-sm">
        {/* Subtle icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <span className="text-xl">⚠️</span>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          An unexpected error occurred while processing your request. Please try
          again or return to the homepage.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Go back home
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-xs text-muted-foreground">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
