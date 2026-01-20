import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { Card } from "../common";
import DashboardCard from "../common/DashboardCard";
import threeLineList from "../../assets/dashboard/three-line-list.svg";
import clock from "../../assets/dashboard/clock.svg";
import checkgreen from "../../assets/dashboard/check-green.svg";
import eventplan from "../../assets/dashboard/event-plan.svg";
import comparesvg from "../../assets/dashboard/compare.svg";
import locationsvg from "../../assets/dashboard/location.svg";
import calendersvg from "../../assets/dashboard/calendar.svg";

function Dashboard() {
  const [username, setUsername] = useState("Prince");

  const upcomingEvents = [
    {
      id: 1,
      title: "Looking venue for anniversary celebration",
      loc: "Sector 17, Chandigarh",
      date1: "22 Jan 2026",
    },
    {
      id: 2,
      title: "Looking venue for Birthday",
      loc: "Sector 70, Mohali",
      date1: "24 Jan 2026",
    },
    {
      id: 3,
      title: "Looking venue for Bachelor's Party",
      loc: "Sector 40, Kharar",
      date1: "27 Jan 2026",
    },
    {
      id: 4,
      title: "Looking venue for Wedding celebration",
      loc: "Sector 74, Mohali",
      date1: "23 Jan 2026",
    },
  ];
  const [events, setEvents] = useState(upcomingEvents.length);
  return (
    <>
      <Navbar />
      <div className="flex gap-7.5 m-7.5">
        <div className="bg-amber-200 text-center w-[25%] h-202.5 hidden lg:block">
          <h1> Sidebar</h1>
        </div>
        <div className="lg:w-[75%] w-full flex flex-col gap-5 ">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Home</h1>
            <p className="text-sm text-[#85878C] font-medium">
              Overview of your events, enquiries and recommendations.
            </p>
          </div>
          <div className="h-1 w-full bg-[#F0F0F4]"></div>
          <div className="bg-linear-to-r from-[#F08E45] to-[#EE5763] w-full p-5 rounded-4xl">
            <div className="flex gap-2">
              <p className="text-[32px]! font-bold text-yellow-300!">
                Hi {username}!{" "}
                <span className="text-[32px]! text-white!">
                  Ready to plan your next event?
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 text-base text-white items-start">
              <h1>Quick actions to start planning or view your activity.</h1>
              <button className="justify-self-start sm:justify-self-end py-2 h-fit rounded-[30px] px-8 bg-[#FFFFFF] text-[#FF4000] text-base font-bold! border border-[#ff4000] flex gap-2 cursor-pointer">
                Plan My Event
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-move-right-icon lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
            <DashboardCard
              className="w-full sm:w-[48%] lg:w-[32%]"
              icon={threeLineList}
              title={"Total Enquiries"}
              number={events}
            />
            <DashboardCard
              icon={clock}
              title={"Pending Responses"}
              number={events}
            />
            <DashboardCard
              icon={checkgreen}
              title={"Confirmed Bookings"}
              number={0}
            />
          </div>
          <Card variant="default" padding="md" className="w-full">
            <h1 className="text-[20px] font-semibold mb-4">Upcoming Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {upcomingEvents.map((e) => (
                <div
                  key={e.id}
                  className="h-fit w-full cursor-pointer flex flex-col px-5 py-4 rounded-[15px] border border-[#D7D9DA]"
                >
                  <div className="flex gap-1 items-center">
                    <div className="flex-1 min-w-0">
                      <h1 className="truncate text-[18px] font-semibold bg-linear-to-r from-[#F08E45] to-[#EE5763] bg-clip-text text-transparent">
                        {e.title}
                      </h1>
                    </div>
                    <div className="px-1 bg-[#15B076] rounded-2xl h-fit ">
                      <p className="text-white! text-center! text-[12px]!">
                        Active
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-1.5">
                      <img src={locationsvg} />
                      <p className="text-sm! font-semibold!">{e.loc}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <img src={calendersvg} />
                      <p className="text-[#060606]! text-sm! font-medium ">
                        {e.date1}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <div className="gap-5 md:flex ">
            <Card
              variant="default"
              className="w-full flex flex-col mb-5 md:mb-0"
            >
              <div className=" w-full pb-4 text-[18px] font-semibold">
                <h1>Event Planning Tips</h1>
              </div>
              <div className="-mx-5 border-t border-t-[#D7D9DA] border-b border-b-[#D7D9DA] px-5 py-4">
                <div className="flex gap-2.5 mb-1">
                  <img src={eventplan} alt="" />
                  <h1 className="text-base text-[#060606] font-semibold">
                    Plan Early
                  </h1>
                </div>
                <p className="text-sm! font-normal">
                  Book your venue and catering at least 3-4 weeks ahead to avoid
                  last-minute stress.
                </p>
              </div>
              <div className="-mx-5 border-t border-t-[#D7D9DA] px-5 pt-4 pb-0">
                <div className="flex gap-2.5 mb-1">
                  <img src={comparesvg} alt="" />
                  <h1 className="text-base text-[#060606] font-semibold">
                    Compare Packages
                  </h1>
                </div>
                <p className="text-sm! font-normal">
                  Check multiple packages before finalizing to get the best
                  value for money.
                </p>
              </div>
            </Card>
            <Card
              variant="default"
              padding="sm"
              className="w-full h-70 flex flex-col"
            >
              <div className="pb-4">
                <h1 className="text-[18px] font-medium ">Recent Activity </h1>
              </div>
              <div>
                <h1>No recent activity</h1>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
