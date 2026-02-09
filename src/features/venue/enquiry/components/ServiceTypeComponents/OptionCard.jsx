import { Card } from "@shared/components/ui";
import { ArrowRight } from "lucide-react";
import Tick from "@assets/images/tick.png";

const OptionCard = ({
  id,
  title,
  tag,
  description,
  image,
  selected,
  onClick,
}) => {
  return (
    <Card
      key={id}
      variant="bordered"
      padding="md"
      className={`relative cursor-pointer transition-all duration-200  border ${
        selected === id ? " border-[#ff8359]" : "border-transparent"
      }`}
    >
      <Card.Body>
        <div className="flex justify-between items-center">
          
   
          <img
            src={Tick}
            alt="Tick"
            className={`
              absolute top-3 right-3 w-6
              transition-opacity duration-200
              ${selected === id ? "opacity-100" : "opacity-0"}
            `}
          />

          {/* LEFT CONTENT */}
          <div className="flex flex-col h-full max-w-[60%]">
            <div>
              <h6
                className="text-[14px] font-bold  
                bg-[linear-gradient(99.68deg,#F08E45_0%,#EE5763_100%)]
                bg-clip-text text-transparent"
              >
                {title}
              </h6>

              <h2
                className="text-[38px] font-bold 
                bg-[linear-gradient(99.68deg,#F08E45_0%,#EE5763_100%)]
                bg-clip-text text-transparent"
              >
                {tag}
              </h2>

              <p className="font-semibold text-[14px] text-[#5C5F62] mt-2">
                {description}
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(id);
                }}
                className="
                  w-[170px] h-[44px]
                  rounded-[30px]
                  bg-[#FF4000]
                  font-bold text-[16px] text-white
                  flex items-center justify-center gap-1
                "
              >
                Proceed
                <ArrowRight size={18} />
              </button>
            </div>
          </div>


          <div className="w-[40%] flex justify-end items-center">
            <img
              src={image}
              alt={tag}
              className="
                h-[260px]   
                w-auto
                object-contain
              "
            />
          </div>

        </div>
      </Card.Body>
    </Card>
  );
};

export default OptionCard;

