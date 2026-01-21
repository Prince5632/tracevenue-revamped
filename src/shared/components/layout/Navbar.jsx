import { useEffect, useState } from "react";
import { Button } from "@shared/components/ui";
import tracevenue from "@assets/images/Tracevenue.png"
import logo from "@assets/images/logo.png"
import { MenuIcon, X } from "lucide-react";
import login from "@assets/login-bnr.png"
import check from "@assets/dashboard/check-green.svg"
// import Login from "../Login";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [cardOpen, setCardOpen] = useState(false);
    const [phone, setPhone] = useState('')
    // const [card2Open, setCard2Open] = useState(false);
    const [step, setStep] = useState("phone")
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(false)
    const [otpCard, setOtpCard] = useState(false)

    const phoneHandler = () => {
        if (phone.length == 0) {
            setValid(true)
        }
        else if (phone.length > 0 && (phone.length < 10 || phone.length > 10)) {
            setValid(true)
        }
        else if (step === "phone" && phone.length == 10) {
            setStep("details")
            setTimeout(() => {
                setOtpCard(true)
            }, 1000);
        }
    }

    useEffect(() => {
        if (otpCard) {
            const timeout = setTimeout(() => {
                setOtpCard(false);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [otpCard])


    return (
        <>
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

                        <Button size="sm" variant="ghost" className='px-5'
                            onClick={() => {
                                setCardOpen(true);
                            }}>Login</Button>

                        <Button size="sm" variant="gradient" className='px-5'
                            onClick={() => {
                                setCardOpen(true);
                            }}>Sign up</Button>

                    </div>

                    <MenuIcon className="lg:hidden flex-shrink-0 space-x-4 md:mr-40"
                        onClick={() => setOpen(!open)} />

                </div>

                {/* open after click on MenuIcon */}
                {open && <div className='bg-black mr-50 lg:hidden'  >

                    <Button size="sm" variant="ghost" className='px-5'
                        onClick={() => {
                            setCardOpen(true);
                        }}>Login</Button>


                    <Button size="sm" variant="gradient" className='px-5'>Sign up</Button>

                </div>}
            </nav>

            {/* Login page */}
            {cardOpen && (
                <div className="fixed inset-0 bg-black/60 z-50"
                    onClick={() => {
                        setCardOpen(false)
                    }} />
            )}

            {cardOpen && (
                <div className="flex justify-center">
                    <div className="fixed top-40 z-60 bg-white w-full max-w-[370px] min-w-[340px] sm:max-w-[500px] md:max-w-[500px] lg:max-w-[500px] h-auto rounded-2xl">
                        <div className="flex justify-between m-5">
                            <h1 className="font-bold text-xl">Login</h1>
                            <X size="20" onClick={() => {
                                setCardOpen(false)
                                setPhone('')
                                setStep("phone")
                                setValid(false)
                            }} />
                        </div>

                        <div className="w-auto h-[1px] bg-gray-400" />
                        <div className="grid grid-cols-2">
                            <div className="bg-white px-4 py-8 -mr-8 rounded-xl">
                                <img src={login} alt="login" className="" />
                            </div>
                            <div className="bg-white flex flex-col justify-center items-center gap-3 rounded-xl">


                                {/*input for phone name and email  */}
                                {step === "phone" ? (
                                    <> <h1 className="lg:-ml-22 sm:-ml-10">Phone Number</h1>
                                        <input type="text"
                                            value={phone}
                                            onChange={(e) => {
                                                setPhone(e.target.value)
                                            }}
                                            className="border-1 border-gray-400 rounded-xl lg:px-3 py-2 w-30 sm:w-auto" />
                                        {valid && phone.length == 0 ? (
                                            <p className="text-red-600">Phone Number is required</p>

                                        ) : (valid && phone.length > 0 && (phone.length < 10 || phone.length > 10) && (<p>Phone Number must be of 10 digits</p>))}

                                    </>
                                ) : (

                                    <>
                                        <h1 className="-ml-10 lg:-ml-32 sm:-ml-10 mt-6">Full Name</h1>
                                        <input type="text"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value)
                                            }}
                                            className="border-1 border-gray-400 rounded-xl lg:px-3 py-2 w-30 sm:w-auto" />

                                        <h1 className="lg:-ml-22 sm:-ml-10 -mt-2">Email (Optional)</h1>
                                        <input type="text"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                            className="border-1 border-gray-400 rounded-xl lg:px-3 py-2 w-30 sm:w-auto" />
                                    </>
                                )
                                }
                                {/* input end */}

                                <Button size="sm" variant="gradient" className='px-10 sm:px-18 lg:px-20 md:px-18 mb-6'
                                    onClick={() => {
                                        phoneHandler();

                                    }}
                                >Login</Button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {step === "details" && otpCard && (
                <>
                    <div className="flex justify-center">
                        <div className="bg-white text-gray-400 fixed top-5 z-60 flex gap-2 px-3 py-4 rounded-xl">
                            <img src={check} alt="check" className="" />
                            <h1>OTP Sent Successfully</h1>
                            <X size={15} className="ml-4 -mt-1"
                                onClick={() => {
                                    setOtpCard(false)
                                }} />
                        </div>
                    </div>
                </>
            )}







        </>
    );
};

export default Navbar;
