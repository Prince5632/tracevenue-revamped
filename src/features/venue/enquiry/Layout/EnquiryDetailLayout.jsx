import React from 'react'
import Eyeicon from '@assets/images/eyeicon.svg'
import EnquiryDetailTabs from "@features/venue/enquiry/components/EnquiryDetailTabs"
import {
  CircleArrowLeft,
} from "lucide-react";
import { Outlet, useNavigate } from 'react-router-dom';



const EnquiryDetailLayout = ({ enquiryData }) => {
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
                {enquiryData?.name}
              </h2>
              <img src={Eyeicon}
                className={
                  `w-8 h-8 ml-20 cursor-pointer transition `}
                onClick={() => navigate(`/service/venues/enquiry/details/${enquiryData?.id}`)}
              />
            </div>
            <EnquiryDetailTabs />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default EnquiryDetailLayout
