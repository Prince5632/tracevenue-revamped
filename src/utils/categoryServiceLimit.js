/**
 * Calculates the total selection limits for a category
 * Returns an object with min and max totals from all offerings (direct + subcategories)
 *
 * @param {Object} categoryData - Category object with offerings and subcategories
 * @returns {Object} { min: number, max: number, hasServiceLimited: boolean }
 */
export const calculateCategorySelectionLimits = (categoryData) => {
    if (!categoryData) {
        return { min: 0, max: 0, hasServiceLimited: false };
    }

    let totalMin = 0;
    let totalMax = 0;
    let hasServiceLimited = false;
    const offerings = categoryData.offerings || categoryData.directOfferings;
    // Calculate from direct offerings
    if (offerings && offerings.length > 0) {
        offerings.forEach((offering) => {
            if (offering.selectionLimit?.min) {
                totalMin += offering.selectionLimit.min || 0;
                totalMax += offering.selectionLimit.max || 0;
            } else {
                totalMin += offering.selectionLimit || 0;
                totalMax += offering.selectionLimit || 0;
            }
            if (offering.serviceLimited) {
                hasServiceLimited = true;
            }
        });
    }

    // Calculate from subcategory offerings
    if (categoryData.subcategories && categoryData.subcategories.length > 0) {
        categoryData.subcategories.forEach((subcategory) => {
            if (subcategory.offerings && subcategory.offerings.length > 0) {
                subcategory.offerings.forEach((offering) => {
                    if (offering.selectionLimit?.min) {
                        totalMin += offering.selectionLimit.min || 0;
                        totalMax += offering.selectionLimit.max || 0;
                    } else {
                        totalMin += offering.selectionLimit || 0;
                        totalMax += offering.selectionLimit || 0;
                    }
                    if (offering.serviceLimited) {
                        hasServiceLimited = true;
                    }
                });
            }
        });
    }

    return {
        min: totalMin,
        max: totalMax,
        hasServiceLimited: hasServiceLimited,
        displayText:
            totalMin === totalMax
                ? `Total: ${totalMin} item(s)`
                : `Total: ${totalMin} to ${totalMax} item(s)`,
    };
};
