import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/shared/components/feedback";
import { sendOtp, verifyOtp, generateToken, getUserData, checkUser } from "@/services/userService";
import loginBnr from "@/assets/login-bnr.png";
import PhoneInput from "./common/PhoneInput";
import UserDetailsInput from "./common/UserDetailsInput";
import OtpInput from "./common/OtpInput";
import { useAuth } from "@/features/auth/context/useAuthStore.jsx";

const Login = ({ onLoginSuccess, onClose, type, isModal = true, withIllustration = true }) => {
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
    const otpRefs = useRef([]);

    if (otpRefs.current.length === 0) {
        otpRefs.current = Array.from({ length: 4 }, () => React.createRef());
    }

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
                        showToast({ type: "success", message: "OTP sent successfully" });
                        setStep("OTP");
                        startTimer();
                    } else {
                        showToast({ type: "info", message: "You have to create a new account" });
                        setAuthType("signup");
                        setStep("DETAILS");
                    }
                } else {
                    if (exists) {
                        showToast({ type: "info", message: "You already have an account" });
                        setAuthType("login");
                        setStep("OTP");
                        startTimer();
                    } else {
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
        setStep("OTP");
        startTimer();
    };

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
            userName: fullName,
            email: email,
            isVerified: true
        };

        try {
            const verifyRes = await verifyOtp({ phoneNumber, otp: otpValue });

            if (verifyRes?.status === 200) {
                if (userExists) {
                    await performLogin(payload);
                } else {
                    const checkRes = await checkUser(payload, (msg) => showToast({ type: "error", message: msg }));
                    if (checkRes?.status === 201) {
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

    const { setIsLoggedIn, fetchUserData } = useAuth();

    const performLogin = async (payload) => {
        const tokenRes = await generateToken(payload, (msg) => showToast({ type: "error", message: msg }));
        if (tokenRes?.status === 201) {
            // Fetch and store user data in global state
            await fetchUserData();

            showToast({ type: "success", message: userExists ? "Login successful" : "Account created successfully" });

            // Update global auth state
            setIsLoggedIn(true);

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

    // Close handler
    const handleClose = () => {
        if (onClose) onClose();
        else navigate("/");
    };

    const content = (
        <div className={`bg-white rounded-[24px] shadow-2xl min-h-[320px] w-full ${isModal ? 'max-w-[650px]' : 'max-w-full h-full'} flex overflow-hidden relative animate-in fade-in zoom-in duration-300`} onClick={(e) => e.stopPropagation()}>
            {/* Close Button - Only show if modal */}
            {isModal && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                    }}
                    className="absolute top-6 right-6 z-20 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            )}

            {/* Left Column - Illustration */}
            {withIllustration && (
                <div className="hidden md:flex w-[45%] items-center justify-center p-1 relative overflow-hidden">
                    <img
                        src={loginBnr}
                        alt="Login Illustration"
                        className="relative z-10 w-full max-w-[340px] h-auto object-contain drop-shadow-md "
                    />
                </div>
            )}

            {/* Right Column - Form */}
            <div className={`w-full ${withIllustration ? 'md:w-[55%]' : ''} p-4 md:p-8 flex flex-col justify-center`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-outfit">
                    {authType === "login" ? "Login" : "Sign Up"}
                </h2>

                <div className="space-y-6">
                    {/* Step 1: Phone */}
                    {step === "PHONE" && (
                        <PhoneInput
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            onSubmit={handleSendOtp}
                            loading={loading}
                            error={errors.phoneNumber}
                            setError={(val) => setErrors(prev => ({ ...prev, phoneNumber: val }))}
                        />
                    )}

                    {/* Step 2a: Details (New User) */}
                    {step === "DETAILS" && (
                        <UserDetailsInput
                            fullName={fullName}
                            setFullName={setFullName}
                            email={email}
                            setEmail={setEmail}
                            onSubmit={handleDetailsSubmit}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    )}

                    {/* Step 2b: OTP */}
                    {step === "OTP" && (
                        <OtpInput
                            phoneNumber={phoneNumber}
                            otp={otp}
                            setOtp={setOtp}
                            error={errors.otp}
                            setError={(val) => setErrors(prev => ({ ...prev, otp: val }))}
                            onEditPhone={() => {
                                setStep("PHONE");
                                setOtp(["", "", "", ""]);
                                setErrors({});
                            }}
                            onSubmit={handleVerify}
                            loading={loading}
                            canResend={canResend}
                            timer={timer}
                            onResend={handleResendOtp}
                            otpRefs={otpRefs.current}
                        />
                    )}
                </div>
            </div>
        </div>
    );
    if (!isModal) {
        return content;
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={handleClose}>
            {content}
        </div>
    );
};

export default Login;
