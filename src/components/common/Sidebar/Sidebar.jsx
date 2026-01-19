import React from 'react';
import illustration from "../../../assets/images/illustration.png";
import StepItem from './StepItem';


const Sidebar = ({ steps, currentStep, completedSteps = [] }) => {
  return (
    <aside className="relative lg:w-[360px] min-h-[572px] bg-[#f0f0f4] rounded-3xl flex flex-col border border-gray-300 lg:sticky lg:top-6 overflow-hidden">
      {/* Ribbon Header Section */}
      <div className="relative mb-4">
        {/* Background extension for ribbon effect */}
        <div className="absolute -left-8 top-0 w-8 h-full bg-gradient-to-r from-[#f39c12] to-[#ee9c29]"></div>
        {/* Main ribbon */}
        <h1
          className="text-2xl font-bold text-white py-2 px-4 bg-gradient-to-r from-[#f39c12] to-[#e74c3c] -ml-1 mt-3"
          style={{ clipPath: 'polygon(0px 0, 100% 0, calc(100% - 20px) 50%, 100% 100%, 0 100%)' }}
        >
          Plan Your Event in Minutes
        </h1>
      </div>

      {/* Steps Section */}
      <ul className="flex-1 ml-7 z-10 mt-4 mb-[73px] list-none p-0">
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
      </ul>

      {/* Footer Illustration */}
      <div className="w-full absolute z-0 left-0 bottom-0">
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
