import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { Card } from "../common";
import Cardimg from "../../assets/Card.svg";
function Dashboard() {
  const [username, setUsername] = useState("Prince");
  return (
    <>
      <Navbar />
      <div className="flex gap-7.5 m-7.5">
        <div className="bg-amber-200 text-center w-[30%] h-202.5">
          {" "}
          <h1> Sidebar</h1>
        </div>
        <div className="w-[70%] flex flex-col gap-5 ">
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
                Hi {username}!
              </p>
              <p className="text-[32px]! text-white!">
                Ready to plan your next event?
              </p>
            </div>
            <div className="flex justify-between text-base text-white items-center">
              <h1>Quick actions to start planning or view your activity.</h1>
              <button className="py-3 rounded-[30px] px-10 bg-[#FFFFFF] text-[#FF4000] text-base font-bold!">
                Plan my event
              </button>
            </div>
          </div>
          <div className="flex gap-5 ">
            <Card
              variant="bordered"
              padding="md"
              className="w-full"
              style={{
                backgroundImage: `url(${Cardimg})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right top",
                backgroundSize: "contain",
              }}
            ></Card>
            <Card
              variant="bordered"
              padding="md"
              className="w-full h-24"
            ></Card>
            <Card
              variant="bordered"
              padding="md"
              className="w-full h-24"
            ></Card>
          </div>
          <div className="h-70 w-full border border-[#D7D9DA] rounded-[30px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] p-5">
            <h1 className="text-[18px] font-semibold">Upcoming Events:</h1>
            <div></div>
          </div>
          <div className="flex gap-5">
            <Card variant="default" padding="sm" className="w-full">
              Hello
            </Card>
            <div className="p-5 border border-[#D7D9DA] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] h-70 w-full rounded-[30px]"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
