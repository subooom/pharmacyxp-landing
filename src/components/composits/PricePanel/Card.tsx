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
  discount?: number;
}

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
}: Price) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { data } = useDiscountOffer();

  // Use API discount if available, otherwise fall back to prop discount (or 0)
  // Per requirements: "if there is no data returned... no discount offers should be shown"
  // So strictly speaking we should rely on data. But prop might be used for other overrides?
  // Assuming API is source of truth.
  const discount = data ? Number(data.amount) : 0;

  const discountedPrice = discount
    ? price_for_first_year * (1 - discount / 100)
    : price_for_first_year;
  return (
    <Card
      className={cn(
        "group relative h-full w-full bg-card-radial-reversed overflow-hidden text-center transition-all duration-300 ease-in-out",
        isSelected
          ? "border-2 border-primary shadow-[0_10px_25px_rgba(59,54,140,0.15)]"
          : "border-2 border-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.05)]",
      )}
      style={{
        borderRadius: "12px",
        // transform: isSelected ? "translateY(-5px)" : "",
        zIndex: isSelected ? 10 : "",
        ...style,
      }}
      onMouseMove={(e) => {
        if (onMouseMove) onMouseMove();
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // distance from element's left edge
        const y = e.clientY - rect.top; // distance from element's top edge
        setMousePos({ x, y });
      }}
      onMouseEnter={() => {
        if (onMouseEnter) onMouseEnter();
      }}
    >
      <div
        style={{
          top: `${Math.min(200, Math.min(0, mousePos.y * 0.7 - 500))}px`,
          left: `${Math.min(0, mousePos.x * 0.7 - 200)}px`,
        }}
        className="absolute w-[1000px] h-[1000px] top-0 left-0 bg-card-radial-reversed-hover dark:bg-card-radial-reversed-hover-dark z-0 duration-1000 ease-in-out transition-opacity opacity-0 group-hover:opacity-100"
      ></div>
      {/* Free Trial Badge */}
      <Image
        width={94.19}
        height={94.19}
        src="/free-trail.svg"
        alt="Free Trial"
        className="absolute z-10 -right-2 -top-8 h-[130px] rotate-[-12deg]"
      />

      <CardContent className="p-8 z-10  flex flex-col h-full justify-between">
        <h3 className="mb-4 text-2xl font-bold text-card-foreground">
          {name}
          <div>
            <span className="text-xl font-bold text-primary">
              रू {(price_per_year / 12).toFixed(2)}
            </span>
            <span className="ml-1 text-sm text-card-foreground/70">/month</span>
          </div>
        </h3>

        {features && (
          <div
            className="features-content mt-4 border-t text-card-foreground/70 border-card-foreground px-4 pt-4 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: features }}
          />
        )}

        <div className="my-6 border-y text-card-foreground text-lg border-[#eee] py-2">
          {number_of_services === 0 ? (
            <p className="my-2 text-card-foreground">
              Get access to our Pharmacy Module
            </p>
          ) : (
            <p className="my-2 text-card-foreground">
              Choose up to{" "}
              <strong className="text-[oklch(.71_.17_286.09)]">
                {number_of_services}
              </strong>{" "}
              Medical Departments
            </p>
          )}
        </div>

        {discount > 0 && data && (
          <div className="mb-6 flex justify-center">
            <LaunchPulseTimer
              className="items-center scale-80 -mt-4 -mb-16"
              startDate={data.start_date}
              endDate={data.end_date}
              offerName={data.name}
              discount={discount}
            />
          </div>
        )}
        <div className="my-4 rounded-lg p-4">
          <div className="mt-2">
            <div className="flex flex-col items-center">
              {discount > 0 && (
                <span className="text-sm text-card-foreground/50 line-through font-bold">
                  रू {price_for_first_year}
                </span>
              )}
              <span className="text-3xl font-extrabold text-primary flex items-center">
                <span className="mr-2 text-lg font-semibold">रू</span>
                {discountedPrice}
              </span>
            </div>
            <span className="block text-sm text-card-foreground/70">
              Registration Cost
            </span>
          </div>
        </div>

        <Button
          className={cn(
            "z-10 mt-6 w-full whitespace-nowrap rounded-full border-2 border-primary px-8 py-6 text-base font-semibold transition-all duration-200 ease-in-out",
            isSelected
              ? "bg-primary text-white hover:bg-primary/90 hover:text-white"
              : "bg-card text-primary hover:primary hover:text-white",
          )}
          onClick={onClick}
        >
          {isSelected ? "Selected" : `${name}`}
        </Button>
      </CardContent>
      <div
        className="h-[2px] z-[60000] absolute bottom-0 bg-primary transition-all"
        style={{
          transitionDuration: ANIMATION_DURATION + "ms",
          width: isSelected ? `100%` : `0%`,
        }}
      ></div>
    </Card>
  );
};

export default PriceCard;
