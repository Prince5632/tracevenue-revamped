import { STEP_IDS } from "../constants/steps";

export const deepEqual = (a, b) => {
    if (a === b) return true;
    const normalizedA = a ?? null;
    const normalizedB = b ?? null;
    return JSON.stringify(normalizedA) === JSON.stringify(normalizedB);
};

export const CUISINE_VALIDATION_STEPS = new Set([
    STEP_IDS.GATHERING_BUDGET,
    STEP_IDS.FOOD_PREFERENCES,
]);

export const shouldValidateCuisine = (stepId) =>
    stepId ? CUISINE_VALIDATION_STEPS.has(stepId) : false;

export const normalizeDietaryRequirements = (list = []) =>
    Array.isArray(list) ? [...list].sort() : [];

export const toNullableNumber = (value) => {
    if (value === null || value === undefined || value === "") return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
};

export const normalizeDateEntries = (entries = []) =>
    Array.isArray(entries)
        ? entries.map((entry) => ({
            date: entry?.date || "",
            allDay: Boolean(entry?.allDay),
            startTime: entry?.startTime || "",
            endTime: entry?.endTime || "",
        }))
        : [];

export const normalizeEventTypeId = (eventType) => {
    if (!eventType) return null;
    return (
        eventType.id ||
        eventType.value ||
        eventType.eventName ||
        eventType.label ||
        null
    );
};

export const extractStepPayload = (data = {}, stepId) => {
    switch (stepId) {
        case STEP_IDS.LOCATION:
            return {
                locations: data.locations || "",
                latitude: toNullableNumber(data.latitude),
                longitude: toNullableNumber(data.longitude),
                radius: toNullableNumber(data.radius) ?? 20,
            };
        case STEP_IDS.SERVICE_TYPE:
            return {
                serviceType: data.serviceType || null,
            };
        case STEP_IDS.EVENT_TYPE:
            return {
                eventTypeId: normalizeEventTypeId(data.selectedEventType),
                label:
                    data.selectedEventType?.label ||
                    data.selectedEventType?.eventName ||
                    "",
            };
        case STEP_IDS.GATHERING_BUDGET:
            return {
                minPeople: toNullableNumber(data.selectedPeopleRange?.minPeople),
                maxPeople: toNullableNumber(data.selectedPeopleRange?.maxPeople),
                minBudgetValue: toNullableNumber(data.minBudgetValue),
                maxBudgetValue: toNullableNumber(data.maxBudgetValue),
                budgetType: data.budgetType ?? null,
            };
        case STEP_IDS.EVENT_DATE:
            return {
                selectedDates: normalizeDateEntries(data.selectedDates),
                alternateDates: normalizeDateEntries(data.alternateDates),
            };
        case STEP_IDS.FOOD_PREFERENCES:
            return {
                vegOnly:
                    typeof data.vegOnly === "boolean"
                        ? data.vegOnly
                        : data.dietaryRequirements?.includes("vegOnly") || false,
                alcoholic:
                    typeof data.alcoholic === "boolean"
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

export const hasStepChanged = (stepId, currentData, persistedData) => {
    if (!stepId) return false;
    return !deepEqual(
        extractStepPayload(currentData, stepId),
        extractStepPayload(persistedData, stepId),
    );
};
