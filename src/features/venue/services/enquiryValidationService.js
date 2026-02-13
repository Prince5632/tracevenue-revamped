import { API } from "@/shared";

const getSelectedCities = (formData = {}) => {
  if (Array.isArray(formData.selectedCities) && formData.selectedCities.length) {
    return formData.selectedCities;
  }

  if (formData.locations && formData.latitude && formData.longitude) {
    return [
      {
        name: formData.locations,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      },
    ];
  }

  return [];
};

const buildBaseLocationPayload = (formData = {}) => {
  const cities = getSelectedCities(formData);
  const primary = cities[0] || {};

  return {
    locations: cities
      .map((city) => city?.name || city?.city)
      .filter(Boolean),
    radius: Number(formData.radius) || 20,
    latitude:
      Number(primary.latitude ?? formData.latitude ?? 0) || 0,
    longitude:
      Number(primary.longitude ?? formData.longitude ?? 0) || 0,
  };
};

const getEventTypeId = (formData = {}) =>
  formData?.selectedEventType?.value ||
  formData?.selectedEventType?.id ||
  formData?.selectedEventType?._id ||
  null;

const getPeopleRange = (formData = {}) => ({
  min: Number(formData?.selectedPeopleRange?.minPeople) || null,
  max: Number(formData?.selectedPeopleRange?.maxPeople) || null,
});

const getBudgetMode = (formData = {}) =>
  formData?.budgetType === "perPerson" ? "perPerson" : "lumpSum";

const computeBudgetPayload = (formData = {}) => {
  const { max: maxPeople } = getPeopleRange(formData);
  const safePeople = maxPeople && maxPeople > 0 ? maxPeople : 1;
  const minBudgetValue = Number(formData?.minBudgetValue) || 0;
  const maxBudgetValue =
    Number(formData?.maxBudgetValue ?? formData?.minBudgetValue) || 0;
  const mode = getBudgetMode(formData);

  if (mode === "lumpSum") {
    const perPersonMax = maxBudgetValue / safePeople;
    return {
      minBudget: perPersonMax * 0.8,
      maxBudget: perPersonMax,
    };
  }

  return {
    minBudget: minBudgetValue,
    maxBudget: maxBudgetValue,
  };
};

const buildDietaryPreferences = (formData = {}) => {
  const dietary = Array.isArray(formData.dietaryRequirements)
    ? formData.dietaryRequirements
    : [];
  const vegOnly =
    formData.vegOnly ?? dietary.includes("vegOnly") ?? false;
  const alcoholic =
    formData.alcoholic ?? dietary.includes("alcoholic") ?? false;

  return {
    vegOnly: Boolean(vegOnly),
    nonAlcoholicOnly: !alcoholic,
  };
};

const stepKeyMap = {
  location: "location",
  service_type: "service_type",
  event_type: "event_type",
  gathering_budget: "gathering_budget",
};

const buildPayloadForStep = (stepId, formData = {}) => {
  const base = buildBaseLocationPayload(formData);
  if (!base.locations.length) {
    return { ok: false, reason: "location" };
  }

  const serviceType = formData?.serviceType;
  const eventTypeId = getEventTypeId(formData);
  const { min: minPerson, max: maxPerson } = getPeopleRange(formData);
  const { minBudget, maxBudget } = computeBudgetPayload(formData);
  const dietary = buildDietaryPreferences(formData);

  switch (stepKeyMap[stepId]) {
    case "location":
      return {
        ok: true,
        payload: base,
      };
    case "service_type":
      if (!serviceType) {
        return { ok: false, reason: "service_type" };
      }
      return {
        ok: true,
        payload: {
          ...base,
          serviceType,
        },
      };
    case "event_type":
      if (!serviceType || !eventTypeId) {
        return { ok: false, reason: "event_type" };
      }
      return {
        ok: true,
        payload: {
          ...base,
          serviceType,
          eventTypeId,
        },
      };
    case "gathering_budget":
      if (!serviceType || !eventTypeId || !minPerson || !maxPerson) {
        return { ok: false, reason: "gathering_budget" };
      }
      return {
        ok: true,
        payload: {
          ...base,
          serviceType,
          eventTypeId,
          minPerson,
          maxPerson,
          minBudget,
          maxBudget,
          ...dietary,
        },
      };
    default:
      return { ok: true, payload: null };
  }
};

const normalizeErrorMessage = (result = {}) => {
  if (!result) return null;
  const fallback =
    result.message ||
    result.error ||
    "Please adjust your selection and try again.";
  const solution =
    result.suggestions?.solution ||
    result.suggestions?.message ||
    null;
  return solution || fallback;
};

export const validateWithCuisineApi = async (stepId, formData = {}) => {
  const { ok, reason, payload } = buildPayloadForStep(stepId, formData);
  if (!ok) {
    return {
      ok: false,
      issueFactor: reason || stepId,
      message: "Please complete the current step before continuing.",
    };
  }

  if (!payload) {
    return { ok: true };
  }

  try {
    const { data } = await API.post("/analysis/cuisine-analysis", payload);
    if (data?.validation_passed === false) {
      return {
        ok: false,
        issueFactor: data?.current_step || stepId,
        message: normalizeErrorMessage(data),
        suggestions: data?.suggestions,
        raw: data,
      };
    }

    return {
      ok: true,
      raw: data,
    };
  } catch (error) {
    console.error("Cuisine validation failed", error);
    return {
      ok: false,
      issueFactor: stepId,
      message: "Something went wrong. Please try again.",
      error,
    };
  }
};

export const ensureCuisineCombinations = async (formData = {}) => {
  const base = buildPayloadForStep("gathering_budget", formData);
  if (!base.ok) {
    return {
      ok: false,
      issueFactor: base.reason || "food_preferences",
      message: "Please review your selections before continuing.",
    };
  }

  const dietary = buildDietaryPreferences(formData);
  const eventTypeId = getEventTypeId(formData);
  const serviceType = formData?.serviceType;
  const { min: minPerson, max: maxPerson } = getPeopleRange(formData);
  const { minBudget, maxBudget } = computeBudgetPayload(formData);

  const selectedDates =
    Array.isArray(formData.selectedDates) ? formData.selectedDates : [];

  const payload = {
    ...base.payload,
    ...dietary,
    minPerson,
    maxPerson,
    minBudget,
    maxBudget,
    eventTypeId,
    serviceType,
    selectedDates,
  };

  try {
    const { data } = await API.post("/analysis/cuisine-analysis", payload);
    if (!data?.data && data?.validation_passed === false) {
      return {
        ok: false,
        issueFactor: data?.current_step || "food_preferences",
        message: normalizeErrorMessage(data),
        suggestions: data?.suggestions,
      };
    }
    return { ok: true, raw: data };
  } catch (error) {
    console.error("Cuisine combination check failed", error);
    return {
      ok: false,
      issueFactor: "food_preferences",
      message: "Unable to fetch suggestions at this time.",
    };
  }
};
