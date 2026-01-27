import React, { useEffect } from "react";
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";
import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../components/DashboardCard";
import { Badge, Card, Divider, GradientText } from "@/shared";
import NumberedCard from "../components/NumberedCard";

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
      <DashboardHeader />
      <DashboardCard />

      {/* Card section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

      <NumberedCard 
      src="src\assets\dashboard\three-line-list.svg"
      count={12}
      title="Active Enquiries"/>

      <NumberedCard src="src\assets\dashboard\clock.svg"
        count={10}
        title="Pending Responses" 
      />

      <NumberedCard src="src\assets\dashboard\check-green.svg"
        count={10}
        title="Completed Bookings"
      />
      </div>

      {/* Upcoming events */}

     <Card variant="default" className="mt-4">
      <Card.Header>
        <h3 className="font-semibold text-xl text-[#212529]">Upcoming events</h3>
      </Card.Header>

      <Card.Body>
            <Card className=''>
                <Card.Header>
                   <div className="flex justify-between relative">
                    <GradientText className="text-xl font-bold tracking-tighter">Looking venue for birthday party </GradientText>
                    <div className="absolute right-1">
                      <Badge variant="success">Active</Badge>
                    </div>
                   </div>
                </Card.Header>

                <Card.Body className="flex justify-between">
                    {/* locate */}
                    <div className="flex gap-2">
                      <img src="src\assets\dashboard\location.svg" alt="" />
                      <h4 className='text-gray-400 font-semibold '>Sector 73, Mohali</h4>
                    </div>

                    {/* calender */}
                    <div className="flex gap-2">
                      <img src="src\assets\dashboard\calendar.svg" alt="" />
                      <h4 className="font-bold">28 january, 2026</h4>
                    </div>
                </Card.Body>
            </Card>
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
