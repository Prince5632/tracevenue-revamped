import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Spinner } from "../components/common";

/**
 * Login Page - Ultra Modern Premium Design
 * Full-screen, edge-to-edge, distinctive design
 */
const LoginPage = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(60);

    const otpRefs = [useRef(), useRef(), useRef(), useRef()];
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
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
            subtitle: "From intimate gatherings to grand celebrations"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [sliderImages.length]);

    const [loadingState, setLoadingState] = useState({
        otpSending: false,
        otpVerfying: false,
        otpCanResend: false,
    });

    const [state, setState] = useState({
        tab: 1,
        phoneNumber: "",
    });

    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [otpError, setOtpError] = useState("");

    useEffect(() => {
        if (state.tab !== 2) return;
        if (count === 0) {
            setLoadingState((prev) => ({ ...prev, otpCanResend: true }));
            return;
        }
        const timerId = setTimeout(() => setCount((prev) => prev - 1), 1000);
        return () => clearTimeout(timerId);
    }, [count, state.tab]);

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otpValues];
        newOtp[index] = value.slice(-1);
        setOtpValues(newOtp);
        setOtpError("");
        if (value && index < 3) otpRefs[index + 1].current?.focus();
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
    };

    const validatePhone = (value) => {
        if (!value) return "Phone number is required";
        if (value.length !== 10) return "Must be 10 digits";
        if (!/^[6789]\d{9}$/.test(value)) return "Invalid phone number";
        return "";
    };

    const handleSendOtp = async () => {
        const error = validatePhone(phoneNumber);
        if (error) { setPhoneError(error); return; }
        setLoadingState((prev) => ({ ...prev, otpSending: true }));
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCount(60);
        setOtpValues(['', '', '', '']);
        setLoadingState((prev) => ({ ...prev, otpSending: false, otpCanResend: false }));
        setState({ ...state, tab: 2, phoneNumber: phoneNumber });
        setTimeout(() => otpRefs[0].current?.focus(), 100);
    };

    const handleVerifyOtp = async () => {
        const otp = otpValues.join('');
        if (otp.length !== 4) { setOtpError("Enter 4-digit OTP"); return; }
        setLoadingState((prev) => ({ ...prev, otpVerfying: true }));
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem('token', 'demo-token');
        navigate('/');
    };

    const handleResendOtp = async () => {
        setCount(60);
        setOtpValues(['', '', '', '']);
        setLoadingState((prev) => ({ ...prev, otpCanResend: false }));
        otpRefs[0].current?.focus();
    };

    const goBack = () => {
        setState({ ...state, tab: 1 });
        setOtpValues(['', '', '', '']);
        setOtpError("");
    };

    return (
        <div className="fixed inset-0 w-screen h-screen overflow-hidden">
            {/* Full Background Image */}
            {sliderImages.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-out ${i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                    style={{ backgroundImage: `url(${slide.url})` }}
                />
            ))}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

            {/* Animated Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />

            {/* Content Container */}
            <div className="relative z-10 h-full flex">
                {/* Left Side - Branding & Info */}
                <div className="hidden lg:flex w-[55%] h-full flex-col justify-between p-12 xl:p-16 text-white">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Tracevenue</span>
                    </div>

                    {/* Main Title */}
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/10">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            500+ Venues Available
                        </div>

                        <h1 className="text-5xl xl:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
                            {sliderImages[currentSlide].title.split(' ').map((word, i) => (
                                <span key={i} className={i === sliderImages[currentSlide].title.split(' ').length - 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400' : ''}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className="text-xl text-white/70 font-light leading-relaxed">
                            {sliderImages[currentSlide].subtitle}
                        </p>

                        {/* Stats */}
                        <div className="flex gap-8 mt-12">
                            {[
                                { value: "500+", label: "Venues" },
                                { value: "50K+", label: "Customers" },
                                { value: "4.9★", label: "Rating" },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                    <div className="text-white/50 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex gap-3">
                        {sliderImages.map((_, i) => (
                            <Button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-12 bg-gradient-to-r from-orange-400 to-red-400' : 'w-6 bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-[45%] h-full flex items-center justify-center p-6 md:p-8">
                    <div className="w-full max-w-md">
                        {/* Glass Card */}
                        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl">
                            {/* Mobile Logo */}
                            <div className="lg:hidden flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-gray-900">Tracevenue</span>
                            </div>

                            {/* Header */}
                            <div className="mb-5">
                                {state.tab === 2 && (
                                    <Button
                                        onClick={goBack}
                                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center mb-4 transition-all group"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-gray-600 group-hover:text-orange-500 transition-colors">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                    </Button>
                                )}
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                                    {state.tab === 1 ? "Welcome back" : "Verify OTP"}
                                </h2>
                                <p className="text-gray-500">
                                    {state.tab === 1
                                        ? "Enter your phone number to continue"
                                        : <>Code sent to <span className="font-semibold text-gray-700">+91 {state.phoneNumber}</span></>}
                                </p>
                            </div>

                            {/* Form */}
                            <div className="space-y-4">
                                {/* Phone Input */}
                                {state.tab === 1 && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                        <div className={`flex items-center h-14 rounded-2xl border-2 overflow-hidden transition-all ${phoneError ? 'border-red-400 bg-red-50/50' : 'border-gray-200 focus-within:border-orange-500 bg-gray-50/50'
                                            }`}>
                                            <div className="h-full px-4 flex items-center bg-white border-r-2 border-gray-200">
                                                <span className="text-base font-semibold text-gray-700">+91</span>
                                            </div>
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
                                                className="flex-1 h-full px-4 text-lg font-medium text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
                                            />
                                        </div>
                                        {phoneError && <p className="text-sm text-red-500 font-medium">{phoneError}</p>}
                                    </div>
                                )}

                                {/* OTP Input */}
                                {state.tab === 2 && (
                                    <div className="space-y-3">
                                        <div className="flex gap-3" onPaste={handleOtpPaste}>
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
                                                    className={`w-14 h-14 text-xl font-bold text-center rounded-xl border-2 outline-none transition-all ${otpError
                                                        ? 'border-red-400 bg-red-50'
                                                        : otpValues[i]
                                                            ? 'border-orange-500 bg-orange-50 text-orange-600'
                                                            : 'border-gray-200 bg-gray-50 focus:border-orange-500'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        {otpError && <p className="text-sm text-red-500 font-medium">{otpError}</p>}
                                        <div className="flex justify-between text-sm">
                                            {loadingState.otpCanResend ? (
                                                <Button onClick={handleResendOtp} className="font-semibold text-orange-500 hover:text-orange-600">
                                                    Resend OTP
                                                </Button>
                                            ) : (
                                                <span className="text-gray-400">Resend in <span className="font-semibold text-gray-600">{count}s</span></span>
                                            )}
                                            <span onClick={goBack} className="text-gray-500 hover:text-orange-500 font-medium cursor-pointer">
                                                Change number
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    onClick={state.tab === 1 ? handleSendOtp : handleVerifyOtp}
                                    disabled={loadingState.otpSending || loadingState.otpVerfying}
                                    className="w-full h-14 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-red-600 text-white text-base font-semibold rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
                                >
                                    {(loadingState.otpSending || loadingState.otpVerfying) ? (
                                        <Spinner size="sm" color="white" />
                                    ) : (
                                        <>
                                            {state.tab === 1 ? "Get OTP" : "Verify & Login"}
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </Button>

                                {/* Terms */}
                                <p className="text-xs text-center text-gray-400 pt-2">
                                    By continuing, you agree to our{" "}
                                    <Link to="/terms" className="text-orange-500 hover:underline">Terms</Link> and{" "}
                                    <Link to="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>
                                </p>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex justify-center gap-6 mt-6 text-white/80">
                            {[
                                { icon: "�", label: "Secure" },
                                { icon: "⚡", label: "Fast" },
                                { icon: "✓", label: "Verified" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm font-medium">
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
