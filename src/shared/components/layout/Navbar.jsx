import { useState, useEffect, useRef } from "react";
import { Button } from "@shared/components/ui";
import tracevenue from "@assets/images/Tracevenue.png"
import logo from "@assets/images/logo.png"
import { MenuIcon, X, Bell, User, LogOut, Settings } from "lucide-react";
import Login from "../../../features/auth/components/Login";
import { userIsLogged, logout } from "@/services/userService";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [cardOpen, setCardOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);

    // Check auth status on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await userIsLogged();
                // Access denied or no token usually returns 401 or specific message
                if (response?.status === 200 && response?.data?.message !== "no token") {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Auth check failed", error);
            }
        };
        checkAuth();
    }, []);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLoginClick = () => {
        setCardOpen(true);
        setOpen(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setCardOpen(false);
    };

    const handleLogout = async () => {
        await logout();
        setIsLoggedIn(false);
        setShowProfileMenu(false);
        window.location.reload(); // Ensure clean state
    };

    return (
        <>
            <nav className="w-full bg-white shadow-lg fixed top-0 left-0 z-50">
                <div
                    className="
          max-w-7xl
          mx-auto
          h-14 sm:h-15
          px-4 sm:px-6 lg:px-10
          flex
          items-center
          justify-between
        "
                >
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

                    <div className='hidden lg:flex items-center gap-6 p-4'  >
                        {isLoggedIn ? (
                            <>
                                <div className="relative cursor-pointer hover:text-orange-500 transition-colors">
                                    <Bell size={20} />
                                    {/* Notification Badge Example */}
                                    {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span> */}
                                </div>

                                <div className="relative" ref={profileMenuRef}>
                                    <div
                                        className="flex items-center gap-2 cursor-pointer hover:text-orange-500 transition-colors"
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                            <User size={18} className="text-gray-600" />
                                        </div>
                                    </div>

                                    {showProfileMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                                            <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                                <p className="text-sm font-semibold text-gray-800">My Account</p>
                                            </div>
                                            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                                <User size={16} /> Profile
                                            </Link>
                                            <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                                <Settings size={16} /> Settings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                            >
                                                <LogOut size={16} /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-3">
                                <Button size="sm" variant="ghost" className='px-5'
                                    onClick={() => setCardOpen(true)}>Login</Button>

                                <Button size="sm" variant="gradient" className='px-5'
                                    onClick={() => setCardOpen(true)}>Sign up</Button>
                            </div>
                        )}
                    </div>

                    <MenuIcon className="lg:hidden flex-shrink-0 space-x-4 md:mr-40"
                        onClick={() => setOpen(!open)} />

                </div>

                {/* Mobile Menu */}
                {open && <div className='bg-white shadow-lg absolute w-full top-14 left-0 p-4 lg:hidden flex flex-col gap-4'  >
                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center gap-3 p-2 border-b border-gray-100 pb-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <User size={20} className="text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">My Account</p>
                                </div>
                            </div>
                            <Link to="/profile" className="flex items-center gap-2 px-2 py-2 text-gray-600">
                                <User size={18} /> Profile
                            </Link>
                            <button onClick={handleLogout} className="flex items-center gap-2 px-2 py-2 text-red-600 text-left">
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Button size="sm" variant="ghost" className='w-full justify-start'
                                onClick={handleLoginClick}>Login</Button>
                            <Button size="sm" variant="gradient" className='w-full'
                                onClick={handleLoginClick}>Sign up</Button>
                        </>
                    )}
                </div>}
            </nav>

            {/* Login Modal */}
            {cardOpen && (
                <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
                    onClick={() => setCardOpen(false)}>
                    <div className="relative w-full max-w-md" onClick={e => e.stopPropagation()}>
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={() => setCardOpen(false)}
                                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <X size={20} className="text-gray-600" />
                            </button>
                        </div>
                        <Login onLoginSuccess={handleLoginSuccess} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;

