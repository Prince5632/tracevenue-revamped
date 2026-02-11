import {
  encodeLocationToUrl,
  decodeLocationFromUrl,
  encodeServiceTypeToUrl,
  decodeServiceTypeFromUrl,
  encodeEventTypeToUrl,
  decodeEventTypeFromUrl,
  decodeDatesFromUrl,
} from "./urlBuilder";
import { flattenEvents } from "./flattenEvents";
import { eventCategories } from "../constants";
import { EMPTY_ENQUIRY_FORM } from "../constants/formDefaults";

const PEOPLE_LIMITS = { min: 20, max: 500 };
const BUDGET_LIMITS = { min: 500, max: 10_000_000 };

const eventsCatalog = flattenEvents(eventCategories);

const clampNumber = (value, min, max) => {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  if (typeof min === "number" && value < min) return min;
  if (typeof max === "number" && value > max) return max;
  return value;
};

const normalizeGuestRange = (rawValue) => {
  if (!rawValue) return null;
  const [minStr, maxStr] = rawValue.split("-");
  const min = clampNumber(Number(minStr), PEOPLE_LIMITS.min, PEOPLE_LIMITS.max);
  const max = clampNumber(Number(maxStr), PEOPLE_LIMITS.min, PEOPLE_LIMITS.max);
  if (min === null || max === null || max < min) return null;
  return { minPeople: min, maxPeople: max };
};

const normalizeBudget = (rawValue) => {
  if (!rawValue) return null;
  const [typePart, rangePart] = rawValue.split(":");
  if (!rangePart) return null;
  const [minStr, maxStr] = rangePart.split("-");
  const min = clampNumber(Number(minStr), 0, BUDGET_LIMITS.max);
  const max = clampNumber(Number(maxStr), 0, BUDGET_LIMITS.max);
  if (min === null || max === null) return null;

  const normalizedMin =
    typePart === "ls"
      ? min
      : clampNumber(min, BUDGET_LIMITS.min, BUDGET_LIMITS.max);
  const normalizedMax =
    typePart === "ls"
      ? max
      : clampNumber(max, BUDGET_LIMITS.min, BUDGET_LIMITS.max);

  if (normalizedMin === null || normalizedMax === null || normalizedMax < normalizedMin) {
    return null;
  }

  return {
    type: typePart === "ls" ? "lumpSum" : "perPerson",
    minBudget: normalizedMin,
    maxBudget: normalizedMax,
  };
};

const normalizeDates = (rawValue) => {
  if (!rawValue) {
    return { selectedDates: [], alternateDates: [] };
  }

  const decoded = decodeDatesFromUrl(rawValue);
  const isFuture = (entry) => {
    if (!entry?.date) return false;
    const dateTime = new Date(
      `${entry.date}T${entry.allDay ? "00:00" : entry.startTime || "00:00"}`,
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateTime >= today;
  };

  const selectedDates = (decoded?.selectedDates || []).filter(isFuture);
  const alternateDates = (decoded?.alternateDates || []).filter(isFuture);

  return { selectedDates, alternateDates };
};

const normalizeFood = (rawValue) => {
  if (!rawValue) return { vegOnly: null };
  const normalized = rawValue.toLowerCase();
  if (normalized === "veg") return { vegOnly: true };
  if (normalized === "mixed") return { vegOnly: false };
  return { vegOnly: null };
};

const normalizeAlcohol = (rawValue) => {
  if (rawValue === null || rawValue === undefined) return null;
  return rawValue === "1";
};

const buildDietaryRequirements = (vegOnly, alcoholic) => {
  const requirements = [];
  if (vegOnly === true) requirements.push("vegOnly");
  if (alcoholic === true) requirements.push("alcoholic");
  return requirements;
};

const buildSelectedCities = (locationData) => {
  if (!locationData) return [];
  return [
    {
      name: locationData.name || locationData.address || "",
      city: locationData.name || locationData.address || "",
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      locality: locationData.locality || null,
      subLocality: locationData.subLocality || null,
    },
  ];
};

const cloneBaseForm = () => ({
  ...EMPTY_ENQUIRY_FORM,
  selectedCities: [],
  selectedDates: [],
  alternateDates: [],
  dietaryRequirements: [],
  yourBudget: { ...EMPTY_ENQUIRY_FORM.yourBudget },
});

export const decodeWizardUrl = ({ pathname, search, steps }) => {
  const pathSegments = pathname.split("/").filter(Boolean);
  const [locationSlug, serviceSlug, eventSlug] = pathSegments;

  const locationData = locationSlug ? decodeLocationFromUrl(locationSlug) : null;
  const serviceType = serviceSlug
    ? decodeServiceTypeFromUrl(serviceSlug)
    : null;
  const eventType = eventSlug
    ? decodeEventTypeFromUrl(eventSlug, eventsCatalog)
    : null;

  const params = new URLSearchParams(search);
  const guestRange = normalizeGuestRange(params.get("g"));
  const budget = normalizeBudget(params.get("b"));
  const dates = normalizeDates(params.get("d"));
  const food = normalizeFood(params.get("f"));
  const alcohol = normalizeAlcohol(params.get("a"));

  const formData = cloneBaseForm();

  if (locationData) {
    formData.locations = locationData.name || locationData.address || "";
    formData.latitude = locationData.latitude;
    formData.longitude = locationData.longitude;
    formData.radius = locationData.distance || formData.radius;
    formData.location = {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };
    formData.selectedCities = buildSelectedCities(locationData);
  }

  if (serviceType) {
    formData.serviceType = serviceType;
  }

  if (eventType) {
    formData.selectedEventType = eventType;
  }

  if (guestRange) {
    formData.selectedPeopleRange = guestRange;
  }

  if (budget) {
    formData.minBudgetValue = budget.minBudget;
    formData.maxBudgetValue = budget.maxBudget;
    formData.budgetType = budget.type;
    formData.yourBudget = {
      min: budget.minBudget,
      max: budget.maxBudget,
    };
  }

  formData.selectedDates = dates.selectedDates;
  formData.alternateDates = dates.alternateDates;

  const vegOnly = food.vegOnly;
  const alcoholic = alcohol;
  formData.vegOnly = vegOnly;
  formData.alcoholic = alcoholic;
  formData.dietaryRequirements = buildDietaryRequirements(vegOnly, alcoholic);

  const queryState = {
    guestRange,
    budget,
    dates,
    food,
    alcohol,
  };

  const currentStep = resolveWizardStep({ steps, context: { locationData, serviceType, eventType }, queryState });

  return {
    context: { locationData, serviceType, eventType },
    queryState,
    formData,
    currentStep,
    pathSegments: { location: locationSlug, serviceType: serviceSlug, eventType: eventSlug },
  };
};

const resolveWizardStep = ({ steps = [], context, queryState }) => {
  const completionCheckers = {
    location: () => Boolean(context?.locationData),
    service_type: () => Boolean(context?.serviceType),
    event_type: () => Boolean(context?.eventType),
    gathering_budget: () =>
      Boolean(queryState?.guestRange && queryState?.budget),
    event_date: () =>
      Array.isArray(queryState?.dates?.selectedDates) &&
      queryState.dates.selectedDates.length > 0,
    food_preferences: () =>
      typeof queryState?.food?.vegOnly === "boolean" ||
      typeof queryState?.alcohol === "boolean",
  };

  for (let index = 0; index < steps.length; index += 1) {
    const step = steps[index];
    const checker =
      completionCheckers[step.id] || (() => true);
    if (!checker()) {
      return { id: step.id, index };
    }
  }

  return {
    id: steps[steps.length - 1]?.id ?? null,
    index: Math.max(steps.length - 1, 0),
    isComplete: true,
  };
};

const shouldIncludeStep = (stepId, includeIndex, steps = []) => {
  if (includeIndex === null || includeIndex === undefined) return true;
  const idx = steps.findIndex((step) => step.id === stepId);
  if (idx === -1) return false;
  return idx <= includeIndex;
};

const encodeGuestRange = (range) => {
  if (!range?.minPeople || !range?.maxPeople) return null;
  return `${range.minPeople}-${range.maxPeople}`;
};

const encodeBudget = ({ type, minBudgetValue, maxBudgetValue }) => {
  if (minBudgetValue === null || minBudgetValue === undefined) return null;
  if (maxBudgetValue === null || maxBudgetValue === undefined) return null;
  const prefix = type === "lumpSum" ? "ls" : "pp";
  return `${prefix}:${minBudgetValue}-${maxBudgetValue}`;
};

const encodeDatesParam = (selectedDates = [], alternateDates = []) => {
  const encodeSet = (dates) => {
    if (!Array.isArray(dates) || !dates.length) return "";
    return dates
      .map((entry) => {
        if (!entry?.date) return null;
        if (entry.allDay) {
          return `${new Date(entry.date).toISOString()}~allDay`;
        }
        if (!entry.startTime || !entry.endTime) return null;
        const startIso = new Date(`${entry.date}T${entry.startTime}`).toISOString();
        const endIso = new Date(`${entry.date}T${entry.endTime}`).toISOString();
        return `${startIso}~${endIso}`;
      })
      .filter(Boolean)
      .join(",");
  };

  const preferred = encodeSet(selectedDates);
  const alternate = encodeSet(alternateDates);

  if (!preferred && !alternate) return null;
  return `${preferred}|${alternate}`;
};

const encodeFoodParam = (formData) => {
  const vegOnly =
    typeof formData.vegOnly === "boolean"
      ? formData.vegOnly
      : formData.dietaryRequirements?.includes("vegOnly")
        ? true
        : false;
  return vegOnly ? "veg" : "mixed";
};

export const buildWizardUrl = ({
  formData = EMPTY_ENQUIRY_FORM,
  steps,
  includeStepId,
}) => {
  if (!steps?.length) return "/";

  let includeIndex = steps.length - 1;
  if (includeStepId === null) {
    includeIndex = -1;
  } else if (typeof includeStepId === "string") {
    includeIndex = steps.findIndex((step) => step.id === includeStepId);
  }

  const pathSegments = [];

  if (shouldIncludeStep("location", includeIndex, steps)) {
    const loc = encodeLocationToUrl(formData, formData?.radius);
    if (!loc) {
      return "/";
    }
    pathSegments.push(loc);
  } else {
    return "/";
  }

  if (shouldIncludeStep("service_type", includeIndex, steps)) {
    const svc = encodeServiceTypeToUrl(formData?.serviceType);
    if (!svc) {
      return `/${pathSegments.join("/")}`;
    }
    pathSegments.push(svc);
  }

  if (shouldIncludeStep("event_type", includeIndex, steps)) {
    const evt = encodeEventTypeToUrl(formData?.selectedEventType);
    if (!evt) {
      return `/${pathSegments.join("/")}`;
    }
    pathSegments.push(evt);
  }

  const params = new URLSearchParams();

  if (shouldIncludeStep("gathering_budget", includeIndex, steps)) {
    const guestRange = encodeGuestRange(formData?.selectedPeopleRange);
    const budget = encodeBudget({
      type: formData?.budgetType,
      minBudgetValue: formData?.minBudgetValue,
      maxBudgetValue: formData?.maxBudgetValue,
    });
    if (guestRange) params.set("g", guestRange);
    if (budget) params.set("b", budget);
  }

  if (shouldIncludeStep("event_date", includeIndex, steps)) {
    const dateValue = encodeDatesParam(
      formData?.selectedDates,
      formData?.alternateDates,
    );
    if (dateValue) params.set("d", dateValue);
  }

  if (shouldIncludeStep("food_preferences", includeIndex, steps)) {
    params.set("f", encodeFoodParam(formData || {}));
    if (typeof formData?.alcoholic === "boolean") {
      params.set("a", formData.alcoholic ? "1" : "0");
    }
  }

  const query = params.toString();
  const path = pathSegments.length ? `/${pathSegments.join("/")}` : "/";
  return query ? `${path}?${query}` : path;
};
