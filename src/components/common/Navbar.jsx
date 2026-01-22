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

            
        </nav>

        {/* open after click on MenuIcon */}
        {open && (
            <div className="fixed inset-0 z-50" 
            onClick={()=>{
                       setOpen(false) }}/>
        )}
            
        {open && <div className='bg-white lg:hidden fixed z-60 top-13 md:top-15 sm:top-15 h-[550px] md:h-[400px] sm:h-[400px]'  >
            <div className="flex gap-4 px-37 py-20">
                <Button size="lg" variant="outline" className='px-14 md:px-20 sm:px-20 -ml-33 rounded-xl'
                    onClick={() => {
                        setCardOpen(true);
                    }}>Login
                </Button>


                <Button size="lg" variant="gradient" className='px-14 md:px-20 sm:px-20 rounded-xl -mr-30'
                    onClick={() => {
                        setCardOpen(true);
                    }}>Sign up
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
            <div className="fixed top-20 lg:top-35 md:top-20 sm:top-20 z-70 bg-white w-full max-w-[370px] min-w-[340px] sm:max-w-[500px] md:max-w-[500px] lg:max-w-[500px] h-auto rounded-2xl">
                <div className="flex justify-between m-5">
                   <h1 className="font-bold text-xl">Login</h1>
                   <X size="20" onClick={()=>{
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
            
                <div className="w-auto h-[1px] bg-gray-400" />
                <div className="grid grid-cols-2">
                    <div className="bg-white px-4 py-8 -mr-8 rounded-xl">
                       <img src={login} alt="login" className="" />
                    </div>
                    <div className="bg-white flex flex-col justify-center items-center gap-2 rounded-xl">


                       {/*input for phone name and email  */}
                       {step==="phone" ?(
                            <> <h1 className="-ml-1 lg:-ml-22 md:-ml-20 sm:-ml-22 mt-8">Phone Number</h1>
                           
                               <input type="text" 
                                onChange={handlePhoneChange}
                               className="border-1 border-gray-300 rounded lg:px-2 py-3 px-2 w-30 sm:w-auto" />
                           
                               {valid && phone.length==0 ? (<div className="leading-none mr-8 sm:mr-0">
                               <span className="text-red-600 text-[13px] leading-none relative left-8 lg:-left-5 md:-left-3 sm:-left-3 -top-1">Phone Number is required</span></div>
                        
                               ):(valid && phone.length>0 && (phone.length<10 || phone.length>10) ? 
                               (<div className="leading-none mr-12 sm:mr-0"><span className="text-red-600 text-[13px] leading-none relative left-8 lg:left-1 md:left-3 sm:left-3 -top-1">Phone Number must be of 10 digits</span></div>

                               ): ( valid && !isPhoneValid && (
                                <div className="leading-none mr-8 sm:mr-0">
                               <span className="text-red-600 text-[13px] leading-none relative left-1 lg:-left-13 md:-left-13 sm:-left-13 -top-1">Invalid Number</span></div>
                               )

                               ))}
                       
                            </>
                            ): ( step==="details" ?(
                            <>  
                               <h1 className="-ml-10 lg:-ml-30 md:-ml-31 sm:-ml-31 mt-6">Full Name</h1>
                               <input type="text" 
                               value={name}
                               onChange={handleNameChange}
                               className="border-1 border-gray-300 rounded px-2 py-3 w-30 sm:w-auto" />
                               {valid && name.length==0 ? (
                                <span className="text-red-600 text-[13px] leading-none relative left-1 lg:-left-8 md:-left-7 sm:-left-7 -top-1">UserName is required</span>
                        
                               ):(valid && !isNameValid ? (
                               <div className="pr-12 lg:pr-6 md:pr-10 sm:pr-10"> <span className="text-red-600 text-[13px] leading-sung relative left-8 lg:left-5 md:left-9 sm:left-8 -top-1">UserName must contain only letters</span> </div>
                               ) :(valid && name.length>0 && name.length<2 && 
                               (<div className="pr-13 lg:pr-4 md:pr-15 sm:pr-15"><span className="text-red-600 text-[13px] leading-none relative left-9 lg:left-7 md:left-9 sm:left-9 -top-1">UserName is too short,it must be atleast 2 characters</span></div>)))
                               }

                               <h1 className="lg:-ml-19 md:-ml-19 sm:-ml-19 -mt-2">Email (Optional)</h1>
                               <input type="text" 
                               value={email}
                               onChange={handleEmailChange}
                               className="border-1 border-gray-300 rounded px-2 py-3 w-30 sm:w-auto" />
                               {valid && !isEmailValid && 
                               (<span className="text-red-600 text-[13px] leading-sung relative -left-5 md:-left-13 sm:-left-13 -top-1">Invalid Email</span>)}
                            </> 
                               ) : (
                            <>
                               <h1 className="-ml-22 lg:-ml-42 md:-ml-38 sm:-ml-38 mt-3">OTP</h1>
                               <input type="text" 
                               value={otp}
                               onChange={(e)=>{
                               setOtp(e.target.value)
                               }}
                               className="border-1 border-gray-300 rounded lg:px-2 py-3 w-30 sm:w-auto" />
                            </>
                            )
                        )} 
                     {/* input end */}

                        <Button size="sm" variant="gradient" 
                            className='px-10 sm:px-18 lg:px-20 md:px-18 mb-6 mt-1'
                            onClick={() => {
                              phoneHandler();
                            }}>
                          {step==="phone" ? (<h1>Login</h1>) : (<h1 className="-mx-3">Continue</h1>)}
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
