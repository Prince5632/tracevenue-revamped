import { useFormStore } from "../hooks/useFormStore";
/**
 * Gets the maximum allowed count for a specific item type in a subcategory
 * @param {string} subcategoryId - The ID of the subcategory
 * @param {string} itemType - The type of item (e.g. "Vegetarian", "Non-Vegetarian")
 * @param {Array} countData - The current count data array from the form store
 * @returns {number} The maximum allowed count for the specified item type
 */
export const getMaximumCount = (subcategoryId, itemType, countData) => {
    // Check if countData exists
    if (!countData || !Array.isArray(countData)) return 0;
    // Iterate through all categories to find the subcategory
    for (const category of countData) {
        // Check all cuisine types in the category

        if (category.subcategoriesByCuisine) {
            for (const cuisine in category.subcategoriesByCuisine) {
                const subcategories = category.subcategoriesByCuisine[cuisine];
                // Find the subcategory with matching ID
                const subcategory = subcategories.find(
                    (sub) => sub.subcategoryId === subcategoryId
                );
                if (subcategory)
                    return subcategory?.items?.filter((item) =>
                        item?.itemTypes?.includes(itemType)
                    )?.length;
            }
        }
    }

    // Return 0 if subcategory or item type maximum not found
    return 0;
};

/**
 * Updates the item count while ensuring it doesn't exceed the maximum allowed count
 * @param {Object} params - The parameters object
 * @param {string} params.categoryId - The ID of the category
 * @param {string} params.subcategoryId - The ID of the subcategory
 * @param {string} params.cuisine - The cuisine type
 * @param {string} params.itemType - The type of item
 * @param {number} params.newCount - The new count value
 */
export function updateItemCount({
    categoryId,
    subcategoryId,
    cuisine,
    itemType,
    newCount,
    showWarningToast = () => {},
}) {
    // Get the current countData from the form store
    const countData = useFormStore.getState().getValue("countData");
    // Get the current countData from the form store
    if (!countData) return;

    // Get the maximum allowed count for this item type in this subcategory
    const maxCount = getMaximumCount(subcategoryId, itemType, countData);
    // Ensure newCount doesn't exceed maxCount
    if (maxCount > 0 && newCount > maxCount) {
        newCount = maxCount;
    }

    // Create a deep copy to avoid direct state mutations
    let updatedCountData = JSON.parse(JSON.stringify(countData));

    // Find the category
    const category = updatedCountData.find(
        (cat) => cat.categoryId === categoryId
    );
    if (!category) return;

    // Find the subcategory by cuisine
    if (
        !category.subcategoriesByCuisine ||
        !category.subcategoriesByCuisine[cuisine]
    ) {
        return;
    }

    const subcategories = category.subcategoriesByCuisine[cuisine];
    const subcategory = subcategories.find(
        (sub) => sub.subcategoryId === subcategoryId
    );
    if (!subcategory || subcategory.disabled) return; // Exclude disabled subcategories

    // Calculate delta (change in count)
    const oldCount = subcategory.count[itemType] || 0;
    const delta = newCount - oldCount;
    // Update count in subcategory
    subcategory.count[itemType] = newCount;
    if (newCount === 0) {
        if (!Array.isArray(subcategory.notNeeded)) {
            subcategory.notNeeded = [itemType];
        } else if (!subcategory.notNeeded.includes(itemType)) {
            subcategory.notNeeded.push(itemType);
        }
    } else if (newCount > 0 && Array.isArray(subcategory.notNeeded)) {
        subcategory.notNeeded = subcategory.notNeeded.filter(
            (i) => i !== itemType
        );
    }

    // Update subcategory total
    subcategory.total = Object.values(subcategory.count).reduce(
        (sum, count) => sum + count,
        0
    );

    // Update category total by recalculating from all subcategories across all cuisines
    let categoryTotal = 0;
    Object.values(category.subcategoriesByCuisine).forEach(
        (subcategoryList) => {
            subcategoryList.forEach((sub) => {
                if (!sub.disabled) categoryTotal += sub.total; // Exclude disabled subcategories
            });
        }
    );

    // Add direct items count if any

    if (category.items && category.items.length > 0) {
        const totalSum = Object.values(category.count).reduce(
            (sum, value) => sum + value,
            0
        );
        categoryTotal += totalSum;
    }

    // Update category total
    category.total = categoryTotal;
    // Update the store with the new countData
    useFormStore.getState().setMultipleIndependentValues({
        countData: updatedCountData,
    });
}
export function updateCategoryItemCount({
    categoryId,
    itemType,
    newCount,
    showWarningToast = () => {},
}) {
    const countData = useFormStore.getState().getValue("countData");
    if (!countData) return;

    // Deep copy to avoid mutation
    let updatedCountData = JSON.parse(JSON.stringify(countData));

    // Find the category
    const category = updatedCountData.find(
        (cat) => cat.categoryId === categoryId
    );
    if (!category) return;

    // Use category.items.length as maxCount (fallback to 0 if not an array)
    const maxCount = Array.isArray(category.items)
        ? category?.items?.filter((item) => item?.itemTypes?.includes(itemType))
              ?.length
        : 0;

    if (maxCount > 0 && newCount > maxCount) {
        newCount = maxCount;
        showWarningToast(
            `Maximum limit of ${maxCount} reached for this item type.`,
            {
                toastId: "max_limit_reached_1",
            }
        );
    }

    // Initialize count if not present
    if (!category.count) {
        category.count = {};
    }

    const oldCount = category.count[itemType] || 0;
    const delta = newCount - oldCount;

    // Update count
    category.count[itemType] = newCount;
    if (newCount === 0) {
        if (!Array.isArray(category.notNeeded)) {
            category.notNeeded = [itemType];
        } else if (!category.notNeeded.includes(itemType)) {
            category.notNeeded.push(itemType);
        }
    } else if (newCount > 0 && Array.isArray(category.notNeeded)) {
        category.notNeeded = category.notNeeded.filter((i) => i !== itemType);
    }
    // Update category total
    category.total = category.total + delta;

    // Check if the sum of all item counts in category.count is 0
    const categoryCountSum = Object.values(category.count).reduce(
        (sum, count) => sum + count,
        0
    );

    // If category count sum is 0, remove items under that category
    // if (categoryCountSum === 0) {
    //   category.items = []; // Remove items under the category
    // }

    // Check if category total is 0; exclude category if it is
    // if (category.total === 0) {
    //   updatedCountData = updatedCountData.filter(
    //     (cat) => cat.categoryId !== categoryId
    //   );
    // }

    useFormStore.getState().setMultipleIndependentValues({
        countData: updatedCountData,
    });
    return delta; // Optionally return count difference
}
export function toggleItemTypeInclusion({
    categoryId,
    subcategoryId = null,
    cuisine = null,
    itemType,
    isIncluded,
}) {
    const store = useFormStore.getState();
    const countData = store.getValue("countData");
    const originalCountData = store.getValue("originalCountData");
    if (!countData || !originalCountData) return;

    // Deep copies to avoid mutation
    let updatedCountData = JSON.parse(JSON.stringify(countData));
    const originalData = JSON.parse(JSON.stringify(originalCountData));

    const category = updatedCountData.find(
        (cat) => cat.categoryId === categoryId
    );
    const originalCategory = originalData.find(
        (cat) => cat.categoryId === categoryId
    );
    if (!category || !originalCategory) return;

    if (subcategoryId && cuisine) {
        // Handle subcategory-level toggle
        const subcategories = category.subcategoriesByCuisine?.[cuisine];
        const originalSubcategories =
            originalCategory.subcategoriesByCuisine?.[cuisine];
        if (!subcategories || !originalSubcategories) return;

        const subcategory = subcategories.find(
            (sub) => sub.subcategoryId === subcategoryId
        );
        const originalSubcategory = originalSubcategories.find(
            (sub) => sub.subcategoryId === subcategoryId
        );
        if (!subcategory || !originalSubcategory || subcategory.disabled)
            return;

        subcategory.notNeeded = subcategory.notNeeded || [];

        if (!isIncluded) {
            // Add to notNeeded and set count to 0
            if (!subcategory.notNeeded.includes(itemType)) {
                subcategory.notNeeded.push(itemType);
            }
            subcategory.count[itemType] = 0;
        } else {
            // Remove from notNeeded and restore original count
            subcategory.notNeeded = subcategory.notNeeded.filter(
                (it) => it !== itemType
            );
            subcategory.count[itemType] =
                originalSubcategory.count[itemType] || 0;
        }

        // Recalculate subcategory total
        subcategory.total = Object.entries(subcategory.count)
            .filter(([type]) => !subcategory.notNeeded.includes(type))
            .reduce((sum, [, value]) => sum + value, 0);

        // Recalculate the parent category total after subcategory update
        let categoryTotal = 0;

        // 1. Add all subcategory totals across cuisines
        Object.values(category.subcategoriesByCuisine || {}).forEach(
            (subcategoryList) => {
                subcategoryList.forEach((sub) => {
                    if (!sub.disabled) {
                        categoryTotal += sub.total || 0;
                    }
                });
            }
        );

        // 2. Add category-level item counts (excluding those in category.notNeeded)
        category.notNeeded = category.notNeeded || [];
        const categoryItemTotal = Object.entries(category.count || {})
            .filter(([type]) => !category.notNeeded.includes(type))
            .reduce((sum, [, count]) => sum + count, 0);

        categoryTotal += categoryItemTotal;
        category.total = categoryTotal;
    } else {
        // Handle category-level toggle
        category.notNeeded = category.notNeeded || [];

        if (!isIncluded) {
            if (!category.notNeeded.includes(itemType)) {
                category.notNeeded.push(itemType);
            }
            category.count[itemType] = 0;
        } else {
            category.notNeeded = category.notNeeded.filter(
                (it) => it !== itemType
            );
            category.count[itemType] = originalCategory.count[itemType] || 0;
        }

        // Recalculate category total (including subcategories)
        let categoryTotal = 0;

        // 1. Add category-level item counts (excluding those in category.notNeeded)
        const categoryItemTotal = Object.entries(category.count || {})
            .filter(([type]) => !category.notNeeded.includes(type))
            .reduce((sum, [, count]) => sum + count, 0);
        categoryTotal += categoryItemTotal;

        // 2. Add all subcategory totals across cuisines
        Object.values(category.subcategoriesByCuisine || {}).forEach(
            (subcategoryList) => {
                subcategoryList.forEach((sub) => {
                    if (!sub.disabled) {
                        categoryTotal += sub.total || 0;
                    }
                });
            }
        );

        category.total = categoryTotal;
    }

    // Update the store
    store.setMultipleIndependentValues({
        countData: updatedCountData,
    });
}

// 2. Merge Menu Data function
export function mergeMenuData(
    newResponse = [],
    existingResponse = [],
    setCountData = () => {}
) {
    if (!existingResponse || existingResponse.length === 0) {
        setCountData(newResponse);
        return;
    }

    // Clone the existing response to avoid direct mutation
    const mergedResponse = JSON.parse(JSON.stringify(existingResponse));

    const mergeCounts = (existingCounts = {}, newCounts = {}) => {
        for (const [key, value] of Object.entries(newCounts)) {
            existingCounts[key] = (existingCounts[key] || 0) + value;
        }
    };

    const mergeItems = (existingItems = [], newItems = []) => {
        for (const newItem of newItems) {
            if (!existingItems.some((item) => item.id === newItem.id)) {
                existingItems.push(newItem);
            }
        }
    };

    const mergeSubcategories = (existingSubcats = [], newSubcats = []) => {
        for (const newSub of newSubcats) {
            const index = existingSubcats.findIndex(
                (sub) => sub.subcategoryId === newSub.subcategoryId
            );

            if (index === -1) {
                // Add new subcategory directly
                existingSubcats.push({
                    ...newSub,
                    count: { ...newSub.count },
                    total: newSub.total || 0,
                    items: [...(newSub.items || [])],
                });
            } else {
                const existingSub = existingSubcats[index];
                mergeCounts(existingSub.count, newSub.count);
                existingSub.total += newSub.total || 0;
                mergeItems(existingSub.items, newSub.items);
            }
        }
    };

    for (const newCategory of newResponse) {
        const index = mergedResponse.findIndex(
            (cat) => cat.categoryId === newCategory.categoryId
        );

        if (index === -1) {
            // Push new category with safety defaults
            mergedResponse.push(newCategory);
        } else {
            // Merge into existing category
            const existingCat = mergedResponse[index];
            mergeCounts(existingCat.count, newCategory.count);
            existingCat.total += newCategory.total || 0;
            mergeItems(existingCat.items, newCategory.items);

            for (const [cuisine, newSubcats] of Object.entries(
                newCategory.subcategoriesByCuisine || {}
            )) {
                if (!existingCat.subcategoriesByCuisine[cuisine]) {
                    existingCat.subcategoriesByCuisine[cuisine] = [
                        ...newSubcats,
                    ];
                } else {
                    mergeSubcategories(
                        existingCat.subcategoriesByCuisine[cuisine],
                        newSubcats
                    );
                }
            }
        }
    }

    setCountData(mergedResponse);
}

// 3. Remove Category function
export function removeCategory(categoryId) {
    // Get the current countData from the form store
    const countData = useFormStore.getState().getValue("countData");
    if (!countData) return;

    // Filter out the category to be removed
    const updatedCountData = countData.filter(
        (category) => category.categoryId !== categoryId
    );

    // Update the store with the filtered data
    useFormStore.getState().setMultipleIndependentValues({
        countData: updatedCountData,
    });
}
