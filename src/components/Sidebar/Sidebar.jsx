import React from 'react';
import illustration from "../../assets/images/illustration.png";
import StepItem from './StepItem';
import header from "../../assets/images/header.png";


const Sidebar = ({ steps, currentStep, completedSteps = [], isSidebarOpen }) => {
  return (
    <aside className={`relative w-full max-w-[340px] min-w-[280px] sm:max-w-[380px] md:max-w-[380px] lg:max-w-[340px] ${isSidebarOpen ? "rounded-none mt-0 mb-0 h-lvh sm:h-lvh" : "rounded-3xl "} lg:h-auto bg-[#F2F3F5] lg:rounded-4xl 
    flex flex-col border border-gray-300 lg:sticky lg:top-6 lg:-mt-2 `}>
      {/* Header Image Section */}
      <div className="relative mt-4 pr-10">
        <img src={header} alt="header" className="w-full " />

        <h2 className="absolute inset-0 flex items-center text-white 
        text-2xl font-bold z-10 ml-10 leading-none">
          Plan Your Event in <br />Minutes
        </h2>
      </div>

      {/* Steps Section */}
      <div className="flex-1 ml-7 z-10 mt-2 pr-8 ">
        {steps.map((step, index) => {
          return (
            <li key={step.id}>
              <StepItem
                step={{ ...step, subtitle: step.description }}
                index={index + 1}
                currentStep={currentStep}
                isLast={index === steps.length - 1}
              />
            </li>
          );
        })}
      </div>

      {/* Footer Illustration */}
      <div className="w-full left-0 -mt-12">
        <img
          src={illustration}
          alt="Tracevenue illustration"
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
