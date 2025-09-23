"use client";

import { Routes } from "@/constants/routes";
import { useActive } from "@/hooks/useActive";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

function Links() {
  return (
    <nav className="nav-links flex justify-around lg:px-16 w-full">
      <ActiveLink href={Routes.home} label="Home" />
      <ActiveLink href={Routes.features} label="Features" />
      <ActiveLink href={Routes.pricing} label="Pricing" />
      <ActiveLink href={Routes.contact} label="Contact" />
    </nav>
  );
}

export default Links;

const ActiveLink = ({ href, label }: { href: string; label: string }) => {
  const active = useActive();
  return (
    <Link
      href={href}
      className={cn(
        active.check(href)
          ? "text-[oklch(0.67_0.22_297.05)]"
          : "hover:text-[oklch(0.8_0.13_300.52)]"
      )}
    >
      {label}
    </Link>
  );
};
