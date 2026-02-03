import {
  MapPin,
  Users,
  Star,
  Navigation,
  Check
} from "lucide-react";

const VenueCard = () => {
  return (
    <div className="w-full bg-white rounded-[28px] border border-[#e5e7eb] shadow-sm p-5">
      {/* Top Section */}
      <div className="flex gap-4">
        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
          alt="venue"
          className="w-[90px] h-[90px] rounded-2xl object-cover"
        />

        {/* Info */}
        <div className="flex-1">
          {/* Title + Distance */}
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-black">
              Moti Mahal Delux
            </h3>
            <span className="text-sm text-gray-400">2.4 km</span>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-2">
            {["Continental", "Fast Food"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1 rounded-full border border-gray-200 text-sm font-medium text-gray-800 bg-white"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
              <Star size={16} fill="#facc15" stroke="#facc15" />
              <span className="font-semibold text-sm">4.8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location + Guests */}
      <div className="mt-4 space-y-2 text-gray-500">
        <div className="flex items-center gap-2">
          <MapPin size={18} />
          <span className="text-sm">Sector 7, Chandigarh</span>
        </div>

        <div className="flex items-center gap-2">
          <Users size={18} />
          <span className="text-sm">200–500 guests</span>
        </div>
      </div>

      {/* Directions */}
      <div className="mt-4 flex items-center gap-2 text-[#16a34a] font-medium cursor-pointer">
        <div className="w-9 h-9 rounded-full bg-[#16a34a] flex items-center justify-center">
          <Navigation size={18} className="text-white" />
        </div>
        <span className="text-sm">Directions</span>
      </div>

      {/* Status Bar */}
      <div className="mt-5 bg-[#fff1ea] rounded-2xl px-5 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-[#ff5a1f] font-semibold">Invited</span>
        </div>

        <div className="w-9 h-9 rounded-full bg-[#ff5a1f] flex items-center justify-center">
          <Check size={18} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
