import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/shared/components/feedback";
import { sendOtp, verifyOtp, generateToken, getUserData, checkUser } from "@/services/userService";
import loginBnr from "@/assets/login-bnr.png";
import PhoneInput from "./common/PhoneInput";
import UserDetailsInput from "./common/UserDetailsInput";
import OtpInput from "./common/OtpInput";

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
                                onEditPhone={() => { setStep("PHONE"); setOtp(["", "", "", ""]); setErrors({}); }}
                                onSubmit={handleVerify}
                                loading={loading}
                                canResend={canResend}
                                timer={timer}
                                onResend={handleResendOtp}
                                otpRefs={otpRefs}
                            />
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
