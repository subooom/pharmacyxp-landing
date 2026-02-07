import React from "react";
import Logo from "@/components/composits/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { HeaderProps } from "../_types";
import MedicineTimer from "@/components/composits/VintageOfferTimer";

export const Header: React.FC<HeaderProps> = ({ title }) => (
  <div className="flex items-center justify-between gap-8 border-b px-4 py-4 sm:px-8 lg:px-20">
    <div className="flex items-center gap-8">
      <Logo />
      <h5 className="hidden md:block text-lg font-medium text-foreground/80">
        <sub>{title}</sub>
      </h5>
    </div>

    <div className="flex items-center gap-4">
      <div className="hidden lg:block fixed left-0 z-[999] bottom-22">
        <MedicineTimer className="scale-75  md:scale-90" />
      </div>
      <ModeToggle />
    </div>
  </div>
);
