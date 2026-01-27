function compareItemTypes(
    askedCount,
    givenCount,
    askedItems = [],
    givenItems = []
) {
    const comparison = {};
    const allItemTypes = new Set([
        ...Object.keys(askedCount || {}),
        ...Object.keys(givenCount || {}),
    ]);

    allItemTypes.forEach((itemType) => {
        const asked = askedCount?.[itemType] || 0;
        const given = givenCount?.[itemType] || 0;

        const askedItemsForType = askedItems.filter((item) =>
            item.itemTypes?.includes(itemType)
        );
        const givenItemsForType = givenItems.filter((item) =>
            item.itemTypes?.includes(itemType)
        );

        comparison[itemType] = {
            asked: {
                count: asked,
                items: askedItemsForType.map((item) =>
                    structuredCloneSafe({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        itemTypes: item.itemTypes,
                    })
                ),
            },
            given: {
                count: givenItemsForType.length,
                items: givenItemsForType.map((item) =>
                    structuredCloneSafe({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        itemTypes: item.itemTypes,
                    })
                ),
            },
            flag: givenItemsForType.length >= asked,
        };
    });

    return comparison;
}

// helper: service se Variant & VariantType
const addVariantFields = (service = {}) => {
    const { options = [], variantOptionId, variantTypeId } = service;

    let Variant = null;
    let VariantType = null;

    // ✅ FIX 1: Pehle check karo agar already Variant/VariantType fields exist karte hain
    if (service.Variant && service.VariantType) {
        // Already populated format (second variant case)
        return {
            ...service,
            Variant: service.Variant,
            VariantType: service.VariantType,
        };
    }

    // ✅ FIX 2: Otherwise, options array se extract karo (main variant case)
    // option find by variantOptionId
    const option = options.find((opt) => opt._id === variantOptionId);
    if (option) {
        Variant = option.name; // e.g. "Live Food Stalls"

        // type find by variantTypeId
        const type = (option.types || []).find((t) => t._id === variantTypeId);
        if (type) {
            VariantType = type.value; // e.g. "Chaat Counter"
        }
    }

    return {
        ...service,
        Variant,
        VariantType,
    };
};

function compareServices(mainServices, compareServices) {
    const compareServiceMap = new Map();
    const mainServiceMap = new Map();

    (mainServices || [])
        .map(addVariantFields) // pehle Variant & VariantType add karo
        .forEach((service) => {
            if (
                service?.Variant &&
                service?.VariantType &&
                service?.serviceName
            ) {
                const key = `${service.serviceName}-${service.Variant}-${service.VariantType}`;
                mainServiceMap.set(key, service);
            }
        });

    (compareServices || [])
        .map(addVariantFields) // yahi helper yahan bhi use karo
        .forEach((service) => {
            if (
                service?.Variant &&
                service?.VariantType &&
                service?.serviceName
            ) {
                const key = `${service.serviceName}-${service.Variant}-${service.VariantType}`;
                compareServiceMap.set(key, service);
            }
        });

    const allServiceKeys = new Set([
        ...mainServiceMap.keys(),
        ...compareServiceMap.keys(),
    ]);

    const groupedServices = {};

    allServiceKeys.forEach((key) => {
        const mainService = mainServiceMap.get(key);
        const compareService = compareServiceMap.get(key);
        const service = mainService || compareService;

        if (!service?.Variant || !service?.serviceName) return;

        const serviceKey = service.serviceName;

        if (!groupedServices[serviceKey]) {
            groupedServices[serviceKey] = {
                serviceName: service.serviceName,
                variants: [],
                flag: false,
            };
        }

        const variantObj = {
            variant: service.Variant,
            variantType: service.VariantType,
            asked: mainService?.price || null,
            given: compareService?.price || null,
            flag: !!compareService,
        };

        const existingVariant = groupedServices[serviceKey].variants.find(
            (v) =>
                v.variant === variantObj.variant &&
                v.variantType === variantObj.variantType
        );

        if (!existingVariant) {
            groupedServices[serviceKey].variants.push(variantObj);
        } else {
            if (variantObj.asked !== null)
                existingVariant.asked = variantObj.asked;
            if (variantObj.given !== null)
                existingVariant.given = variantObj.given;
            if (variantObj.flag) existingVariant.flag = variantObj.flag;
        }

        if (compareService) {
            groupedServices[serviceKey].flag = true;
        }
    });

    const result = {};
    Object.keys(groupedServices).forEach((serviceKey) => {
        const service = groupedServices[serviceKey];

        const variantGroups = {};
        service.variants.forEach((variant) => {
            if (!variantGroups[variant.variant]) {
                variantGroups[variant.variant] = {
                    variant: variant.variant,
                    variantTypes: [],
                    askedPrices: [],
                    givenPrices: [],
                    flag: variant.flag,
                };
            }
            variantGroups[variant.variant].variantTypes.push(
                variant.variantType
            );

            if (variant.asked !== null) {
                variantGroups[variant.variant].askedPrices.push(variant.asked);
            }
            if (variant.given !== null) {
                variantGroups[variant.variant].givenPrices.push(variant.given);
            }
            if (variant.flag) {
                variantGroups[variant.variant].flag = true;
            }
        });

        Object.keys(variantGroups).forEach((variantName) => {
            const variantGroup = variantGroups[variantName];
            const resultKey = `${serviceKey}_${variantName}`;

            let finalAskedPrice = null;
            let finalGivenPrice = null;

            if (variantGroup.askedPrices.length > 0) {
                finalAskedPrice = variantGroup.askedPrices[0];
            }
            if (variantGroup.givenPrices.length > 0) {
                finalGivenPrice = variantGroup.givenPrices[0];
            }

            result[resultKey] = {
                variant: variantGroup.variant,
                variantType: variantGroup.variantTypes.join(", "),
                serviceName: service.serviceName,
                variantTypes: variantGroup.variantTypes,
                asked: finalAskedPrice,
                given: finalGivenPrice,
                flag: variantGroup.flag,
                allAskedPrices: variantGroup.askedPrices,
                allGivenPrices: variantGroup.givenPrices,
            };
        });
    });

    return result;
}

function structuredCloneSafe(obj) {
    try {
        return typeof structuredClone === "function"
            ? structuredClone(obj)
            : JSON.parse(JSON.stringify(obj));
    } catch (e) {
        if (obj === null || typeof obj !== "object") return obj;
        if (Array.isArray(obj)) return obj.map(structuredCloneSafe);
        const clone = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clone[key] = structuredCloneSafe(obj[key]);
            }
        }
        return clone;
    }
}

// Helper function to calculate count object from items
function calculateCountFromItems(items = [], categoryItemsRequiredCount) {
    const count = {};

    items.forEach((item) => {
        if (item.itemTypes && Array.isArray(item.itemTypes)) {
            item.itemTypes.forEach((itemType) => {
                count[itemType] = categoryItemsRequiredCount;
            });
        }
    });
    return count;
}

// Helper function to normalize subcategoriesByCuisine structure
function normalizeSubcategoriesByCuisine(subcategoriesByCuisine) {
    // Handle new array format: [{ cuisine: "Other", subcategories: [...] }]

    if (Array.isArray(subcategoriesByCuisine)) {
        const normalized = {};
        subcategoriesByCuisine.forEach((cuisineGroup) => {
            if (cuisineGroup.cuisine && cuisineGroup.subcategories) {
                normalized[cuisineGroup.cuisine] =
                    cuisineGroup.subcategories.map((subcat) => ({
                        subcategoryId: subcat.id, // Map id to subcategoryId for compatibility
                        name: subcat.name,
                        total: parseInt(subcat.total) || 0,
                        count: calculateCountFromItems(
                            subcat.items || [],
                            subcat.total.includes("-")
                                ? subcat.total.split("-")[1]
                                : subcat.total
                        ), // Calculate count from items
                        items: subcat.items || [],
                    }));
            }
        });
        return normalized;
    }

    // Handle old object format: { "Other": [...] }
    return subcategoriesByCuisine || {};
}
export function compareVariants(variants) {
    if (!variants || variants.length < 1) {
        throw new Error("At least 1 variant required for comparison");
    }

    const mainVariant = variants[0];
    const comparisons = [];

    for (let i = 0; i < variants.length; i++) {
        const currentVariant = structuredCloneSafe(variants[i]);
        const isMainVariant = i === 0;
        const isShortlisted = mainVariant?.variants?.find(
            (v) => v?.variant_id === currentVariant?._id
        )?.isShortlisted;
        const isRejected = mainVariant?.variants?.find(
            (v) => v?.variant_id === currentVariant?._id
        )?.isRejected;

        const currentVariantCost =
            mainVariant?.budgetType === "lumpSum"
                ? currentVariant?.cost * currentVariant?.maxPersons
                : currentVariant.cost || 0;

        const mainVariantCost =
            mainVariant?.budgetType === "lumpSum"
                ? mainVariant?.cost * mainVariant?.maxPersons
                : mainVariant.cost || 0;

        const servicesForComparison = isMainVariant
            ? mainVariant
            : currentVariant;

        const comparison = {
            variantIndex: i,
            variantName: currentVariant.name || `Variant ${i + 1}`,
            isMainVariant,
            Basic: {
                capacityComparison: {
                    asked: {
                        minPersons: mainVariant.minPersons,
                        maxPersons: mainVariant.maxPersons,
                    },
                    given: {
                        minPersons: currentVariant.minPersons,
                        maxPersons: currentVariant.maxPersons,
                    },
                    flag:
                        currentVariant.minPersons <= mainVariant.minPersons &&
                        currentVariant.maxPersons >= mainVariant.maxPersons,
                },
                costComparison: {
                    asked: mainVariantCost,
                    given: currentVariantCost,
                    flag: currentVariantCost <= mainVariantCost,
                    budget: currentVariant?.budget,
                    budgetType: currentVariant?.budgetType,
                },
            },
            Menu: [],
            // ✅ CLEAN: Direct call - addVariantFields handles everything
            freeServices: compareServices(
                servicesForComparison.freeServices,
                servicesForComparison.freeServices
            ),
            paidServices: compareServices(
                servicesForComparison.paidServices,
                servicesForComparison.paidServices
            ),

            _id: currentVariant._id,
            variants: isMainVariant ? mainVariant.variants : undefined,
            isShortlisted: isMainVariant ? null : isShortlisted,
            isRejected: isMainVariant ? null : isRejected,
        };


        const rawMenu = currentVariant.availableMenuCount || [];
        let menuCountData;

        if (isMainVariant) {
            menuCountData = rawMenu;
        } else {
            menuCountData = rawMenu.map((cat) => {
                const cloned = structuredCloneSafe(cat);

                const looksLikeRequirements =
                    Array.isArray(cloned.offerings) &&
                    cloned.offerings.some(
                        (o) =>
                            Array.isArray(o.selectedItems) ||
                            (o.selectionLimit &&
                                typeof o.selectionLimit === "object")
                    );

                if (looksLikeRequirements) {
                    return cloned;
                }

                if (Array.isArray(cloned.directOfferings)) {
                    cloned.offerings = cloned.directOfferings.map((off) => ({
                        itemTypeId: off.itemTypeId,
                        itemTypeName: off.itemTypeName,
                        selectionLimit:
                            typeof off.selectionLimit === "number"
                                ? {
                                      min: off.selectionLimit,
                                      max: off.selectionLimit,
                                  }
                                : off.selectionLimit || { min: 0, max: 0 },
                        serviceLimited: !!off.serviceLimited,
                        selectedItems:
                            off.items?.map((it) => ({
                                ...it,
                                itemTypes: (it.itemTypes || []).map((t) =>
                                    typeof t === "string" ? t : t?._id
                                ),
                                itemTypeDetails: (it.itemTypes || []).map((t) =>
                                    typeof t === "string"
                                        ? { _id: t, name: "", category: "" }
                                        : {
                                              _id: t._id,
                                              name: t.name,
                                              category: t.category,
                                          }
                                ),
                            })) || [],
                    }));
                } else {
                    cloned.offerings = cloned.offerings || [];
                }

                cloned.subcategories =
                    cloned.subcategories?.map((sub) => {
                        const newSub = structuredCloneSafe(sub);

                        newSub.offerings = (newSub.offerings || []).map(
                            (off) => ({
                                itemTypeId: off.itemTypeId,
                                itemTypeName: off.itemTypeName,
                                selectionLimit:
                                    typeof off.selectionLimit === "number"
                                        ? {
                                              min: off.selectionLimit,
                                              max: off.selectionLimit,
                                          }
                                        : off.selectionLimit || {
                                              min: 0,
                                              max: 0,
                                          },
                                serviceLimited: !!off.serviceLimited,
                                selectedItems:
                                    off.items?.map((it) => ({
                                        ...it,
                                        itemTypes: (it.itemTypes || []).map(
                                            (t) =>
                                                typeof t === "string"
                                                    ? t
                                                    : t?._id
                                        ),
                                        itemTypeDetails: (
                                            it.itemTypes || []
                                        ).map((t) =>
                                            typeof t === "string"
                                                ? {
                                                      _id: t,
                                                      name: "",
                                                      category: "",
                                                  }
                                                : {
                                                      _id: t._id,
                                                      name: t.name,
                                                      category: t.category,
                                                  }
                                        ),
                                    })) || [],
                            })
                        );

                        return newSub;
                    }) || [];

                return cloned;
            });
        }

        const processCategoryData = (category) => {
            const categoryComparison = {
                categoryId: category.categoryId,
                categoryName: category.categoryName,
                category: {
                    asked: { min: 0, max: 0 },
                    given: 0,
                    flag: false,
                    itemTypes: {},
                    subcategories: {},
                    totalCategory: 0,
                },
            };

            if (
                Array.isArray(category.offerings) &&
                category.offerings.length > 0
            ) {
                const itemTypeMap = {};
                let totalItems = 0;
                let catMin = 0;
                let catMax = 0;

                category.offerings.forEach((offering) => {
                    const selectedItems = offering.selectedItems || [];
                    totalItems += selectedItems.length;

                    const selMin = Number(offering.selectionLimit?.min || 0);
                    const selMax = Number(offering.selectionLimit?.max || 0);

                    selectedItems.forEach((item) => {
                        const itemTypes = item.itemTypes || [];
                        const itemTypeDetailsArr = item.itemTypeDetails || [];

                        itemTypes.forEach((itemTypeId) => {
                            const detail = itemTypeDetailsArr.find(
                                (d) => d._id === itemTypeId
                            );

                            const key =
                                detail?.name ||
                                offering.itemTypeName ||
                                "Unknown";

                            if (!itemTypeMap[key]) {
                                itemTypeMap[key] = {
                                    asked: { min: 0, max: 0 },
                                    given: {
                                        count: 0,
                                        items: [],
                                    },
                                    count: {
                                        min: 0,
                                        max: 0,
                                    },
                                    itemTypeName: key,
                                    category: detail?.category || "FOOD_TYPE",
                                };
                            }

                            itemTypeMap[key].given.count +=
                                selectedItems.length;
                            itemTypeMap[key].given.items.push(item);
                            itemTypeMap[key].asked.min += selMin;
                            itemTypeMap[key].asked.max += selMax;
                        });
                    });

                    const uniqueItemTypeKeys = new Set();

                    selectedItems.forEach((item) => {
                        const itemTypes = item.itemTypes || [];
                        const itemTypeDetailsArr = item.itemTypeDetails || [];

                        itemTypes.forEach((itemTypeId) => {
                            const detail = itemTypeDetailsArr.find(
                                (d) => d._id === itemTypeId
                            );
                            const key =
                                detail?.name ||
                                offering.itemTypeName ||
                                "Unknown";
                            uniqueItemTypeKeys.add(key);
                        });
                    });

                    uniqueItemTypeKeys.forEach((key) => {
                        const it = itemTypeMap[key];
                        if (it) {
                            it.count.min += selMin;
                            it.count.max += selMax;
                        }
                    });

                    catMin += selMin;
                    catMax += selMax;
                });

                categoryComparison.category.given = totalItems;
                categoryComparison.category.flag = totalItems > 0;
                categoryComparison.category.itemTypes = itemTypeMap;
                categoryComparison.category.asked = {
                    min: catMin,
                    max: catMax,
                };
            }

            if (
                Array.isArray(category.subcategories) &&
                category.subcategories.length > 0
            ) {
                category.subcategories.forEach((subcat) => {
                    if (
                        !Array.isArray(subcat.offerings) ||
                        subcat.offerings.length === 0
                    ) {
                        return;
                    }

                    const subItemTypeMap = {};
                    let subTotalItems = 0;
                    let subMin = 0;
                    let subMax = 0;

                    subcat.offerings.forEach((offering) => {
                        const selectedItems = offering.selectedItems || [];
                        subTotalItems += selectedItems.length;

                        const selMin = Number(
                            offering.selectionLimit?.min || 0
                        );
                        const selMax = Number(
                            offering.selectionLimit?.max || 0
                        );

                        selectedItems.forEach((item) => {
                            const itemTypes = item.itemTypes || [];
                            const itemTypeDetailsArr =
                                item.itemTypeDetails || [];

                            itemTypes.forEach((itemTypeId) => {
                                const detail = itemTypeDetailsArr.find(
                                    (d) => d._id === itemTypeId
                                );

                                const key =
                                    detail?.name ||
                                    offering.itemTypeName ||
                                    "Unknown";

                                if (!subItemTypeMap[key]) {
                                    subItemTypeMap[key] = {
                                        asked: { min: 0, max: 0 },
                                        given: {
                                            count: 0,
                                            items: [],
                                        },
                                        count: {
                                            min: 0,
                                            max: 0,
                                        },
                                        itemTypeName: key,
                                        category:
                                            detail?.category || "FOOD_TYPE",
                                    };
                                }

                                subItemTypeMap[key].given.count +=
                                    selectedItems.length;
                                subItemTypeMap[key].given.items.push(item);
                                subItemTypeMap[key].asked.min += selMin;
                                subItemTypeMap[key].asked.max += selMax;
                            });
                        });

                        const uniqueItemTypeKeys = new Set();

                        selectedItems.forEach((item) => {
                            const itemTypes = item.itemTypes || [];
                            const itemTypeDetailsArr =
                                item.itemTypeDetails || [];

                            itemTypes.forEach((itemTypeId) => {
                                const detail = itemTypeDetailsArr.find(
                                    (d) => d._id === itemTypeId
                                );

                                const key =
                                    detail?.name ||
                                    offering.itemTypeName ||
                                    "Unknown";
                                uniqueItemTypeKeys.add(key);
                            });
                        });

                        uniqueItemTypeKeys.forEach((key) => {
                            const it = subItemTypeMap[key];
                            if (it) {
                                it.count.min += selMin;
                                it.count.max += selMax;
                            }
                        });

                        subMin += selMin;
                        subMax += selMax;
                    });

                    let subCountMin = 0;
                    let subCountMax = 0;

                    Object.values(subItemTypeMap).forEach((it) => {
                        subCountMin += it.count?.min || 0;
                        subCountMax += it.count?.max || 0;
                    });

                    categoryComparison.category.subcategories[
                        subcat.subcategoryName
                    ] = {
                        subcategoryId:
                            subcat.subcategoryId || subcat.subcategoryName,
                        subcategoryName: subcat.subcategoryName,
                        asked: { min: subMin, max: subMax },
                        given: subTotalItems,
                        flag: subTotalItems > 0,
                        itemTypes: subItemTypeMap,
                        count: {
                            min: subCountMin,
                            max: subCountMax,
                        },
                    };
                });

                const subcats = categoryComparison.category.subcategories;
                let extraMin = 0;
                let extraMax = 0;

                Object.values(subcats).forEach((sc) => {
                    extraMin += sc.asked?.min || 0;
                    extraMax += sc.asked?.max || 0;
                });

                categoryComparison.category.asked.min += extraMin;
                categoryComparison.category.asked.max += extraMax;

                let catCountMin = 0;
                let catCountMax = 0;

                Object.values(categoryComparison.category.itemTypes).forEach(
                    (it) => {
                        catCountMin += it.count?.min || 0;
                        catCountMax += it.count?.max || 0;
                    }
                );

                Object.values(subcats).forEach((sc) => {
                    if (sc.count) {
                        catCountMin += sc.count.min || 0;
                        catCountMax += sc.count.max || 0;
                    }
                });

                categoryComparison.category.count = {
                    min: catCountMin,
                    max: catCountMax,
                };
            }

            let totalCategory = 0;

            const directOfferings =
                Array.isArray(category.directOfferings) &&
                category.directOfferings.length
                    ? category.directOfferings
                    : category.offerings || [];

            directOfferings.forEach((off) => {
                const items = off.items || off.selectedItems || [];
                totalCategory += items.length;
            });

            if (
                Array.isArray(category.subcategories) &&
                category.subcategories.length > 0
            ) {
                category.subcategories.forEach((subcat) => {
                    (subcat.offerings || []).forEach((off) => {
                        const items = off.items || off.selectedItems || [];
                        totalCategory += items.length;
                    });
                });
            }

            categoryComparison.category.totalCategory = totalCategory;

            return categoryComparison;
        };

        menuCountData?.forEach((category) => {
            const categoryComparison = processCategoryData(category);
            comparison.Menu.push(categoryComparison);
        });

        comparisons.push(comparison);
    }

    return {
        mainVariant: {
            name: mainVariant.name || "Main Variant",
            index: 0,
        },
        comparisons,
    };
}
