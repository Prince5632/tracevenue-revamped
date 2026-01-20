import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import carbonDocumentIcon from "../../assets/dashboard/carbon_document-signed.svg";
import mageDashboardIcon from "../../assets/dashboard/mage_dashboard.svg";
import tableListDetails from "../../assets/dashboard/tabler_list-details.svg";
import userProfile from "../../assets/dashboard/user-profile.svg"
import settings from "../../assets/dashboard/setting.svg";
import logout from "../../assets/dashboard/switch.svg"

const DashboardSidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="w-70  rounded-[30px] border border-[#D7D9DA] bg-white shadow-[0px_4px_10px_0px_#0000000D] pb-10">
      <h1 className="text-[22px] font-semibold mb-4 pt-5 pl-5">
        Welcome back!
      </h1>

      {/* Dashboard */}
      <div className="border-b border-[#D7D9DA] flex items-center gap-4 px-5 hover:bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] hover:text-[#FF4000]
">
        <img src={mageDashboardIcon} alt="Dashboard" />
        <div className="py-4  font-semibold rounded-lg ">
          Dashboard
        </div>
      </div>

      {/* Enquiries */}
      <div className="border-b border-[#D7D9DA]  px-5 ">
        <button
          onClick={() => toggleMenu("enquiries")}
          className="w-full flex justify-between items-center py-4 font-medium"
        >
          <div className="flex gap-4">
            <img src={tableListDetails} alt="Table List Detail" />
            Enquiries
          </div>

          <ChevronDown
            className={`transition-transform ${
              openMenu === "enquiries" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openMenu === "enquiries" && (
          <div className="">
            {[
              "Active Enquiries (4)",
              "Draft Enquiries (7)",
              "Completed Enquiries (1)",
              "Expired Enquiries (7)",
            ].map((item) => (
              <div
                key={item}
                className="px-8 py-2 text-sm cursor-pointer hover:bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] hover:text-[#FF4000]"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contracts */}
      <div className="border-b border-[#D7D9DA]  px-5">
        <button
          onClick={() => toggleMenu("contracts")}
          className="w-full flex justify-between items-center py-4 font-medium"
        >
          <div className="flex gap-4">
            <img src={carbonDocumentIcon} alt="Carbon Document" />
            Contracts
          </div>

          <ChevronDown
            className={`transition-transform ${
              openMenu === "contracts" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openMenu === "contracts" && (
          <div className="">
            {[
              "Active Contracts (0)",
              "Proposed Contracts (0)",
              "Completed Contracts (1)",
            ].map((item) => (
              <div
                key={item}
                className="px-8 py-2 text-sm cursor-pointer hover:bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] hover:text-[#FF4000]"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>


       {/* Profile */}
      <div className="border-b border-[#D7D9DA]  px-5">
        <button
          onClick={() => toggleMenu("profile")}
          className="w-full flex justify-between items-center py-4 font-medium"
        >
          <div className="flex gap-4">
            <img src={userProfile} alt="Profile" />
            Profile
          </div>

          <ChevronDown
            className={`transition-transform ${
              openMenu === "profile" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openMenu === "profile" && (
          <div className="">
            {[
              
              
            ].map((item) => (
              <div
                key={item}
                className="px-8 py-2 text-sm cursor-pointer hover:bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] hover:text-[#FF4000]"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>


       {/* Settings */}
      <div className="border-b border-[#D7D9DA]  px-5">
        <button
          onClick={() => toggleMenu("setting")}
          className="w-full flex justify-between items-center py-4 font-medium"
        >
          <div className="flex gap-4">
            <img src={settings} alt="Setting" />
            Settings
          </div>

          <ChevronDown
            className={`transition-transform ${
              openMenu === "setting" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openMenu === "setting" && (
          <div className="">
            {[
              
              
            ].map((item) => (
              <div
                key={item}
                className="px-8 py-2 text-sm cursor-pointer hover:bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] hover:text-[#FF4000]"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-b border-[#D7D9DA] px-5 py-4 flex gap-4 text-[#FF4000] cursor-pointer">
        <img src={logout} alt="Logout"/>Logout
        <button
          className="w-full flex justify-between items-center  font-medium"
        ></button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
