export function formatPriceRange(data) {
    const groupedMap = new Map();

    data.forEach((item) => {
        const { variant, serviceName, variantType, Price, variantOptionId, variantTypeId } = item;
        const key = `${serviceName}_${variant || variantOptionId}__${variantType || variantTypeId}`;
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
        } else if (
            numericPrices.length > 1 &&
            nonNumericPrices.length === 0
        ) {
            priceRange = `${numericPrices[0]}-${numericPrices[numericPrices.length - 1]
                }`;
        } else if (
            numericPrices.length > 0 &&
            nonNumericPrices.length > 0
        ) {
            priceRange = `${numericPrices[0]}-${numericPrices[numericPrices.length - 1]
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