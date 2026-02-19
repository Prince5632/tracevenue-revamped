import { API } from "@/shared";

// api to fetch cuisine combination using data filled from enquiry steps
export const fetchCuisineCombinations = async (formData) => {
    try {
        // Build structured payload matching the customer-side API format
        const selectedCities = formData?.selectedCities || [];
        const distance = formData?.radius || formData?.distance || null;
        const selectedEventType = formData?.selectedEventType || null;
        const selectedPeopleRange = formData?.selectedPeopleRange || {};
        const dietaryRequirements = formData?.dietaryRequirements || [];
        const serviceType = formData?.serviceType || "";

        const vegOnly = dietaryRequirements.includes("vegOnly");
        const nonAlcoholicOnly = !dietaryRequirements.includes("alcoholic");

        // Budget calculation matching customer-side logic
        const budgetType = formData?.budgetType; // "perPerson" or "lumpSum"
        const isLumpSum = budgetType === "lumpSum";
        const maxPeople = selectedPeopleRange?.maxPeople || 1;

        let minBudget, maxBudget;
        if (isLumpSum) {
            // Lump sum: divide by max people to get per-person rate
            minBudget = ((formData?.minBudgetValue || 0) / maxPeople) * 0.8;
            maxBudget = (formData?.maxBudgetValue || 0) / maxPeople;
        } else {
            // Per person: use raw values divided by max people
            minBudget = (formData?.minBudgetValue || 0) / maxPeople;
            maxBudget = (formData?.maxBudgetValue || 0) / maxPeople;
        }

        const payload = {
            locations: selectedCities.map((c) => c?.name || c?.city || ""),
            radius: distance,
            minPerson: selectedPeopleRange.minPeople,
            maxPerson: selectedPeopleRange.maxPeople,
            minBudget,
            maxBudget,
            latitude: selectedCities[0]?.latitude || formData?.latitude || 0,
            longitude: selectedCities[0]?.longitude || formData?.longitude || 0,
            vegOnly: Boolean(vegOnly),
            eventTypeId: selectedEventType?.value || selectedEventType?.id,
            nonAlcoholicOnly: Boolean(nonAlcoholicOnly),
            serviceType: serviceType,
        };

        const response = await API.post(
            `/analysis/cuisine-analysis`,
            payload
        );
        console.log(response, "responseresponseresponse");
        return response;
    } catch (error) {
        console.error("Error while fetching cuisine combinations", error);
    }
};
