import { useState } from "react";
import EventCard from "../../EventTypeComponents/EventCard";
import SearchBar from "../../EventTypeComponents/SearchBar";
import events from "../../../data/events";
import { eventCategories } from "../../../data/eventCategories";
import EventTab from "../../EventTypeComponents/EventTab";
import { IoArrowDownCircleOutline } from "react-icons/io5";

const EventType = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <SearchBar />

      <div className="py-5 px-2">
        <p className="!font-bold !text-[18px] !text-black">
          Popular Events
        </p>
        
      </div>
      <div
        className="
          grid grid-cols-2 
          sm:grid-cols-3 
          lg:grid-cols-4 
          gap-5 px-2
        "
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            image={event.image}
            selected={selectedOption === event.id}
            onClick={() => setSelectedOption(event.id)}
          />
        ))}
      </div>

      <div className="mt-5 text-lg">
        <div className="flex justify-left items-center px-2 mb-5">
          <p className="!font-bold !text-[18px] !text-black !font-Gilroy ">All Events</p>
          <button
            className="text-[#ff4000] !text-[23px] ml-2 rounded-full !font-bold transition cursor-pointer"
            onClick={() => document.getElementById('event-tabs').scrollIntoView({ behavior: 'smooth', block: 'center' })}
          >
            <IoArrowDownCircleOutline />
          </button>
        </div>
      </div> 

      <div id="event-tabs" className="space-y-6 px-2">
        {eventCategories.map((category) => (
          <div key={category.id} className="space-y-3">
            <p className="text-sm font-bold text-gray-500">
              {category.title}
            </p>

            <div className="flex flex-wrap gap-3">
              {category.events.map((event) => (
                <EventTab
                  key={event.id}
                  value={event.label}
                  leftIcon={event.icon}
                  readOnly
                  selected={selectedOption === event.id}
                  onClick={() => setSelectedOption(event.id)}
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
