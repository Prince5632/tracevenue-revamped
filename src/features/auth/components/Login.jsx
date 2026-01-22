import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@shared/components/ui";
import { Spinner, useToast } from "@/shared/components/feedback";
import { sendOtp, verifyOtp, generateToken, getUserData, checkUser } from "@/services/userService";
import loginBnr from "@/assets/login-bnr.png";

const Login = ({ onLoginSuccess, onClose, type }) => {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [authType, setAuthType] = useState(type);

    useEffect(() => {
        setAuthType(type);
    }, [type]);

    // State for flow control
    // step: 'PHONE' | 'DETAILS' | 'OTP'
    const [step, setStep] = useState("PHONE");
    const [loading, setLoading] = useState(false);

    // Form Data
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);

    // Status flags
    const [userExists, setUserExists] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [timer, setTimer] = useState(60);

    // Refs
    const otpRefs = [useRef(), useRef(), useRef(), useRef()];

    // Errors
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let interval;
        if (step === "OTP" && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, step]);

    const validatePhone = (phone) => {
        if (!phone) return "Phone number is required";
        if (!/^[6789]\d{9}$/.test(phone)) return "Invalid phone number";
        return "";
    };

    const validateDetails = () => {
        const newErrors = {};
        if (!fullName.trim() || fullName.length < 2) newErrors.fullName = "Name must be at least 2 characters";
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
        return newErrors;
    };

    const handleSendOtp = async () => {
        const phoneError = validatePhone(phoneNumber);
        if (phoneError) {
            setErrors({ phoneNumber: phoneError });
            return;
        }
        setErrors({});
        setLoading(true);

        try {
            const response = await sendOtp({ phoneNumber });
            if (response?.status === 200) {
                const exists = response.data?.userExists;
                setUserExists(exists);

                if (authType === "login") {
                    if (exists) {
                        // Normal Login: User exists, proceeding to OTP
                        showToast({ type: "success", message: "OTP sent successfully" });
                        setStep("OTP");
                        startTimer();
                    } else {
                        // Login -> New User: Switch to Signup
                        showToast({ type: "info", message: "You have to create a new account" });
                        setAuthType("signup");
                        setStep("DETAILS");
                    }
                } else {
                    // authType === "signup"
                    if (exists) {
                        // Signup -> Existing User: Switch to Login
                        showToast({ type: "info", message: "You already have an account" });
                        setAuthType("login");
                        setStep("OTP");
                        startTimer();
                    } else {
                        // Normal Signup: User new, proceeding to Details
                        showToast({ type: "success", message: "OTP sent successfully" });
                        setStep("DETAILS");
                    }
                }
            } else {
                showToast({ type: "error", message: "Failed to send OTP" });
            }
        } catch (error) {
            console.error(error);
            showToast({ type: "error", message: "Error sending OTP" });
        } finally {
            setLoading(false);
        }
    };

    const handleDetailsSubmit = async () => {
        const detailErrors = validateDetails();
        if (Object.keys(detailErrors).length > 0) {
            setErrors(detailErrors);
            return;
        }
        setErrors({});

        // Check if we need to send OTP again or just move to OTP step
        // Usually flow is -> Send OTP (done) -> Enter Details -> Verify OTP logic
        // But some flows send OTP *after* details.
        // Based on TraceVenue-Customer logic:
        // "Handle username input change to show OTP field" -> implies separate OTP send?
        // Actually earlier code sent OTP on phone submit.
        // Let's assume OTP was sent at step 1. We just move to OTP screen now.
        // However, if the session expired or logic requires, strict flow might be needed.
        // We'll proceed to OTP step.

        setStep("OTP");
        startTimer();
    };

    // For new user flow: The initial OTP sent might be valid for phone verification.
    // If not, we might need to trigger sendOtp again?
    // Usually one OTP per session. We'll assume the one sent at Step 1 is valid.

    const handleVerify = async () => {
        const otpValue = otp.join("");
        if (otpValue.length !== 4) {
            setErrors({ otp: "Enter 4-digit OTP" });
            return;
        }
        setLoading(true);

        const payload = {
            phoneNumber,
            otp: otpValue,
            // distinct fields for registration
            userName: fullName,
            email: email,
            isVerified: true
        };

        try {
            // 1. Verify OTP
            const verifyRes = await verifyOtp({ phoneNumber, otp: otpValue });

            if (verifyRes?.status === 200) {
                if (userExists) {
                    // Login Flow
                    await performLogin(payload);
                } else {
                    // Registration Flow
                    // 2. Check/Create User
                    const checkRes = await checkUser(payload, (msg) => showToast({ type: "error", message: msg }));
                    if (checkRes?.status === 201) {
                        // 3. Generate Token
                        await performLogin(payload);
                    }
                }
            } else {
                setErrors({ otp: "Invalid OTP" });
                showToast({ type: "error", message: "Invalid OTP" });
            }
        } catch (error) {
            console.error(error);
            showToast({ type: "error", message: "Authentication failed" });
        } finally {
            setLoading(false);
        }
    };

    const performLogin = async (payload) => {
        const tokenRes = await generateToken(payload, (msg) => showToast({ type: "error", message: msg }));
        if (tokenRes?.status === 201) {
            const userRes = await getUserData((msg) => { });
            showToast({ type: "success", message: userExists ? "Login successful" : "Account created successfully" });
            if (onLoginSuccess) {
                onLoginSuccess();
            } else {
                navigate("/");
            }
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            // Logic for resend
            const response = await sendOtp({ phoneNumber });
            if (response?.status === 200) {
                showToast({ type: "success", message: "OTP resent successfully" });
                startTimer();
                setOtp(["", "", "", ""]);
            }
        } catch (error) {
            showToast({ type: "error", message: "Failed to resend OTP" });
        } finally {
            setLoading(false);
        }
    };

    const startTimer = () => {
        setTimer(60);
        setCanResend(false);
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setErrors((prev) => ({ ...prev, otp: "" }));
        if (value && index < 3) otpRefs[index + 1].current?.focus();
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").slice(0, 4);
        if (!/^\d+$/.test(pasted)) return;
        const newOtp = pasted.split("").slice(0, 4).concat(Array(4).fill("")).slice(0, 4);
        setOtp(newOtp);
    };

    // Close handler
    const handleClose = () => {
        if (onClose) onClose();
        else navigate("/"); // Default fallback if no close prop
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={handleClose}>
            <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-[900px] flex overflow-hidden relative animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>

                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                    }}
                    className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Left Column - Illustration */}
                <div className="hidden md:flex w-[45%] bg-indigo-50 items-center justify-center p-8 relative overflow-hidden">
                    {/* Background decorations or just the image */}
                    <div className="absolute inset-0 bg-blue-50/50"></div>
                    <img
                        src={loginBnr}
                        alt="Login Illustration"
                        className="relative z-10 max-w-full h-auto object-contain drop-shadow-lg transform hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Right Column - Form */}
                <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 font-outfit">
                        {authType === "login" ? "Login" : "Sign Up"}
                    </h2>

                    <div className="space-y-6">
                        {/* Step 1: Phone */}
                        {step === "PHONE" && (
                            <div className="space-y-4 animate-in slide-in-from-right duration-300">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                    <div className={`flex items-center h-12 rounded-lg border focus-within:ring-2 focus-within:ring-orange-200 transition-all ${errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-orange-500'}`}>
                                        <div className="pl-4 pr-3 text-gray-500 font-medium border-r border-gray-200 h-[60%] flex items-center">
                                            +91
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="Enter phone number"
                                            className="flex-1 h-full px-3 outline-none bg-transparent text-gray-900 font-medium placeholder:text-gray-400"
                                            value={phoneNumber}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, "");
                                                if (val.length <= 10) setPhoneNumber(val);
                                                if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: "" }));
                                            }}
                                            onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                                            autoFocus
                                        />
                                    </div>
                                    {errors.phoneNumber && <p className="text-xs text-red-500 font-medium mt-1">{errors.phoneNumber}</p>}
                                </div>

                                <Button
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="w-full h-12 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {loading ? <Spinner size="sm" color="white" /> : "Continue"}
                                </Button>
                            </div>
                        )}

                        {/* Step 2a: Details (New User) */}
                        {step === "DETAILS" && (
                            <div className="space-y-4 animate-in slide-in-from-right duration-300">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        className={`w-full h-12 rounded-lg border px-4 outline-none focus:ring-2 focus:ring-orange-200 transition-all ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-orange-500'}`}
                                        value={fullName}
                                        onChange={(e) => {
                                            setFullName(e.target.value);
                                            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: "" }))
                                        }}
                                    />
                                    {errors.fullName && <p className="text-xs text-red-500 font-medium mt-1">{errors.fullName}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email (Optional)</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        className={`w-full h-12 rounded-lg border px-4 outline-none focus:ring-2 focus:ring-orange-200 transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-orange-500'}`}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) setErrors(prev => ({ ...prev, email: "" }))
                                        }}
                                    />
                                    {errors.email && <p className="text-xs text-red-500 font-medium mt-1">{errors.email}</p>}
                                </div>

                                <Button
                                    onClick={handleDetailsSubmit}
                                    className="w-full h-12 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                >
                                    Continue
                                </Button>
                            </div>
                        )}

                        {/* Step 2b: OTP */}
                        {step === "OTP" && (
                            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm">
                                        Enter the 4-digit code sent to
                                    </p>
                                    <p className="text-gray-900 font-semibold mt-1 flex items-center justify-center gap-2">
                                        +91 {phoneNumber}
                                        <button
                                            onClick={() => { setStep("PHONE"); setOtp(["", "", "", ""]); setErrors({}); }}
                                            className="text-orange-600 hover:text-orange-700 text-xs font-normal underline cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex gap-4 justify-center" onPaste={handleOtpPaste}>
                                        {otp.map((digit, i) => (
                                            <input
                                                key={i}
                                                ref={otpRefs[i]}
                                                type="text"
                                                maxLength={1}
                                                className={`w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold rounded-lg border-2 outline-none focus:border-orange-500 focus:bg-orange-50 transition-all ${errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                                autoFocus={i === 0}
                                            />
                                        ))}
                                    </div>
                                    {errors.otp && <p className="text-xs text-red-500 font-medium text-center">{errors.otp}</p>}
                                </div>

                                <Button
                                    onClick={handleVerify}
                                    disabled={loading}
                                    className="w-full h-12 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 flex items-center justify-center"
                                >
                                    {loading ? <Spinner size="sm" color="white" /> : "Verify & Login"}
                                </Button>

                                <div className="text-center">
                                    {canResend ? (
                                        <button
                                            onClick={handleResendOtp}
                                            className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors cursor-pointer"
                                        >
                                            Resend OTP
                                        </button>
                                    ) : (
                                        <p className="text-gray-400 text-sm">
                                            Resend OTP in <span className="text-gray-900 font-medium">{timer}s</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Terms */}
                        <p className="text-[10px] md:text-xs text-center text-gray-400 leading-relaxed px-4">
                            By clicking continue, you agree to our{" "}
                            <span className="text-gray-600 hover:text-orange-600 cursor-pointer transition-colors">Terms of Service</span>
                            {" "}and{" "}
                            <span className="text-gray-600 hover:text-orange-600 cursor-pointer transition-colors">Privacy Policy</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
