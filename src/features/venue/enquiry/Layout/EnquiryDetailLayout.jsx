import React, { useState, useEffect } from 'react'
import Eyeicon from '@assets/images/eyeicon.svg'
import EnquiryDetailTabs from "@features/venue/enquiry/components/EnquiryDetailTabs"
import Quotationpage from "@/features/venue/enquiry/components/Quotation/Quotationpage"
import ComparePackages from "@/features/venue/enquiry/components/ComparePackages/ComparePackages"
import Offer_booking from "@/features/venue/enquiry/components/OfferBooking/Offer_booking"
import EnquiriesDetail from "@/features/venue/enquiry/pages/EnquiriesDetail"
import useJobDetailStore from "@/features/venue/enquiry/context/useJobDetailStore"
import {
  CircleArrowLeft,
} from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';

const EnquiryDetailLayout = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [activeTab, setActiveTab] = useState('quotations');

  // Key to force tab re-render on eye icon click
  const [tabKey, setTabKey] = useState(0);

  // Zustand store
  const { jobDetail, variants, isLoading, error, fetchJobDetail, clearJobDetail } = useJobDetailStore();

  // Fetch job detail on mount
  useEffect(() => {
    if (jobId) {
      fetchJobDetail(jobId);
    }
    return () => clearJobDetail();
  }, [jobId, fetchJobDetail, clearJobDetail]);

  // Use the name field directly from API (it already has the full heading)
  const heading = jobDetail?.name || 'Loading enquiry details...';

  // Handle eye icon click — show details and reset tabs
  const handleEyeClick = () => {
    setActiveTab('details');
    setTabKey(prev => prev + 1); // force tab component re-mount
  };

  // Render component based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'quotations':
        return <Quotationpage variants={variants} />;
      case 'compare':
        return <ComparePackages />;
      case 'offer':
        return <Offer_booking />;
      case 'details':
        return <EnquiriesDetail jobData={jobDetail} />;
      default:
        return <Quotationpage variants={variants} />;
    }
  };

  if (error) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <p className="text-red-500 font-semibold">Failed to load enquiry details. Please try again.</p>
      </div>
    );
  }

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
                {isLoading ? 'Loading...' : heading}
              </h2>
              <img src={Eyeicon}
                className={`w-8 h-8 ml-20 cursor-pointer transition-all duration-200 ${
                  activeTab === 'details' ? '' : 'grayscale opacity-40'
                }`}
                onClick={handleEyeClick}
              />
            </div>
            <EnquiryDetailTabs 
              key={tabKey}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          
          {/* Render tab content */}
          <div className="mt-4">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#fd4304]"></div>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnquiryDetailLayout
