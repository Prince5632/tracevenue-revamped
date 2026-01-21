import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner } from "../components/common";

/**
 * Login Page - Full page layout with slider and OTP-based login
 * Converted from module CSS to Tailwind
 */
const LoginPage = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(60);

    // OTP Input refs
    const otpRefs = [useRef(), useRef(), useRef(), useRef()];
    const [otpValues, setOtpValues] = useState(['', '', '', '']);

    // Slider state
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderImages = [
        {
            url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80",
            title: "Find Your Perfect Venue",
            subtitle: "500+ verified venues across Tricity"
        },
        {
            url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=80",
            title: "Premium Catering",
            subtitle: "Curated menus for every celebration"
        },
        {
            url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&q=80",
            title: "Memorable Events",
            subtitle: "From intimate to grand celebrations"
        }
    ];

    // Auto-slide
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [sliderImages.length]);

    const [loadingState, setLoadingState] = useState({
        otpSending: false,
        otpVerfying: false,
        otpResending: false,
        otpCanResend: false,
    });

    const [state, setState] = useState({
        tab: 1, // 1 = Phone entry, 2 = OTP verification
        userExists: true,
        phoneNumber: "",
    });

    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [otpError, setOtpError] = useState("");

    // OTP Timer
    useEffect(() => {
        if (state.tab !== 2) return;
        if (count === 0) {
            setLoadingState((prev) => ({ ...prev, otpCanResend: true }));
            return;
        }
        const timerId = setTimeout(() => setCount((prev) => prev - 1), 1000);
        return () => clearTimeout(timerId);
    }, [count, state.tab]);

    // Handle OTP input
    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otpValues];
        newOtp[index] = value.slice(-1);
        setOtpValues(newOtp);
        setOtpError("");

        // Auto-focus next
        if (value && index < 3) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').slice(0, 4);
        if (!/^\d+$/.test(pasted)) return;

        const digits = pasted.split('');
        const newOtp = ['', '', '', ''];
        digits.forEach((d, i) => { if (i < 4) newOtp[i] = d; });
        setOtpValues(newOtp);

        const nextEmpty = digits.length < 4 ? digits.length : 3;
        otpRefs[nextEmpty].current?.focus();
    };

    // Validate phone
    const validatePhone = (value) => {
        if (!value) return "Phone number is required";
        if (value.length !== 10) return "Must be 10 digits";
        if (!/^[6789]\d{9}$/.test(value)) return "Invalid phone number";
        return "";
    };

    // Send OTP
    const handleSendOtp = async () => {
        const error = validatePhone(phoneNumber);
        if (error) {
            setPhoneError(error);
            return;
        }

        setLoadingState((prev) => ({ ...prev, otpSending: true }));

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setCount(60);
        setOtpValues(['', '', '', '']);
        setLoadingState((prev) => ({ ...prev, otpSending: false, otpCanResend: false }));
        setState({
            ...state,
            tab: 2,
            phoneNumber: phoneNumber,
            userExists: true, // Simulating existing user
        });

        setTimeout(() => otpRefs[0].current?.focus(), 100);
    };

    // Verify OTP
    const handleVerifyOtp = async () => {
        const otp = otpValues.join('');
        if (otp.length !== 4) {
            setOtpError("Please enter 4-digit OTP");
            return;
        }

        setLoadingState((prev) => ({ ...prev, otpVerfying: true }));

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Demo: any OTP works
        localStorage.setItem('token', 'demo-token');
        setLoadingState((prev) => ({ ...prev, otpVerfying: false }));
        navigate('/');
    };

    // Resend OTP
    const handleResendOtp = async () => {
        setLoadingState((prev) => ({ ...prev, otpResending: true }));

        await new Promise(resolve => setTimeout(resolve, 500));

        setCount(60);
        setOtpValues(['', '', '', '']);
        setLoadingState((prev) => ({ ...prev, otpResending: false, otpCanResend: false }));
        otpRefs[0].current?.focus();
    };

    const goBack = () => {
        setState({ ...state, tab: 1 });
        setOtpValues(['', '', '', '']);
        setOtpError("");
    };

    return (
        <div className="flex min-h-screen w-full font-sans bg-white">
            {/* Left Side - Image Slider (hidden on mobile) */}
            <div className="relative w-1/2 min-h-screen overflow-hidden hidden md:block lg:w-1/2">
                {/* Slides */}
                {sliderImages.map((slide, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${i === currentSlide
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-105'
                            }`}
                        style={{ backgroundImage: `url(${slide.url})` }}
                    />
                ))}

                {/* Orange Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff4000]/90 via-[#ff5a28]/80 to-black/70 z-10" />

                {/* Content */}
                <div className="relative z-20 h-full p-12 flex flex-col text-white">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                        <span className="text-[22px] font-bold tracking-tight">Tracevenue</span>
                    </div>

                    {/* Slide Text */}
                    <div className="flex-1 flex flex-col justify-center max-w-[400px]">
                        <h1 className="text-[44px] font-extrabold leading-tight mb-4 tracking-tight">
                            {sliderImages[currentSlide].title}
                        </h1>
                        <p className="text-lg opacity-90">
                            {sliderImages[currentSlide].subtitle}
                        </p>
                    </div>

                    {/* Dots */}
                    <div className="flex gap-2.5">
                        {sliderImages.map((_, i) => (
                            <button
                                key={i}
                                className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide
                                        ? 'w-8 bg-white'
                                        : 'w-2.5 bg-white/40 hover:bg-white/70'
                                    }`}
                                onClick={() => setCurrentSlide(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form Area */}
            <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 md:p-12 bg-[#fafafa] md:bg-[#fafafa]">
                <div className="w-full max-w-[380px] bg-white md:bg-transparent rounded-3xl md:rounded-none p-8 md:p-0 shadow-xl md:shadow-none">

                    {/* Mobile Brand */}
                    <div className="flex md:hidden items-center gap-2.5 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#ff4000] to-[#ff5722] rounded-xl flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-[#111]">Tracevenue</span>
                    </div>

                    {/* Header */}
                    <div className="mb-9">
                        {state.tab === 2 && (
                            <button
                                className="w-[42px] h-[42px] border border-[#e5e5e5] rounded-xl bg-white flex items-center justify-center mb-6 hover:bg-[#f5f5f5] hover:-translate-x-0.5 transition-all cursor-pointer"
                                onClick={goBack}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#333]">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}
                        <h1 className="text-[32px] font-extrabold text-[#111] mb-2 tracking-tight">
                            {state.tab === 1 ? "Welcome!" : "Welcome back!"}
                        </h1>
                        <p className="text-[15px] text-[#666] leading-relaxed">
                            {state.tab === 1
                                ? "Enter your phone number to continue"
                                : `Enter OTP sent to +91 ${state.phoneNumber}`}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="flex flex-col gap-6">
                        {/* Step 1: Phone */}
                        {state.tab === 1 && (
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#333]">Phone Number</label>
                                <div className={`flex items-center bg-white border-[1.5px] rounded-lg h-12 overflow-hidden transition-colors ${phoneError ? 'border-red-500' : 'border-[#e0e0e0] focus-within:border-[#ff4000]'
                                    }`}>
                                    <span className="px-3 text-[15px] font-semibold text-[#333] border-r-[1.5px] border-[#e0e0e0] bg-[#f5f5f5] h-full flex items-center">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        placeholder="Enter 10 digit number"
                                        maxLength={10}
                                        autoFocus
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value.replace(/\D/g, ''));
                                            setPhoneError("");
                                        }}
                                        className="flex-1 px-3 h-full text-[15px] font-medium text-[#111] bg-transparent outline-none placeholder:text-[#999] placeholder:font-normal"
                                    />
                                </div>
                                {phoneError && (
                                    <span className="text-[13px] text-red-500 font-medium">{phoneError}</span>
                                )}
                            </div>
                        )}

                        {/* Step 2: OTP */}
                        {state.tab === 2 && (
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#333]">Enter OTP</label>
                                <div className="flex gap-2.5" onPaste={handleOtpPaste}>
                                    {[0, 1, 2, 3].map((i) => (
                                        <input
                                            key={i}
                                            ref={otpRefs[i]}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={otpValues[i]}
                                            onChange={(e) => handleOtpChange(i, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                            autoFocus={i === 0}
                                            className={`w-14 h-14 border-[1.5px] rounded-lg bg-white text-2xl font-bold text-center text-[#111] outline-none transition-colors ${otpError ? 'border-red-500' : 'border-[#e0e0e0] focus:border-[#ff4000]'
                                                }`}
                                        />
                                    ))}
                                </div>
                                {otpError && (
                                    <span className="text-[13px] text-red-500 font-medium">{otpError}</span>
                                )}
                                <div className="flex justify-between items-center mt-2">
                                    {loadingState.otpCanResend ? (
                                        <button
                                            type="button"
                                            className="text-sm font-semibold text-[#ff4000] hover:underline cursor-pointer bg-transparent border-none p-0"
                                            onClick={handleResendOtp}
                                        >
                                            Resend OTP
                                        </button>
                                    ) : (
                                        <span className="text-sm text-[#999]">Resend in {count}s</span>
                                    )}
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-[#666] hover:text-[#333] cursor-pointer bg-transparent border-none p-0"
                                        onClick={goBack}
                                    >
                                        Change number
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            variant="gradient"
                            size="lg"
                            fullWidth
                            loading={loadingState.otpSending || loadingState.otpVerfying}
                            onClick={state.tab === 1 ? handleSendOtp : handleVerifyOtp}
                            className="h-[50px] rounded-xl shadow-[0_2px_8px_rgba(255,64,0,0.25)] hover:shadow-[0_4px_16px_rgba(255,64,0,0.35)] hover:-translate-y-0.5 transition-all"
                        >
                            {state.tab === 1 ? "Get OTP" : "Verify & Login"}
                        </Button>

                        {/* Terms */}
                        <p className="text-[13px] text-[#999] text-center leading-relaxed">
                            By continuing, you agree to our{" "}
                            <Link to="/terms" className="text-[#ff4000] font-semibold hover:underline">Terms</Link> and{" "}
                            <Link to="/privacy" className="text-[#ff4000] font-semibold hover:underline">Privacy Policy</Link>
                        </p>
                    </div>

                    {/* Features */}
                    <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-[#eee]">
                        <div className="flex items-center gap-2 text-sm text-[#666] font-medium">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#ff4000]">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                            </svg>
                            <span>Secure</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#666] font-medium">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#ff4000]">
                                <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" />
                            </svg>
                            <span>Fast</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#666] font-medium">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#ff4000]">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span>Verified</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
