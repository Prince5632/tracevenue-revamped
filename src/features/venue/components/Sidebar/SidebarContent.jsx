import { serviceOptions } from "@features/venue/enquiry/constants";

const SidebarContent = ({ step, isLast, index, currentStep, formData }) => {
  const isCompleted = index < currentStep;
  const isActive = index === currentStep;
  return (
    <div className="flex gap-5 ">
      <div className="flex flex-col items-center">
        <div className="w-[24px] h-[24px] rounded-full bg-[#FFFFFF] border-[1px] border-[#D7D9DA] flex items-center justify-center">
          <div
            className={`w-[18px] h-[18px] rounded-full
              ${isCompleted
                ? "bg-[#15b076]"
                : isActive
                  ? "bg-[#FF4000] border-white"
                  : "border border-white bg-[#fff]"
              }
            `}
          ></div>
        </div>

        {!isLast && <div className="w-[3px] flex-1 bg-[#FFFFFF] "></div>}
      </div>

      <div className="-mt-1 leading-[18px] mb-4">
        <h6 className={`font-bold text-[16px] ${isActive ? 'text-[#060606]' : 'text-[#060606]'}`}>
          {step.title}
        </h6>

        {step.id === 'location' && formData?.locations ? (
          <div className="mt-1">
            <p className="text-[#060606] text-[13px] font-medium line-clamp-2">
              {formData.locations}
            </p>
            {formData?.radius && (
              <p className="text-[#5C5F62] text-[12px]">
                Within {formData.radius} km
              </p>
            )}
          </div>
        ) : step.id === "service_type" && formData?.serviceType ?
          <div className="mt-1">
            <p className="text-[#060606] text-[13px] font-medium line-clamp-2">
              {serviceOptions.find(opt => opt.id === formData.serviceType)?.serviceType || formData.serviceType}
            </p>
          </div>
          : (
            <span className="text-[#5C5F62] text-[12px] font-semibold leading-medium">
              {step.subtitle}
            </span>
          )}
      </div>
    </div>
  );
};

export default SidebarContent;
