import cuisine from '../../assets/cuisine.png';
const EventCard = () => {
  const tags = [
    "Indian",
    "Continental",
    "Mughlai / North Indian",
    "American",
    "North Indian",
    "Indo-Chinese",
  ];

  return (
    <div className="!w-[320px] bg-white rounded-xl shadow-md overflow-hidden mt-5">
      
      <div className="relative">
        <img
          src={cuisine}
          alt="Food"
          className="w-full !h-[180px] object-cover block transition-transform duration-300 hover:scale-105 cursor-pointer"
        />

        
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#fff] text-black text-[11px] font-semibold px-3 py-1 rounded-full shadow"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      
      <div className="p-3 space-y-1">
        
        <h3 className="font-bold text-[16px] leading-5">
          Mega 6-Cuisine Celebration Spread Featuring Indian & Continental
        </h3>


        <p className="text-sm text-[#666] font-semibold ">
          Featuring Indian & Continental
        </p>

        
        <div className="grid grid-cols-2 leading-snug  mt-3">
          <p className='!text-[12px]'><span className='!text-black'>• 20-25</span> Food Items</p>
          <p className='!text-[12px]'><span className='!text-black'>• 6</span> Cuisines</p>
          <p className='!text-[12px]'><span className='!text-black'>• 5</span> Menu</p>
          <p className='!text-[12px]'><span className='!text-black'>• 2</span> Amenities & Services</p>
        </div>


        <div className="flex items-center gap-2 mt-3 bg-[#fff9f5] border-l-3 border-[#ff6b35] p-1 rounded-xl">
          <div className="flex-col items-center  text-orange-600 px-3 py-2 rounded-lg text-[12px] whitespace-nowrap">
            Starts from <br />
            <div className='font-bold text-lg'>₹4,500</div>
            
          </div>
          <div className='h-12 border-l-1 border-gray-300'></div>
          <p className="!text-[13px] !text-gray-600 font-semibold">
            Diverse multi-cuisine meal with Indian, Continental, and more
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
