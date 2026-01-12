/**
 * Universal meal sequence order
 * Categories will be sorted according to this order
 */
export const MEAL_SEQUENCE = [
    "Beverages",
    "Welcome Drink",
    "Drinks",
    "Appetizer",
    "Starter",
    "Starter/Snacks",
    "Starters",
    "Soups",
    "Soup",
    "Salad",
    "Salads",
    "Main course",
    "Main Course",
    "Rice & Biryani",
    "Rice",
    "Biryani",
    "Breads",
    "Bread",
    "Raita",
    "Accompaniments",
    "Desserts",
    "Dessert",
    "Sweet",
    "Sweets",
    "Complimentary",
    "Extras",
];

/**
 * Get the sequence index for a category name
 * @param {string} categoryName - Name of the category
 * @returns {number} - Index in meal sequence (9999 if not found)
 */
export const getMealSequenceIndex = (categoryName) => {
    if (!categoryName) return 9999;

    const index = MEAL_SEQUENCE.findIndex(
        (meal) => meal.toLowerCase() === categoryName.toLowerCase()
    );

    // Return high number for categories not in sequence (they'll appear at the end)
    return index === -1 ? 9999 : index;
};

/**
 * Sort categories by universal meal sequence
 * @param {Array} categories - Array of category objects with 'name' property
 * @returns {Array} - Sorted array of categories
 */
export const sortCategoriesByMealSequence = (categories) => {
    if (!Array.isArray(categories)) return [];

    return [...categories].sort((a, b) => {
        const indexA = getMealSequenceIndex(a.categoryName);
        const indexB = getMealSequenceIndex(b.categoryName);
        return indexA - indexB;
    });
};
