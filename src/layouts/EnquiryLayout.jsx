import React, { useState, useMemo } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar/Sidebar';
import StepControlFooter from '../components/common/StepControlFooter';
import StepRenderer from '../components/enquiry/StepRenderer';
import { getEnquirySteps } from '../utils/enquiryConfig';
import { Hamburger, Menu, MenuIcon, X } from "lucide-react";
import ProgressHeader from '../components/common/ProgessHeader';
import { Button } from '../components/common';

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
          
               
            
            <div className="grid grid-cols-1  lg:grid-cols-[280px_1fr]  max-w-7xl mx-auto px-4 sm:px-6 lg:px-7  
            gap-7 mt-38 lg:mt-24">   
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden "
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
                <div
                    className={`fixed lg:static z-50 lg:z-auto top-0 left-0 transform transition-transform 
                         duration-300 ${isSidebarOpen ? "rounded-t-none" : "rounded-t-xl "} ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
                >
                    <Sidebar
                        steps={steps}
                        currentStep={currentStepIndex + 1}
                        completedSteps={completedSteps}
                        isSidebarOpen={
                            isSidebarOpen
                        }
                    /> 
                    <button
                        onClick={() => 
                            setIsSidebarOpen(false)}
                        className="lg:hidden absolute top-1 -right-2 sm:-right-2 bg-white rounded-full p-1 shadow 
                        cursor-pointer z-60"
                    >
                        <X size={20} />
                    </button>
                </div>   
                <div className="flex-1 relative lg:left-15 top-20 md:-top-20 min-w-0 md:mt-20 ">
                  <Button className="mb-4 lg:hidden rounded-l-none"  onClick={() => setIsSidebarOpen(true)}
                size="lg" variant="gradient" >Step 1/6</Button>  
                  <ProgressHeader
                        currentStep={currentStepIndex + 1}
                        totalSteps={steps.length}
                        title={currentStep.title}
                        subtitle={currentStep.description}
                    />
                    <div className="mt-6 flex-1">
                        <StepRenderer stepKey={currentStep.componentKey} />
                    </div>
                    <StepControlFooter onNext={handleNext} onBack={handleBack} isFirstStep={isFirstStep} isLastStep={isLastStep} />
                </div>
            </div>
           
        </>
    );
};

export default EnquiryLayout;
