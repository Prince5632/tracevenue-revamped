import React from 'react';
import header from "../../../assets/images/header.png";
import illustration from "../../../assets/images/illustration.png";
import StepItem from './StepItem';


const Sidebar = ({ steps, currentStep, completedSteps = [] }) => {
  return (
    <aside className="relative  lg:w-[360px] h-[572px] bg-[#F2F3F5] rounded-3xl flex flex-col border border-gray-300 lg:sticky lg:top-6">
      {/* Header Image Section */}
      <div className="relative mt-3 pr-6">
        <img src={header} alt="header" className="w-full rounded-t-3xl" />

        <h2 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold z-10 px-9">
          Plan Your Event in Minutes
        </h2>
      </div>

      {/* Steps Section */}
      <div className="flex-1 ml-7 z-10">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);

          return (
            <StepItem
              key={step.id}
              step={{ ...step, subtitle: step.description }}
              index={index + 1}
              currentStep={currentStep}
              isLast={index === steps.length - 1}
            />
          );
        })}
      </div>

      {/* Footer Illustration */}
      <div className="w-full absolute z-0 left-0 bottom-0 ">
        <img
          src={illustration}
          alt="illustration"
          className="w-full"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
