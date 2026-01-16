import { useState } from "react";
import StepItem from "./StepItem";

const Sidebar = ({ steps, currentStep }) => {
  return (
    <aside className="relative  lg:w-[360px] h-[572px] bg-[#F2F3F5] rounded-3xl flex flex-col border border-gray-300 lg:sticky lg:top-6" >
      <div className="relative mt-3 pr-6">
        <img src="./header.png" alt="header" className="w-full rounded-t-3xl" />

        <p className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold z-10 px-9">
          Plan Your Event in Minutes
        </p>
      </div>

      <div className="flex-1 ml-7 z-10">
        {steps.map((step, index) => (
          <StepItem
            key={step.id}
            step={step}
            index={index + 1}
            currentStep={currentStep}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>

      <div className="w-full absolute z-0 left-0 bottom-0 ">
        <img src="./illustration.png" alt="illustration" className="w-full" />
      </div>
    </aside>
  );
};

export default Sidebar;
