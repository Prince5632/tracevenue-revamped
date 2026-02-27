const FilterDropdown = () => (
    <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl z-50">
        {["Rating", "Distance", "Price Range"].map((item) => (
            <div
                key={item}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm"
            >
                {item}
            </div>
        ))}
    </div>
);

export default FilterDropdown;
