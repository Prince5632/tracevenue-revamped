import React from 'react';
import Tabs from '@shared/components/ui/Tabs';

const steps = [
  {
    id: "quotations",
    label: "Quotations",
  },
  {
    id: "compare",
    label: "Compare Package",
  },
  {
    id: "offer",
    label: "Offer & Booking",
  },
];

const EnquiryDetailTabs = ({ activeTab, onTabChange }) => {
  const activeIndex = steps.findIndex(step => step.id === activeTab);

  return (
    <div className="w-full">

      {/* MOBILE STEPPER */}
      <div className="sm:hidden">
        <div className="relative flex items-center justify-between px-2 py-3">
          <div className="absolute left-3 right-3 top-1/2 h-0.5 bg-gray-300" />

          {steps.map((step, index) => {
            const isActive = index <= activeIndex;

            return (
              <button
                key={step.id}
                onClick={() => onTabChange(step.id)}
                className={`
                  relative z-10
                  w-8 h-8
                  rounded-full
                  flex items-center justify-center
                  text-xs
                  font-semibold
                  transition-all
                  ${isActive
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-300 text-gray-600'}
                `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/*DESKTOP PILLS*/}
      <div className="hidden sm:block">
        <Tabs
          variant="pills"
          defaultTab={activeTab}
          onChange={onTabChange}
          className="w-full"
          tabs={steps.map(step => ({
            id: step.id,
            label: step.label,
            content: null,
          }))}
        />
      </div>

    </div>
  );
};

export default EnquiryDetailTabs;
