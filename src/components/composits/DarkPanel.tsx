import { cn } from "@/lib/utils";
import React from "react";
interface DarkPanelProps {
  className?: string;
  id?: string;
}
function DarkPanel({
  children,
  className,
  id,
}: React.PropsWithChildren<DarkPanelProps>) {
  return (
    <section
      className={cn(
        "growth-and-impact w-full lg:w-auto pt-18 lg:pt-24 flex gap-6 flex-col items-center justify-center min-h-dvh bg-primary-100 text-primary-50",
        className,
      )}
      id={id}
    >
      {children}
    </section>
  );
}

export default DarkPanel;
