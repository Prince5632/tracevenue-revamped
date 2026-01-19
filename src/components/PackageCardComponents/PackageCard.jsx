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
    <div className="
      w-full 
      sm:w-[48%] 
      lg:w-[320px] 
      bg-white 
      rounded-xl 
      shadow-md 
      overflow-hidden 
      mt-5
      cursor-pointer
    ">
      
     
      <div className="relative">
        <img
          src={cuisine}
          alt="Food"
          className="
            w-full 
            h-[160px] 
            sm:h-[180px] 
            object-cover 
            transition-transform 
            duration-300 
            hover:scale-105
          "
        />

        
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="
                bg-white 
                text-black 
                text-[10px] 
                sm:text-[11px] 
                font-semibold 
                px-3 
                py-1 
                rounded-full 
                shadow
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

     
      <div className="p-3 space-y-2">
        
        <h3 className="font-bold text-[15px] sm:text-[16px] leading-5">
          Mega 6-Cuisine Celebration Spread Featuring Indian & Continental
        </h3>

        <p className="text-[13px] text-[#666] font-semibold">
          Featuring Indian & Continental
        </p>

       
        <div className="grid grid-cols-2 gap-y-1  mt-3 leading-snug">
          <p className='!text-[12px]'><span className="text-black ">• 20-25</span> Food Items</p>
          <p className='!text-[12px]'><span className="text-black">• 6</span> Cuisines</p>
          <p className='!text-[12px]'><span className="text-black">• 5</span> Menu</p>
          <p className='!text-[12px]'><span className="text-black">• 2</span> Amenities & Services</p>
        </div>

      
        <div className="
          flex 
          gap-3 
          mt-3 
          bg-[#fff9f5] 
          border-l-4 
          border-[#ff6b35] 
          p-2 
          rounded-xl
        ">
          <div className="text-orange-600 text-[11px] px-2">
            Starts from
            <div className="font-bold text-lg">₹4,500</div>
          </div>

          <div className="h-12 border-l border-gray-300" />

          <p className="!text-[13px] !text-gray-700  leading-tight">
            Diverse multi-cuisine meal with Indian, Continental, and more
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
