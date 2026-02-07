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
import RackIntelligence from "@/components/composits/RackIntelligence";
import RapidRetrieval from "@/components/composits/RapidRetrieval";
import FEFOIntegration from "@/components/composits/FEFOIntegrations";
import TrustAndSecuritySection from "../../components/composits/TrustAndSecurity";
import DatabaseReliabilityCard from "@/components/composits/DatabaseReliabilityCard";
import { DoctorPlatformShowcase } from "../../components/composits/DoctorPlatformShowcase";
import BackersPanel from "@/components/composits/BackersPanel";
import { DiscountBanner } from "@/components/composits/DiscountBanner";
import constants from "@/config/constants";

export const metadata: Metadata = {
  title: "medicinexp - From Racks to Receipts",
  description: "medicinexp - built for pharmacies, polyclinics, and hospitals",
};

export default function Home() {
  return (
    <div className="max-w-screen">
      {/* <FixedCTAButton /> */}
      <Banner />
      <DiscountBanner
        discount={constants.discountPercentage}
        days={constants.discountDays}
      />
      {/* <ClinicBuilder3D /> */}
      <PenAndPaper />
      <Callout />
      <RackIntelligence />
      <DatabaseReliabilityCard />
      <WaveDivider />
      <RapidRetrieval />
      <FEFOIntegration />

      {/* ⭐ New Doctor Platform Section Here */}

      <WaveDivider invert />
      <DoctorPlatformShowcase />
      <GrowthAndImpact />

      <BackersPanel />
      <WaveDivider />
      <TestimonialSection />
      <WaveDivider className="mt-0" invert />
      <PricePanel />
      <TrustAndSecuritySection />
      <WaveDivider />
      {/* <OurLocations /> */}
      <FaqPanel />
    </div>
  );
}
