import React from "react";

interface StepPageLayoutProps {
  title: string;
  subtitle?: string;
  image?: string;
  children: React.ReactNode;
}

const StepPageLayout: React.FC<StepPageLayoutProps> = ({
  title,
  subtitle,
  image,
  children,
}) => {
  return (
    <div className="mx-[100px] mt-2 mb-10 px-4 relative">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-primary">{title}</h3>
        {subtitle && <p className="mb-3 text-foreground/80">{subtitle}</p>}
      </div>

      {image ? (
        <div className="flex flex-col lg:flex-row gap-6 relative">
          <div className="flex-1">{children}</div>

          <div className="hidden lg:block w-[500px] fixed right-5 bottom-[93px]">
            <img src={image} alt="" className="w-full object-contain" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto min-h-dvh">
          {children}
        </div>
      )}
    </div>
  );
};

export default StepPageLayout;
