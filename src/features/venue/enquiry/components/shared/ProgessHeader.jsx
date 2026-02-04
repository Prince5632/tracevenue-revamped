import { ProgressBar } from "@shared/components/feedback";

const ProgressHeader = ({ currentStep, totalSteps, title, subtitle }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <p className="text-[14px] font-semibold text-[#5C5F62] mb-1 hidden lg:block">
        Step {currentStep}/{totalSteps}
      </p>
      <h1 className="text-2xl font-bold text-[#060606] mb-1">{title}</h1>
      <p className="text-gray-400 font-medium text-2xl max-w-2xl mb-5 tracking-loose">
        {subtitle}
      </p>
      <ProgressBar
        variants="gradient"
        value={progressPercentage}
        className="mt-4"
      />
    </div>
  );
};

export default ProgressHeader;
