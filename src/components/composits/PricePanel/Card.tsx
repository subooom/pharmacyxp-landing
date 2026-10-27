import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CSSProperties, useState } from "react";
import Image from "next/image";
import { ANIMATION_DURATION } from "@/app/(auth)/get-started/_steps/4ChooseYourPlan";
import LaunchPulseTimer from "../VintageOfferTimer";
import { useDiscountOffer } from "@/hooks/useDiscountOffer";

export interface Price {
  id?: number;
  name: string;
  price_for_first_year: number;
  price_per_year: number;
  onMouseMove?: () => void;
  onMouseEnter?: () => void;
  number_of_services: number;
  onClick: () => void;
  isSelected?: boolean;
  features?: string;
  style?: CSSProperties;
  minimized?: true;
  created_at?: string;
  updated_at?: string;
  key?: string | number;
}

const formatMoney = (v: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(v),
  );

const PriceCard = ({
  name,
  price_for_first_year,
  price_per_year,
  onMouseMove,
  number_of_services,
  onClick,
  isSelected,
  features,
  style,
  onMouseEnter,
  className, // Adding this so we can pass 'h-full' from the parent
}: Price & { className?: string}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { data } = useDiscountOffer();

  const discount = data ? Number(data.amount) : 0;
  const discountedPrice = discount
    ? price_for_first_year * (1 - discount / 100)
    : price_for_first_year;

  return (
    <Card
      className={cn(
        "group relative h-full w-full overflow-hidden bg-card-radial-reversed text-center transition-all duration-300 ease-in-out",
        isSelected
          ? "border-2 border-primary shadow-[0_10px_25px_rgba(59,54,140,0.15)]"
          : "border-2 border-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.05)]",
      )}
      style={{
        borderRadius: "12px",
        zIndex: isSelected ? 10 : undefined,
        ...style,
      }}
      onMouseMove={(e) => {
        onMouseMove?.();
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      onMouseEnter={onMouseEnter}
    >
      {/* cursor glow */}
      <div
        style={{
          top: `${mousePos.y * 0.7 - 500}px`,
          left: `${mousePos.x * 0.7 - 200}px`,
        }}
        className="pointer-events-none absolute h-[1000px] w-[1000px] bg-card-radial-reversed-hover opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100 dark:bg-card-radial-reversed-hover-dark"
      />

      {/* Free Trial Badge — smaller */}
      <Image
        width={60}
        height={60}
        src="/free-trail.svg"
        alt="Free Trial"
        className="absolute -right-1 -top-4 z-10 h-[80px] w-[80px] rotate-[-12deg]"
      />

      <CardContent className="relative z-10 flex h-full flex-col gap-3 p-5">
        {/* header */}
        <div>
          <h3 className="text-lg font-bold text-card-foreground">{name}</h3>
          <div className="mt-0.5">
            <span className="text-sm font-bold text-primary">
              रू {formatMoney(price_per_year / 12)}
            </span>
            <span className="ml-1 text-xs text-card-foreground/70">/mo</span>
          </div>
        </div>

        {/* features (hidden on minimized, shown in tooltip on parent) */}
        {features && !minimizedHidden && (
          <div
            className="features-content text-xs leading-snug text-card-foreground/70"
            dangerouslySetInnerHTML={{ __html: features }}
          />
        )}

        {/* services line */}
        <div className="border-y border-card-foreground/10 py-2 text-sm text-card-foreground">
          {number_of_services === 0 ? ( 
            <p>Pharmacy Module access</p>
          ) : (
            <p>
              Up to{" "}
              <strong className="text-primary">{number_of_services}</strong>{" "}
              departments
            </p>
          )}
        </div>

        {/* discount timer */}
        {discount > 0 && data && (
          <div className="flex justify-center">
            <LaunchPulseTimer
              className="scale-75"
              startDate={data.start_date}
              endDate={data.end_date}
              offerName={data.name}
              discount={discount}
            />
          </div>
        )}

        {/* price block */}
        <div className="rounded-lg bg-primary/5 px-3 py-2">
          {discount > 0 && (
            <div className="text-xs font-bold text-card-foreground/50 line-through">
              रू {formatMoney(price_for_first_year)}
            </div>
          )}
          <div className="flex items-baseline justify-center gap-1 text-primary">
            <span className="text-sm font-semibold">रू</span>
            <span className="text-2xl font-extrabold">
              {formatMoney(discountedPrice)}
            </span>
          </div>
          <span className="block text-[11px] text-card-foreground/70">
            Registration
          </span>
        </div>

        {/* CTA */}
        <Button
          className={cn(
            "mt-auto w-full rounded-full px-6 py-5 text-sm font-semibold transition-all duration-200",
            isSelected
              ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
              : "border-2 border-primary bg-card text-primary hover:bg-primary hover:text-white",
          )}
          onClick={onClick}
        >
          {isSelected ? "Selected" : name}
        </Button>
      </CardContent>

      {/* selected underline */}
      <div
        className="absolute bottom-0 z-[60] h-[2px] bg-primary transition-all"
        style={{
          transitionDuration: ANIMATION_DURATION + "ms",
          width: isSelected ? "100%" : "0%",
        }}
      />
    </Card>
  );
};

export default PriceCard;