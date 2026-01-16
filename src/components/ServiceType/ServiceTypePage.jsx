import { useState } from "react";
import QuestionTitle from "./Questiontitle";
import OptionCard from "./OptionCard";
import serviceOptions from "../../data/serviceOptions";

const ServiceTypePage = () => {
  const [selectedOption, setSelectedOption] = useState("catering");
  return (
    <>
      <QuestionTitle />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {serviceOptions.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            tag={option.tag}
            description={option.description}
            image={option.image}
            selected={selectedOption === option.id}
            onClick={() => setSelectedOption(option.id)}
          />
        ))}
      </div>
    </>
  );
};

export default ServiceTypePage;
