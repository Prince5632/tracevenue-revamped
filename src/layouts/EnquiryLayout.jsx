import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '@features/venue/components';
import { StepControlFooter, ProgressHeader } from '@shared/components/layout';
import { StepRenderer } from '@features/venue/enquiry/components';
import { getEnquirySteps } from '@features/venue/enquiry/utils';
import { X } from "lucide-react";
import { Button } from '@shared/components/ui';
import {
    getStepIndexFromParams,
    decodeLocationFromUrl,
    decodeServiceTypeFromUrl,
    buildStepUrl
} from '@features/venue/enquiry/utils';

const EnquiryLayout = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {
        location,
        serviceType,
        eventType,
        gatheringAndBudget,
        eventDate,
        foodPreference
    } = params;
    const [completedSteps, setCompletedSteps] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({});

    // Load steps configuration
    const steps = useMemo(() => getEnquirySteps(), []);

    // Derive current step index from URL params
    const currentStepIndex = useMemo(() => {
        return getStepIndexFromParams(params);
    }, [params]);
    const currentStep = steps[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    // Validate URL params on mount and redirect if invalid
    useEffect(() => {
        // Step validation: if URL has params but they're invalid, redirect to step 1
        if (location) {
            const locationData = decodeLocationFromUrl(location);
            if (!locationData) {
                // Invalid location format - redirect to home
                console.warn('Invalid location in URL, redirecting to home');
                navigate('/', { replace: true });
                return;
            }

            // Store location data for form
            setFormData(prev => ({
                ...prev,
                selectedCities: [{
                    name: locationData.name,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                }],
                distance: locationData.distance
            }));
        }

        if (serviceType) {
            const serviceId = decodeServiceTypeFromUrl(serviceType);
            if (!serviceId) {
                // Invalid service type - redirect to location step
                console.warn('Invalid service type in URL, redirecting to location step');
                const locationData = decodeLocationFromUrl(location);
                if (locationData) {
                    navigate(`/${location}`, { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
                return;
            }

            setFormData(prev => ({
                ...prev,
                serviceType: serviceId
            }));
        }

        // Mark steps as completed based on URL depth
        const completed = [];
        if (location) completed.push(steps[0]?.id);
        if (serviceType) completed.push(steps[1]?.id);
        if (eventType) completed.push(steps[2]?.id);
        if (gatheringAndBudget) completed.push(steps[3]?.id);
        if (eventDate) completed.push(steps[4]?.id);
        if (foodPreference) completed.push(steps[5]?.id);

        setCompletedSteps(completed.filter(Boolean));
    }, [location, serviceType, eventType, gatheringAndBudget, eventDate, foodPreference, navigate, steps]);

    const handleNext = () => {
        // Mark current step as completed
        if (currentStep && !completedSteps.includes(currentStep.id)) {
            setCompletedSteps(prev => [...prev, currentStep.id]);
        }

        if (!isLastStep) {
            // Build URL for next step and navigate
            const nextStepIndex = currentStepIndex + 1;
            const nextUrl = buildStepUrl(nextStepIndex, formData);
            navigate(nextUrl);
            window.scrollTo(0, 0);
        } else {
            // Handle finish/submit
            alert('Enquiry Raised!');
        }
    };

    const handleBack = () => {
        if (!isFirstStep) {
            // Use browser back for natural navigation
            navigate(-1);
            window.scrollTo(0, 0);
        }
    };

    // Update form data from step components
    const updateFormData = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    if (!currentStep) return <div>Loading configuration...</div>;

    return (
        <>
            <div className="flex gap-7  max-w-7xl mx-auto h-fill
            gap-7">
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
                        className="lg:hidden absolute top-1 right-2 sm:-right-2 bg-primary text-white  rounded-full p-1 shadow 
                        cursor-pointer z-60"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="flex-1 relative  top-20 md:-top-20 min-w-0 md:mt-20 ">
                    <Button className="mb-4 lg:hidden rounded-l-none" onClick={() => setIsSidebarOpen(true)}
                        size="lg" variant="gradient" >Step {currentStepIndex + 1}/{steps?.length}</Button>
                    <ProgressHeader
                        currentStep={currentStepIndex + 1}
                        totalSteps={steps?.length}
                        title={currentStep?.title}
                        subtitle={currentStep?.description}
                    />
                    <div className="mt-6 flex-1 relative">
                        <StepRenderer
                            stepKey={currentStep?.componentKey}
                            formData={formData}
                            updateFormData={updateFormData}
                            urlParams={params}
                        />
                    </div>
                    <StepControlFooter onNext={handleNext} onBack={handleBack} isFirstStep={isFirstStep} isLastStep={isLastStep} />
                </div>
            </div>

        </>
    );
};

export default EnquiryLayout;
