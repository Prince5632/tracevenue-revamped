import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";
import Header from './Header';
import EnquiryCard from './EnquiryCard';

const data = [
  {
    "id": 1,
    "lookingFor": "venue",
    "event": "Wedding Reception",
    "date": "14 Feb",
    "day": "Saturday",
    "startTime": "6:00 PM",
    "endTime": "11:00 PM",
    "pricingType": "per-person",
    "minGuests": 200,
    "maxGuests": 250,
    "amountRange": "₹2200 - ₹2800",
    "location": "Gurugram, Haryana",
    "enquiryRaised": "1 week ago",
    "enquiryRaisedDays": 7,
    "eventDateISO": "2026-02-14"
  },
  {
    "id": 2,
    "lookingFor": "venue",
    "event": "Corporate Annual Meet",
    "date": "30 Jan",
    "day": "Friday",
    "startTime": "9:00 AM",
    "endTime": "4:00 PM",
    "pricingType": "lump-sum",
    "minGuests": 80,
    "maxGuests": 100,
    "amountRange": "₹4,00,000 - ₹5,00,000",
    "location": "Noida, Uttar Pradesh",
    "enquiryRaised": "3 weeks ago",
    "enquiryRaisedDays": 21,
    "eventDateISO": "2026-01-30"
  },
  {
    "id": 3,
    "lookingFor": "catering",
    "event": "Birthday Party",
    "date": "5 Feb",
    "day": "Thursday",
    "startTime": "5:30 PM",
    "endTime": "9:00 PM",
    "pricingType": "per-person",
    "minGuests": 40,
    "maxGuests": 50,
    "amountRange": "₹1,000 - ₹1,300",
    "location": "South Delhi",
    "enquiryRaised": "1 month ago",
    "enquiryRaisedDays": 30,
    "eventDateISO": "2026-02-05"
  },
  {
    "id": 4,
    "lookingFor": "venue",
    "event": "Engagement Ceremony",
    "date": "28 Jan",
    "day": "Wednesday",
    "startTime": "4:00 PM",
    "endTime": "9:00 PM",
    "pricingType": "lump-sum",
    "minGuests": 120,
    "maxGuests": 150,
    "amountRange": "₹2,50,000 - ₹3,50,000",
    "location": "Faridabad, Haryana",
    "enquiryRaised": "2 weeks ago",
    "enquiryRaisedDays": 14,
    "eventDateISO": "2026-01-28"
  },
  {
    "id": 5,
    "lookingFor": "venue",
    "event": "Product Launch",
    "date": "10 Feb",
    "day": "Tuesday",
    "startTime": "10:00 AM",
    "endTime": "2:00 PM",
    "pricingType": "lump-sum",
    "minGuests": 150,
    "maxGuests": 200,
    "amountRange": "₹5,50,000 - ₹6,50,000",
    "location": "Connaught Place, Delhi",
    "enquiryRaised": "1 week ago",
    "enquiryRaisedDays": 7,
    "eventDateISO": "2026-02-10"
  },
  {
    "id": 6,
    "lookingFor": "catering",
    "event": "Housewarming Party",
    "date": "2 Feb",
    "day": "Monday",
    "startTime": "12:00 PM",
    "endTime": "3:00 PM",
    "pricingType": "per-person",
    "minGuests": 25,
    "maxGuests": 30,
    "amountRange": "₹800 - ₹1,000",
    "location": "Indirapuram, Ghaziabad",
    "enquiryRaised": "2 weeks ago",
    "enquiryRaisedDays": 14,
    "eventDateISO": "2026-02-02"
  }
]
const Enquiries = ({ heading, subheading }) => {
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
  const [sortBy, setSortBy] = useState('latest');

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "latest") {
      // latest enquiry first (smaller days ago)
      return a.enquiryRaisedDays - b.enquiryRaisedDays;
    }

    if (sortBy === "nearest") {
      // nearest event date first
      return new Date(a.eventDateISO) - new Date(b.eventDateISO);
    }

    return 0;
  })

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
      <Header heading={apiStatus} subheading={subheading} sortBy={sortBy} setSortBy={setSortBy} />
      {sortedData.map((elem) => {
        return <EnquiryCard key={elem.id} looking={elem.lookingFor} event={elem.event} date={elem.date} day={elem.day} minGuest={elem.minGuests} maxGuest={elem.maxGuests} amount={elem.amountRange} location={elem.location} pricingType={elem.pricingType} enquiryRaised={elem.enquiryRaised} startTime={elem.startTime} endTime={elem.endTime} />
      })}
    </div>
  )
}

export default Enquiries
