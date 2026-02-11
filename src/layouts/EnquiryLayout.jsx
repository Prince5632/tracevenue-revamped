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
import { fetchCuisineCombinations } from "@/features/venue/services/cuisineComboService";
import { Button } from "@shared/components/ui";

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
  } = useEnquiryStore();

  useLayoutEffect(() => {
    hydrateFromUrl(wizardSnapshot.formData);
  }, [wizardSnapshot.formData, hydrateFromUrl]);

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
        includeStepId: "location",
      });
    }

    if (eventSlug && !decodedEvent && serviceType) {
      return buildWizardUrl({
        formData: wizardSnapshot.formData,
        steps,
        includeStepId: "service_type",
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
  const [activeStepIndex, setActiveStepIndex] = useState(resolvedStepIndex);

  useEffect(() => {
    setActiveStepIndex(resolvedStepIndex);
  }, [resolvedStepIndex, location.pathname, location.search]);

  const boundedStepIndex = Math.min(
    Math.max(activeStepIndex, 0),
    Math.max(steps.length - 1, 0),
  );
  const currentStep = steps[boundedStepIndex] || null;
  const isFirstStep = boundedStepIndex === 0;
  const isLastStep = boundedStepIndex === steps.length - 1;

  const isEmptyValue = useCallback((value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    if (Array.isArray(value) && !value.length) return true;
    if (typeof value === "object" && Object.keys(value || {}).length === 0)
      return true;
    return false;
  }, []);

  const validateCurrentStep = useCallback(() => {
    const stepId = currentStep?.id;
    switch (stepId) {
      case "location":
        return (
          !isEmptyValue(formData?.locations) &&
          !isEmptyValue(formData?.latitude) &&
          !isEmptyValue(formData?.longitude)
        );
      case "service_type":
        return !isEmptyValue(formData?.serviceType);
      case "event_type":
        return !isEmptyValue(formData?.selectedEventType);
      case "gathering_budget":
        return (
          !isEmptyValue(formData?.selectedPeopleRange?.minPeople) &&
          !isEmptyValue(formData?.selectedPeopleRange?.maxPeople) &&
          !isEmptyValue(formData?.minBudgetValue) &&
          !isEmptyValue(formData?.maxBudgetValue)
        );
      case "event_date":
        return !isEmptyValue(formData?.selectedDates);
      case "food_preferences":
        return true;
      default:
        return true;
    }
  }, [currentStep?.id, formData, isEmptyValue]);

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

    const isValid = validateCurrentStep();
    if (!isValid) {
      setSuggestionMessage("Please complete the current step before continuing.");
      return;
    }

    const stepChanged = hasStepChanged(
      currentStep?.id,
      formData,
      wizardSnapshot.formData,
    );

    try {
      setIsApiLoading(true);
      const response = await fetchCuisineCombinations(formData);
      const data = response?.data;
      if (data) {
        const ok = data.success === true && data.validation_passed === true;
        if (!ok) {
          const msg =
            data.suggestions?.solution ||
            data.message ||
            "Please adjust your selection.";
          setIssueFactor(data.current_step || null);
          setSuggestionMessage(msg);
          setIsApiLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error("Cuisine API verification failed", error);
      if (boundedStepIndex <= 1) {
        setSuggestionMessage("Something went wrong. Please try again.");
        setIsApiLoading(false);
        return;
      }
    } finally {
      setIsApiLoading(false);
    }

    const commitIndex = stepChanged
      ? boundedStepIndex
      : Math.max(boundedStepIndex, persistedStepIndex);

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
    setIsApiLoading,
    setIssueFactor,
    setSuggestionMessage,
    steps.length,
    validateCurrentStep,
    wizardSnapshot.formData,
  ]);

  const handleBack = useCallback(() => {
    if (isFirstStep) return;
    clearValidationFeedback();
    setActiveStepIndex((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [clearValidationFeedback, isFirstStep]);

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
    [boundedStepIndex, clearValidationFeedback, resolvedStepIndex],
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
        className={`fixed z-50 lg:z-auto top-0 lg:top-27 transform transition-transform duration-300 ${
          isSidebarOpen ? "rounded-t-none" : "rounded-t-xl"
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
          className={`lg:hidden absolute top-1 ${
            isSidebarOpen ? "-right-2" : "!right-0"
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

const deepEqual = (a, b) => {
  if (a === b) return true;
  const normalizedA = a ?? null;
  const normalizedB = b ?? null;
  return JSON.stringify(normalizedA) === JSON.stringify(normalizedB);
};

const normalizeDietaryRequirements = (list = []) =>
  Array.isArray(list) ? [...list].sort() : [];

const extractStepPayload = (data = {}, stepId) => {
  switch (stepId) {
    case "location":
      return {
        locations: data.locations || "",
        latitude: toNullableNumber(data.latitude),
        longitude: toNullableNumber(data.longitude),
        radius: toNullableNumber(data.radius) ?? 20,
      };
    case "service_type":
      return {
        serviceType: data.serviceType || null,
      };
    case "event_type":
      return {
        eventTypeId: normalizeEventTypeId(data.selectedEventType),
        label: data.selectedEventType?.label || data.selectedEventType?.eventName || "",
      };
    case "gathering_budget":
      return {
        minPeople: toNullableNumber(data.selectedPeopleRange?.minPeople),
        maxPeople: toNullableNumber(data.selectedPeopleRange?.maxPeople),
        minBudgetValue: toNullableNumber(data.minBudgetValue),
        maxBudgetValue: toNullableNumber(data.maxBudgetValue),
        budgetType: data.budgetType ?? null,
      };
    case "event_date":
      return {
        selectedDates: normalizeDateEntries(data.selectedDates),
        alternateDates: normalizeDateEntries(data.alternateDates),
      };
    case "food_preferences":
      return {
        vegOnly: typeof data.vegOnly === "boolean"
          ? data.vegOnly
          : data.dietaryRequirements?.includes("vegOnly") || false,
        alcoholic: typeof data.alcoholic === "boolean"
          ? data.alcoholic
          : data.dietaryRequirements?.includes("alcoholic") || false,
        dietaryRequirements: normalizeDietaryRequirements(
          data.dietaryRequirements || [],
        ),
      };
    default:
      return null;
  }
};

const hasStepChanged = (stepId, currentData, persistedData) => {
  if (!stepId) return false;
  return !deepEqual(
    extractStepPayload(currentData, stepId),
    extractStepPayload(persistedData, stepId),
  );
};

const toNullableNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeDateEntries = (entries = []) =>
  Array.isArray(entries)
    ? entries.map((entry) => ({
        date: entry?.date || "",
        allDay: Boolean(entry?.allDay),
        startTime: entry?.startTime || "",
        endTime: entry?.endTime || "",
      }))
    : [];

const normalizeEventTypeId = (eventType) => {
  if (!eventType) return null;
  return (
    eventType.id ||
    eventType.value ||
    eventType.eventName ||
    eventType.label ||
    null
  );
};
