import React, { useState } from "react";
import { Menu, Package, X } from "lucide-react";
import Navbar from "../../common/Navbar";

import Sidebar from "../../common/Sidebar/Sidebar";
import ProgressBar from "../../common/ProgressBar";
import StepControlFooter from "../../common/StepControlFooter";
import PackageCard from "../../PackageCardComponents/PackageCard";

const DiscoverPackages = ({ steps, currentStep, completedSteps, onBack }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />

<div className="pt-20">
  <div className="flex lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 gap-6 lg:gap-7">

    {/* Sidebar toggle */}
    <button
      onClick={() => setIsSidebarOpen(true)}
      className="lg:hidden fixed top-24 left-4 z-50 bg-white border shadow-md rounded-full p-2"
    >
      <Menu size={22} />
    </button>

    {/* Sidebar */}
    <div
      className={`
        fixed lg:static z-50 lg:z-auto
        top-0 left-0 h-full
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <Sidebar
        steps={steps}
        currentStep={currentStepIndex + 1}
        completedSteps={completedSteps}
      />
    </div>

    {/* Main Content */}
    <div className="flex-1 min-w-0">
      <h2 className="text-2xl font-bold text-[#060606] mb-2">
        Discover Packages
      </h2>

      <p className="text-gray-500 font-semibold max-w-2xl mb-5 text-[16px]">
        Based on your location and event type, restaurants are offering a
        variety of packages with different cuisine combinations.
      </p>

      <ProgressBar value={100} variant="gradient" />
      <PackageCard />

      <StepControlFooter
        onBack={onBack}
        isDiscoverPackages
        isFirstStep={false}
        isLastStep={false}
      />
    </div>
  </div>
</div>

    </>
  );
};

export default DiscoverPackages;
