import React from "react";
import { StepRenderer } from "..";

const StepContent = ({ stepKey, formData, updateFormData, urlParams }) => {
  return (
    <>
      <div className="mt-6 flex-1 relative left-3 lg:left-0">
        <StepRenderer
          stepKey={stepKey}
          formData={formData}
          updateFormData={updateFormData}
          urlParams={urlParams}
        />
      </div>
    </>
  );
};

export default StepContent;
