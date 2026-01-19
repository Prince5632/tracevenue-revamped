const StepItem = ({ step, isLast, index, currentStep }) => {
  const isCompleted = index < currentStep;
  const isActive = index === currentStep;

  return (
    <div className="flex gap-5 relative">
      {/* Icon column with vertical line */}
      <div className="relative flex flex-col items-center">
        {/* Outer circle */}
        <div className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center z-10 relative">
          {/* Inner dot */}
          <div
            className={`w-[18px] h-[18px] rounded-full
              ${isCompleted
                ? "bg-[#15b076]"
                : isActive
                  ? "bg-[#f39c12]"
                  : "bg-white"
              }
            `}
          ></div>
        </div>
        {/* Vertical connecting line */}
        {!isLast && (
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[2px] h-full bg-white z-0"></div>
        )}
      </div>

      {/* Content column */}
      <div className="pb-3">
        <h3 className="font-semibold text-base text-gray-900 m-0 mb-[1px]">{step.title}</h3>
        <p className="text-xs text-[#5c5f62] m-0 max-w-[235px] leading-snug">
          {step.subtitle}
        </p>
      </div>
    </div>
  );
};

export default StepItem;

