import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import carbonDocumentIcon from "../../../../assets/dashboard/carbon_document-signed.svg";
import mageDashboardIcon from "../../../../assets/dashboard/mage_dashboard.svg";
import tableListDetails from "../../../../assets/dashboard/tabler_list-details.svg";
import userProfile from "../../../../assets/dashboard/user-profile.svg";
import settings from "../../../../assets/dashboard/setting.svg";
import logout from "../../../../assets/dashboard/switch.svg";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";
import SidebarTab from "../shared/SidebarTab";

const DashboardSidebar = ({ setIsSidebarOpen }) => {
  const { fetchDashboardStats, dashboardStats, error, isLoading } =
    useDashboard();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const [openMenu, setOpenMenu] = useState({
    enquiries: false,
    contracts: false,
    profile: false,
    setting: false,
  });

  const navigate = useNavigate();
  const toggleMenu = (menu) => {
    setOpenMenu((openMenu) => ({
      ...openMenu,
      [menu]: !openMenu[menu],
    }));
  };
  const [activeTab, setActiveTab] = useState(null);

  const {
    statusWise = {},
    contractStats = {}
  } = dashboardStats?.data?.stats || {};

  const {
    Active,
    Draft,
    Closed,
    InActive
  } = statusWise;

  const
    { active,
      pending,
      completed
    } = contractStats;

  return (
    <div className=" sticky top-25 w-[300px] h-[100vh] lg:h-[540px] lg:rounded-[30px] border bg-[#ffffff] border-[#D7D9DA] overflow-y-auto dashboard-scrollbar">
      <div className=" sticky top-0 h-20 flex items-center px-7.5 bg-[#ffffff] z-50">
        <h1 className="w-45.25 h-6   font-semibold text-[24px] leading-none tracking-normal rotate-0 opacity-100 text-black">
          Welcome back!
        </h1>
      </div>

      {/* Dashboard */}
      <SidebarTab
        active={active}
        Icon={mageDashboardIcon}
        value="Dashboard"
        onclick={() => { setActiveTab("dashboard"); navigate("/dashboard"); setIsSidebarOpen(false) }}
        classname={` 
        ${activeTab === "dashboard" ? "bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] text-[#FF4000]" : "text-black"}`} />

      {/* Enquiries */}
      <SidebarTab
        value="Enquiries"
        Icon={tableListDetails}
        dropdown={<ChevronDown className={`transition-transform duration-300 ${openMenu.enquiries ? "rotate-180" : ""
          }`} />}
        onclick={() => toggleMenu("enquiries")}
      />
      {openMenu.enquiries && (
        <div className="w-full">
          {[
            `Active Enquiries (${Active})`,
            `Draft Enquiries (${Draft})`,
            `Completed Enquiries (${Closed})`,
            `Expired Enquiries (${InActive})`,
          ].map((item) => (
            <div
              key={item}
              onClick={() => {
                setActiveTab(item)
                setIsSidebarOpen(false)
                navigate(`/service/venues/enquiry/${item.toLowerCase().split(" ")[0]}`)
              }
              }
              className={`w-full flex items-center cursor-pointer font-medium text-[14px] text-[#060606] pl-18 py-2  transition-all duration-300 ease-in cursor-pointer
                  ${activeTab === item
                  ? "bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] text-[#FF4000]"
                  : "text-black"
                }
                  `}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Contracts */}
      <SidebarTab
        value="Contracts"
        Icon={carbonDocumentIcon}
        dropdown={<ChevronDown className={`transition-transform duration-300 ${openMenu.contracts ? "rotate-180" : ""
          }`} />}
        onclick={() => toggleMenu("contracts")}
      />
      {openMenu.contracts && (
        <div className="w-full">
          {[
            `Active Contracts (${active})`,
            `Proposed Contracts (${pending})`,
            `Completed Contracts (${completed})`,
          ].map((item) => (
            <div
              key={item}
              onClick={() => {
                setActiveTab(item)
                setIsSidebarOpen(false)
                navigate(`/service/venues/contracts/:${item.toLowerCase().split(" ")[0]}`)
              }}
              className={`w-full flex items-center text-[14px]  pl-18 py-2 text-[#060606] cursor-pointer transition-all duration-300 ease-in cursor-pointer
                  ${activeTab === item
                  ? "bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] text-[#FF4000]"
                  : "text-black"
                }
                  `}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Profile */}
      <SidebarTab
        value="Profile"
        Icon={userProfile}
        dropdown={<ChevronDown className={`transition-transform duration-300 ${openMenu.profile ? "rotate-180" : ""
          }`} />}
        onclick={() => toggleMenu("profile")}
      />
      {openMenu.profile && (
        <div className="w-full">
          {[].map((item) => (
            <div
              key={item}
              onClick={() => {
                setActiveTab(item)
                setIsSidebarOpen(false)
              }}
              className={`w-full h-12 flex items-center text-[18px]  pl-18 cursor-pointer
                  ${activeTab === item
                  ? "bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] text-[#FF4000]"
                  : "text-black"
                }
                  `}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Settings */}
      <SidebarTab
        value="Settings"
        Icon={settings}
        dropdown={<ChevronDown className={`transition-transform duration-300 ${openMenu.setting ? "rotate-180" : ""
          }`} />}
        onclick={() => toggleMenu("setting")} />

      {/* Logout */}
      <SidebarTab
        value="Logout"
        Icon={logout}
        classname="text-[#ff4000]"
        onclick={() => toggleMenu("profile")} />

    </div>
  );
};

export default DashboardSidebar;
