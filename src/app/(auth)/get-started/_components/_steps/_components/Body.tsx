import React from "react";
import { Sparkles } from "lucide-react";
import { BodyProps } from "../_types";
import { useSignUpStore } from "@/store/sing-up.store";

export const Body: React.FC<BodyProps> = ({
  renderLegend,
  renderCurrentStep,
}) => {
  const invite = useSignUpStore((state) => state.invite);
  const page = useSignUpStore((state) => state.page);

  return (
    <div className="flex-grow bg-primary-50 px-4 py-6 sm:px-10 sm:py-10 lg:px-20">
      <div className="mx-auto w-full max-w-6xl">
        <h4 className="mb-4 text-sm font-light text-primary-950 sm:mb-6">
          {renderLegend()}
        </h4>
        {invite && page > 0 && page < 7 && (
          <div className="mb-6 flex items-start gap-2 rounded-xl border border-primary/20 bg-background px-4 py-3 text-sm text-foreground">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              Filled in from your visit
              {invite.repName ? ` with ${invite.repName}` : ""}. Check each
              step and change anything that&apos;s wrong.
            </span>
          </div>
        )}
        {renderCurrentStep()}
      </div>
    </div>
  );
};
