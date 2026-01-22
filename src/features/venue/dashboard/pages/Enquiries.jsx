import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";

const Enquiries = () => {
  const { status } = useParams();
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
    if(jobs) {
        console.log(`Enquiries Data (${apiStatus}) (Context):`, jobs);
    }
  }, [jobs, apiStatus]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading enquiries</div>;

  return (
    <div>Enquiries - {apiStatus}</div>
  )
}

export default Enquiries
