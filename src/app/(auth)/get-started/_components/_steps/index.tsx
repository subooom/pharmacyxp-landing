"use client";

import React from "react";
import { StepsProps } from "./_types";
import { Header } from "./_components/Header";
import { ProgressBar } from "./_components/ProgressBar";
import { Body } from "./_components/Body";
import { Footer } from "./_components/Footer";
import { useStepsLogic } from "./_hooks/useStepsLogic";

const Steps: React.FC<StepsProps> = (props) => {
  const {
    title,
    handleNext,
    renderButtonText,
    renderCurrentStep,
    renderLegend,
    currentPage,
    totalPages,
    onPageChange,
  } = props;

  const { handleBack, isNextDisabled } = useStepsLogic({
    currentPage,
    onPageChange,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header title={title} />

      <ProgressBar currentPage={currentPage} totalPages={totalPages} />

      <Body
        renderLegend={renderLegend}
        renderCurrentStep={renderCurrentStep}
      />

      <Footer
        currentPage={currentPage}
        handleBack={handleBack}
        handleNext={handleNext}
        renderButtonText={renderButtonText}
        isNextDisabled={isNextDisabled}
      />
    </div>
  );
};

export default Steps;
