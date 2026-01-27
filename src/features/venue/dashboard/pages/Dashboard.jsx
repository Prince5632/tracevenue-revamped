import React, { useEffect } from "react";
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";
import DashboardTitle from "../components/DashboardTitle";
import { ArrowRight } from 'lucide-react'
import { Button, Card, Divider} from "@/shared";
import DashboardAnalytics from "../components/DashboardAnalytics";
import DashboardEventCard from "../components/DashboardEventCard";


const Dashboard = () => {
  const { fetchDashboardStats, dashboardStats, error, isLoading } =
    useDashboard();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  useEffect(() => {
    if (dashboardStats) {
      console.log("Dashboard Data (Context):", dashboardStats);
    }
  }, [dashboardStats]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading dashboard data</div>;

  return <>

  <div className="flex flex-col mt-8 gap-4 w-full">

      <DashboardTitle/>

      {/* Card */}
      <div className="bg-linear-to-r from-[#f08e45] to-[#ee5763] rounded-2xl mt-4 p-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-center w-full">
      
            {/* Text Section */}
            <div className="md:text-left">
              <h1 className="font-bold text-2xl md:text-3xl text-white">
                Hi Prince! Ready to plan your next event?
              </h1>
              <h2 className="text-white font-semibold text-md mt-2">
                Quick actions to start planning or view your activity.
              </h2>
            </div>
      
            {/* Button Section */}
            <div className="flex justify-center items-center md:mt-10 md:justify-end">
              <Button 
                variant="outline" 
                rightIcon={<ArrowRight />}
                className="bg-white whitespace-nowrap"
              >
                Plan My Event
              </Button>
            </div>
      
      </div>


      {/* Card section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

      <DashboardAnalytics 
      src="src\assets\dashboard\three-line-list.svg"
      count={12}
      title="Active Enquiries"/>

      <DashboardAnalytics src="src\assets\dashboard\clock.svg"
        count={10}
        title="Pending Responses" 
      />

      <DashboardAnalytics src="src\assets\dashboard\check-green.svg"
        count={10}
        title="Completed Bookings"
      />
      </div>


      {/* Upcoming events */}

     <Card variant="default" className="mt-4">
      <Card.Header>
        <h3 className="font-semibold text-xl text-[#212529]">Upcoming events</h3>
      </Card.Header>

      <Card.Body className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
         <DashboardEventCard/>
         <DashboardEventCard/>
         <DashboardEventCard/>
         <DashboardEventCard/>
      </Card.Body>

     </Card>

     {/* Event Section */}
     <div className="w-full grid lg:grid-cols-2 gap-4 my-4">
      {/* Event card */}
      <Card className='w-full'>
        <Card.Header>
          <h2 className="font-bold text-xl">Event Planning Tips</h2>
        </Card.Header>

        <Divider/>

        <Card.Body>
          <div className="flex items-center gap-2 mt-2">
            <div>
              <img src="src\assets\dashboard\event-plan.svg"/>
            </div>
            <div className="font-bold">Plan Early</div>
          </div>
            <p className="text-lg">
              Book your venue and catering at least 3-4 weeks ahead to avoid last-minute stress.
            </p>
        </Card.Body>

        <Card.Footer>

      <div className="flex gap-2 items-center">
            <div>
              <img src="src\assets\dashboard\compare.svg"/>
            </div>
            <div className="font-bold">Compare Packages</div>
        </div>
        <p>
          Book your venue and catering at least 3-4 weeks ahead to avoid last-minute stress.
        </p>
        </Card.Footer>
      </Card>
     {/* Recent Activity Card */}
       <Card>
          <Card.Header className="font-semibold text-2xl text-gray-600">Recent Activity</Card.Header>
          <Card.Body className="font-bold text-secondary">No Recent Activity</Card.Body>
       </Card>
     </div>
    </div>
  </>;
};

export default Dashboard;
