import { useState, useEffect, useRef } from "react";
import { Button } from "@shared/components/ui";
import tracevenue from "@assets/images/Tracevenue.png";
import logo from "@assets/images/logo.png";
import {
  MenuIcon,
  Bell,
  ArrowRight,
  ChevronDown,
  MessageCircleMore,
  LogIn,
  UserPlus,
  HelpCircle,
  UserRound,
  Power,
} from "lucide-react";
import Login from "../../../features/auth/components/Login";
import { logout } from "@/services/userService";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/context/useAuthStore.jsx";
import userProfile from "../../../assets/dashboard/user-profile.svg";
import settings from "../../../assets/dashboard/setting.svg";
import logoutButton from "../../../assets/dashboard/switch.svg";
import NotificationLayout from "../notification/NotificationLayout";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState({ show: false, type: "login" });
  const { user, isLoggedIn, setIsLoggedIn, clearUser } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileMenuRef = useRef(null);

  // Get first letter of logged in user
  const getUserInitial = () => {
    if (!user) return "U";
    const name = user.name || user.fullName || user.firstName;
    return name ? name.charAt(0).toUpperCase() : "U";
  };
  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoginClick = () => {
    setCardOpen({ show: true, type: "login" });
    setOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCardOpen({ show: false, type: "login" });
  };

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
    } catch (error) {
      console.log("Logout failed", error);
    } finally {
      setShowProfileMenu(false);
    }
  };

  return (
    <>
      <nav className="w-full bg-white shadow-lg fixed top-0 left-0 !z-10">
        <div className="max-w-7xl mx-auto h-14 sm:h-16 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="h-6 sm:h-7" />
              <img
                src={tracevenue}
                alt="tracevenue"
                className="h-3 sm:h-3.5 w-auto"
              />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-3 p-4">
            <Link
              to="https://tracevenue.com/how-it-works/"
              className="text-[#060606] font-semibold flex gap-1"
            >
              How it works
            </Link>
            {/* ===================================== */}

            {isLoggedIn ? (
              <>
                <div className="relative pl-5">
                  <div className=" cursor-pointer">
                    <MessageCircleMore size={22} />
                  </div>
                  <div className="w-[8px] h-[8px] rounded-full bg-[#FF4000] absolute top-0 right-0"></div>
                </div>

                <div className="relative">
                  <div className=" cursor-pointer">
                    <Bell size={22} />
                  </div>
                  <div className="w-[8px] h-[8px] rounded-full bg-[#FF4000] absolute top-0 right-1"></div>
                </div>

                {/* PROFILE MENU */}
                <div className="relative" ref={profileMenuRef}>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    {/* ORANGE CIRCLE WITH USER INITIAL */}
                    <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center bg-[#FF4000] text-white font-bold text-lg">
                      {getUserInitial()}
                    </div>
                  </div>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-4 w-[250px] h-[135px] bg-white rounded-[30px] shadow-xl border border-[#D7D9DA] py-2  px-4">
                      <div className="flex items-center gap-2 py-2">
                        <img
                          src={userProfile}
                          alt="Profile"
                          className="h-5 w-5"
                        />
                        <Link
                          to="/profile"
                          className="text-[14px] font-semibold text-[#060606]"
                        >
                          My Profile
                        </Link>
                      </div>

                      <div className="flex items-center gap-2 py-2 border-b border-[#D3D5D6]">
                        <img src={settings} alt="Setting" className="h-5 w-5" />
                        <Link
                          to="/settings"
                          className="text-[14px] font-semibold text-[#060606]"
                        >
                          Settings
                        </Link>
                      </div>

                      <div className="w-full flex items-center gap-2 py-2 ">
                        <img
                          src={logoutButton}
                          alt="Logout"
                          className="h-5 w-5"
                        />
                        <button
                          onClick={handleLogout}
                          className="text-[14px] font-semibold text-[#060606]"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="px-5 text-[#060606]"
                  onClick={() => setCardOpen({ show: true, type: "login" })}
                >
                  Login
                </Button>

                <Button
                  size="sm"
                  className="px-10 py-3 bg-[#FF4000] rounded-[30px]"
                  onClick={() => setCardOpen({ show: true, type: "signup" })}
                >
                  Sign up <ArrowRight size={18} />
                </Button>
              </div>
            )}
          </div>

          <MenuIcon
            className="lg:hidden flex-shrink-0 space-x-4 md:mr-40"
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* MOBILE MENU */}

        {open && (
          <div
            className="
      bg-white
      absolute w-[200px]
      top-16 right-2
      lg:hidden
      flex flex-col gap-3
      p-5
      rounded-2xl
      shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      border border-gray-100
    "
          >
            <Link
              to="https://tracevenue.com/how-it-works/"
              className="
        text-gray-800
        text-base font-semibold
        text-center flex gap-2
      "
            >
              <HelpCircle className="w-5" />
              How it works
            </Link>

            <div className="h-[1px] bg-gray-300 mb-1"></div>

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="
            flex items-center gap-2
            px-2 py-2 !text-gray-700
            bg-gray-50 rounded-lg border border-gray-300         "
                >
                  <UserRound size={18} />
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="
            flex items-center gap-2
            px-2 py-2 text-red-600
            bg-red-50 rounded-lg
          "
                >
                  <Power size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="
            flex items-center gap-2
            py-2.5 px-3
            rounded-lg
            border border-gray-300
            bg-gray-100
            text-gray-700
            text-[16px] font-semibold
          "
                >
                  <LogIn className="w-4 text-gray-500" />
                  Login
                </button>

                <button
                  onClick={() => setCardOpen({ show: true, type: "signup" })}
                  className="
            flex items-center gap-2
            py-2.5 px-3
            rounded-lg
            text-[16px] font-semibold
            text-white
            bg-gradient-to-r from-[#e67e22] to-[#e63900]
          "
                >
                  <UserPlus className="w-4 text-white" />
                  Sign up
                </button>
              </>
            )}
          </div>
 
        )}
      </nav>

      {cardOpen.show && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setCardOpen({ show: false, type: "login" })}
          type={cardOpen.type}
        />
      )}
    </>
  );
};

export default Navbar;
