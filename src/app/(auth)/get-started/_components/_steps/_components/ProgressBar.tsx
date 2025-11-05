import React from "react";
import { ProgressBarProps } from "../_types";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentPage,
  totalPages,
}) => (
  <div
    className="h-[2px] bg-primary transition-all duration-300"
    style={{
      width: `${(currentPage / totalPages) * 100}%`,
    }}
  ></div>
);
