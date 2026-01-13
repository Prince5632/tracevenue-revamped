import React from 'react';
import * as Steps from './steps';

const StepRenderer = ({ stepKey }) => {
    const StepComponent = Steps[stepKey];

    if (!StepComponent) {
        return <div className="text-red-500">Error: Step component "{stepKey}" not found.</div>;
    }

    return <StepComponent />;
};

export default StepRenderer;
