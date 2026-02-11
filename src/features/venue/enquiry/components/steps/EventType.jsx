import { useState, useMemo, useEffect } from "react";
import { events, eventCategories } from "@features/venue/enquiry/constants";
import {
  flattenEvents,
  normalizeEventSelection,
  toEventSlug,
} from "@features/venue/enquiry/utils";
import { matchEventFromCatalog } from "@features/venue/enquiry/utils/eventMatching";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import EventCard from "../EventTypeComponents/EventCard";
import EventTab from "../EventTypeComponents/EventTab";
import SearchBar from "../EventTypeComponents/SearchBar";
import useEnquiryStore from "../../context/useEnquiryStore";

const EventType = ({ formData: propFormData, updateFormData: propUpdater }) => {
  const formData = useEnquiryStore((state) => propFormData ?? state.formData);
  const updateFormData =
    propUpdater ?? useEnquiryStore((state) => state.updateFormData);
  const eventOptions = useEnquiryStore((state) => state.eventOptions);
  const eventOptionsLoading = useEnquiryStore(
    (state) => state.eventOptionsLoading,
  );
  const loadEventOptions = useEnquiryStore((state) => state.loadEventOptions);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = () => setIsSearchOpen(true);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const closeSearch = () => setIsSearchOpen(false);

  useEffect(() => {
    if (!eventOptionsLoading && !eventOptions.length) {
      loadEventOptions();
    }
  }, [eventOptions.length, eventOptionsLoading, loadEventOptions]);

  useEffect(() => {
    if (!formData.selectedEventType) {
      setSelectedEventId(null);
      setSearchValue("");
      return;
    }

    const normalized = normalizeEventSelection(formData.selectedEventType);
    setSelectedEventId(normalized?.value || normalized?.id || null);
    setSearchValue(normalized?.label || "");
  }, [formData.selectedEventType]);

  const serverEvents = useMemo(() => {
    if (!Array.isArray(eventOptions)) return [];
    return eventOptions
      .map((event) => {
        const normalizedId =
          typeof event._id === "string"
            ? event._id
            : event._id != null
              ? String(event._id)
              : null;
        const slugSource = Array.isArray(event.slug)
          ? event.slug[0]
          : event.slug;
        const slug = toEventSlug(slugSource || event.eventName || event.label);
        return {
          id: normalizedId,
          value: normalizedId,
          label: event.eventName,
          eventName: event.eventName,
          slug,
          image: event.image || null,
        };
      })
      .filter((event) => event.value);
  }, [eventOptions]);

  const staticEvents = useMemo(() => flattenEvents(eventCategories), []);

  const mergeWithServerData = useMemo(() => {
    const cache = new Map(serverEvents.map((item) => [item.slug, item]));
    return (entry) => {
      const baseLabel =
        entry.label || entry.title || entry.eventName || entry.name || "";
      const slug = toEventSlug(baseLabel || entry.value || entry.id || "");
      const matched = cache.get(slug);

      if (matched) {
        return {
          ...entry,
          id: matched.id,
          eventId: matched.id,
          value: matched.value,
          label: matched.label,
          eventName: matched.eventName,
          slug: matched.slug,
        };
      }

      const fallbackValue =
        entry.value ??
        entry.eventId ??
        entry.id ??
        slug;

      return {
        ...entry,
        slug,
        label: baseLabel,
        value: fallbackValue,
        eventId: fallbackValue,
      };
    };
  }, [serverEvents]);

  const catalog = useMemo(
    () => staticEvents.map((event) => mergeWithServerData(event)),
    [staticEvents, mergeWithServerData],
  );

  const allEvents = serverEvents.length ? serverEvents : catalog;

  const searchResults = useMemo(() => {
    if (!searchValue.trim()) return [];
    const needle = searchValue.toLowerCase();
    return allEvents.filter((event) =>
      (event.label || "").toLowerCase().includes(needle),
    );
  }, [searchValue, allEvents]);

  const handleSelect = (event) => {
    const match = matchEventFromCatalog(eventOptions, event);
    const normalized = match
      ? {
          id: match._id,
          value: match._id,
          eventName: match.eventName || match.label,
          label: match.eventName || match.label,
          slug: match.slug,
        }
      : normalizeEventSelection(event);

    if (!normalized) return;

    setSelectedEventId(normalized.value || normalized.id || null);
    setSearchValue(normalized.label || "");
    setIsSearchOpen(false);
    updateFormData("selectedEventType", normalized);
  };

  const clearSelection = () => {
    setSearchValue("");
    setSelectedEventId(null);
    updateFormData("selectedEventType", null);
  };

  return (
    <>
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        onFocus={openSearch}
        isOpen={isSearchOpen}
        clear={() => {
          clearSelection();
          closeSearch();
        }}
        searchResults={searchResults}
        categories={eventCategories}
        onSelect={(event) => {
          handleSelect(event);
          closeSearch();
        }}
        onToggle={toggleSearch}
      />

      <div className="py-5 px-2">
        <p className="!font-bold !text-[18px] !text-black">Popular Events</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
        {events.map((event) => {
          const normalized = mergeWithServerData({
            id: event.id,
            eventId: event.eventId,
            label: event.title,
            title: event.title,
          });
          return (
            <EventCard
              key={event.id}
              title={normalized.label}
              image={event.image}
              selected={selectedEventId === normalized.value}
              onClick={() =>
                handleSelect({
                  id: normalized.value,
                  value: normalized.value,
                  eventId: normalized.value,
                  label: normalized.label,
                  title: normalized.label,
                  slug: normalized.slug,
                })
              }
            />
          );
        })}
      </div>

      <div className="mt-5 text-lg">
        <div className="flex justify-left items-center px-2 mb-5">
          <p className="!font-bold !text-[18px] !text-black !font-Gilroy">
            All Events
          </p>

          <button
            className="text-[#ff4000] !text-[23px] ml-2 rounded-full !font-bold transition cursor-pointer"
            onClick={() =>
              document
                .getElementById("event-tabs")
                .scrollIntoView({ behavior: "smooth", block: "center" })
            }
          >
            <IoArrowDownCircleOutline />
          </button>
        </div>
      </div>

      <div id="event-tabs" className="space-y-6 px-2">
        {eventCategories.map((category) => (
          <div key={category.id} className="space-y-3">
            <p className="text-sm font-bold text-gray-500">{category.title}</p>

            <div className="flex flex-wrap gap-3">
              {category.events.map((event) => {
                const normalized = mergeWithServerData(event);
                return (
                  <EventTab
                    key={event.id}
                    value={normalized.label}
                    leftIcon={event.icon}
                    selected={selectedEventId === normalized.value}
                    onClick={() =>
                      handleSelect({
                        ...normalized,
                        id: normalized.value,
                        value: normalized.value,
                        eventId: normalized.value,
                      })
                    }
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventType;
