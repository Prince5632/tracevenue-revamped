import Tick from "@assets/images/tick.png";
import { Card } from "@shared/components/ui";
const OptionCard = ({ id, title, tag, description, image, selected, onClick }) => {
  return (
    <Card
      key={id}
      variant="bordered"
      padding="md"
      onClick={() => {
        onClick()
      }}
      className={`cursor-pointer transition-all duration-200 ${selected === id
        ? "border border-[#ff8359]"
        : "border-none"
        }`}
    >
      {image && (
        <Card.Header>
          <div className="flex">
            <div
              className="
                    flex 
                    flex-col 
                    justify-between "
            >
              <div className="h-6">
                <img
                  src={Tick}
                  alt="Tick"
                  className={`transition-opacity duration-200 ${selected === id
                    ? "opacity-100"
                    : "opacity-0"
                    }`}
                ></img>
              </div>

              <div>
                <h6
                  className="
                        w-23  
                        font-bold 
                        text-[14px] 
                        bg-[linear-gradient(99.68deg,#F08E45_0%,#EE5763_100%)] 
                        bg-clip-text 
                        text-transparent"
                >
                  {title}
                </h6>
                <h1
                  className="w-35 
                        font-bold 
                        font-2xl 
                        text-[30px] 
                        bg-[linear-gradient(99.68deg,#F08E45_0%,#EE5763_100%)] 
                        bg-clip-text 
                        text-transparent"
                >
                  {tag}
                </h1>
              </div>
            </div>
            <img
              src={image}
              alt={tag}
              className="
                      block 
                      mr-0 
                      ml-auto 
                      sm:w-[48%] 
                      w-[45%]
                      sm:h-37 
                      h-25"
            />
          </div>
        </Card.Header>
      )}
      <Card.Body>
        <p
          className="
                font-semibold 
                text-[14px] 
                text-[#5C5F62] "
        >
          {description}
        </p>
      </Card.Body>
    </Card>
  );
};

export default OptionCard;
