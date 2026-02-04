import { useEffect } from "react";

import { serviceOptions } from "@features/venue/enquiry/constants";
import { decodeServiceTypeFromUrl } from "@features/venue/enquiry/utils";
import useEnquiryStore from "../../context/useEnquiryStore";
import OptionCard from "../ServiceTypeComponents/OptionCard";

const ServiceTypePage = ({ urlParams = {} }) => {
  // Use global store
  const { formData, updateFormData } = useEnquiryStore();
  // Hydrate from URL params if formData.serviceType is empty (initial mount via URL)
  useEffect(() => {
    if (!formData.serviceType && urlParams.serviceType) {
      const serviceId = decodeServiceTypeFromUrl(urlParams.serviceType);
      if (serviceId) {
        updateFormData("serviceType", serviceId);
      }
    }
  }, [urlParams.serviceType]);
  return (
    <>
      <h1 className="text-xl font-semibold text-[#242424] mb-6 mx-2">
        What are you looking for?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-2">
        {serviceOptions.map((option) => (
          <OptionCard
            key={option.id}
            id={option.id}
            title={option.heading}
            tag={option.serviceType}
            description={option.description}
            image={option.image}
            selected={formData.serviceType}
            onClick={() => updateFormData("serviceType", option.id)}
          />
        ))}
      </div>
    </>
  );
};

export default ServiceTypePage;
