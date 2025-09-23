import React from "react";
import {
  BriefcaseMedicalIcon,
  MoonIcon,
  MoonStarIcon,
  Smartphone,
  StickyNote,
  SunIcon,
} from "lucide-react";
import DarkPanel from "../DarkPanel";

function BackersPanel() {
  const iconMap = new Map();
  iconMap.set(1, <SunIcon size={48} />);
  iconMap.set(2, <MoonIcon size={48} />);
  iconMap.set(3, <StickyNote size={48} />);
  iconMap.set(4, <MoonStarIcon size={48} />);
  iconMap.set(5, <Smartphone size={48} />);
  iconMap.set(6, <BriefcaseMedicalIcon size={48} />);
  return (
    <DarkPanel className="py-16 -mt-16 mb-0 flex min-h-fit flex-col gap-6 items-center justify-center">
      <p className="text-3xl text-primary-800 font-medium">
        Backed by 200+ Growing Pharmacies
      </p>
      <div className="flex gap-8 flex-wrap">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 items-center text-primary-100"
          >
            <div className="bg-primary rounded-full p-4 ">
              {iconMap.get(i + 1)}
            </div>
          </div>
        ))}
      </div>
    </DarkPanel>
  );
}

export default BackersPanel;
