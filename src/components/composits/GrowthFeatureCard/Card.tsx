import { cn } from "@/lib/utils";
import { Feature } from "./data";

export interface GrowthFeatureCardProps {
  feature: Feature;
  className?: string;
  containerClassNames?: string;
  topPanel?: React.ReactNode;
  bottomPanel?: React.ReactNode;
}

const GrowthFeatureCard = ({
  feature,
  className,
  containerClassNames,
  topPanel,
  bottomPanel,
}: GrowthFeatureCardProps) => {
  return (
    <div
      className={cn(
        "relative bg-gradient-to-b h-full from-gray-50/20 to-[rgba(0,0,0,0)_40%] rounded-4xl p-[1px]",
        containerClassNames,
      )}
    >
      <div
        className={cn(
          "feature-card h-full mt-[1px] flex justify-between gap-6 flex-col border border-card-accent/50 px-6 py-6 bg-card-radial rounded-4xl ",
          className,
        )}
      >
        {topPanel && topPanel}
        <div className="feature-card-content pt-4">
          <h3 className="text-2xl font-semibold text-card-foreground">
            {feature.title}
          </h3>
          <p className="mt-2 text-lg text-card-foreground">
            {feature.subtitle}
          </p>
        </div>
        {bottomPanel && bottomPanel}
      </div>
    </div>
  );
};

export default GrowthFeatureCard;
