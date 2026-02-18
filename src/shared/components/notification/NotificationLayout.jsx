import React, { useState } from "react";
import { X, BellRing } from "lucide-react";
import Notification from "./Notification";
const NotificationLayout = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  return (
    <div className="h-[394px] w-[48%] absolute top-17 right-2  rounded-[16px]   shadow-[0_0_20px_rgba(0,0,0,0.12)] bg-[#FAFAFA] p-1">


      <div className="flex justify-between items-center px-4 pb-2 bg-[linear-gradient(95.02deg,#F08E45_0.07%,#EE5763_61.45%)] pt-2 rounded-t-[16px]">
        <div className="flex gap-1 items-center">
          <BellRing size={16} className="text-white fill-white stroke-white" />
          <h4 className="text-white">Notifications</h4>
        </div>
        <X size={16} className="cursor-pointer text-white " />
      </div>

      <div className="flex justify-between items-center px-6   bg-[#FAFAFA] ">
        <button
          onClick={() => setActiveTab("notifications")}
          className={`!text-[12px] cursor-pointer py-2  px-4  hover:text-black
            ${
              activeTab === "notifications"
                ? "text-orange-500 border-b-[3px] border-orange-500 "
                : "text-gray-500 "
            }`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`!text-[12px] cursor-pointer py-2 px-4  hover:text-black
            ${
              activeTab === "chat"
                ? "text-orange-500 border-b-[3px] border-orange-500"
                : "text-gray-500"
            }`}
        >
          Chat Notifications
        </button>
      </div>
      
      <div className="h-[306px] px-4 flex flex-col gap-2  overflow-y-scroll scrollbar-hide pt-3 pb-3 bg-gray-200 rounded-b-[16px]">
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        {/* bg-gray-200  */}
      </div>
    </div>
  );
};

export default NotificationLayout;
