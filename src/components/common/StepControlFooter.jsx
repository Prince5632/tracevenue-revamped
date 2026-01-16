import React from 'react';
import { Button } from './index';

const StepControlFooter = ({ onNext, onBack, isFirstStep, isLastStep }) => {
    return (
        <div className="mt-12 border-t border-gray-200 w-full sticky z-10 bottom-0 bg-white">
            <div className="flex justify-between sm:justify-end items-center gap-4 py-6">
                <Button
                    variant="outline"
                    onClick={onBack}
                    disabled={isFirstStep}
                    className={`flex items-center gap-1 px-6 py-2 rounded-full border border-gray-300 text-[#D7D9DA] font-semibold text-[19px] cursor-pointer ${isFirstStep ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    &larr; Back
                </Button>

        <Button
          onClick={onNext}
          className="px-8 py-2 rounded-full bg-[#ff4000] hover:bg-[#ff5722] text-white mr-4"
        >
          {isLastStep ? 'Finish' : 'Next'} →
        </Button>
      </div>
    </div>
  );
};

export default StepControlFooter;


