import DarkPanel from "@/components/composits/DarkPanel";
import SectionTitle from "@/components/composits/SectionTitle";
import { Metadata } from "next";
import React from "react";
import PriceSection from "./_components/PriceSection";
import FaqPanel from "@/components/composits/FaqPanel";
import PricePanel from "@/components/composits/PricePanel";
import TestimonialSection from "@/components/composits/TestimonialSection";

export const metadata: Metadata = {
  title: "Our Pricing - medicinexp",
  description: "medicinexp - built for pharmacies, polyclinics, and hospitals",
};

function PricingPage() {
  return (
    <DarkPanel>
      <div className="layout-container flex flex-col items-center justify-center gap-8 mt-16 py-16">
        <SectionTitle
          title="Pricing that scales with"
          align="center"
          titleContinued="your pharmacy"
          description="surprisingly simple pricing for pharmacies of all sizes. Every feature you need now and as you scale."
        />
        <PriceSection />
        <TestimonialSection />
        <PricePanel />
        <FaqPanel />
      </div>
    </DarkPanel>
  );
}

export default PricingPage;
