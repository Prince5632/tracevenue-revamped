import React, { useState } from 'react'
import Eyeicon from '@assets/images/eyeicon.svg'
import EnquiryDetailTabs from "@features/venue/enquiry/components/EnquiryDetailTabs"
import Quotationpage from "@/features/venue/enquiry/components/Quotation/Quotationpage"
import ComparePackages from "@/features/venue/enquiry/components/ComparePackages/ComparePackages"
import Offer_booking from "@/features/venue/enquiry/components/OfferBooking/Offer_booking"
import EnquiriesDetail from "@/features/venue/enquiry/pages/EnquiriesDetail"
import {
  CircleArrowLeft,
} from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';

const EnquiryDetailLayout = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [activeTab, setActiveTab] = useState('quotations');

  // Render component based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'quotations':
        return <Quotationpage />;
      case 'compare':
        return <ComparePackages />;
      case 'offer':
        return <Offer_booking />;
      case 'details':
        return <EnquiriesDetail />;
      default:
        return <Quotationpage />;
    }
  };

  return (
    <div className='w-full flex gap-8'>
      {/**Main Content*/}
      <div className='w-full flex flex-col'>
        <div className='sticky top-0 z-10 bg-white'>
          <div className='p-1'>
            <div className="flex items-center gap-3 mb-2">
              <CircleArrowLeft 
                size={36} 
                color="#fd4304" 
                className="cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h2 className="font-bold text-2xl">
                Looking venue for kitty party for 30 people on 10 Jan, 2026
              </h2>
              <img src={Eyeicon}
                className={
                  `w-8 h-8 ml-20 cursor-pointer transition `}
                onClick={() => setActiveTab('details')}
              />
            </div>
            <EnquiryDetailTabs 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          
          {/* Render tab content */}
          <div className="mt-4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnquiryDetailLayout
