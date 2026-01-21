const StepItem = ({ step, isLast, index, currentStep }) => {
  const isCompleted = index < currentStep;
  const isActive = index === currentStep;

  return (
    <div className="flex gap-3 ">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 rounded-full border border-[#D7D9DA] flex items-center justify-center">
          <div
            className={`w-[18px] h-[18px] rounded-full
              ${isCompleted
                ? "bg-[#15b076]"
                : isActive
                  ? "border-2 bg-[#FF4000] border-1 border-white"
                  : "border border-[#D7D9DA] bg-[#fff]"
              }
            `}
          ></div>
        </div>

        {!isLast && <div className="w-[3px] h-full bg-[#FFFFFF] "></div>}
      </div>

      <div className='-mt-1 leading-[18px] mb-3'>
        <h6 className="font-semibold text-[#060606] text-[16px]">{step.title}</h6>
        <span className="text-[#5C5F62] text-[12px]  leading-medium">
          {step.subtitle}
        </span>
      </div>
    </div>
  );
};

export default StepItem;

