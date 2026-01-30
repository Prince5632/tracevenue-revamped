import React from 'react';
import { Button } from './index';

const StepControlFooter = ({ onNext, onBack, isFirstStep, isLastStep }) => {
  return (
    <div className="fixed bottom-0 w-full z-50 border-t border-gray-200 bg-white ">
      <div
        className="
          max-w-4xl
          px-4 py-2
          sm:py-4  
          flex items-center gap-4
          justify-between
          sm:justify-end
        "
      >
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isFirstStep}
          className={`flex items-center gap-1 px-8 py-2 rounded-full border border-gray-300 text-[#D7D9DA] font-semibold text-[19px] ${
            isFirstStep ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          ← Back
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


