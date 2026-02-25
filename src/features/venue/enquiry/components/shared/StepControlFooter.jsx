import React from "react";
import { Button } from "@shared/components/ui";
import { Lightbulb } from "lucide-react";

const StepControlFooter = ({ onNext, onBack, isFirstStep, isLastStep, isDiscoverPackagesStep, message }) => {
  return (
    <div className="mt-12 border-t border-gray-200 lg:w-[850px] w-full fixed z-10 bottom-0 bg-white">
      <div className="flex justify-between sm:justify-end items-center gap-4 py-6 px-6">
        {message && (
          <div className="mr-auto flex items-center gap-3 bg-[#FFF5F2] pl-2 pr-6 py-2 rounded-r-xl rounded-l-md border-l-[6px] border-[#ff4000] animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm">
            <div className="bg-[#ff4000] p-1.5 rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Lightbulb size={16} className="text-white fill-white" />
            </div>
            <span className="text-sm text-[#374151] font-medium">{message} {isFirstStep && "of the selected location"}</span>
          </div>
        )}
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirstStep && !isDiscoverPackagesStep}
          className={`flex items-center gap-1 px-6 py-2 rounded-full border border-gray-300 text-[#D7D9DA] font-semibold text-[19px] cursor-pointer ${isFirstStep ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          &larr; Back
        </Button>

        {!isDiscoverPackagesStep && (
          <Button
            onClick={onNext}
            className="px-8 py-2 rounded-full bg-[#ff4000] hover:bg-[#ff5722] text-white mr-4"
          >
            {isLastStep ? "Finish" : "Next"} →
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepControlFooter;
