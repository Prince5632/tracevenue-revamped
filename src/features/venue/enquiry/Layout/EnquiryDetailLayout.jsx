import React, { useState } from 'react'
import Eyeicon from '@assets/images/eyeicon.svg'
import EnquiryDetailTabs from "@features/venue/enquiry/components/EnquiryDetailTabs"
import {
  CircleArrowLeft,
} from "lucide-react";
import Quotationpage from '../components/Quotation/Quotationpage';
import EnquiriesDetail from '../pages/EnquiriesDetail';
import { Outlet,useNavigate } from 'react-router-dom';



const EnquiryDetailLayout = () => {
    // const [showDetailPage, setShowDetailPage] = useState(false);
    const navigate = useNavigate();
  return (
    <div className='w-full flex gap-8'>
      {/**Main Content*/}
      <div className='w-full  flex flex-col'>
      <div className='sticky top-0 z-10 bg-white'>
      <div className='p-1'>
      <div className="flex items-center gap-3 mb-2">
        <CircleArrowLeft size={36} color="#fd4304" />
        <h2 className="font-bold text-2xl">
          Looking venue for kitty party for 30 people on 10 Jan, 2026
        </h2>
        <img src={Eyeicon}   
        className={
          `w-8 h-8 ml-20 cursor-pointer transition `} 
          // onClick={() => setShowDetailPage(<EnquiriesDetail/>)}
          onClick={() =>navigate("/service/venues/enquiry/enquiry-detail-layout/detail")}
        />
      </div>
        <EnquiryDetailTabs/>
    </div>
       
       {/* {!showDetailPage
       ?(<Quotationpage/>):(<EnquiriesDetail/>)} */}

       <Outlet/>
   </div>
   </div>
   </div>
  )
}

export default EnquiryDetailLayout
