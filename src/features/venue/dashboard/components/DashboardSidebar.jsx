import React, { useState ,useEffect} from "react";
import { ChevronDown } from "lucide-react";
import carbonDocumentIcon from "../../../../assets/dashboard/carbon_document-signed.svg";
import mageDashboardIcon from "../../../../assets/dashboard/mage_dashboard.svg";
import tableListDetails from "../../../../assets/dashboard/tabler_list-details.svg";
import userProfile from "../../../../assets/dashboard/user-profile.svg";
import settings from "../../../../assets/dashboard/setting.svg";
import logout from "../../../../assets/dashboard/switch.svg";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../context/DashboardContext";

const DashboardSidebar = () => {
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
  const [active, setActive] = useState(null);

  return (
    <div
      className="w-85.5 h-202.5 rounded-[30px] border bg-[#ffffff] border-[#D7D9DA] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)]

    "
    >
      <div className="h-20 flex items-center px-7.5">
        <h1
          className="w-45.25 h-6   font-semibold text-[24px] leading-none tracking-normal rotate-0 opacity-100 text-black
"
        >
          Welcome back!
        </h1>
      </div>

      {/* Dashboard */}
      <div
        onClick={() => { setActive("dashboard"); navigate("/dashboard") }}
        className={`border-[#D7D9DA] flex items-center gap-4 w-85 h-14.5 border-t border-b px-7.5
                  ${active === "dashboard"
            ? "bg-[linear-gradient(121.12deg,#FFF3EA_0%,#FDEAED_100%)] text-[#FF4000]"
            : "text-black"
          }
                  `}
      >
        <img
          src={mageDashboardIcon}
          alt="Dashboard"
          className="w-6 h-6"
        />
        <div
          className="
         h-4.5 font-semibold text-[18px] leading-none tracking-normal 
        "
        >
          Dashboard
        </div>
      </div>

      {/* Enquiries */}
      <div className="border-b border-[#D7D9DA]">
        <button
          onClick={() => toggleMenu("enquiries")}
          className="w-full flex justify-between items-center font-medium h-14.5 px-7.5"
        >
          <div className="flex gap-4 font-semibold items-center">
            <img
              src={tableListDetails}
              alt="Table List Detail"
              className="w-6 h-6"
            />
            <span className="text-[18px] leading-none text-black">
              Enquiries
            </span>
          </div>

          <ChevronDown
            className={`transition-transform duration-300 ${openMenu.enquiries ? "rotate-180" : ""
              }`}
          />
        </button>

        {openMenu.enquiries && (
          <div className="w-full">
            {[
              `Active Enquiries (${dashboardStats?.data?.stats?.statusWise?.Active})`,
              `Draft Enquiries (${dashboardStats?.data?.stats?.statusWise?.Draft})`,
              `Completed Enquiries (${dashboardStats?.data?.stats?.statusWise?.Closed})`,
              `Expired Enquiries (${dashboardStats?.data?.stats?.statusWise?.InActive})`,
            ].map((item) => (
              <div
                key={item}
                onClick={() => {
                  setActive(item)
                  navigate(`/service/venues/enquiry/${item.toLowerCase().split(" ")[0]}`)
                }
                }
                className={`w-full h-12 flex items-center cursor-pointer font-medium text-[18px] pl-18
                  ${active === item
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
      </div>

      {/* Contracts */}
      <div className="border-b border-[#D7D9DA] ">
        <button
          onClick={() => toggleMenu("contracts")}
          className="w-full flex justify-between items-center  h-14.5 font-medium px-7.5"
        >
          <div className="flex gap-4 font-semibold">
            <img
              src={carbonDocumentIcon}
              alt="Carbon Document"
              className="w-6 h-6"
            />
            <span className=" text-[18px] leading-none text-black">
              Contracts
            </span>
          </div>

          <ChevronDown
            className={`transition-transform duration-300 ${openMenu.contracts ? "rotate-180" : ""
              }`}
          />
        </button>

        {openMenu.contracts && (
          <div className="w-full">
            {[
               `Active Contracts (${dashboardStats?.data?.stats?.contractStats?.active})`,
               `Proposed Contracts (${dashboardStats?.data?.stats?.contractStats?.pending})`,,
               `Completed Contracts (${dashboardStats?.data?.stats?.contractStats?.completed})`,
            ].map((item) => (
              <div
                key={item}
                onClick={() => setActive(item)}
                className={`w-full flex items-center text-[18px] h-12  pl-18 cursor-pointer
                  ${active === item
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
      </div>

      {/* Profile */}
      <div className="border-b border-[#D7D9DA]">
        <button
          onClick={() => toggleMenu("profile")}
          className="w-full flex justify-between items-center h-14.5 font-medium px-7.5"
        >
          <div className="flex gap-4 font-semibold">
            <img src={userProfile} alt="Profile" className="h-6 w-6" />
            <span className="text-[18px] leading-none text-black">Profile</span>
          </div>

          <ChevronDown
            className={`transition-transform duration-300 ${openMenu.profile ? "rotate-180" : ""
              }`}
          />
        </button>

        {openMenu.profile && (
          <div className="w-full">
            {[].map((item) => (
              <div
                key={item}
                onClick={() => setActive(item)}
                className={`w-full h-12 flex items-center text-[18px]  pl-18 cursor-pointer
                  ${active === item
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
      </div>

      {/* Settings */}
      <div className="border-b border-[#D7D9DA] ">
        <button
          onClick={() => toggleMenu("setting")}
          className="w-full flex justify-between items-center font-medium h-14.5 px-7.5"
        >
          <div className="flex gap-4 font-semibold">
            <img src={settings} alt="Setting" className="h-6 w-6" />
            <span className="text-[18px] leading-none text-black">
              Settings
            </span>
          </div>

          <ChevronDown
            className={`transition-transform duration-300 ${openMenu.setting ? "rotate-180" : ""
              }`}
          />
        </button>

        {openMenu.setting && (
          <div className="w-full">
            {[].map((item) => (
              <div
                key={item}
                onClick={() => setActive(item)}
                className={`w-full h-12 flex items-center text-[18px] pl-18
                  ${active === item
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
      </div>

      <div className="border-b border-[#D7D9DA] flex items-center gap-4 h-14.5 px-7.5">
        <img src={logout} alt="Logout" className="h-6 w-6" />
        <div className="h-4.5 font-semibold text-[18px] leading-none tracking-normal text-[#FF4000]">
          Logout
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
