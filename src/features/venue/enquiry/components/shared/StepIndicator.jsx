
import { ProgressHeader } from "@/shared";
import React from "react";

const StepIndicator = ({ currentStep, totalSteps, title, subtitle, isDiscoverPackagesStep }) => {
  return (
    <>
      <ProgressHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        title={title}
        subtitle={subtitle}
        isDiscoverPackagesStep={isDiscoverPackagesStep}
      />
    </>
  );
};

export default StepIndicator;
