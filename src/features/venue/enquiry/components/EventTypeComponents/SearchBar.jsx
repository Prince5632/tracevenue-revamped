import { Input } from "@shared/components/ui";
import calendarIcon from "@assets/step3/calendar-icon.png";
import { IoChevronDown } from "react-icons/io5";
import { useRef, useEffect } from "react";

const SearchBar = ({
  value,
  onChange,
  onFocus,
  isOpen,
  clear,
  searchResults,
  categories,
  onSelect,
  onToggle,
}) => {
  const wrapperRef = useRef(null);
  useEffect(() => {
  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onToggle(false);   // close dropdown
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        value={value}
        placeholder="Type to search..."
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        leftIcon={<img src={calendarIcon} alt="calendar" />}
      />      {value && (
        <button
          onClick={clear}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-sm text-white bg-[#ff4000] px-3 py-1 rounded-full cursor-pointer"
        >
          clear
        </button>
      )}      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        onClick={onToggle}
      >
        <IoChevronDown />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-2xl shadow-lg mt-2 p-4">

          {value && searchResults.length > 0 && (
            <>
              <p className="text-sm !text-[#555] font-semibold !mb-2">Search Results</p>
              <div className="space-y-2">
                {searchResults.map(event => (
                  <p
                    key={event.id}
                    onClick={() => onSelect(event)}
                    className="cursor-pointer font-semibold !text-black  py-1 hover:!text-[#FF4000] hover"
                  >
                    {event.label}
                  </p>
                ))}
              </div>
            </>
          )}


          {!value && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {categories.map(category => (
                <div key={category.id}>
                  <p className="text-sm font-semibold !text-[#555] !mb-2">
                    {category.title}
                  </p>
                  <div className="space-y-1">
                    {category.events.map(event => (
                      <p
                        key={event.id}
                        onClick={() => onSelect(event)}
                        className="cursor-pointer !text-black font-semibold py-0.5 hover:!text-[#FF4000] hover:underline hover:decoration-[#FF4000] "
                      >
                        {event.label}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
