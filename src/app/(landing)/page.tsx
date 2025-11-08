import { Metadata } from "next";
import Banner from "@/components/composits/Banner";
import PenAndPaper from "@/components/composits/PenAndPaper";
import GrowthAndImpact from "@/components/composits/GrowthFeatureCard";
import TestimonialSection from "@/components/composits/TestimonialSection";
// import { FixedCTAButton } from "@/components/composits/FixedCtaButton";
import FaqPanel from "@/components/composits/FaqPanel";
import WaveDivider from "@/components/composits/WaveDivider";
import PricePanel from "@/components/composits/PricePanel";
import { Callout } from "@/components/ui/callout";
import BackersPanel from "@/components/composits/BackersPanel";
import RackIntelligence from "@/components/composits/RackIntelligence";
import RapidRetrieval from "@/components/composits/RapidRetrieval";
import FEFOIntegration from "@/components/composits/FEFOIntegrations";

export const metadata: Metadata = {
  title: "medicinexp - From Racks to Receipts",
  description: "medicinexp - built for pharmacies, polyclinics, and hospitals",
};

export default function Home() {
  return (
    <div className="">
      {/* <FixedCTAButton /> */}
      <Banner />
      {/* <ClinicBuilder3D /> */}
      <PenAndPaper />
      <Callout />
      <RackIntelligence />
      {/* <InventoryAccuracy /> */}
      {/* <PharmacyAnalytics /> */}
      {/* <IntegrationsPanel /> */}
      {/* <CustomerLogos /> */}
      <WaveDivider />
      <BackersPanel />
      <RapidRetrieval />
      <FEFOIntegration />
      <WaveDivider invert />
      <GrowthAndImpact />
      <WaveDivider />
      <TestimonialSection />
      <WaveDivider className="mt-0" invert />
      <PricePanel />
      <WaveDivider />
      {/* <OurLocations /> */}
      <FaqPanel />
    </div>
  );
}
