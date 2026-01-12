export function transformMenuData(fromDataArray) {
  // transform items (with description added)
  const transformItems = (items) =>
    (items || []).map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      itemTypes: item.itemTypes || [],
      count: item?.count,
    }));

  // transform subcategories
  const transformSubcategories = (subcategories) =>
    (subcategories || []).map((sub) => {
      const items = transformItems(sub.items || []);
      return {
        subcategoryId: sub.id,
        name: sub.name,
        total: sub.total,
        count: sub?.total,
        items,
      };
    });

  // transform a single category
  const transformCategory = (cat) => {
    // build subcategoriesByCuisine
    const subcategoriesByCuisine = {};
    (cat.subcategoriesByCuisine || [])?.forEach((cuisineBlock) => {
      subcategoriesByCuisine[cuisineBlock.cuisine] =
        transformSubcategories(cuisineBlock.subcategories || []);
    });

    // transform top-level items
    const items = transformItems(cat.items || []);

    return {
      categoryId: cat.id,
      name: cat.name,
      total: cat.total,
      count: cat?.count,
      subcategoriesByCuisine,
      items,
    };
  };

  // support both array and single object input
  if (Array.isArray(fromDataArray)) {
    return fromDataArray.map(transformCategory);
  } else {
    return transformCategory(fromDataArray);
  }
}
