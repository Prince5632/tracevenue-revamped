import { LocateFixed } from "lucide-react";

const SearchDropdown = ({
    suggestions,
    detectCurrentLocation,
    handleSelectSuggestion,
    setShowOptions,
}) => (
    <div className="absolute top-full left-0 w-full mt-2 z-50 bg-white rounded-2xl shadow-lg border">
        <div
            onClick={detectCurrentLocation}
            className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 flex gap-3"
        >
            <LocateFixed size={18} />
            Detect current location
        </div>

        <div className="max-h-60 overflow-y-auto">
            {suggestions.map((item) => (
                <div
                    key={item.place_id}
                    onClick={() => {
                        handleSelectSuggestion(item);
                        setShowOptions(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                    <p className="text-sm font-medium">
                        {item.structured_formatting.main_text}
                    </p>
                    <p className="text-xs text-gray-500">
                        {item.structured_formatting.secondary_text}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

export default SearchDropdown;
