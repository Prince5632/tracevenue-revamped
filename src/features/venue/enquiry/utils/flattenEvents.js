import { toEventSlug } from "./eventSlug";

const toEventValue = (event) => {
  if (!event) return null;
  if (event.value) return event.value;
  if (event.id) return event.id;
  if (event.eventId) return event.eventId;
  if (event.label) {
    return toEventSlug(event.label);
  }
  return null;
};

export const flattenEvents = (eventCategories) => {
  return eventCategories.flatMap((category) =>
    category.events.map((event) => ({
      ...event,
      value: toEventValue(event),
      slug: toEventSlug(event.label || event.title || event.value || event.id || ""),
      category: category.title,
    })),
  );
};
