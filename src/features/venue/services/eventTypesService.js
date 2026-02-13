import { API } from "@/shared";
import { toEventSlug } from "@/features/venue/enquiry/utils/eventSlug";

const normalizeEvent = (event = {}) => {
  if (!event) return null;
  const slugSource = Array.isArray(event.slug) ? event.slug[0] : event.slug;
  const normalizedId =
    typeof event._id === "string"
      ? event._id
      : event._id != null
        ? String(event._id)
        : event.id != null
          ? String(event.id)
          : null;
  return {
    ...event,
    _id: normalizedId,
    eventName: event.eventName || event.label || event.name || "",
    slug: toEventSlug(
      slugSource || event.eventName || event.label || event.name || "",
    ),
  };
};

export const fetchEventTypes = async () => {
  try {
    const { data } = await API.get("/api/v1/traceVenue/events/");
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((event) => normalizeEvent(event)).filter(Boolean);
  } catch (error) {
    console.error("Failed to load event types", error);
    throw error;
  }
};
