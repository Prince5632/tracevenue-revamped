import React from "react";
import Card from "../../common/Card";
import Venue from "../../../assets/images/venue.png";
import Catering from "../../../assets/images/catering.png";
import Tick from "../../../assets/images/tick.png";

const ServiceType = () => {
  const services = [
    {
    
      heading: "Discover",
      sub_heading: "Venue",
      description:
        "Discover verified banquet halls, farmhouses, rooftops in Tricity that match your guest list, style, and budget in just a few clicks.",
      image: Venue,
    },
    {
     
      heading: "Plan",
      sub_heading: "Catering",
      description:
        "Plan customized catering with complete service teams so your guests enjoy seamless food and hospitality across the tri-city.",
      image: Catering,
    },
  ];

  return (
    <>
      <main>
        <div
          className="
        w-full  
        mb-6"
        >
          <h1
            className="
          font-bold 
          text-[20px] 
          text-[#060606]"
          >
            What are you looking for?
          </h1>
        </div>
        <div
          className="
        flex 
        flex-wrap 
        sm:flex-nowrap 
        gap-3 "
        >
          {services.map((service, index) => (
            <Card key={index} variant="bordered" padding="md">
              {service.image && (
                <Card.Header>
                  <div className="flex">
                    <div
                      className="
                    flex 
                    flex-col 
                    justify-between "
                    >
                      <div >
                        <img src={Tick} alt="Tick" />
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
                          {service.heading}
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
                          {service.sub_heading}
                        </h1>
                      </div>
                    </div>
                    <img
                      src={service.image}
                      alt={service.sub_heading}
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
                  {service.description}
                </p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};

export default ServiceType;
