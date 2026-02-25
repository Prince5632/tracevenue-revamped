import { useEffect, useState } from "react";

import { serviceOptions } from "@features/venue/enquiry/constants";
import { decodeServiceTypeFromUrl } from "@features/venue/enquiry/utils";
import useEnquiryStore from "../../context/useEnquiryStore";
import OptionCard from "../ServiceTypeComponents/OptionCard";

const ServiceTypePage = ({ urlParams = {}, onNext }) => {
  // Use global store
  const { formData, updateFormData } = useEnquiryStore();
  const [autoNext, setAutoNext] = useState(false);

  const handleSelect = (id) => {
    updateFormData("serviceType", id);
    setAutoNext(true);
  };

  useEffect(() => {
    if (autoNext && formData.serviceType && onNext) {
      onNext();
      setAutoNext(false);
    }
  }, [autoNext, formData.serviceType, onNext]);

  return (
    <>
      <h1 className="text-xl font-semibold text-[#242424] mb-6">
        What are you looking for?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
        {serviceOptions.map((option) => (
          <OptionCard
            key={option.id}
            id={option.id}
            title={option.heading}
            tag={option.serviceType}
            description={option.description}
            image={option.image}
            selected={formData.serviceType}
            onClick={() => handleSelect(option.id)}
          />
        ))}
      </div>
    </>
  );
};

export default ServiceTypePage;
