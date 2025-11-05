import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { FooterProps } from "../_types";

export const Footer: React.FC<FooterProps> = ({
  currentPage,
  handleBack,
  handleNext,
  renderButtonText,
  isNextDisabled,
}) => (
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
        <Button onClick={handleBack} variant="outline" className="w-[200px]">
          Back
        </Button>
      )}

      <Button
        disabled={isNextDisabled}
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
);
