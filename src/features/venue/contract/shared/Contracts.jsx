import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";
import ContractHeader from './ContractHeader';
import ContractCard from './ContractCard';
import EmptyContracts from './EmptyContracts';

const Contracts = () => {
  const { status } = useParams();
  console.log("Contract Status:", status);

  const { fetchContractsByType, contracts, error, isLoading } = useDashboard();

  const getApiType = (urlStatus) => {
    if (!urlStatus) return 'Approved';
    const lower = urlStatus.toLowerCase();
    if (lower === 'active') return 'Approved';
    if (lower === 'proposed') return 'Pending';
    if (lower === 'completed') return 'Completed';
    return urlStatus.charAt(0).toUpperCase() + urlStatus.slice(1);
  };

  const apiType = getApiType(status);

  useEffect(() => {
    fetchContractsByType(apiType);
  }, [apiType, fetchContractsByType]);

  useEffect(() => {
    if (contracts) {
      console.log(`Contracts Data (${apiType}) (Context):`, contracts);
    }
  }, [contracts, apiType]);

  if (isLoading) {
    return (
      <div className="w-full">
        <ContractHeader heading={status} />
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='flex flex-col items-center gap-4'>
            <div className='w-12 h-12 border-4 border-[#FF8B3D] border-t-transparent rounded-full animate-spin'></div>
            <p className='text-[#6B7280] text-lg'>Loading contracts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <ContractHeader heading={status} />
        <div className='flex items-center justify-center min-h-[400px]'>
          <div className='rounded-[20px] px-8 py-12 bg-[#FEE2E2] w-full max-w-3xl'>
            <div className='flex flex-col items-center text-center'>
              <p className='text-[#DC2626] text-xl font-medium'>
                Error loading contracts. Please try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ContractHeader heading={status} />

      {contracts?.data?.length > 0 ? 
        contracts?.data?.map((item) => {
          return <ContractCard key={item._id || item.id} data={item} />
        }) : <EmptyContracts status={status} />
      }
    </div>
  )
}

export default Contracts
