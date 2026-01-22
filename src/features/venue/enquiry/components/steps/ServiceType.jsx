import { useState } from "react";
import { QuestionTitle, OptionCard } from "@features/venue/components";
import { serviceOptions } from "@features/venue/enquiry/constants";

const ServiceTypePage = ({
  formData,
  updateFormData,
  urlParams
}) => {
  const { serviceType } = formData;
  return (
    <>
      <h1 className="text-xl font-semibold text-[#242424] mb-6">What are you looking for?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {serviceOptions.map((option) => (
          <OptionCard
            key={option.id}
            title={option.heading}
            tag={option.serviceType}
            description={option.description}
            image={option.image}
            selected={serviceType === option.id}
            onClick={() => { updateFormData("serviceType", option.id) }}
          />
        ))}
      </div>
    </>
  );
};

export default ServiceTypePage;
