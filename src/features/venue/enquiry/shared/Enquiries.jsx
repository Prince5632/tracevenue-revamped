import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";
import Header from './Header';
import EnquiryCard from './EnquiryCard';

const Enquiries = () => {
  const [val, setVal] = useState('')
  const [sortBy, setSortBy] = useState('latest');
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

  // function to get preferred date
  const getPreferredDate = (item) => {   // item = jobs.data[0]
    return Object.keys(
      item?.eventDateOptions?.preferredDates?.[0] || {}
    )[0];
  };

  // function for sorting
  const sortedData = useMemo(() => {
    if (!jobs?.data) return [];

    const dataCopy = [...jobs.data];

    // Latest Enquiries (by createdAt)
    if (sortBy === "latest") {
      return dataCopy.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Negative->a , positive->b
      );
    }

    // Nearest Event Date (by preferredDates)
    if (sortBy === "nearest") {
      const today = new Date();

      return dataCopy
        .filter((item) => {
          const dateStr = getPreferredDate(item);
          return dateStr && new Date(dateStr) >= today;
        })
        .sort((a, b) => {
          const aDate = new Date(getPreferredDate(a));
          const bDate = new Date(getPreferredDate(b));
          return aDate - bDate;
        });
    }

    return dataCopy;
  }, [jobs, sortBy]);


  // Function for filter the enquiry name
  const filteredData = useMemo(() => {
  if (!val) return sortedData;

  return sortedData.filter((item) =>
    item.name.toLowerCase().includes(val.toLowerCase())
  );
}, [sortedData, val]);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading enquiries</div>;


  

  return (
    <div>
      <Header heading={status} setSortBy={setSortBy} val={val} setVal={setVal}/>

      {filteredData.length>0 ? 
      filteredData.map((item)=>{
        return <EnquiryCard key={item.id} data={item}/>
      }): <h1 className='mt-5 font-bold'>No {status} Enquiries</h1>
    }
      
    </div>
  )
}

export default Enquiries
