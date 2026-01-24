import React from "react";
import Logo from "@/components/composits/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { HeaderProps } from "../_types";

export const Header: React.FC<HeaderProps> = ({ title }) => (
  <div className="flex items-center justify-between gap-8 border-b px-4 py-4 sm:px-8 lg:px-20">
    <div className="flex items-center gap-8">
      <Logo />
      <h5 className="text-lg font-medium text-foreground/80">
        <sub>{title}</sub>
      </h5>
    </div>

    <ModeToggle />
  </div>
);
