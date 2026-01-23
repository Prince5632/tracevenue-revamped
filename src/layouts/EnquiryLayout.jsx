import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@features/venue/components";
import { getEnquirySteps } from "@features/venue/enquiry/utils";
import { X } from "lucide-react";
import { Button } from "@shared/components/ui";
import {
  getStepIndexFromParams,
  decodeLocationFromUrl,
  decodeServiceTypeFromUrl,
  buildStepUrl,
} from "@features/venue/enquiry/utils";
import Steps from "@/features/venue/enquiry/components/steps/Steps";
import useEnquiryStore from "@/features/venue/enquiry/context/useEnquiryStore";
import { fetchCuisineCombinations } from "@/features/venue/services/cuisineComboService";

const EnquiryLayout = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {
    location,
    serviceType,
    eventType,
    gatheringAndBudget,
    eventDate,
    foodPreference,
  } = params;

  // Use global store
  const {
    formData,
    completedSteps,
    setFormData: setStoreFormData,
    updateFormData: updateStoreFormData,
    setCompletedSteps: setStoreCompletedSteps,
    addCompletedStep,
  } = useEnquiryStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
  // Smart hydration: only update fields if store doesn't already have values
  // This preserves manual edits on back navigation
  useEffect(() => {
    // Step validation: if URL has params but they're invalid, redirect to step 1
    if (location) {
      const locationData = decodeLocationFromUrl(location);
      if (!locationData) {
        // Invalid location format - redirect to home
        console.warn("Invalid location in URL, redirecting to home");
        navigate("/", { replace: true });
        return;
      }

      // Only hydrate from URL if store doesn't already have location data
      // This preserves manual edits when navigating back
      if (!formData.locations) {
        setStoreFormData({
          locations: locationData.name,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          city: locationData.name,
          locality: locationData.locality,
          subLocality: locationData.subLocality,
          radius: locationData.distance || 20,
        });
      }
    }

    if (serviceType) {
      const serviceId = decodeServiceTypeFromUrl(serviceType);
      if (!serviceId) {
        // Invalid service type - redirect to location step
        console.warn(
          "Invalid service type in URL, redirecting to location step",
        );
        const locationData = decodeLocationFromUrl(location);
        if (locationData) {
          navigate(`/${location}`, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
        return;
      }

      // Only hydrate from URL if store doesn't already have serviceType
      if (!formData.serviceType) {
        setStoreFormData({
          serviceType: serviceId,
        });
      }
    }

    // Mark steps as completed based on URL depth
    const completed = [];
    if (location) completed.push(steps[0]?.id);
    if (serviceType) completed.push(steps[1]?.id);
    if (eventType) completed.push(steps[2]?.id);
    if (gatheringAndBudget) completed.push(steps[3]?.id);
    if (eventDate) completed.push(steps[4]?.id);
    if (foodPreference) completed.push(steps[5]?.id);

    setStoreCompletedSteps(completed.filter(Boolean));
  }, [
    location,
    serviceType,
    eventType,
    gatheringAndBudget,
    eventDate,
    foodPreference,
    navigate,
    steps,
    formData.locations,
    formData.serviceType,
    setStoreFormData,
    setStoreCompletedSteps,
  ]);

  const isEmptyValue = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    if (Array.isArray(value) && value.length === 0) return true;
    return false;
  };

  const validateStep = (stepIndex, formData) => {
    switch (stepIndex) {
      case 0: // Location
        return !isEmptyValue(formData?.locations);

      case 1: // Service Type
        return !isEmptyValue(formData?.serviceType);

      case 2: // Event Type
        return !isEmptyValue(formData?.eventType);

      case 3: // Gathering & Budget
        return (
          !isEmptyValue(formData?.gatheringAndBudget) ||
          (!isEmptyValue(formData?.guests) && !isEmptyValue(formData?.budget))
        );

      case 4: // Event Date
        return !isEmptyValue(formData?.eventDate);

      case 5: // Food Preference
        return !isEmptyValue(formData?.foodPreference);

      default:
        return true;
    }
  };

  const [footerMessage, setFooterMessage] = useState(null);

  const handleNext = async () => {
    setFooterMessage(null); // Reset message on new attempt
    // 🔒 Validate current step
    const isValid = validateStep(currentStepIndex, formData);
    if (!isValid) {
      alert("Please complete the current step before continuing");
      return;
    }

    // 📥 Sync current step's URL params to formData
    // This ensures data from URL is persisted in the store
    if (currentStepIndex === 0 && location) {
      const locationData = decodeLocationFromUrl(location);
      if (locationData && !formData.locations) {
        setStoreFormData({
          locations: locationData.name,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          city: locationData.name,
          locality: locationData.locality,
          subLocality: locationData.subLocality,
          radius: locationData.distance || 20,
          // Hydrate complex objects as well for consistency if starting from URL
          location: {
              latitude: locationData.latitude,
              longitude: locationData.longitude
          },
          selectedCities: [{
              name: locationData.name,
              city: locationData.name,
              latitude: locationData.latitude,
              longitude: locationData.longitude,
              locality: locationData.locality,
              subLocality: locationData.subLocality
          }]
        });
      }
    }
    if (currentStepIndex === 1 && serviceType) {
      const serviceId = decodeServiceTypeFromUrl(serviceType);
      if (serviceId && !formData.serviceType) {
        updateStoreFormData("serviceType", serviceId);
      }
    }

    // ✅ Mark step completed
    if (currentStep && !completedSteps.includes(currentStep.id)) {
      addCompletedStep(currentStep.id);
    }

    // 🍽️ Call cuisine combo API on EVERY step
    try {
        const response = await fetchCuisineCombinations(formData);
        
        // Step 1 Verification Logic
        if (currentStepIndex === 0) {
             const data = response?.data;
             // Check based on specific response structure
             if (data) {
                 const isSuccess = data.success === true;
                 const isValid = data.validation_passed === true;

                 if (isSuccess && isValid) {
                     // All good, proceed
                 } else {
                     // Failure case
                     // User requested to show 'message' field primarily
                     const suggestionMsg = data.message || data.suggestions?.solution || "Location not available";
                     // Format message nicely if needed, or just use as is
                     setFooterMessage(suggestionMsg); 
                     return; // prevent navigation
                 }
             } else {
                 // Fallback if no data?
                 // assume failure if no data returned
                 setFooterMessage("Unable to verify location. Please try again.");
                 return;
             }
        }

        // Step 2 Verification Logic (Service Type)
        if (currentStepIndex === 1) {
             const data = response?.data;
              if (data) {
                 const isSuccess = data.success === true;
                 const isValid = data.validation_passed === true;

                 if (isSuccess && isValid) {
                     // All good
                 } else {
                     // Failure case
                     const suggestionMsg = data.message || data.suggestions?.solution || "Service not available";
                     setFooterMessage(suggestionMsg); 
                     return; 
                 }
             } else {
                 setFooterMessage("Unable to verify service. Please try again.");
                 return;
             }
        }

    } catch (error) {
        console.error("Verification failed", error);
        if (currentStepIndex === 0 || currentStepIndex === 1) {
             setFooterMessage("Something went wrong. Please try again.");
             return; 
        }
    }

    // 🏁 Last step
    if (isLastStep) {
      alert("Enquiry Raised!");
      return;
    }

    // ➡️ Next step navigation
    const nextStepIndex = currentStepIndex + 1;
    const nextUrl = buildStepUrl(nextStepIndex, formData);

    navigate(nextUrl);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (!isFirstStep) {
      // Use browser back for natural navigation
      navigate(-1);
      window.scrollTo(0, 0);
    }
  };

  // Handle sidebar step click
  const handleStepClick = (stepIndex) => {
    // Allow navigation if step is completed or is the current step (or previous steps)

    // Simple logic: Allow click if stepIndex <= currentStepIndex (already visited)
    // Or if checking completedSteps

    if (stepIndex <= currentStepIndex) {
      const url = buildStepUrl(stepIndex, formData);
      navigate(url);
    } else {
      // Try checking if we CAN generate a URL (have data)
      const url = buildStepUrl(stepIndex, formData);
      navigate(url);
    }
  };

  // Update form data from step components
  const updateFormData = (key, value) => {
    updateStoreFormData(key, value);
  };

  if (!currentStep) return <div>Loading configuration...</div>;

  return (
    <>
      <div
        className="flex gap-7  max-w-7xl mx-auto h-fill
            gap-7"
      >
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
            isSidebarOpen={isSidebarOpen}
            formData={formData}
            onStepClick={handleStepClick}
          />

          {/*  cross icon on small screen */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-1 right-2 sm:-right-2 bg-primary text-white  rounded-full p-1 shadow 
                        cursor-pointer z-60"
          >
            <X size={20} />
          </button>
        </div>

        {/* right steps sections */}
        <div className="flex-1 relative  top-20 md:-top-20 min-w-0 md:mt-20 ">
          {/* this button hide on large screen */}
          <Button
            className="mb-4 lg:hidden rounded-l-none"
            onClick={() => setIsSidebarOpen(true)}
            size="lg"
            variant="gradient"
          >
            Step {currentStepIndex + 1}/{steps?.length}
          </Button>

          {/*  right side steps which includes step indicators (progress bra) and steps content */}
          <Steps
            currentStep={currentStepIndex + 1}
            totalSteps={steps?.length}
            title={currentStep?.title}
            subtitle={currentStep?.description}
            stepKey={currentStep?.componentKey}
            formData={formData}
            updateFormData={updateFormData}
            urlParams={params}
            onNext={handleNext}
            onBack={handleBack}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            footerMessage={footerMessage}
          />
        </div>
      </div>
    </>
  );
};

export default EnquiryLayout;
