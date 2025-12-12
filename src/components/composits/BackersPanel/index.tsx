import {
  BriefcaseMedicalIcon,
  MoonIcon,
  MoonStarIcon,
  Smartphone,
  StickyNote,
  SunIcon,
} from "lucide-react";
import DarkPanel from "../DarkPanel";

const iconMap = new Map();
iconMap.set(1, <SunIcon size={48} />);
iconMap.set(2, <MoonIcon size={48} />);
iconMap.set(3, <StickyNote size={48} />);
iconMap.set(4, <MoonStarIcon size={48} />);
iconMap.set(5, <Smartphone size={48} />);
iconMap.set(6, <BriefcaseMedicalIcon size={48} />);

function BackersPanel() {
  const iconMap = new Map();
  iconMap.set(1, <SunIcon className="size-12 max-sm:size-8 md:size-10" />);
  iconMap.set(2, <MoonIcon className="size-12 max-sm:size-8 md:size-10" />);
  iconMap.set(3, <StickyNote className="size-12 max-sm:size-8 md:size-10" />);
  iconMap.set(4, <MoonStarIcon className="size-12 max-sm:size-8 md:size-10" />);
  iconMap.set(5, <Smartphone className="size-12 max-sm:size-8 md:size-10" />);
  iconMap.set(
    6,
    <BriefcaseMedicalIcon className="size-12 max-sm:size-8 md:size-10" />,
  );

  return (
    <DarkPanel className="py-4 md:py-8 lg:py-16 bg-primary-50 mt-8 lg:-mt-16 md:-mt-5  mb-0 flex min-h-fit flex-col gap-6 items-center justify-center  ">
      <p className="text-3xl text-primary-800 font-medium max-sm:text-xl text-center  ">
        Trusted by 200+ Healthcare Orgs
      </p>
      <div className="flex gap-8 flex-wrap justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 items-center text-primary-100"
          >
            <div className="bg-primary rounded-full p-4 max-sm:p-2">
              {iconMap.get(i + 1)}
            </div>
          </div>
        ))}
      </div>
    </DarkPanel>
  );
}

export default BackersPanel;
