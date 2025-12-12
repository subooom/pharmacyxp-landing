import React from "react";

export interface StepsProps {
  title: string;
  handleNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  renderButtonText: () => string;
  renderCurrentStep: () => React.ReactNode;
  renderLegend: () => React.ReactNode;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface HeaderProps {
  title: string;
}

export interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
}

export interface BodyProps {
  renderLegend: () => React.ReactNode;
  renderCurrentStep: () => React.ReactNode;
}

export interface FooterProps {
  currentPage: number;
  handleBack: () => void;
  handleNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  renderButtonText: () => string;
  isNextDisabled: boolean;
}
