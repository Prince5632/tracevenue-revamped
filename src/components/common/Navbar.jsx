import { useEffect, useState } from "react";
import { Button } from "../common";
import tracevenue from "../../assets/images/Tracevenue.png"
import logo from "../../assets/images/logo.png"
import { MenuIcon, X } from "lucide-react";
import login from "../../assets/login-bnr.png"
import check from "../../assets/dashboard/check-green.svg"
// import Login from "../Login";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [cardOpen, setCardOpen] = useState(false);
    const [phone, setPhone] = useState('')
    // const [card2Open, setCard2Open] = useState(false);
    const [step, setStep] = useState("phone")
    const [name , setName] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [valid, setValid] = useState(false)
    const [otpCard, setOtpCard] = useState(false)
    const [isPhoneValid, setIsPhoneValid] = useState(true)
    const [isNameValid, setIsNameValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)


    const phoneHandler = () => {

        if(step==="phone" && phone.length==10 && isPhoneValid){
            setStep("details")
            setTimeout(()=>{
                setOtpCard(true)
            }, 1000);
        }
        else if((step==="details" && name.length>=2 && isNameValid && email=='') || (step==="details" && name.length>=2 && isNameValid && email !='' && isEmailValid)){
            setStep("otpDetail")
        }
        else if(step==="phone" || step==="details" ){
            setValid(true)
        }
    }

     //phone validation
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value)

        const phoneRegex = /^\d+$/;
        setIsPhoneValid(phoneRegex.test(value))
    }

     // Name validation
    const handleNameChange = (e) => {
        const value = e.target.value;
           setName(value)
        const nameRegex = /^[A-Za-z]*$/;
        setIsNameValid(nameRegex.test(value))
    };

    //Email Validation
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setIsEmailValid(emailRegex.test(value))
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
                                                    
                    <button className='px-5 bg-[#ffffff] '
                    onClick={() => {
                        setCardOpen(true);
                    }}><span className="font-semibold text-[16px] !text-[#000000]">Login</span></button>
                                
                    <button className='px-4 py-1 bg-[#FF4000] rounded-full'
                     onClick={() => {
                        setCardOpen(true);
                    }}><span className="font-semibold text-[16px] !text-[#FFFFFF]">Sign up</span></button>
                                                    
                </div>

                <MenuIcon className="lg:hidden flex-shrink-0 space-x-4 md:mr-40"
                    onClick={() => setOpen(!open)}
                />

            </div>

            
        </nav>

        {/* open after click on MenuIcon */}
        {open && (
            <div className="fixed inset-0 z-50" 
            onClick={()=>{
                       setOpen(false) }}/>
        )}
            
        {open && <div className='bg-white lg:hidden p-[10px] fixed z-60 top-13 md:top-15 sm:top-15 h-[525px] md:h-[485px] sm:h-[485px] w-auto'  >
            <div className="flex gap-4 py-16 justify-center">
                <button className='border-1 border-[#aaaaaa] !bg-[#FFFFFF] px-16 md:px-16 sm:px-16 rounded-xl hover:border-2 hover:border-[#FF4000] hover:!text-[#FF4000] font-semibold text-[15px] text-[#212529] hover:-translate-y-0.5'
                    onClick={() => {
                        setCardOpen(true);
                    }}>Login
                </button>


                <Button size="lg" variant="primary" className='shadow-[0_0_30px_rgba(255,64,0,0.5)]  px-16 md:px-16 sm:px-16 rounded-xl'
                    onClick={() => {
                        setCardOpen(true);
                    }}><span className="font-semibold text-[15px] !text-[#FFFFFF]">Sign up</span>
                </Button>
            </div>
        </div>}

        {/* Login page */}
        {cardOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60" 
            onClick={()=>{
                       setCardOpen(false) }}/>
        )}

        {cardOpen && (
         <div className="flex justify-center">
            <div className="fixed lg:left-110 top-36 lg:top-38 md:top-36 sm:top-36 z-70 bg-white w-full max-w-[370px] min-w-[340px] sm:max-w-[500px] md:max-w-[500px] lg:max-w-[500px] h-auto rounded-xl">
                <div className="flex justify-between p-[16px]">
                   <h1 className="font-semibold text-[20px] text-[#212529]">Login</h1>
                   <X size="30" className="text-[#85878c]" onClick={()=>{
                       setCardOpen(false)
                       setPhone('') 
                       setName('')
                       setEmail('')
                       setStep("phone")
                       setValid(false)
                       setIsPhoneValid(true)
                       setIsNameValid(true)
                       setIsEmailValid(true)
                    }}/>
                </div>
            
                <div className="w-auto h-[1px] bg-[#d7d9da]" />
                <div className="flex p-[16px]">
                    <div className="bg-white rounded-xl">
                        {step==="phone"|| step==="otpDetail" ? (
                            <img src={login} alt="login" className="!h-full !w-full" />
                            ):(
                            <div className="py-10 lg:py-5 md:py-5 sm:py-5">
                                <img src={login}  alt="login" className="!h-full !w-full" />
                            </div>
                        )}
                      
                    </div>
                    <div className="bg-white flex flex-col justify-center items-center gap-3 rounded-xl px-3">


                       {/*input for phone, name and email  */}
                       {step==="phone" ?(
                            <> <h1 className="-ml-1 lg:-ml-22 md:-ml-21 sm:-ml-21 -mt-2 font-semibold !text-[16px] !text-[#212529]">Phone Number</h1>
                           
                               <input type="text" 
                                onChange={handlePhoneChange}
                               className="border-1 border-[#d7d9da] hover:border-blue-300 rounded lg:px-2 py-2.5 px-2 w-30 sm:w-auto" />
                           
                               {valid && phone.length==0 ? (<div className="leading-none mr-2 sm:mr-0 -my-3">
                               <span className="text-red-600 text-[12px] relative left-1 lg:-left-7 md:-left-7 sm:-left-7 ">Phone Number is required</span></div>
                        
                               ):(valid && phone.length>0 && (phone.length<10 || phone.length>10) ? 
                               (<div className="leading-none mr-2 sm:mr-0 -mt-2 -mb-4"><span className="text-red-600 text-[12px] relative left-1 lg:-left-1 md:-left-1 sm:-left-1 -top-1">Phone Number must be of 10 digits</span></div>

                               ): ( valid && !isPhoneValid && (
                                <div className="leading-none mr-1 sm:mr-0 -my-3">
                               <span className="text-red-600 text-[12px] relative left-1 lg:-left-10 md:-left-10 sm:-left-10">Invalid phone number</span></div>
                               )

                               ))}
                       
                            </>
                            ): ( step==="details" ?(
                            <>  
                               <h1 className="-ml-10 lg:-ml-30 md:-ml-31 sm:-ml-31 mt-2 font-semibold !text-[16px] !text-[#212529]">Full Name</h1>
                               <input type="text" 
                               value={name}
                               onChange={handleNameChange}
                               className="border-1 border-[#d7d9da] hover:border-blue-300 rounded px-2 py-2.5 w-30 sm:w-auto -mt-1" />
                               {valid && name.length==0 ? (
                                <span className="text-[#FF0000] text-[12px] leading-none relative left-0 lg:-left-10 md:-left-10 sm:-left-10 -top-2">Username is required.</span>
                        
                               ):(valid && !isNameValid ? (
                               <div className=" -mt-3 leading-none"> <span className="text-[#FF0000] text-[12px]  ">Username must contain only letters.</span> </div>
                               ) :(valid && name.length>0 && name.length<2 && 
                               (<div className=" leading-none -mt-3"><span className="text-[#FF0000] text-[12px] ">Username is too short, it must be atleast 2 characters.</span></div>)))
                               }

                               <h1 className="lg:-ml-19 md:-ml-19 sm:-ml-19 -mt-3 font-semibold !text-[16px] !text-[#212529]">Email (Optional)</h1>
                               <input type="text" 
                               value={email}
                               onChange={handleEmailChange}
                               className="border-1 border-[#d7d9da] hover:border-blue-300 rounded px-2 py-2.5 w-30 sm:w-auto -mt-1" />
                               {valid && !isEmailValid && 
                               (<span className="text-[#FF0000] text-[12px] leading-sung relative -left-6 lg:-left-16 md:-left-16 sm:-left-16 -mt-3 -mb-1">Invalid Email</span>)}
                            </> 
                               ) : (
                            <>
                               <h1 className="-ml-22 lg:-ml-42 md:-ml-38 sm:-ml-38 -mt-2 font-semibold !text-[16px] !text-[#212529]">OTP</h1>
                               <input type="text" 
                               value={otp}
                               onChange={(e)=>{
                               setOtp(e.target.value)
                               }}
                               className="border-1 border-[#d7d9da] hover:border-blue-300 rounded lg:px-2 py-2.5 w-30 sm:w-auto" />
                            </>
                            )
                        )} 
                     {/* input end */}

                        <Button size="md" 
                            className='px-11 sm:px-20 lg:px-20 md:px-20 mt-1 bg-[#FF4000]'
                            onClick={() => {
                              phoneHandler();
                            }}>
                          {step==="phone" ? (<h1 className="font-bold text-[#FFFFFF] text-[14px]">Login</h1>) : (<h1 className="-mx-3 font-bold text-[#FFFFFF] text-[14px]">Continue</h1>)}
                        </Button> 
                    </div>
                </div>
            
            </div>
         </div>
        )}

        {step==="details" && otpCard && (
            <>
                <div className="flex justify-center">
                    <div className="bg-white text-gray-400 fixed top-5 z-60 flex gap-2 px-3 py-4 rounded-xl">
                        <img src={check} alt="check" className=""/>
                       <h1>OTP Sent Successfully</h1>
                       <X size={15} className="ml-4 -mt-1"
                       onClick={() => {
                        setOtpCard(false)
                       }}/>
                    </div>
                </div>
            </>
        )}


        

        

         
        </>
    );
};

export default Navbar;
