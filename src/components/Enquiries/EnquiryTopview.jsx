import React from 'react';
import  Card  from '../../shared/components/ui/Card';
import { useNavigate, useLocation } from 'react-router-dom';

const steps = [
  { label: 'Enquiry', path: '/enquiry' },
  { label: 'Invite for Quotes', path: '/invite-quotes' },
  { label: 'Quotations', path: '/quotations' },
  { label: 'Compare Package', path: '/compare-package' },
  { label: 'Offer & Booking', path: '/offer-booking' },
];

const EnquiryTopview = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();


    const activeIndex = 0;

  return (
    <div className="w-full">
      <Card
        variant="flat"
        padding="sm"
        className="
          bg-transparent       
          border-none
          shadow-none
          sm:bg-[#f0f0f4]       
          sm:border
          sm:shadow-[0_0_12px_3px_rgba(0,0,0,0.05)]
           py-1 px-0.5
        "
      >
        {/* Mobile Stepper */}
        <div className="sm:hidden">
          <div className="relative flex items-center justify-between px-2 py-3">

            <div className="absolute left-3 right-3 top-1/2 h-[2px] bg-gray-300" />

            {steps.map((step, index) => {
              const isActive = index <= activeIndex;

              return (
                <button
                  key={index}
                  onClick={() => navigate(step.path)}
                  className={`
                    relative z-10
                    w-9 h-9
                    rounded-full
                    flex items-center justify-center
                    text-xs
                    font-semibold
                    transition-all
                    ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-300 border border-gray-300 text-gray-600'
                    }
                  `}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>


        {/* DESKTOP  */}
<div className="hidden sm:flex gap-1">
  {steps.map((step, index) => {
    const isActive = step.path === window.location.pathname;

    return (
      <button
        key={index}
        onClick={() => navigate(step.path)}
        className="
          flex-1
          py-1
          flex
          items-center
          justify-center
          text-gray-300
        "
      >
        <span
          className={`
            px-3              /* ⬅ reduced width */
            py-1.5            /* ⬅ reduced height */
            rounded-lg
            text-sm
            font-semibold
            transition-all
            ${
              isActive
                ? 'bg-orange-500 text-white'
                : 'text-gray-800 hover:bg-orange-500 hover:text-white'
            }
          `}
        >
          {step.label}
        </span>
      </button>
    );
  })}
</div>


      </Card>
    </div>
  );
};

export default EnquiryTopview;
