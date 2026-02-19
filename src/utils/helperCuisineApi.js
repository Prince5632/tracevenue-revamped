import { isEqual } from "lodash";
import API from "../services/API";
import axios from "axios";

// Helper function to fetch cuisines if not available
const fetchCuisines = async (setIndependentValue) => {
    try {
        const response = await API.get("/api/v1/traceVenue/cuisines");
        // Format cuisine options
        const cuisineOption = response?.data?.data?.map((cuisine) => ({
            label: cuisine?.name,
            value: cuisine?._id,
        }));
        setIndependentValue("cuisineOptions", cuisineOption);
        return cuisineOption;
    } catch (err) {
        console.error("Error fetching cuisines:", err.message);
        // TODO: Add better error handling - show toast or error message
        return [];
    }
};

// Helper function to call cuisine analysis API with all dependencies
export const fetchCuisineAnalysis = async ({
    // Form store getter function
    getValue,
    // State setters
    setIndependentValue,
    // External dependencies
    // Optional loading state setter
    setLoading = null,
}) => {
    try {
        // Set loading state if provided
        if (setLoading) setLoading(true);

        // Get cuisine options or fetch them if not available
        let cuisineOptions = getValue("cuisineOptions") || [];
        if (!cuisineOptions.length) {
            console.log("Cuisine options not found, fetching...");
            cuisineOptions = await fetchCuisines(setIndependentValue);
        }

        // Fetch all required dependencies from the form store
        const selectedCities = getValue("selectedCities") || [];
        const distance = getValue("distance") || null;
        const selectedEventType = getValue("selectedEventType") || null;
        const selectedPeopleRange = getValue("selectedPeopleRange") || {};
        const dietaryRequirements = getValue("dietaryRequirements") || [];
        const yourBudget = getValue("yourBudget") || { min: null, max: null };
        const budgetCheck = getValue("check") ?? false;
        const oldMatchedResponse = getValue("matchedResponse") || [];
        const serviceType = getValue("serviceType") || "";

        // Derived values
        const vegOnly = dietaryRequirements?.includes("vegOnly") ? true : false;
        const nonAlcoholicOnly = dietaryRequirements?.includes("alcoholic")
            ? false
            : true;
        const budgetTypeCheck = budgetCheck ? "lumpSum" : "perPerson";

        // Validation - ensure required fields are present
        if (
            !selectedCities?.length ||
            !selectedEventType?.value ||
            !selectedPeopleRange?.maxPeople
        ) {
            throw new Error("Missing required fields for cuisine analysis");
        }

        // Make the API call
        setIndependentValue("cuisineLoading", true);
        const response = await API.post(`/analysis/cuisine-analysis`, {
            locations: selectedCities.map((c) => c?.name),
            radius: distance,
            minPerson: selectedPeopleRange.minPeople,
            maxPerson: selectedPeopleRange.maxPeople,
            minBudget:
                budgetTypeCheck === "lumpSum"
                    ? (yourBudget.max / selectedPeopleRange.maxPeople) * 0.8
                    : yourBudget.min / selectedPeopleRange.maxPeople,
            maxBudget:
                budgetTypeCheck === "lumpSum"
                    ? yourBudget.max / selectedPeopleRange.maxPeople
                    : yourBudget.max / selectedPeopleRange.maxPeople,
            latitude: selectedCities[0]?.latitude || 0,
            longitude: selectedCities[0]?.longitude || 0,
            vegOnly: Boolean(vegOnly),
            eventTypeId: selectedEventType.value,
            nonAlcoholicOnly: Boolean(nonAlcoholicOnly),
            serviceType: serviceType,
        });

        if (response?.data?.data) {
            setIndependentValue("cuisineLoading", false);
        }
        // Process the response
        const enrichedData = enrichCuisineCombination(
            response?.data?.data,
            cuisineOptions
        );

        // Extract variant IDs for fetching variants
        const allVariantIds = Array.isArray(
            enrichedData?.sorted_cuisine_combinations
        )
            ? enrichedData.sorted_cuisine_combinations.flatMap(
                (combination) => {
                    if (!Array.isArray(combination?.matching_variants))
                        return [];
                    return combination.matching_variants
                        .map((variant) => variant?.variant_id)
                        .filter(Boolean); // remove undefined/null
                }
            )
            : [];

        // Fetch variants if IDs exist
        // if (allVariantIds.length > 0) {
        //     await findVariants(allVariantIds, setIndependentValue);
        // }

        // Reset selected card and cuisines if response changed
        if (!isEqual(oldMatchedResponse, enrichedData)) {
            setIndependentValue("selectedCard", "");
            setIndependentValue("selectedCuisines", []);
            setIndependentValue("countData", []);
        }

        // Update the matched response
        setIndependentValue("matchedResponse", enrichedData || []);

        return {
            success: true,
            data: enrichedData,
            cuisineData: enrichedData?.sorted_cuisine_combinations,
            variantIds: allVariantIds,
        };
    } catch (error) {
        console.error("Error in fetchCuisineAnalysis:", error);
        return {
            success: false,
            error: error.message || "Failed to fetch cuisine analysis",
            data: null,
        };
    } finally {
        // Reset loading state if provided
        if (setLoading) setLoading(false);
    }
};

// Helper function to enrich cuisine combination (extracted from your original code)
function enrichCuisineCombination(combination = {}, cuisineOptions = []) {
    const idToLabelMap = cuisineOptions.reduce((map, option) => {
        map[option.value] = option.label;
        return map;
    }, {});

    combination?.sorted_cuisine_combinations?.forEach((cuisineCombination) => {
        const enrichedCombination =
            cuisineCombination?.cuisine_combination?.map((cuisineId) => ({
                value: cuisineId,
                label: idToLabelMap[cuisineId] || "Unknown",
            }));
        cuisineCombination.cuisine_combination = enrichedCombination;
    });

    return {
        ...combination,
    };
}

// Helper function to find variants (extracted from your original code)
const findVariants = async (variantIds, setIndependentValue) => {
    try {
        const response = await API.post(
            `/api/v1/traceVenue/variant-simple/variant-by-ids`,
            { variantIds }
        );
        setIndependentValue("variants", response?.data || []);
    } catch (error) {
        console.error("Error fetching variants:", error);
        setIndependentValue("variants", []);
    }
};
export const fetchCuisineAnalysisForSuggestions = async ({
    step = 2,
    getValue,
    setIndependentValue,
    setLoading = null,
}) => {
    try {
        // Fetch all required dependencies from the form store
        const selectedCities = getValue("selectedCities") || [];
        const distance = getValue("distance") || null;
        const selectedEventType = getValue("selectedEventType") || null;
        const selectedPeopleRange = getValue("selectedPeopleRange") || {};
        const dietaryRequirements = getValue("dietaryRequirements") || [];
        const yourBudget = getValue("yourBudget") || { min: null, max: null };
        const budgetCheck = getValue("check") ?? false;
        const oldMatchedResponse = getValue("matchedResponse") || [];
        const serviceType = getValue("serviceType") || "venue";
        // Derived values
        const vegOnly = dietaryRequirements?.includes("vegOnly") ? true : false;
        const nonAlcoholicOnly = dietaryRequirements?.includes("alcoholic")
            ? false
            : true;
        const budgetTypeCheck = budgetCheck ? "lumpSum" : "perPerson";

        let apiPayload = {};
        if (step === 2) {
            apiPayload = {
                locations: selectedCities.map((c) => c?.name),
                radius: distance,
                minPerson: 2,
                maxPerson: 2,
                minBudget: 100,
                maxBudget: 100,
                latitude: selectedCities[0]?.latitude || 0,
                longitude: selectedCities[0]?.longitude || 0,
                eventTypeId: "6818bbf62ff852545681980a",
                serviceType: serviceType,
            };
        } else if (step === 3) {
            apiPayload = {
                locations: selectedCities.map((c) => c?.name),
                radius: distance,
                minPerson: 2,
                maxPerson: 2,
                minBudget: 100,
                maxBudget: 100,
                latitude: selectedCities[0]?.latitude || 0,
                longitude: selectedCities[0]?.longitude || 0,
                eventTypeId: selectedEventType.value,
                serviceType: serviceType,
            };
        } else if (step === 4) {
            apiPayload = {
                locations: selectedCities.map((c) => c?.name),
                radius: distance,
                minPerson: selectedPeopleRange.minPeople,
                maxPerson: selectedPeopleRange.maxPeople,
                minBudget:
                    budgetTypeCheck === "lumpSum"
                        ? (yourBudget.max / selectedPeopleRange.maxPeople) * 0.8
                        : yourBudget.min / selectedPeopleRange.maxPeople,
                maxBudget:
                    budgetTypeCheck === "lumpSum"
                        ? yourBudget.max / selectedPeopleRange.maxPeople
                        : yourBudget.max / selectedPeopleRange.maxPeople,
                latitude: selectedCities[0]?.latitude || 0,
                longitude: selectedCities[0]?.longitude || 0,
                // vegOnly: Boolean(vegOnly),
                eventTypeId: selectedEventType.value,
                // nonAlcoholicOnly: Boolean(nonAlcoholicOnly),
                serviceType: serviceType,
            };
        } else {
        }
        // Set loading state if provided
        if (setLoading) setLoading(true);
        setIndependentValue("cuisineLoading", true);
        // Make the API call
        const response = await API.post(
            `/analysis/cuisine-analysis`,
            apiPayload
        );

        if (response?.data) {
            setIndependentValue("cuisineLoading", false);
        }
        return response?.data;
    } catch (error) {
        console.error("Error in fetchCuisineAnalysis:", error);
        return {
            success: false,
            error: error.message || "Failed to fetch cuisine analysis",
            data: null,
        };
    } finally {
        // Reset loading state if provided
        if (setLoading) setLoading(false);
    }
};

export const fetchSelectedCuisineComboDetails = async (
    variantIds
) => {
    try {
        const response = await API.post(`/analysis/selected-combination-data`, {
            variant_ids: variantIds,
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching cuisine combinations:", error);
    }
};
