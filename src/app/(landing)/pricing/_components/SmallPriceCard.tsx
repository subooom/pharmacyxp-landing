import { Plan } from "@/components/composits/PricePanel/data";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { getCurrencySymbol, setLocalPlan } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import LaunchPulseTimer from "@/components/composits/VintageOfferTimer";
import { useDiscountOffer } from "@/hooks/useDiscountOffer";

type PlanName = "basic" | "premium" | "executive" | "elite";

const bestFor: Record<PlanName, string> = {
  basic: "Best for solo pharmacists.",
  premium: "Best for small clinics.",
  executive: "Best for small to mid polyclinics.",
  elite: "Best for medicine suppliers.",
};
const currency = getCurrencySymbol("ne-NP", "NPR");

function SmallPriceCard({ plan }: { plan: Plan }) {
  const router = useRouter();
  const planKey = plan.name.toLowerCase() as PlanName;
  const { data } = useDiscountOffer();
  const discount = data ? Number(data.amount) : 0;
  const discountedPrice = discount
    ? plan.price_for_first_year * (1 - discount / 100)
    : plan.price_for_first_year;

  return (
    <div
      className="relative border bg-card-radial-reversed rounded-3xl border-primary-900/[0.1] px-4 py-6 flex flex-col bg-primary-100 text-foreground transition-all duration-150 ease-in-out 
      w-full h-full"
    >
      <Image
        width={154.19 * 0.6}
        height={154.19 * 0.6}
        src="/free-trail.svg"
        alt="Free Trial"
        className="absolute -right-2 -top-[40px] h-[130px] rotate-[-12deg]
          sm:h-[120px] sm:-top-[35px]
          md:h-[110px] md:-top-[30px]
          lg:h-[130px] lg:-top-[40px] z-10"
      />
      {/* Content remains exactly the same */}
      <div className="z-10 flex flex-col h-full">
        <h3
          className="text-2xl 
          sm:text-xl
          md:text-2xl"
        >
          {plan.name} plan
        </h3>
        <h4
          className="opacity-50 
          text-sm sm:text-base mb-4"
        >
          {bestFor[planKey]}
        </h4>

        <div className="mt-auto">
          <p
            className="text-3xl tracking-tight mb-2
            sm:text-2xl
            md:text-3xl"
          >
            {currency}
            {plan.price_per_year / 12}
            <small
              className="text-base text-foreground/50
              sm:text-sm
              md:text-base"
            >
              {" "}
              /month
            </small>
          </p>

          {discount > 0 && data && (
            <div className="-my-4 flex justify-center scale-90 origin-center">
              <LaunchPulseTimer
                className="items-start scale-75"
                startDate={data.start_date}
                endDate={data.end_date}
                offerName={data.name}
                discount={discount}
              />
            </div>
          )}
          <div className="mb-6 p-3 bg-white/50 dark:bg-black/20 rounded-2xl border border-primary-900/5">
            <div className="flex flex-col items-center">
              {discount > 0 && (
                <span className="text-xs text-foreground/40 line-through font-bold">
                  {currency} {plan.price_for_first_year}
                </span>
              )}
              <span className="text-2xl font-black text-primary flex items-center">
                <span className="mr-1 text-sm font-bold">{currency}</span>
                {discountedPrice}
              </span>
            </div>
            <span className="block text-[10px] text-center font-bold uppercase tracking-wider text-foreground/50 mt-1">
              Registration Cost
            </span>
          </div>

          <Button
            onClick={() => {
              setLocalPlan(plan.id);
              router.push(Routes.sign_up);
            }}
            size="lg"
            variant="outline"
            className="w-full
              py-3 sm:py-4
              text-sm sm:text-base rounded-2xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors"
          >
            Choose {plan.name}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SmallPriceCard;
