import DarkPanel from "@/components/composits/DarkPanel";
import GrowthAndImpact from "@/components/composits/GrowthFeatureCard";
import React from "react";

function Features() {
  return (
    <DarkPanel>
      <div className="mt-20">
        <GrowthAndImpact />
      </div>
    </DarkPanel>
  );
}

export default Features;
