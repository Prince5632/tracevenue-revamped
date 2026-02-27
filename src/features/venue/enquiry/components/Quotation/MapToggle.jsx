const MapToggle = ({ isMapView, setIsMapView }) => (
    <div
        onClick={() => setIsMapView(!isMapView)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d7d9da] bg-white cursor-pointer"
    >
        <span className="text-sm text-gray-500 whitespace-nowrap">Map View</span>
        <div
            className={`w-9 h-5 rounded-full p-[2px] ${isMapView ? "bg-[#fd4304]" : "bg-gray-300"
                }`}
        >
            <div
                className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${isMapView ? "translate-x-4" : ""
                    }`}
            />
        </div>
    </div>
);

export default MapToggle;
