import { STEP_IDS } from "../constants/steps";
import { isObjectId } from "./eventMatching";
import { ensureCuisineCombinations } from "@/features/venue/services/enquiryValidationService";

export const isEmptyValue = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    if (Array.isArray(value) && !value.length) return true;
    if (typeof value === "object" && Object.keys(value || {}).length === 0)
        return true;
    return false;
};

export const hasPastDate = (entries = []) => {
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

export const hasInvalidDuration = (entries = []) =>
    entries.some((entry) => {
        if (entry?.allDay) return false;
        if (!entry?.startTime || !entry?.endTime) return false;
        const [sH, sM] = entry.startTime.split(":").map(Number);
        const [eH, eM] = entry.endTime.split(":").map(Number);
        const diff = eH * 60 + eM - (sH * 60 + sM);
        return diff < 60;
    });

export const validateLocationStep = (formData) => {
    if (
        isEmptyValue(formData?.locations) ||
        isEmptyValue(formData?.latitude) ||
        isEmptyValue(formData?.longitude)
    ) {
        return {
            isValid: false,
            message: "Please select your preferred location.",
            issue: STEP_IDS.LOCATION,
        };
    }
    return { isValid: true };
};

export const validateServiceTypeStep = (formData) => {
    if (isEmptyValue(formData?.serviceType)) {
        return {
            isValid: false,
            message: "Please select a service type.",
            issue: STEP_IDS.SERVICE_TYPE,
        };
    }
    return { isValid: true };
};

export const validateEventTypeStep = (formData) => {
    if (isEmptyValue(formData?.selectedEventType)) {
        return {
            isValid: false,
            message: "Please select an event type.",
            issue: STEP_IDS.EVENT_TYPE,
        };
    }
    const eventId = formData?.selectedEventType?.value;
    if (!isObjectId(eventId)) {
        return {
            isValid: false,
            message: "Fetching event details. Please wait a moment and try again.",
            issue: STEP_IDS.EVENT_TYPE,
        };
    }
    return { isValid: true };
};

export const validateGatheringBudgetStep = (formData) => {
    const minPeople = Number(formData?.selectedPeopleRange?.minPeople);
    const maxPeople = Number(formData?.selectedPeopleRange?.maxPeople);
    const minBudget = Number(formData?.minBudgetValue);
    const maxBudget = Number(formData?.maxBudgetValue);

    if (!minPeople) {
        return {
            isValid: false,
            message: "Please select minimum guest count.",
            issue: STEP_IDS.GATHERING_BUDGET,
        };
    }
    if (!maxPeople) {
        return {
            isValid: false,
            message: "Please select maximum guest count.",
            issue: STEP_IDS.GATHERING_BUDGET,
        };
    }
    if (maxPeople < minPeople) {
        return {
            isValid: false,
            message: "Max guests should be greater than min guests.",
            issue: STEP_IDS.GATHERING_BUDGET,
        };
    }
    const isLumpSum = formData?.budgetType === 'lumpSum';
    if (isLumpSum) {
        // Lump sum: only maxBudget (total) is required, minBudget is 0
        if (!maxBudget || isNaN(maxBudget)) {
            return {
                isValid: false,
                message: "Please enter your budget.",
                issue: STEP_IDS.GATHERING_BUDGET,
            };
        }
    } else {
        // Per person: both min and max are required
        if (!minBudget || !maxBudget) {
            return {
                isValid: false,
                message: "Please enter your budget.",
                issue: STEP_IDS.GATHERING_BUDGET,
            };
        }
    }
    if (maxBudget < minBudget) {
        return {
            isValid: false,
            message: "Max budget should be greater than min budget.",
            issue: STEP_IDS.GATHERING_BUDGET,
        };
    }
    return { isValid: true };
};

export const validateEventDateStep = (formData) => {
    if (isEmptyValue(formData?.selectedDates)) {
        return {
            isValid: false,
            message: "Please select at least one preferred date.",
            issue: STEP_IDS.EVENT_DATE,
        };
    }
    if (hasPastDate(formData.selectedDates)) {
        return {
            isValid: false,
            message: "Your preferred date is in the past. Please choose a future date.",
            issue: STEP_IDS.EVENT_DATE,
        };
    }
    if (hasPastDate(formData?.alternateDates || [])) {
        return {
            isValid: false,
            message: "One or more alternate dates are in the past.",
            issue: STEP_IDS.EVENT_DATE,
        };
    }
    if (hasInvalidDuration(formData.selectedDates)) {
        return {
            isValid: false,
            message: "End time must be at least 1 hour after the start time.",
            issue: STEP_IDS.EVENT_DATE,
        };
    }
    return { isValid: true };
};

export const validateFoodPreferencesStep = async (formData) => {
    const result = await ensureCuisineCombinations(formData);
    if (!result?.ok) {
        return {
            isValid: false,
            message:
                result?.message ||
                "No packages are available for your current selection.",
            issue: result?.issueFactor || STEP_IDS.FOOD_PREFERENCES,
        };
    }
    return { isValid: true };
};

export const validateStep = async (stepId, formData) => {
    switch (stepId) {
        case STEP_IDS.LOCATION: {
            const locationCheck = validateLocationStep(formData);
            if (!locationCheck.isValid) return locationCheck;
            return { isValid: true, requiresCuisineGate: true };
        }

        case STEP_IDS.SERVICE_TYPE: {
            const locationCheck = validateLocationStep(formData);
            if (!locationCheck.isValid) return locationCheck;

            const serviceCheck = validateServiceTypeStep(formData);
            if (!serviceCheck.isValid) return serviceCheck;

            return { isValid: true, requiresCuisineGate: true };
        }

        case STEP_IDS.EVENT_TYPE: {
            const locationCheck = validateLocationStep(formData);
            if (!locationCheck.isValid) return locationCheck;

            const serviceCheck = validateServiceTypeStep(formData);
            if (!serviceCheck.isValid) return serviceCheck;

            const eventCheck = validateEventTypeStep(formData);
            if (!eventCheck.isValid) return eventCheck;

            return { isValid: true, requiresCuisineGate: true };
        }

        case STEP_IDS.GATHERING_BUDGET: {
            const locationCheck = validateLocationStep(formData);
            if (!locationCheck.isValid) return locationCheck;

            const serviceCheck = validateServiceTypeStep(formData);
            if (!serviceCheck.isValid) return serviceCheck;

            const eventCheck = validateEventTypeStep(formData);
            if (!eventCheck.isValid) return eventCheck;

            const budgetCheck = validateGatheringBudgetStep(formData);
            if (!budgetCheck.isValid) return budgetCheck;

            return { isValid: true, requiresCuisineGate: true };
        }

        case STEP_IDS.EVENT_DATE: {
            return validateEventDateStep(formData);
        }

        case STEP_IDS.FOOD_PREFERENCES: {
            return await validateFoodPreferencesStep(formData);
        }

        default:
            return { isValid: true };
    }
};
