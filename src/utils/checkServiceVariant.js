export function getVariantAndType(service) {
  if (!service || !Array.isArray(service.options)) {
    return null;
  }

  const { variantOptionId, variantTypeId } = service;

  // Find the matching option
  const option = service.options.find(
    (opt) => String(opt._id) === String(variantOptionId)
  );

  if (!option) return null;

  // Find the matching type within that option
  const type = option.types.find(
    (t) => String(t._id) === String(variantTypeId)
  );

  if (!type) return null;

  // Return the structured result
  return {
    optionId: option._id,
    optionName: option.name,
    typeId: type._id,
    typeValue: type.value,
  };
}

/**
 * Groups services by their variantOptionId and consolidates all selected types.
 * 
 * @param {Array} services - Array of service objects with variantOptionId and variantTypeId
 * @returns {Array} - Array of grouped services with consolidated variant types
 * 
 * Example output:
 * [
 *   {
 *     ...serviceData,
 *     variantOptionId: "abc123",
 *     variantOptionName: "Beverage",
 *     variantTypes: [
 *       { typeId: "type1", typeValue: "Tea" },
 *       { typeId: "type2", typeValue: "Green Tea" }
 *     ]
 *   }
 * ]
 */
export function groupServicesByVariantOption(services) {
  if (!Array.isArray(services) || services.length === 0) {
    return [];
  }

  // Create a map to group services by serviceId + variantOptionId combination
  const groupedMap = new Map();

  services.forEach((service) => {
    const { _id, serviceId, variantOptionId, variantTypeId } = service;

    // Use serviceId (or _id) + variantOptionId as the grouping key
    const groupKey = `${serviceId || _id}-${variantOptionId}`;

    if (!groupedMap.has(groupKey)) {
      // Find the option name from the service's options array
      const option = service.options?.find(
        (opt) => String(opt._id) === String(variantOptionId)
      );

      // Initialize the group with service data
      groupedMap.set(groupKey, {
        ...service,
        variantOptionName: option?.name || "Unknown Option",
        variantTypes: [],
      });
    }

    // Find the type value for this variantTypeId
    const option = service.options?.find(
      (opt) => String(opt._id) === String(variantOptionId)
    );
    const type = option?.types?.find(
      (t) => String(t._id) === String(variantTypeId)
    );

    if (type) {
      const group = groupedMap.get(groupKey);
      // Avoid duplicates
      const exists = group.variantTypes.some(
        (vt) => String(vt.typeId) === String(type._id)
      );
      if (!exists) {
        group.variantTypes.push({
          typeId: type._id,
          typeValue: type.value,
        });
      }
    }
  });

  return Array.from(groupedMap.values());
}

/**
 * Filters services by a specific variantOptionId.
 * 
 * @param {Array} services - Array of service objects
 * @param {string} variantOptionId - The variantOptionId to filter by
 * @returns {Array} - Filtered array of services matching the variantOptionId
 */
export function filterServicesByVariantOptionId(services, variantOptionId) {
  if (!Array.isArray(services) || !variantOptionId) {
    return [];
  }

  return services.filter(
    (service) => String(service.variantOptionId) === String(variantOptionId)
  );
}
