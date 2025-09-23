"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../Logo";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTABanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 4000);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{ opacity }}
      className="fixed transition-opacity duration-300 ease-in-out top-20 mb-0 left-0 w-full bg-banner-gradient z-50 border-b border-primary-200"
    >
      <div className="relative mx-auto max-w-md flex items-center justify-between gap-4 px-4 py-4">
        <Logo className="dark:text-primary-300" />

        <Link
          href="/get-started"
          className="text-sm flex gap-1 items-center font-medium text-primary dark:text-primary-300 hover:text-primary-700 transition-colors"
        >
          From Racks to Receipts <ExternalLink className="-mt-1 h-4 w-4" />
        </Link>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setVisible(false)}
        className="absolute top-4 right-2"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
