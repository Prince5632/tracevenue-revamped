
import { ProgressHeader } from "@/shared";
import React from "react";

const StepIndicator = ({ currentStep, totalSteps, title, subtitle }) => {
  return (
    <>
      <ProgressHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        title={title}
        subtitle={subtitle}
      />
    </>
  );
};

export default StepIndicator;
