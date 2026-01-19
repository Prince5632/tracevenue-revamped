import { useState } from "react";
import { Button } from "../common";
import tracevenue from "../../assets/images/Tracevenue.png"
import logo from "../../assets/images/logo.png"
import { MenuIcon } from "lucide-react";


const Navbar = () => {
    const [open, setOpen] = useState(false);
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
                <div className="flex items-center gap-2 flex-shrink-0">
                    <img src={logo} alt="logo" className="h-6 sm:h-7" />
                    <img
                        src={tracevenue}
                        alt="tracevenue"
                        className="h-3 sm:h-3.5 w-auto"
                    />
                </div>

                 <div className='hidden lg:block flex gap-3 p-4'  >
                                    
                    <Button size="sm" variant="ghost" className='px-5'>Login</Button>
                
                    <Button size="sm" variant="gradient" className='px-5'>Sign up</Button>
                                    
                 </div>

                <MenuIcon className="lg:hidden flex-shrink-0 space-x-4 md:mr-40"
                    onClick={() => setOpen(!open)} />

            </div>
            {open && <div className='bg-black mr-50 lg:hidden'  >

                <Button size="sm" variant="ghost" className='px-5'>Login</Button>


                <Button size="sm" variant="gradient" className='px-5'>Sign up</Button>

            </div>}
        </nav>
        
    );
};

export default Navbar;
