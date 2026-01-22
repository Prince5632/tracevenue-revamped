import React from "react";
import StepIndicator from "../shared/StepIndicator";
import StepContent from "../shared/StepContent";
import { StepControlFooter } from "@/shared";

const Steps = ({
  currentStep,
  totalSteps,
  title,
  subtitle,
  stepKey,
  FormData,
  updateFormData,
  urlParams,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}) => {
  return (
    <>
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        title={title}
        subtitle={subtitle}
      />
      <StepContent
        stepKey={stepKey}
        FormData={FormData}
        updateFormData={updateFormData}
        urlParams={urlParams}
      />
      <StepControlFooter
        onNext={onNext}
        onBack={onBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </>
  );
};

export default Steps;
