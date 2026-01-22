const SidebarContent = ({ step, isLast, index, currentStep, formData }) => {
  const isCompleted = index < currentStep;
  const isActive = index === currentStep;
  return (
    <div className="flex gap-5 ">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 rounded-full bg-[#fff] border-[1px] border-[#D7D9DA] flex items-center justify-center">
          <div
            className={`w-5 h-5 rounded-full
              ${isCompleted
                ? "bg-[#15b076]"
                : isActive
                  ? "bg-[#FF4000] border-white"
                  : "border border-[#D7D9DA] bg-[#fff]"
              }
            `}
          ></div>
        </div>

        {!isLast && <div className="w-[3px] h-full bg-[#FFFFFF] "></div>}
      </div>

      <div className="-mt-1 leading-[18px] mb-4">
        <h6 className={`font-semibold text-[16px] ${isActive ? 'text-[#060606]' : 'text-[#888]'}`}>
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
              {formData?.serviceType}
            </p>
          </div>
          : (
            <span className="text-[#5C5F62] text-[12px] leading-medium">
              {step.subtitle}
            </span>
          )}
      </div>
    </div>
  );
};

export default SidebarContent;
