import React from "react";
import { BodyProps } from "../_types";

export const Body: React.FC<BodyProps> = ({
  renderLegend,
  renderCurrentStep,
}) => (
  <div className="flex-grow bg-primary-50 px-20 py-10">
    <h4 className="text-sm font-light text-primary-950 mb-6">
      {renderLegend()}
    </h4>
    {renderCurrentStep()}
  </div>
);
