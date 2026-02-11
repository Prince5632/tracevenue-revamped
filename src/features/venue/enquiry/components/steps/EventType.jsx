import { useState, useMemo } from "react";
import { events, eventCategories } from "@features/venue/enquiry/constants";
import { flattenEvents } from "@features/venue/enquiry/utils";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import EventCard from "../EventTypeComponents/EventCard";
import EventTab from "../EventTypeComponents/EventTab";
import SearchBar from "../EventTypeComponents/SearchBar";

const EventType = ({ formData, updateFormData, urlParams }) => {
  console.log(formData, urlParams, "event type");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = () => setIsSearchOpen(true);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const closeSearch = () => setIsSearchOpen(false);

  const allEvents = useMemo(() => flattenEvents(eventCategories), []);

  const searchResults = useMemo(() => {
    if (!searchValue.trim()) return [];
    return allEvents.filter((e) =>
      e.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue, allEvents]);

  const handleSelect = (event) => {
    setSelectedEventId(event.id);
    setSearchValue(event.label);
    setIsSearchOpen(false);
  };

  const clearSelection = () => {
    setSearchValue("");
    setSelectedEventId(null);
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
        onClose = {closeSearch}
      />

      <div className="py-5 ">
        <p className="!font-bold !text-[18px] !text-black">Popular Events</p>
      </div>

      <div
        className="
          grid grid-cols-2 
          sm:grid-cols-3 
          lg:grid-cols-4 
          gap-5 
        "
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            image={event.image}
            selected={selectedEventId === event.eventId}
            onClick={() =>{
              handleSelect({
                id: event.eventId,
                label: event.title,
              });
              closeSearch();
            }}
          />
        ))}
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
              {category.events.map((event) => (
                <EventTab
                  key={event.id}
                  value={event.label}
                  leftIcon={event.icon}
                  selected={selectedEventId === event.id}
                  onClick={() => {handleSelect(event);
                    closeSearch()
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventType;
