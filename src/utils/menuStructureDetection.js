export function detectSubcategoriesFormat(subcategoriesByCuisine) {
  // Handle null/undefined
  if (!subcategoriesByCuisine) {
    return {
      format: 'empty',
      isValid: false,
      data: null
    };
  }

  // Format 2: Array with cuisine property
  if (Array.isArray(subcategoriesByCuisine)) {
    const isValidFormat2 = subcategoriesByCuisine.every(item => 
      item && 
      typeof item === 'object' && 
      'cuisine' in item && 
      'subcategories' in item &&
      Array.isArray(item.subcategories)
    );

    return {
      format: 'array',
      isValid: false,
      data: subcategoriesByCuisine,
      description: 'Array format with cuisine and subcategories properties'
    };
  }

  // Format 1: Nested object with cuisine names as keys
  if (typeof subcategoriesByCuisine === 'object') {
    const keys = Object.keys(subcategoriesByCuisine);
    
    // Check if all values are arrays
    const isValidFormat1 = keys.every(key => 
      Array.isArray(subcategoriesByCuisine[key])
    );

    return {
      format: 'object',
      isValid: true,
      data: subcategoriesByCuisine,
      cuisines: keys,
      description: 'Object format with cuisine names as keys'
    };
  }

  // Unknown format
  return {
    format: 'unknown',
    isValid: false,
    data: subcategoriesByCuisine
  };
}