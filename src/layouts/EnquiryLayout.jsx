import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Sidebar } from "@features/venue/components";
import Steps from "@/features/venue/enquiry/components/steps/Steps";
import {
  buildWizardUrl,
  decodeWizardUrl,
  getEnquirySteps,
} from "@features/venue/enquiry/utils";
import useEnquiryStore from "@/features/venue/enquiry/context/useEnquiryStore";
import {
  ensureCuisineCombinations,
  validateWithCuisineApi,
} from "@/features/venue/services/enquiryValidationService";
import { fetchCuisineCombinations } from "@/features/venue/services/cuisineComboService";
import { createJob, updateJob } from "@/features/venue/services/jobService";
import { saveClubbedData } from "@/features/venue/services/clubbedPackageService";

import { Button } from "@shared/components/ui";
import { STEP_IDS } from "@/features/venue/enquiry/constants/steps";
import useUrlEventTypeResolution from "@/features/venue/enquiry/hooks/useUrlEventTypeResolution";
import {
  validateLocationStep,
  validateServiceTypeStep,
  validateEventTypeStep,
  validateGatheringBudgetStep,
  validateEventDateStep,
  validateFoodPreferencesStep,
  isEmptyValue,
  hasPastDate,
  hasInvalidDuration
} from "@/features/venue/enquiry/utils/validation";
import {
  hasStepChanged,
  shouldValidateCuisine,
} from "@/features/venue/enquiry/utils/stepChangeDetection";

const EnquiryLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isResolvingEventSlug, setIsResolvingEventSlug] = useState(false);

  const steps = useMemo(() => getEnquirySteps(), []);

  const wizardSnapshot = useMemo(
    () =>
      decodeWizardUrl({
        pathname: location.pathname,
        search: location.search,
        steps,
      }),
    [location.pathname, location.search, steps],
  );

  const {
    formData,
    hydrateFromUrl,
    updateFormData,
    suggestionMessage,
    clearValidationFeedback,
    setSuggestionMessage,
    setIssueFactor,
    setIsApiLoading,
    eventOptions,
    eventOptionsLoading,
    loadEventOptions,
    jobId,
    setJobId,
    setCuisineCombinationsData,
    setClubbedPackageId,
  } = useEnquiryStore();

  useLayoutEffect(() => {
    hydrateFromUrl(wizardSnapshot.formData);
  }, [wizardSnapshot.formData, hydrateFromUrl]);

  useEffect(() => {
    if (!eventOptionsLoading && !eventOptions.length) {
      loadEventOptions();
    }
  }, [eventOptions.length, eventOptionsLoading, loadEventOptions]);

  // NOTE: Slug-to-ObjectId resolution + cuisine-analysis validation for direct URL navigation
  // is handled by useUrlEventTypeResolution below (replaces the old bare useEffect here).

  const canonicalRedirect = useMemo(() => {
    const { location: locationSlug, serviceType: serviceSlug, eventType: eventSlug } =
      wizardSnapshot.pathSegments;
    const { locationData, serviceType, eventType: decodedEvent } = wizardSnapshot.context;

    if (locationSlug && !locationData) {
      return "/";
    }

    if (serviceSlug && !serviceType && locationData) {
      return buildWizardUrl({
        formData: wizardSnapshot.formData,
        steps,
        includeStepId: STEP_IDS.LOCATION,
      });
    }

    if (eventSlug && !decodedEvent && serviceType) {
      return buildWizardUrl({
        formData: wizardSnapshot.formData,
        steps,
        includeStepId: STEP_IDS.SERVICE_TYPE,
      });
    }

    return null;
  }, [steps, wizardSnapshot.context, wizardSnapshot.formData, wizardSnapshot.pathSegments]);

  useEffect(() => {
    if (!canonicalRedirect) return;
    const currentUrl = `${location.pathname}${location.search}` || "/";
    if (currentUrl === canonicalRedirect) return;
    navigate(canonicalRedirect, { replace: true });
  }, [canonicalRedirect, location.pathname, location.search, navigate]);

  const resolvedStepIndex = wizardSnapshot.currentStep?.index ?? 0;
  const persistedStepIndex = useMemo(() => {
    if (!steps.length) return -1;
    const stepState = wizardSnapshot.currentStep;
    if (!stepState) return -1;
    if (stepState.isComplete) return steps.length - 1;
    return Math.max((stepState.index ?? 0) - 1, -1);
  }, [steps, wizardSnapshot.currentStep]);

  const [stepOverride, setStepOverride] = useState(null);

  useEffect(() => {
    setStepOverride(null);
  }, [location.pathname, location.search]);

  const clampToAvailableSteps = useCallback(
    (index) => {
      if (!steps.length) return 0;
      if (typeof index !== "number" || Number.isNaN(index)) return 0;
      const lastIndex = steps.length - 1;
      return Math.max(0, Math.min(index, lastIndex));
    },
    [steps.length],
  );

  const rawStepIndex =
    typeof stepOverride === "number" ? stepOverride : resolvedStepIndex;
  const boundedStepIndex = clampToAvailableSteps(rawStepIndex);

  const setActiveStepIndex = useCallback(
    (nextValue) => {
      setStepOverride((prevOverride) => {
        const baseValue =
          typeof prevOverride === "number" ? prevOverride : resolvedStepIndex;
        const targetValue =
          typeof nextValue === "function" ? nextValue(baseValue) : nextValue;
        const clampedValue = clampToAvailableSteps(targetValue);
        return clampedValue === resolvedStepIndex ? null : clampedValue;
      });
    },
    [clampToAvailableSteps, resolvedStepIndex],
  );

  const currentStep = steps[boundedStepIndex] || null;
  const isFirstStep = boundedStepIndex === 0;
  const isLastStep = boundedStepIndex === steps.length - 2;
  const totalSteps = steps.length - 1;
  const isDiscoverPackagesStep = currentStep?.componentKey === "DiscoverPackages";



  const formatSuggestion = (payload) => {
    if (!payload) return null;
    console.log(payload, "payloadpayloadpayload");
    const parts = [];
    if (payload.issue) parts.push(payload.issue);
    if (payload.solution) parts.push(payload.solution);
    return parts.join(" • ");
  };

  const runCuisineGate = useCallback(
    async (stepKey) => {
      setIsApiLoading(true);
      const result = await validateWithCuisineApi(stepKey, formData);
      setIsApiLoading(false);
      if (!result?.ok) {
        setIssueFactor(result?.issueFactor || stepKey);
        const formattedSuggestion =
          formatSuggestion(result?.suggestions) || result?.message;
        setSuggestionMessage(
          formattedSuggestion ||
          "Please adjust your selection before continuing.",
        );
        console.log("formattedSuggestion", formattedSuggestion);
        return false;
      }
      return true;
    },
    [formData, setIssueFactor, setIsApiLoading, setSuggestionMessage],
  );

  const runStepGuards = useCallback(async () => {
    if (!currentStep) return false;
    const stepId = currentStep.id;

    const fail = (message, issue = stepId) => {
      setIssueFactor(issue);
      setSuggestionMessage(message);
      return false;
    };

    switch (stepId) {
      case STEP_IDS.LOCATION: {
        const result = validateLocationStep(formData);
        if (!result.isValid) return fail(result.message, result.issue);
        return runCuisineGate(STEP_IDS.LOCATION);
      }

      case STEP_IDS.SERVICE_TYPE: {
        const locResult = validateLocationStep(formData);
        if (!locResult.isValid) return fail(locResult.message, locResult.issue);

        const svcResult = validateServiceTypeStep(formData);
        if (!svcResult.isValid) return fail(svcResult.message, svcResult.issue);

        return runCuisineGate(STEP_IDS.SERVICE_TYPE);
      }

      case STEP_IDS.EVENT_TYPE: {
        const locResult = validateLocationStep(formData);
        if (!locResult.isValid) return fail(locResult.message, locResult.issue);

        const svcResult = validateServiceTypeStep(formData);
        if (!svcResult.isValid) return fail(svcResult.message, svcResult.issue);

        const evtResult = validateEventTypeStep(formData);
        if (!evtResult.isValid) return fail(evtResult.message, evtResult.issue);

        return runCuisineGate(STEP_IDS.EVENT_TYPE);
      }

      case STEP_IDS.GATHERING_BUDGET: {
        const locResult = validateLocationStep(formData);
        if (!locResult.isValid) return fail(locResult.message, locResult.issue);

        const svcResult = validateServiceTypeStep(formData);
        if (!svcResult.isValid) return fail(svcResult.message, svcResult.issue);

        const evtResult = validateEventTypeStep(formData);
        if (!evtResult.isValid) return fail(evtResult.message, evtResult.issue);

        const budgetResult = validateGatheringBudgetStep(formData);
        if (!budgetResult.isValid) return fail(budgetResult.message, budgetResult.issue);

        return runCuisineGate(STEP_IDS.GATHERING_BUDGET);
      }

      case STEP_IDS.EVENT_DATE: {
        const dateResult = validateEventDateStep(formData);
        if (!dateResult.isValid) return fail(dateResult.message, dateResult.issue);
        return true;
      }

      case STEP_IDS.FOOD_PREFERENCES: {
        const foodResult = await validateFoodPreferencesStep(formData);
        if (!foodResult.isValid) return fail(foodResult.message, foodResult.issue);
        return true;
      }

      default:
        return true;
    }
  }, [
    currentStep,
    formData,
    runCuisineGate,
    setIssueFactor,
    setSuggestionMessage,
  ]);

  const commitAnswersThroughStep = useCallback(
    (stepIndex) => {
      if (!steps.length) return;
      const safeIndex = Math.max(
        Math.min(stepIndex, steps.length - 1),
        -1,
      );
      const includeStepId = safeIndex >= 0 ? steps[safeIndex]?.id ?? null : null;

      const nextUrl = buildWizardUrl({
        formData,
        steps,
        includeStepId,
      });

      if (!nextUrl) return;
      const currentUrl = `${location.pathname}${location.search}` || "/";
      if (currentUrl === nextUrl) return;

      navigate(nextUrl, { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [formData, navigate, location.pathname, location.search, steps],
  );

  const handleNext = useCallback(async () => {
    if (!currentStep) return;
    clearValidationFeedback();

    const canProceed = await runStepGuards();
    if (!canProceed) {
      return;
    }

    const stepChanged = hasStepChanged(
      currentStep?.id,
      formData,
      wizardSnapshot.formData,
    );
    if (!shouldValidateCuisine(currentStep?.id) && currentStep?.id === STEP_IDS.FOOD_PREFERENCES) {
      setIsApiLoading(true);
      try {
        const response = await fetchCuisineCombinations(formData);
        const data = response?.data;
        if (data) {
          const ok = data.success === true && data.validation_passed === true;
          if (!ok) {
            const msg =
              formatSuggestion(data.suggestions) ||
              data.message ||
              "Please adjust your selection.";
            setIssueFactor(data.current_step || currentStep?.id || null);
            setSuggestionMessage(msg);
            return;
          }
          // Store cuisine API response for draft job creation
          updateFormData("cuisineApiResponse", data);
        }
      } catch (error) {
        console.error("Cuisine API verification failed", error);
        setSuggestionMessage("Something went wrong. Please try again.");
        return;
      } finally {
        setIsApiLoading(false);
      }
    }

    const commitIndex =
      stepChanged || persistedStepIndex < 0
        ? boundedStepIndex
        : persistedStepIndex;

    commitAnswersThroughStep(commitIndex);

    if (isLastStep) {
      // === Step 6 complete: Create draft job + save clubbed data ===
      setIsApiLoading(true);
      try {
        // 1. Build job data from formData
        const jobData = {
          name: formData?.jobTitle || "Untitled Enquiry",
          description: "",
          status: "Draft",
          eventType: formData?.selectedEventType?.value || formData?.selectedEventType?.id,
          cuisines: formData?.selectedCuisines?.map((c) => c?.value?.id || c?.value) || [],
          budget: {
            min: formData?.yourBudget?.min || 0,
            max: formData?.yourBudget?.max || 0,
          },
          serviceType: formData?.selectedServiceType?.value || formData?.selectedServiceType,
          services: formData?.services || [],
          menuSections: formData?.countData || [],
          numberOfGuests: formData?.selectedPeopleRange?.value,
          peopleRange: {
            minPeople: formData?.selectedPeopleRange?.minPeople,
            maxPeople: formData?.selectedPeopleRange?.maxPeople,
          },
          isBudgetPerPerson: formData?.budgetType === "perPerson",
          budgetType: formData?.budgetType || "perPerson",
          dietaryRequirements: formData?.dietaryRequirements || [],
          location: formData?.locationData,
          selectedCities: formData?.selectedCities || [],
          radius: String(formData?.distance || ""),
          eventDate: formData?.selectedDates?.[0]?.date || "",
          eventDateOptions: {
            preferredDates: formData?.selectedDates?.slice(0, 1) || [],
            alternateDates: formData?.selectedDates?.slice(1) || [],
          },
          vegOnly: formData?.dietaryRequirements?.includes("vegOnly") || false,
          nonAlcoholicOnly: !formData?.dietaryRequirements?.includes("alcoholic"),
        };

        // 2. Create or update draft job
        let currentJobId = jobId;
        if (currentJobId) {
          await updateJob(currentJobId, jobData);
        } else {
          const jobRes = await createJob(jobData);
          currentJobId = jobRes?.jobId || jobRes?.data?._id;
          setJobId(currentJobId);
        }

        // 3. Save clubbed cuisine data (from the cuisine API response)
        // NOTE: Must read fresh state — formData above is a stale closure
        const freshFormData = useEnquiryStore.getState().formData;
        const cuisineResponse = freshFormData?.cuisineApiResponse;
        const sortedCombinations = cuisineResponse?.data?.sorted_cuisine_combinations || [];
        if (sortedCombinations.length > 0) {
          const saveRes = await saveClubbedData(sortedCombinations);
          // Store the savedDocs from API response — these have _id and wrapped cuisine format
          const savedDocs = saveRes?.savedDocs || [];
          if (savedDocs.length > 0) {
            setCuisineCombinationsData(savedDocs);
            // Use the first doc's _id as clubbedPackageId for reference
            setClubbedPackageId(savedDocs[0]?._id);
          } else {
            // Fallback: use raw sorted combinations from cuisine API
            setCuisineCombinationsData(sortedCombinations);
          }
        }

        // 4. Advance to Discover Packages step (step 7 within wizard)
        setActiveStepIndex((prev) => prev + 1);
      } catch (error) {
        console.error("Failed to create draft job:", error);
        setSuggestionMessage("Something went wrong while saving. Please try again.");
      } finally {
        setIsApiLoading(false);
      }
      return;
    }

    setActiveStepIndex((prev) =>
      Math.min(prev + 1, Math.max(steps.length - 1, 0)),
    );
  }, [
    boundedStepIndex,
    clearValidationFeedback,
    commitAnswersThroughStep,
    currentStep,
    formData,
    isLastStep,
    persistedStepIndex,
    runStepGuards,
    setActiveStepIndex,
    setIsApiLoading,
    setIssueFactor,
    setSuggestionMessage,
    steps.length,
    suggestionMessage,
    wizardSnapshot.formData,
  ]);

  const handleBack = useCallback(() => {
    if (isFirstStep) return;
    clearValidationFeedback();
    setActiveStepIndex((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [clearValidationFeedback, isFirstStep, setActiveStepIndex]);

  const handleStepClick = useCallback(
    (stepIndex) => {
      clearValidationFeedback();
      const highestReachable = Math.max(resolvedStepIndex, boundedStepIndex);
      const safeTarget = Math.max(
        0,
        Math.min(stepIndex, highestReachable),
      );
      setActiveStepIndex(safeTarget);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [boundedStepIndex, clearValidationFeedback, resolvedStepIndex, setActiveStepIndex],
  );

  // Auto-resolve event-type slug from URL → ObjectId, validate availability, and advance
  useUrlEventTypeResolution(
    { currentStep, formData, eventOptions, eventOptionsLoading, steps },
    {
      updateFormData,
      setIssueFactor,
      setSuggestionMessage,
      setIsApiLoading,
      setActiveStepIndex,
      commitAnswersThroughStep,
      boundedStepIndex,
      setIsResolvingEventSlug,
    }
  );

  if (!currentStep) {
    return <div>Loading configuration...</div>;
  }

  const currentStepNumber = steps.length ? boundedStepIndex + 1 : 0;

  return (
    <div className="flex gap-7 max-w-7xl mx-auto h-fill">
      <div className="hidden lg:block w-[345px] shrink-0" />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed z-50 lg:z-auto top-0 lg:top-27 transform transition-transform duration-300 ${isSidebarOpen ? "rounded-t-none" : "rounded-t-xl"
          } ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{
          left: "max(0px, calc((100vw - 76rem) / 2))",
        }}
      >
        <Sidebar
          steps={steps}
          currentStep={currentStepNumber}
          completedSteps={[]}
          isSidebarOpen={isSidebarOpen}
          formData={formData}
          onStepClick={handleStepClick}
        />

        <button
          onClick={() => setIsSidebarOpen(false)}
          className={`lg:hidden absolute top-1 ${isSidebarOpen ? "-right-2" : "!right-0"
            } sm:-right-2 bg-primary text-white rounded-full p-1 shadow cursor-pointer z-60`}
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 relative lg:static top-14 sm:top-14 md:top-0">
        <Button
          className="mb-4 lg:hidden rounded-l-none mt-8 sm:mt-0 md:mt-0"
          onClick={() => setIsSidebarOpen(true)}
          size="lg"
          variant="gradient"
        >
          Step {currentStepNumber}/{steps?.length}
        </Button>

        <Steps
          currentStep={currentStepNumber}
          totalSteps={totalSteps}
          title={currentStep?.title}
          subtitle={currentStep?.description}
          stepKey={currentStep?.componentKey}
          formData={formData}
          updateFormData={updateFormData}
          urlParams={wizardSnapshot.pathSegments}
          onNext={handleNext}
          onBack={handleBack}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isDiscoverPackagesStep={isDiscoverPackagesStep}
          footerMessage={suggestionMessage}
          isResolving={isResolvingEventSlug}
        />
      </div>
    </div>
  );
};

export default EnquiryLayout;


