import { isEqual, get, has, isObject } from "lodash";
import API from "../services/API";

export const hasValueChanged = (keyPath, valueToCompare, additionalData) => {
    try {
        if (!additionalData) return false;

        const hasKey =
            get(additionalData, keyPath, "__KEY_NOT_FOUND__") !==
            "__KEY_NOT_FOUND__";

        if (!hasKey) return false;

        const currentValue = get(additionalData, keyPath);
        return !isEqual(currentValue, valueToCompare);
    } catch (error) {
        console.error(`Error in hasValueChanged: ${error.message}`, {
            keyPath,
            additionalData,
        });
        return false;
    }
};

export const getChangedFields = (newValues, oldValues) => {
    try {
        if (!newValues || !oldValues) return {};

        const changedEntries = Object.entries(newValues).filter(
            ([key, value]) => !isEqual(oldValues[key], value)
        );

        return Object.fromEntries(changedEntries);
    } catch (error) {
        console.error(`Error in getChangedFields: ${error.message}`, {
            newValues,
            oldValues,
        });
        return {};
    }
};

export const extractKeywords = (text) => {
    try {
        if (!text || typeof text !== "string") {
            return {
                peopleRange: "",
                maxPeople: null,
                minPeople: null,
                eventType: "",
                cuisines: [],
            };
        }
        const getOffset = (value) => {
            if (value <= 50) return 10;
            if (value <= 150) return 15;
            return 20;
        };
        // Comprehensive regex to extract number ranges
        const rangeRegex = /(\d+)(?:\s*-\s*(\d+)|\s*–\s*(\d+)|\s+to\s+(\d+))?/i;
        const match = text.match(rangeRegex);
        let minPeople = null;
        let maxPeople = null;

        if (match) {
            // console.log("Raw match:", match); // Debug to see what's being captured

            // Check which capture group contains the second number (if any)
            const secondNumber = match[2] || match[3] || match[4];

            if (secondNumber) {
                minPeople = Math.min(
                    parseInt(match[1]),
                    parseInt(secondNumber)
                );
                maxPeople = Math.max(
                    parseInt(match[1]),
                    parseInt(secondNumber)
                );
            } else {
                minPeople = parseInt(match[1]);
                maxPeople = minPeople;
            }
        }
        const offset = getOffset(maxPeople || 0);
        return {
            peopleRange:
                maxPeople !== null
                    ? minPeople === maxPeople
                        ? `${maxPeople} People`
                        : `${minPeople} to ${maxPeople} People`
                    : "",
            maxPeople: maxPeople,
            minPeople:
                !minPeople || minPeople === maxPeople
                    ? Math.ceil(maxPeople * 0.9) || ""
                    : minPeople,

            eventType:
                text.match(
                    /(birthday|wedding|conference|dinner|meeting|kitty|anniversary|corporate)/i
                )?.[1] || "",
            cuisines:
                Array.from(
                    text.matchAll(
                        /(indian|continental|chinese|italian|mexican|japanese)/gi
                    ),
                    (match) => match[1].toLowerCase()
                ) || [],
        };
    } catch (error) {
        console.error(`Error in extractKeywords: ${error.message}`, { text });
        return {
            peopleRange: "",
            maxPeople: null,
            minPeople: null,
            eventType: "",
            cuisines: [],
        };
    }
};

export const areAllKeysPresent = (payload, additionalData) => {
    try {
        if (!payload || !additionalData) return false;

        if (Array.isArray(payload)) {
            const result = payload.every((key) => {
                if (key === undefined || key === null) return false;

                const exists = additionalData.hasOwnProperty(key);
                const value = additionalData[key];
                const isValidValue =
                    value !== null &&
                    value !== undefined &&
                    !(typeof value === "string" && value.trim() === "") &&
                    !(Array.isArray(value) && value.length === 0); // Add this line;

                return exists && isValidValue;
            });

            return result;
        }

        const checkKeys = (source, target, path = "") => {
            if (!isObject(source) || !target) return false;

            return Object.entries(source).every(([key, value]) => {
                const currentPath = path ? `${path}.${key}` : key;

                if (isObject(value) && !Array.isArray(value)) {
                    return checkKeys(value, target, currentPath);
                }

                // Check if the key exists and the value is not null, undefined, or empty string
                const exists = has(target, currentPath);
                const targetValue = get(target, currentPath);
                const isValidValue =
                    targetValue !== null &&
                    targetValue !== undefined &&
                    !(
                        typeof targetValue === "string" &&
                        targetValue.trim() === ""
                    );

                return exists && isValidValue;
            });
        };

        const result = checkKeys(payload, additionalData);

        return result;
    } catch (error) {
        console.error(`Error in areAllKeysPresent: ${error.message}`, {
            payload,
            additionalData,
        });
        return false;
    }
};
const parseEventDateToSortedDates = (eventDateArray) => {
    if (!Array.isArray(eventDateArray)) return [];

    return eventDateArray
        .map((entry) => {
            const [dateKey] = Object.keys(entry || {});
            const timeValue = entry[dateKey];

            if (!dateKey || typeof timeValue !== "string") return null;

            if (timeValue === "All Day") {
                return {
                    date: dateKey,
                    allDay: true,
                    startTime: "",
                    endTime: "",
                };
            } else {
                const [startTime, endTime] = timeValue.split(" - ");
                return {
                    date: dateKey,
                    allDay: false,
                    startTime: startTime?.trim() || "",
                    endTime: endTime?.trim() || "",
                };
            }
        })
        .filter(Boolean);
};
const findVariants = async (variantIds, setIndependentValue = () => {}) => {
    try {
        const response = await API.post(
            `/api/v1/traceVenue/variant-simple/variant-by-ids`,
            { variantIds }
        );
        // console.log(response?.data);
        setIndependentValue("variants", response?.data || []);
    } catch (error) {
        console.error("Error fetching variants:", error);
        setIndependentValue("variants", []);
    }
};
function formatPriceRange(data) {
    const groupedMap = new Map();

    data.forEach((item) => {
        const { variant, serviceName, variantType, Price } = item;
        const key = `${serviceName}_${variant}__${variantType}`;
        const priceValue = Price?.toString().trim();

        if (!groupedMap.has(key)) {
            groupedMap.set(key, {
                ...item,
                prices: new Set([priceValue]),
            });
        } else {
            groupedMap.get(key).prices.add(priceValue);
        }
    });

    const result = Array.from(groupedMap.values()).map((item) => {
        const rawPrices = Array.from(item.prices);

        const numericPrices = rawPrices
            .map((p) => Number(p))
            .filter((n) => !isNaN(n))
            .sort((a, b) => a - b);

        const nonNumericPrices = rawPrices.filter((p) => isNaN(Number(p)));

        let priceRange = "";

        if (numericPrices.length === 1 && nonNumericPrices.length === 0) {
            priceRange = `${numericPrices[0]}`;
        } else if (numericPrices.length > 1 && nonNumericPrices.length === 0) {
            priceRange = `${numericPrices[0]}-${
                numericPrices[numericPrices.length - 1]
            }`;
        } else if (numericPrices.length > 0 && nonNumericPrices.length > 0) {
            priceRange = `${numericPrices[0]}-${
                numericPrices[numericPrices.length - 1]
            }, ${nonNumericPrices.join(", ")}`;
        } else {
            priceRange = nonNumericPrices.join(", ");
        }

        const { prices, Price, ...rest } = item;

        return {
            ...rest,
            Price,
            minPrice: numericPrices[0],
            maxPrice: numericPrices[numericPrices.length - 1],
            priceRange,
        };
    });

    return result;
}
const updateServices = (
    variantIds = [],
    variants = [],
    setIndependentValue = () => {}
) => {
    const populatedVariants = variantIds?.map((variantId) =>
        variants?.find((variant) => variant?._id === variantId)
    );

    let freeServices = populatedVariants?.flatMap(
        (variant) => variant?.freeServices
    );
    freeServices = formatPriceRange(freeServices);
    let paidServices = populatedVariants?.flatMap(
        (variant) => variant?.paidServices
    );
    paidServices = formatPriceRange(paidServices);
    setIndependentValue("allService", [...freeServices, ...paidServices]);
};
export const restoreData = async (
    data,
    setIndependentValue = () => {},
    getValue = () => {}
) => {
    if (!data) return {};
    if (
        data?.cuisineApiData?.matchedResponse &&
        Object.keys(data?.cuisineApiData?.matchedResponse)?.length > 0
    ) {
        const allVariantIds = Array.isArray(
            data?.cuisineApiData?.matchedResponse?.sorted_cuisine_combinations
        )
            ? data?.cuisineApiData?.matchedResponse?.sorted_cuisine_combinations.flatMap(
                  (combination) => {
                      if (!Array.isArray(combination?.matching_variants))
                          return [];
                      return combination.matching_variants
                          .map((variant) => variant?.variant_id)
                          .filter(Boolean); // remove undefined/null
                  }
              )
            : [];
        await findVariants(allVariantIds, setIndependentValue);
    }
    if (
        data?.cuisineApiData?.matchedResponse &&
        Object.keys(data?.cuisineApiData?.matchedResponse)?.length > 0 &&
        data?.cuisineApiData?.selectedCard !== undefined
    ) {
        const selectedCardIds = Array.isArray(
            data?.cuisineApiData?.matchedResponse?.sorted_cuisine_combinations
        )
            ? data?.cuisineApiData?.matchedResponse?.sorted_cuisine_combinations?.[
                  data?.cuisineApiData?.selectedCard
              ]?.matching_variants
                  ?.map((variant) => variant?.variant_id)
                  ?.filter(Boolean) // remove undefined/null
            : [];
        updateServices(
            selectedCardIds,
            getValue("variants") || [],
            setIndependentValue
        );
        // await findVariants(allVariantIds, setIndependentValue);
    }
    const validData = {
        ...(data.peopleRange && {
            selectedPeopleRange: {
                minPeople: data?.peopleRange?.minPeople,
                maxPeople: data?.peopleRange?.maxPeople,
            },
        }),

        ...(data.eventType &&
            typeof data.eventType === "object" && {
                selectedEventType: {
                    label: data.eventType?.eventName,
                    value: data.eventType?._id,
                },
            }),

        ...(Array.isArray(data.cuisines) &&
            data.cuisines.length > 0 && {
                selectedCuisines: data.cuisines.map((cuisine) => ({
                    label: cuisine?.name,
                    value: cuisine?._id,
                })),
            }),

        ...(data.budget && {
            yourBudget: {
                min: data.budget?.min || "",
                max: data.budget?.max || "",
            },
            minBudgetValue:
                data?.budgetType === "perPerson"
                    ? parseInt(
                          data.budget?.min / data.peopleRange?.maxPeople
                      ) || ""
                    : data.budget?.min,
            maxBudgetValue:
                data?.budgetType === "perPerson"
                    ? parseInt(
                          data.budget?.max / data.peopleRange?.maxPeople
                      ) || ""
                    : data.budget?.max,
        }),

        ...(data.serviceType && {
            serviceType: data.serviceType,
        }),

        ...(Array.isArray(data.services) &&
            data.services.length > 0 && {
                services: data?.services || [],
            }),

        ...(Array.isArray(data.menuSections) &&
            data.menuSections.length > 0 && {
                countData: data.menuSections,
                originalCountData: data.menuSections,
                initialCategories: data.menuSections.map(
                    (item) => item?.categoryId
                ),
            }),

        ...(data.selectedCities && {
            selectedCities: data.selectedCities,
            changedCities: data.selectedCities,
        }),

        ...(data.eventDateOptions?.preferredDates?.length > 0 && {
            // eventDate: data.eventDateOptions?.preferredDates,
            formattedSelectedDates: data.eventDateOptions?.preferredDates,
            selectedDates: parseEventDateToSortedDates(
                data.eventDateOptions?.preferredDates
            ),
        }),
        ...(data.eventDateOptions?.alternateDates?.length > 0 && {
            formattedAlternateDates: data.eventDateOptions?.alternateDates,
            alternateDates: parseEventDateToSortedDates(
                data.eventDateOptions?.alternateDates
            ),
        }),
        ...(data.dietaryRequirements?.length > 0 && {
            dietaryRequirements: data.dietaryRequirements,
        }),
        ...(data?.cuisineApiData?.selectedCard !== undefined
            ? {
                  selectedCard: data.cuisineApiData?.selectedCard,
              }
            : {
                  selectedCard: undefined,
              }),
        ...(data?.cuisineApiData?.matchedResponse &&
            Object.keys(data?.cuisineApiData?.matchedResponse)?.length > 0 && {
                matchedResponse: data.cuisineApiData?.matchedResponse,
            }),
        jobTitle: data?.name ?? "",
        searchQuery: data?.name ?? "",
        query: data?.name ?? "",
        distance: data?.radius ?? "",
        changedDistance: data?.radius ?? "",
        status: data?.status ?? "Draft",
        estimatedMinBudget: data.estimatedMinBudget ?? "",
        estimatedMaxBudget: data.estimatedMaxBudget ?? "",
        perPersonBudget: data.isBudgetPerPerson ?? false,
        specialRequirements: data.specialRequirements ?? "",
        jobId: data?._id,
        check: data?.budgetType === "perPerson" ? false : true,
        budgetType: data?.budgetType,
    };

    return validData;
};
export function mergeResponses(responses, options = {}) {
    const {
        cuisineNames = [],
        vegOnly = false,
        nonAlcoholicOnly = false,
    } = options;
    // If cuisineNames is provided, always include "Other"
    const cuisineFilter =
        cuisineNames.length > 0 ? [...cuisineNames, "Other"] : [];

    // Create a map to store merged categories
    const mergedCategoriesMap = new Map();

    // Process each response
    responses.forEach((response) => {
        if (!Array.isArray(response)) return;

        // Process each category in the response
        response.forEach((category) => {
            const categoryId = category.categoryId;

            if (!mergedCategoriesMap.has(categoryId)) {
                // Initialize category if not already in the map
                mergedCategoriesMap.set(categoryId, {
                    categoryId,
                    name: category.name,
                    total: 0,
                    count: {},
                    subcategoriesByCuisine: {},
                    items: [],
                });
            }

            const mergedCategory = mergedCategoriesMap.get(categoryId);

            // Merge count - take maximum count for each item type
            for (const [itemType, count] of Object.entries(
                category.count || {}
            )) {
                // Skip non-vegetarian if vegOnly is true
                if (vegOnly && itemType === "Non-Vegetarian") continue;
                if (nonAlcoholicOnly && itemType === "Alcoholic") continue;
                mergedCategory.count[itemType] = Math.max(
                    mergedCategory.count[itemType] || 0,
                    count || 0
                );
            }

            // Merge direct items
            if (Array.isArray(category.items)) {
                category.items.forEach((item) => {
                    // Skip non-vegetarian items if vegOnly is true
                    if (
                        vegOnly &&
                        item.itemTypes &&
                        item.itemTypes.includes("Non-Vegetarian")
                    )
                        return;
                    if (
                        nonAlcoholicOnly &&
                        item.itemTypes &&
                        item.itemTypes.includes("Alcoholic")
                    )
                        return;
                    // Check if item already exists in merged items
                    const existingItemIndex = mergedCategory.items.findIndex(
                        (existingItem) => existingItem.id === item.id
                    );

                    if (existingItemIndex === -1) {
                        mergedCategory.items.push(item);
                    }
                });
            }

            // Process subcategories by cuisine
            for (const [cuisineName, subcategories] of Object.entries(
                category.subcategoriesByCuisine || {}
            )) {
                // Skip if cuisineFilter is defined and this cuisine is not in the filter
                // Notice that "Other" is explicitly included in cuisineFilter above
                if (
                    cuisineFilter.length > 0 &&
                    !cuisineFilter.includes(cuisineName)
                ) {
                    continue;
                }

                if (!mergedCategory.subcategoriesByCuisine[cuisineName]) {
                    mergedCategory.subcategoriesByCuisine[cuisineName] = [];
                }

                // Process each subcategory
                subcategories.forEach((subcategory) => {
                    const subcategoryId = subcategory.subcategoryId;

                    // Find existing subcategory or create new one
                    let mergedSubcategory =
                        mergedCategory.subcategoriesByCuisine[cuisineName].find(
                            (sub) => sub.subcategoryId === subcategoryId
                        );

                    if (!mergedSubcategory) {
                        mergedSubcategory = {
                            subcategoryId,
                            name: subcategory.name,
                            total: 0,
                            count: {},
                            items: [],
                        };
                        mergedCategory.subcategoriesByCuisine[cuisineName].push(
                            mergedSubcategory
                        );
                    }

                    // Merge count - take maximum count for each item type
                    for (const [itemType, count] of Object.entries(
                        subcategory.count || {}
                    )) {
                        // Skip non-vegetarian if vegOnly is true
                        if (vegOnly && itemType === "Non-Vegetarian") continue;
                        if (nonAlcoholicOnly && itemType === "Alcoholic")
                            continue;

                        mergedSubcategory.count[itemType] = Math.max(
                            mergedSubcategory.count[itemType] || 0,
                            count || 0
                        );
                    }

                    // Merge items
                    if (Array.isArray(subcategory.items)) {
                        subcategory.items.forEach((item) => {
                            // Skip non-vegetarian items if vegOnly is true
                            if (
                                vegOnly &&
                                item.itemTypes &&
                                item.itemTypes.includes("Non-Vegetarian")
                            )
                                return;
                            if (
                                nonAlcoholicOnly &&
                                item.itemTypes &&
                                item.itemTypes.includes("Alcoholic")
                            )
                                return;
                            // Check if item already exists in merged items
                            const existingItemIndex =
                                mergedSubcategory.items.findIndex(
                                    (existingItem) =>
                                        existingItem.id === item.id
                                );

                            if (existingItemIndex === -1) {
                                mergedSubcategory.items.push(item);
                            }
                        });
                    }
                });
            }
        });
    });

    // Calculate totals for each category and subcategory
    for (const category of mergedCategoriesMap.values()) {
        // Step 1: Filter subcategories before calculating
        const filteredSubcategoriesByCuisine = Object.fromEntries(
            Object.entries(category.subcategoriesByCuisine || {})
                .map(([cuisine, subcategories]) => {
                    const filtered = subcategories.filter((subcat) => {
                        // Calculate total from subcategory.count
                        subcat.total = Object.values(subcat.count || {}).reduce(
                            (sum, val) => sum + val,
                            0
                        );
                        return subcat.total > 0;
                    });
                    return [cuisine, filtered];
                })
                .filter(([, subcategories]) => subcategories.length > 0)
        );

        // Replace with filtered version
        category.subcategoriesByCuisine = filteredSubcategoriesByCuisine;

        // Step 2: Sum subcategory totals
        const subcategoriesTotal = Object.values(filteredSubcategoriesByCuisine)
            .flat()
            .reduce((sum, subcat) => sum + subcat.total, 0);

        // Step 3: Sum direct item count from category.count
        const directCountTotal = Object.entries(category.count || {}).reduce(
            (sum, [itemType, val]) => {
                // Skip non-veg if vegOnly was used earlier
                if (vegOnly && itemType === "Non-Vegetarian") return sum;
                if (nonAlcoholicOnly && itemType === "Alcoholic") return sum;
                return sum + val;
            },
            0
        );

        // Step 4: Final category total
        category.total = directCountTotal + subcategoriesTotal;
    }

    // Filter out categories with no items and no subcategories
    const result = Array.from(mergedCategoriesMap.values()).filter(
        (category) => {
            // Step 1: Filter out subcategories with total === 0
            const filteredSubcategoriesByCuisine = Object.fromEntries(
                Object.entries(category.subcategoriesByCuisine)
                    .map(([cuisine, subcategories]) => {
                        const filtered = subcategories.filter(
                            (subcat) => subcat.total > 0
                        );
                        return [cuisine, filtered];
                    })
                    .filter(([, filtered]) => filtered.length > 0) // Remove cuisines with no valid subcategories
            );

            // Step 2: Update category with filtered subcategories
            category.subcategoriesByCuisine = filteredSubcategoriesByCuisine;

            // Step 3: Final filter logic
            const hasSubcategories =
                Object.keys(filteredSubcategoriesByCuisine).length > 0;
            const hasDirectItems = category.items.length > 0;
            return category.total > 0 || hasSubcategories || hasDirectItems;
        }
    );

    return result;
}
