const OptionCard = ({ title, tag, description, image, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-[32px] p-7
        transition-all duration-200 relative mt-5
        ${
          selected
            ? "border-2 border-orange-500 bg-[linear-gradient(236.81deg,#FFF3EA_0%,#FDEAED_100%)]"
            : "border border-[#D7D9DA] bg-[#FFF7F3]"
        }
      `}
    >
     
      {selected && (
        <div className="absolute top-5 left-5 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
          <img src="./tick.png" alt="tick" />
        </div>
      )}


      
      <div className="flex items-start justify-between gap-6 ">
        <div>
          <p className="text-sm font-medium bg-[linear-gradient(99.68deg,#F08E45_0%,#EE5763_100%)] bg-clip-text text-transparent  text-[15px]  font-semibold mt-20">
            {tag}
          </p>

          <h3 className="text-3xl bg-[linear-gradient(99.68deg,#F08E45_0%,#EE5763_100%)] bg-clip-text text-transparent font-bold text-orange-600">
            {title}
          </h3>
        </div>

        <img
          src={image}
          alt={title}
          className="w-40 max-h-32 object-contain shrink-0"
        />
      </div>

      
      <p className="mt-2 text-[#5C5F62] text-[15px] font-semibold leading-snug">
        {description}
      </p>
    </div>
  );
};

export default OptionCard;
