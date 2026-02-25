import React from "react";
import StepIndicator from "../shared/StepIndicator";
import StepContent from "../shared/StepContent";
import StepShimmer from "../shared/StepShimmer";
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
  isDiscoverPackagesStep,
  footerMessage,
  isResolving,
}) => {
  return (
    <>
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        title={title}
        subtitle={subtitle}
      />
      {isResolving ? (
        <StepShimmer stepKey={stepKey} />
      ) : (
        <>
          <StepContent
            stepKey={stepKey}
            formData={formData}
            updateFormData={updateFormData}
            urlParams={urlParams}
            onNext={onNext}
          />
          <StepControlFooter
            onNext={onNext}
            onBack={onBack}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            message={footerMessage}
            isDiscoverPackagesStep={isDiscoverPackagesStep}
          />
        </>
      )}
    </>
  );
};

export default Steps;
