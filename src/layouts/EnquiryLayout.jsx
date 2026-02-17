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
import { matchEventFromCatalog, isObjectId } from "@/features/venue/enquiry/utils/eventMatching";
import { Button } from "@shared/components/ui";
import { STEP_IDS } from "@/features/venue/enquiry/constants/steps";
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
  } = useEnquiryStore();

  useLayoutEffect(() => {
    hydrateFromUrl(wizardSnapshot.formData);
  }, [wizardSnapshot.formData, hydrateFromUrl]);

  useEffect(() => {
    if (!eventOptionsLoading && !eventOptions.length) {
      loadEventOptions();
    }
  }, [eventOptions.length, eventOptionsLoading, loadEventOptions]);

  useEffect(() => {
    if (!Array.isArray(eventOptions) || !eventOptions.length) return;
    const current = formData?.selectedEventType;
    if (!current) return;
    const currentId = current?.value;
    if (isObjectId(currentId)) return;

    const match = matchEventFromCatalog(eventOptions, current);
    if (match?._id) {
      updateFormData("selectedEventType", {
        id: match._id,
        value: match._id,
        eventName: match.eventName || match.label,
        label: match.eventName || match.label,
        slug: match.slug,
      });
    }
  }, [eventOptions, formData?.selectedEventType, updateFormData]);

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
  const isLastStep = boundedStepIndex === steps.length - 1;



  const formatSuggestion = (payload) => {
    if (!payload) return null;
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

    if (shouldValidateCuisine(currentStep?.id)) {
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
      alert("Enquiry flow complete!");
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
          totalSteps={steps?.length}
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
          footerMessage={suggestionMessage}
        />
      </div>
    </div>
  );
};

export default EnquiryLayout;


