"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/composits/Logo";
import { Routes } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { useSignUpStore } from "@/store/sing-up.store";

interface StepsProps {
  title: string;
  handleNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  renderButtonText: () => string;
  renderCurrentStep: () => React.ReactNode;
  renderLegend: () => React.ReactNode;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Steps: React.FC<StepsProps> = ({
  title,
  handleNext,
  renderButtonText,
  renderCurrentStep,
  renderLegend,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const {
    formData: { plan_id },
    isEmailVerified,
    page,
  } = useSignUpStore();

  return (
    <div
      className="fixed inset-0 z-40 overflow-y-auto bg-background"
      tabIndex={-1}
    >
      <div className="fixed top-0 inset-x-0 bg-background w-full h-full flex flex-col">
        {/* Header */}
        <div className="border-b px-20 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <Logo />
            <h5 className="text-lg font-medium text-foreground/80">
              <sub>{title}</sub>
            </h5>
          </div>

          <ModeToggle />
        </div>

        {/* Progress bar */}
        <div
          className="h-[2px] bg-primary transition-all duration-300"
          style={{
            width: `${(currentPage / totalPages) * 100}%`,
          }}
        ></div>

        {/* Body */}
        <div className="flex-grow bg-primary-50 px-20 py-10">
          <h4 className="text-sm font-light text-primary-950 mb-6">
            {renderLegend()}
          </h4>
          {renderCurrentStep()}
        </div>

        {/* Footer */}
        <div className="border-t fixed bottom-0 inset-x-0 z-50 bg-background px-20 py-3 flex items-center justify-between">
          <Link
            href={Routes.home}
            className="flex items-center text-primary-950 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Link>

          <div className="flex items-center gap-4">
            {currentPage > 0 && (
              <Button
                onClick={() => {
                  const prev = currentPage - 1;
                  if (plan_id == 1 && currentPage == 6) {
                    onPageChange(prev - 1);
                  } else {
                    onPageChange(prev);
                  }
                }}
                variant="outline"
                className="w-[200px]"
              >
                Back
              </Button>
            )}

            <Button
              disabled={page === 6 && !isEmailVerified}
              onClick={(e) => {
                try {
                  handleNext(e);
                } catch (err) {
                  console.error(err);
                }
              }}
              className="uppercase tracking-wide px-10 py-6 text-lg w-[200px]"
            >
              {renderButtonText()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
