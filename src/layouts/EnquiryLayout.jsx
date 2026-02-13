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

  const isEmptyValue = useCallback((value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    if (Array.isArray(value) && !value.length) return true;
    if (typeof value === "object" && Object.keys(value || {}).length === 0)
      return true;
    return false;
  }, []);

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

  const hasPastDate = (entries = []) => {
    if (!Array.isArray(entries)) return false;
    const now = new Date();
    return entries.some((entry) => {
      if (!entry?.date) return false;
      const dateTime = new Date(
        `${entry.date}T${entry.allDay ? "00:00" : entry.startTime || "00:00"}`,
      );
      return dateTime < now;
    });
  };

  const hasInvalidDuration = (entries = []) =>
    entries.some((entry) => {
      if (entry?.allDay) return false;
      if (!entry?.startTime || !entry?.endTime) return false;
      const [sH, sM] = entry.startTime.split(":").map(Number);
      const [eH, eM] = entry.endTime.split(":").map(Number);
      const diff = eH * 60 + eM - (sH * 60 + sM);
      return diff < 60;
    });

  const runStepGuards = useCallback(async () => {
    if (!currentStep) return false;
    const stepId = currentStep.id;

    const fail = (message, issue = stepId) => {
      setIssueFactor(issue);
      setSuggestionMessage(message);
      return false;
    };

    const ensureLocation = () => {
      if (
        isEmptyValue(formData?.locations) ||
        isEmptyValue(formData?.latitude) ||
        isEmptyValue(formData?.longitude)
      ) {
        return fail("Please select your preferred location.", "location");
      }
      return true;
    };

    const ensureService = () => {
      if (isEmptyValue(formData?.serviceType)) {
        return fail("Please select a service type.", "service_type");
      }
      return true;
    };

    const ensureEvent = () => {
      if (isEmptyValue(formData?.selectedEventType)) {
        return fail("Please select an event type.", "event_type");
      }
      const eventId = formData?.selectedEventType?.value;
      if (!isObjectId(eventId)) {
        return fail(
          "Fetching event details. Please wait a moment and try again.",
          "event_type",
        );
      }
      return true;
    };

    const ensurePeopleAndBudget = () => {
      const minPeople = Number(formData?.selectedPeopleRange?.minPeople);
      const maxPeople = Number(formData?.selectedPeopleRange?.maxPeople);
      const minBudget = Number(formData?.minBudgetValue);
      const maxBudget = Number(formData?.maxBudgetValue);

      if (!minPeople) {
        return fail("Please select minimum guest count.", "gathering_budget");
      }
      if (!maxPeople) {
        return fail("Please select maximum guest count.", "gathering_budget");
      }
      if (maxPeople < minPeople) {
        return fail(
          "Max guests should be greater than min guests.",
          "gathering_budget",
        );
      }
      if (!minBudget || !maxBudget) {
        return fail("Please enter your budget.", "gathering_budget");
      }
      if (maxBudget < minBudget) {
        return fail(
          "Max budget should be greater than min budget.",
          "gathering_budget",
        );
      }
      return true;
    };

    switch (stepId) {
      case "location":
        if (!ensureLocation()) return false;
        return runCuisineGate("location");

      case "service_type":
        if (!ensureLocation() || !ensureService()) return false;
        return runCuisineGate("service_type");

      case "event_type":
        if (!ensureLocation() || !ensureService() || !ensureEvent()) {
          return false;
        }
        return runCuisineGate("event_type");

      case "gathering_budget":
        if (
          !ensureLocation() ||
          !ensureService() ||
          !ensureEvent() ||
          !ensurePeopleAndBudget()
        ) {
          return false;
        }
        return runCuisineGate("gathering_budget");

      case "event_date": {
        if (isEmptyValue(formData?.selectedDates)) {
          return fail("Please select at least one preferred date.", stepId);
        }
        if (hasPastDate(formData.selectedDates)) {
          return fail(
            "Your preferred date is in the past. Please choose a future date.",
            stepId,
          );
        }
        if (hasPastDate(formData?.alternateDates || [])) {
          return fail(
            "One or more alternate dates are in the past.",
            stepId,
          );
        }
        if (hasInvalidDuration(formData.selectedDates)) {
          return fail(
            "End time must be at least 1 hour after the start time.",
            stepId,
          );
        }
        return true;
      }

      case "food_preferences": {
        const result = await ensureCuisineCombinations(formData);
        if (!result?.ok) {
          return fail(
            result?.message ||
              "No packages are available for your current selection.",
            result?.issueFactor || stepId,
          );
        }
        return true;
      }

      default:
        return true;
    }
  }, [
    currentStep,
    formData,
    isEmptyValue,
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

const CUISINE_VALIDATION_STEPS = new Set([
  "gathering_budget",
  "event_date",
  "food_preferences",
]);

const shouldValidateCuisine = (stepId) =>
  stepId ? CUISINE_VALIDATION_STEPS.has(stepId) : false;

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
