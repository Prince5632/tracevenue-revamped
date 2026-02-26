import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";
import ContractsCard from '../shared/ContractsCard';
const Contract = () => {
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
    fetchJobsByStatus(apiStatus);
  }, [apiStatus, fetchJobsByStatus]);

  useEffect(() => {
    if (jobs) {
      console.log(`Contract Data (${apiStatus}) (Context):`, jobs);
    }
  }, [jobs, apiStatus]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading contracts</div>;

  return (
    <div className='h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 px-2'>
      {/* {isLoading && <div>Loading...</div>}
      {error && <div>Error loading contracts</div>}

      {!isLoading && !error && jobs?.length > 0 &&
        jobs.map((job) => (
          <ContractsCard key={job._id} job={job} />
        ))
      }

      {!isLoading && jobs?.length === 0 && (
        <div>No contracts found</div>
      )} */}

      <ContractsCard/>
      <ContractsCard/>
      <ContractsCard/>
      <ContractsCard/>
      <ContractsCard/>
    </div>
  )
}

export default Contract