const StepItem = ({ step, isLast, index, currentStep }) => {
  const isCompleted = index < currentStep;
  const isActive = index === currentStep;

  return (
    <div className="flex gap-3 mb-1">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center
            ${
              isCompleted
                ? "border-2 bg-[#15b076]  border-1 border-white"
                : isActive
                ? "border-2  bg-[#f39c12] border-1 border-white"
                : "border border-gray-300"
            }
          `}
          ></div>
        </div>

        {!isLast && <div className="w-[2px] h-full bg-white "></div>}
      </div>

      <div>
        <p className="font-semibold text-gray-900">{step.title}</p>
        <p className="text-[13px] font-semibold text-gray-500 leading-snug max-w-[235px]">
          {step.subtitle}
        </p>
      </div>
    </div>
  );
};

export default StepItem;

