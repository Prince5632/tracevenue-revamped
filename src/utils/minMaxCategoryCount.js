function getCategoryMinMaxRange(variants) {
    if (!Array.isArray(variants) || variants.length === 0 || !variants[0]) {
        return;
    }

    const categoryTotalsMap = {};

    for (const variant of variants) {
        if (!Array.isArray(variant.availableMenuCount)) continue;

        for (const category of variant.availableMenuCount) {
            const { name, total } = category;
            if (!name || typeof total !== "number") continue;

            if (!categoryTotalsMap[name]) {
                categoryTotalsMap[name] = [];
            }

            categoryTotalsMap[name].push(total);
        }
    }

    const result = {};

    for (const [category, totals] of Object.entries(categoryTotalsMap)) {
        const min = Math.min(...totals);
        const max = Math.max(...totals);
        result[category] = max === min ? min : `${min}-${max}`;
    }

    return result;
}

export default getCategoryMinMaxRange;
