import { Plan } from "@/components/composits/PricePanel/data";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { getCurrencySymbol, setLocalPlan } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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
          lg:h-[130px] lg:-top-[40px]"
      />
      {/* Content remains exactly the same */}
      <h3
        className="text-2xl 
        sm:text-xl
        md:text-2xl"
      >
        {plan.name} plan
      </h3>
      <h4
        className="opacity-50 
        text-sm sm:text-base"
      >
        {bestFor[planKey]}
      </h4>
      <p
        className="text-3xl tracking-tight mt-12 mb-2
        sm:text-2xl sm:mt-8
        md:text-3xl md:mt-12"
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
      <Button
        onClick={() => {
          setLocalPlan(plan.id);
          router.push(Routes.sign_up);
        }}
        size="lg"
        variant="outline"
        className="w-full mt-auto
          py-3 sm:py-4
          text-sm sm:text-base"
      >
        Choose {plan.name}
      </Button>
    </div>
  );
}

export default SmallPriceCard;
