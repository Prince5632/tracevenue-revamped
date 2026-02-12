import React, { useEffect } from "react";
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";
import DashboardTitle from "../components/DashboardTitle";
import { ArrowRight } from 'lucide-react'
import { Button, Card, Divider, GradientText } from "@/shared";
import DashboardAnalytics from "../components/DashboardAnalytics";
import DashboardEventCard from "../components/DashboardEventCard";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const { fetchDashboardStats, dashboardStats, error, isLoading } =
    useDashboard();
  const navigate = useNavigate();
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

  const {
    totalEnquiries = 0,
    totalPendingResponses = 0,
    totalCompletedEnquiries = 0,
  } = dashboardStats?.data?.stats || {}

  const { name = '' } = dashboardStats?.data?.user || {}

  const upcomingEvents = dashboardStats?.data?.upcomingEvents || []
  return <>
    <div className="flex flex-col gap-4 w-full">

      <DashboardTitle />

      {/* Card */}
      <div className="bg-[linear-gradient(95.02deg,#f08e45_0.07%,#ee5763_61.45%)] rounded-4xl p-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-center ">

        {/* Text Section */}
        <div className="md:text-left">
          <h1 className="font-bold text-3xl text-white">
            <span className="bg-linear-to-r from-[#ffd145] to-[#fff9e7] bg-clip-text text-transparent">Hi {name}! </span>
            Ready to plan your next event?
          </h1>
          <h2 className="text-white font-semibold text-md mt-2">
            Quick actions to start planning or view your activity.
          </h2>
        </div>

        {/* Button Section */}
        <div className="flex justify-center items-center mt-4 md:mt-10 md:justify-end">
          <Button
            variant="outline"
            rightIcon={<ArrowRight />}
            className="bg-white hover:text-[#ff4000]! hover:bg-white! absolute whitespace-nowrap"
            onClick={() => navigate("/")}
          >
            Plan My Event
          </Button>
        </div>

      </div>

      {/* Card section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

        <DashboardAnalytics
          src="src\assets\dashboard\three-line-list.svg"
          title="Active Enquiries"
          count={totalEnquiries}
        />

        <DashboardAnalytics
          src="src\assets\dashboard\clock.svg"
          title="Pending Responses"
          count={totalPendingResponses}
        />

        <DashboardAnalytics
          src="src\assets\dashboard\check-green.svg"
          count={totalCompletedEnquiries}
          title="Completed Bookings"
        />
      </div>


      <div>
        {/* Upcoming events */}
        <Card
          variant="default"
          className="min-w-0 flex flex-col"
        >
          <Card.Header>
            <h3 className="font-semibold text-xl text-[#212529]">
              Upcoming events
            </h3>
          </Card.Header>

          <Card.Body className="flex-1 overflow-y-auto grid grid-cols-2 gap-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((item, idx) => (
                <>
                <DashboardEventCard key={idx} data={item} />
                </>
              ))
            ) : (
              <h2 className="font-semibold text-xl text-secondary">
                No Upcoming events
              </h2>
            )}
          </Card.Body>
        </Card>

      </div>

      {/* Recent Activity Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className='w-full'>
          <Card.Header>
            <h2 className="font-bold text-[18px] text-gray-800">Event Planning Tips</h2>
          </Card.Header>

          <Divider />

          <Card.Body>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div>
                <img src="src\assets\dashboard\event-plan.svg" />
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
                <img src="src\assets\dashboard\compare.svg" />
              </div>
              <div className="font-bold">Compare Packages</div>
            </div>
            <p>
              Book your venue and catering at least 3-4 weeks ahead to avoid last-minute stress.
            </p>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Header className="font-semibold text-2xl text-gray-800">Recent Activity</Card.Header>
          <Card.Body className="font-bold text-secondary">No Recent Activity</Card.Body>
        </Card>
      </div>
    </div>
  </>;
};

export default Dashboard;
