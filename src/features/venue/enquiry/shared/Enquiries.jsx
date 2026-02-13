import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";
import Header from './Header';
import EnquiryCard from './EnquiryCard';

const Enquiries = () => {
  const { status } = useParams();
  console.log("Status",status);

  const { fetchJobsByStatus, jobs, error, isLoading } = useDashboard();

  const getApiStatus = (urlStatus) => {
    if (!urlStatus) return 'Active';
    const lower = urlStatus.toLowerCase();
    if (lower === 'draft') return 'Draft';
    if (lower === 'active') return 'Active';
    if (lower === 'completed') return 'Closed';
    if (lower === 'expired') return 'InActive';
    return urlStatus.charAt(0).toUpperCase() + urlStatus.slice(1);
  };
  

  const apiStatus = getApiStatus(status);

  useEffect(() => {
    // Only fetch if status changes
    fetchJobsByStatus(apiStatus);
  }, [apiStatus, fetchJobsByStatus]);

  useEffect(() => {
    if (jobs) {
      console.log(`Enquiries Data (${apiStatus}) (Context):`, jobs);
    }
  }, [jobs, apiStatus]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading enquiries</div>;

  return (
    <div>
      <Header heading={status}/>

      {jobs?.data?.length>0 ? 
      jobs?.data?.map((item)=>{
        return <EnquiryCard key={item.id} data={item}/>
      }): <h1 className='mt-5 font-bold'>No {status} Enquiries</h1>
    }
      
    </div>
  )
}

export default Enquiries
