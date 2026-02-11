import { normalizeEventSelection } from "./urlState";
import { toEventSlug } from "./eventSlug";

export const isObjectId = (value) =>
  typeof value === "string" && /^[a-f0-9]{24}$/i.test(value.trim());

const toComparable = (input) =>
  typeof input === "string" ? input.trim().toLowerCase() : null;

export const matchEventFromCatalog = (catalog = [], selection = null) => {
  if (!selection || !Array.isArray(catalog) || !catalog.length) return null;
  const normalized = normalizeEventSelection(selection);
  if (!normalized) return null;

  const slug =
    normalized.slug ||
    toEventSlug(
      normalized.label ||
        normalized.eventName ||
        normalized.value ||
        normalized.id ||
        "",
    );

  const candidateValues = [
    normalized.value,
    normalized.id,
    normalized.eventId,
    slug,
    normalized.label,
    normalized.eventName,
  ]
    .filter(Boolean)
    .map((value) => toComparable(value));

  return (
    catalog.find((event) => {
      const eventSlug = toComparable(
        event.slug ||
          event.eventName ||
          event.label ||
          event.name ||
          event._id ||
          "",
      );
      const eventId = toComparable(event._id);
      const eventName = toComparable(event.eventName || event.label);

      return candidateValues.some(
        (candidate) =>
          candidate &&
          (candidate === eventSlug || candidate === eventId || candidate === eventName),
      );
    }) || null
  );
};
