import { Card } from "../common";
import { GradientText } from "../common";
import tickImg from "../../assets/step3/tick.png";  

const EventCard = ({ title, image, selected, onClick }) => {
  return (
    <Card
      onClick={onClick}
      variant="bordered"
      className={`
          relative bg-[#FFF7F3]
          rounded-[6px] cursor-pointer
          transition-all duration-200
          h-[120px] px-4 py-3
          flex items-center justify-between gap-4
          hover:shadow-lg shadow-orange-100 hover:scale-110
    
      `}
    >
      { selected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#FF4000] flex items-center justify-center">
          <img src={tickImg} alt="tick" />
        </div>
      ) }
      <Card.Header className="flex-1">
        <p className="m-0">
          <GradientText
            className="
                text-base
                font-extrabold
                tracking-[0.02em]
                leading-[1.25]
                bg-gradient-to-r from-[#f08e45] to-[#ee5763]
                bg-clip-text text-transparent
                line-clamp-2
                overflow-hidden
                min-h-[2.5em]
                pr-4
                absolute
                top-3
                max-w-[60%] "
          >
            {title}
          </GradientText>
        </p>
      </Card.Header>

      <Card.Body className="flex-shrink-0">
        <img
          src={image}
          alt={title}
          className=" w-[72px] h-[72px] object-contain flex-shrink-0 absolute bottom-0 right-3 z-10"
        />
      </Card.Body>
    </Card>
  );
};

export default EventCard;
