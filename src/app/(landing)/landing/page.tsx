import Banner from "@/components/composits/Banner";
import PenAndPaper from "@/components/composits/PenAndPaper";
import GrowthAndImpact from "@/components/composits/GrowthFeatureCard";
import TestimonialSection from "@/components/composits/TestimonialSection";
// import { FixedCTAButton } from "@/components/composits/FixedCtaButton";
import FaqPanel from "@/components/composits/FaqPanel";
import WaveDivider from "@/components/composits/WaveDivider";
import PricePanel from "@/components/composits/PricePanel";
import OurLocations from "@/components/composits/OurLocationsMap/page";
import { Metadata } from "next";
import { Callout } from "@/components/ui/callout";
import BackersPanel from "@/components/composits/BackersPanel";

export const metadata: Metadata = {
  title: "MedicineXP - From Racks to Receipts",
  description: "MedicineXP - built for pharmacies",
};

export default function Home() {
  return (
    <div className="">
      {/* <FixedCTAButton /> */}
      <Banner />
      <PenAndPaper />
      <Callout />
      <WaveDivider />
      <BackersPanel />
      <GrowthAndImpact />
      <TestimonialSection />
      <PricePanel />
      <OurLocations />
      <FaqPanel />
    </div>
  );
}
