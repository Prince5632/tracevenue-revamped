import React, { useState, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar/Sidebar';
import StepControlFooter from '../components/common/StepControlFooter';
import StepRenderer from '../components/enquiry/StepRenderer';
import { getEnquirySteps } from '../utils/enquiryConfig';
import { Menu, X } from "lucide-react";
import ProgressHeader from '../components/common/ProgessHeader';


const EnquiryLayout = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);



    // Load steps configuration
    const steps = useMemo(() => getEnquirySteps(), []);

    const currentStep = steps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    const handleNext = () => {
        if (!completedSteps.includes(currentStep.id)) {
            setCompletedSteps([...completedSteps, currentStep.id]);
        }

        if (!isLastStep) {
            setCurrentStepIndex(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            // Handle finish/submit
            alert('Enquiry Raised!');
        }
    };

    const handleBack = () => {
        if (!isFirstStep) {
            setCurrentStepIndex(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    if (!currentStep) return <div>Loading configuration...</div>;

    return (
        <>
            <Navbar />
            <div className="flex lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 gap-6 lg:gap-7 mt-6 lg:mt-8">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden fixed top-24 left-4 z-50 bg-white border shadow-md rounded-full p-2 mb-3"
                >
                    <Menu size={22} />
                </button>

                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
                <div
                    className={`
            fixed lg:static z-50 lg:z-auto
            top-0 left-0 h-full
            transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
                >
                    <Sidebar
                        steps={steps}
                        currentStep={currentStepIndex + 1}
                        completedSteps={completedSteps}
                    />
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden absolute top-4 right-4 bg-white rounded-full p-1 shadow cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 min-w-0 mt-6 md:mt-2">
                    <ProgressHeader
                        currentStep={currentStepIndex + 1}
                        totalSteps={steps.length}
                        title={currentStep.title}
                        subtitle={currentStep.description}
                    />
                    <div className="mt-6">
                        <StepRenderer stepKey={currentStep.componentKey} />
                    </div>

                    <StepControlFooter onNext={handleNext} onBack={handleBack} isFirstStep={isFirstStep} isLastStep={isLastStep} />
                </div>



            </div>
        </>
    );
};

export default EnquiryLayout;
