export const flattenEvents = (eventCategories) => {
  return eventCategories.flatMap(category =>
    category.events.map(event => ({
      ...event,
      category: category.title
    }))
  );
};
