import tracevenue from "../../assets/images/Tracevenue.png"
import logo from "../../assets/images/logo.png"

const Navbar = () => {
    return (
        <nav className="w-full bg-white shadow-lg fixed top-0 left-0 z-50">
            {/* fixed top-0 left-0 */}
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
                <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="h-6 sm:h-7" />
                    <img
                        src={tracevenue}
                        alt="tracevenue"
                        className="h-3 sm:h-3.5 w-auto"
                    />
                </div>

                <div className="flex items-center gap-3 sm:gap-5">
                    <button className="text-sm sm:text-[16px] font-semibold text-[#060606] cursor-pointer">
                        Login
                    </button>

                    <button
                        className="
            bg-[#FF4000]
            text-white
            border
            rounded-2xl
            px-3 sm:px-4
            py-1
            text-sm sm:text-base
            font-semibold
            cursor-pointer
          "
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
