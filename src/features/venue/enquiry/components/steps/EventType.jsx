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

const EventType = ({ formData: propFormData, updateFormData: propUpdater, onNext }) => {
  const formData = useEnquiryStore((state) => propFormData ?? state.formData);
  const updateFormData =
    propUpdater ?? useEnquiryStore((state) => state.updateFormData);
  const eventOptions = useEnquiryStore((state) => state.eventOptions);
  const eventOptionsLoading = useEnquiryStore(
    (state) => state.eventOptionsLoading,
  );
  const loadEventOptions = useEnquiryStore((state) => state.loadEventOptions);
  const jobId = useEnquiryStore((state) => state.jobId);
  const resetJobData = useEnquiryStore((state) => state.resetJobData);

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  // Pending event — set when user picks a new event while a job already exists
  const [pendingEvent, setPendingEvent] = useState(null);
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

  /** Apply the event selection to form state. Used directly or after confirmation. */
  const applySelection = (normalized) => {
    setSelectedEventId(normalized.value || normalized.id || null);
    setSearchValue(normalized.label || "");
    setIsSearchOpen(false);
    updateFormData("selectedEventType", normalized);
    setAutoNext(true);
  };

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

    const currentEventId =
      formData?.selectedEventType?.value ||
      formData?.selectedEventType?.id;

    const isChangingExistingEvent =
      jobId && currentEventId && currentEventId !== (normalized.value || normalized.id);

    if (isChangingExistingEvent) {
      // Store the pending selection and show confirmation instead of applying immediately
      setPendingEvent(normalized);
      return;
    }

    applySelection(normalized);
  };

  const handleConfirmChange = () => {
    if (!pendingEvent) return;
    resetJobData();
    applySelection(pendingEvent);
    setPendingEvent(null);
  };

  const handleCancelChange = () => setPendingEvent(null);


  const clearSelection = () => {
    setSearchValue("");
    setSelectedEventId(null);
    updateFormData("selectedEventType", null);
  };

  useEffect(() => {
    if (autoNext && formData.selectedEventType && onNext) {
      onNext();
      setAutoNext(false);
    }
  }, [autoNext, formData.selectedEventType, onNext]);

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
        onClose={closeSearch}
      />

      <div className="py-5 ">
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
        <div className="flex justify-left items-center mb-5">
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

      <div id="event-tabs" className="space-y-6">
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

      {/* ── Confirmation dialog: changing event type will reset all form data ── */}
      {pendingEvent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] font-bold text-[#060606]">
                Change Event Type?
              </h3>
              <p className="text-[14px] text-[#666]">Changing the event type will clear all data you filled in the next steps — gathering size, budget, dates, food preferences, and your current package selection. A new enquiry will be created.</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelChange}
                className="px-5 py-2.5 rounded-xl border border-[#e0e0e0] text-[14px] font-semibold text-[#333] hover:bg-[#f5f5f5] transition-all cursor-pointer"
              >
                Keep Current
              </button>
              <button
                onClick={handleConfirmChange}
                className="px-5 py-2.5 rounded-xl bg-[linear-gradient(135deg,#ff4000_0%,#ff6b35_100%)] text-white text-[14px] font-bold shadow-[0_4px_16px_#ff400050] hover:shadow-[0_6px_20px_#ff400070] transition-all cursor-pointer"
              >
                Yes, Change Event
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventType;
