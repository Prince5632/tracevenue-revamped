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
  formData,
  updateFormData,
  urlParams,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
  footerMessage,
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
        formData={formData}
        updateFormData={updateFormData}
        urlParams={urlParams}
      />
      <StepControlFooter
        onNext={onNext}
        onBack={onBack}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        message={footerMessage}
      />
    </>
  );
};

export default Steps;
