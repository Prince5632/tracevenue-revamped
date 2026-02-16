import { Input } from "@shared/components/ui";

const EventTab = ({ value, leftIcon, selected, onClick, readOnly = true }) => {
  return (

    <div className="w-full md:full lg:w-1/3 ">
      <button
        onClick={onClick}
        className={`
            flex items-center justify-left 
            gap-2
            font-bold text-[15px]
            cursor-pointer
            font-Gilroy
            rounded-full
            px-5 py-2.5
            mt-2
            w-full 
            !font-semibold
                transition
                ${selected
            ? "border border-[#FF4000]"
            : "border border-gray-300"
          }
            `}
      >
        <img src={leftIcon} alt="icon" className="h-6 w-6" /> {value}
        {selected && (
          <svg
            className="ml-auto h-5 w-5 text-[#FF4000]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <g transform="translate(12,12) scale(0.8) translate(-12,-12)">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </g>
          </svg>
        )}
      </button>
    </div>
  );
};

export default EventTab;
