import React from 'react';
import * as Steps from './steps';

/**
 * StepRenderer component
 * Dynamically renders the step component based on stepKey
 * Passes formData and updateFormData props to step components
 */
const StepRenderer = ({ stepKey, formData = {}, updateFormData, urlParams = {} }) => {
    const StepComponent = Steps[stepKey];

    if (!StepComponent) {
        return <div className="text-red-500">Error: Step component "{stepKey}" not found.</div>;
    }

    return (
        <StepComponent
            formData={formData}
            updateFormData={updateFormData}
            urlParams={urlParams}
        />
    );
};

export default StepRenderer;
