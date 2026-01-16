/**
 * Utility functions for budget calculations and validations
 */

/**
 * Checks if the estimated budget is within an acceptable range of the user's budget
 *
 * @param {Object} userBudget - User's budget with min and max values
 * @param {number} userBudget.min - User's minimum budget
 * @param {number} userBudget.max - User's maximum budget
 * @param {number} estimatedMin - Estimated minimum budget
 * @param {number} estimatedMax - Estimated maximum budget
 * @returns {string} - 'success' for green, 'danger' for red, 'normal' for normal text color
 */
export const checkBudgetRange = (userBudget, estimatedMin, estimatedMax) => {
    // If any required values are missing, return normal (no color highlighting)
    if (
        !userBudget?.max ||
        !userBudget?.min ||
        !estimatedMin ||
        !estimatedMax
    ) {
        return "normal";
    }

    const userMin = Number(userBudget.min);
    const userMax = Number(userBudget.max);
    const estMin = Number(estimatedMin);
    const estMax = Number(estimatedMax);

    // Calculate acceptable ranges
    const extendedUserMin = userMin * 0.8; // 20% below user minimum
    const extendedUserMax = userMax * 1.2; // 20% above user maximum

    // Estimated budget is too low if estimated maximum is less than 80% of user minimum
    if (estMax < extendedUserMin) {
        return "danger"; // Too low - show red
    }

    // Estimated budget is too high if estimated minimum is more than 20% above user maximum
    if (estMin > extendedUserMax) {
        return "danger"; // Too high - show red
    }

    // Check if ranges overlap in an acceptable way
    // 1. Estimated min is within extended user range

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0, // ✅ No decimals
    }).format(value);
}
