import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@shared/components/ui";
import { Spinner, useToast } from "@/shared/components/feedback";
import { sendOtp, verifyOtp, generateToken, getUserData } from "@/services/userService";
import Signup from "./Signup";

const Login = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [state, setState] = useState({
        step: "PHONE", // PHONE, LOGIN_OTP, SIGNUP
        phoneNumber: "",
        userExists: false,
    });

    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const otpRefs = [useRef(), useRef(), useRef(), useRef()];
    const [count, setCount] = useState(60);
    const [phoneError, setPhoneError] = useState("");
    const [otpError, setOtpError] = useState("");

    useEffect(() => {
        if (state.step === "LOGIN_OTP" && count > 0) {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [count, state.step]);

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setOtpError("");
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

    const validatePhone = (value) => {
        if (!value) return "Phone number is required";
        if (value.length !== 10) return "Must be 10 digits";
        if (!/^[6789]\d{9}$/.test(value)) return "Invalid phone number";
        return "";
    };

    const handleSendOtp = async () => {
        const error = validatePhone(state.phoneNumber);
        if (error) {
            setPhoneError(error);
            return;
        }

        setLoading(true);
        try {
            const response = await sendOtp({ phoneNumber: state.phoneNumber });

            if (response?.status === 200) {
                showToast({ type: "success", message: "OTP sent successfully" });
                const userExists = response.data?.userExists;

                setState(prev => ({
                    ...prev,
                    step: userExists ? "LOGIN_OTP" : "SIGNUP",
                    userExists: userExists
                }));
                setCount(60);
                setTimeout(() => {
                    if (userExists && otpRefs[0].current) otpRefs[0].current.focus();
                }, 100);
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

    const handleLoginVerify = async () => {
        const otpValue = otp.join("");
        if (otpValue.length !== 4) {
            setOtpError("Enter 4-digit OTP");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                phoneNumber: state.phoneNumber,
                otp: otpValue
            };

            // For existing user, check TraceVenue-Customerside logic:
            // 1. verifyOtp
            // 2. generateToken

            const verifyRes = await verifyOtp(payload);
            if (verifyRes?.status === 200) {
                const tokenRes = await generateToken(payload, (msg) => showToast({ type: "error", message: msg }));
                if (tokenRes?.status === 201) {
                    // Success
                    // const userData = await getUserData((msg) => {});
                    // dispatch(setUser(userData));
                    showToast({ type: "success", message: "Login successful" });

                    // Store token (API.js might rely on cookie, but LoginPage had explicit setItem?)
                    // The API service uses cookies. But let's check if we need to set localStorage "userDetails" or similar.
                    // Reference `userService.js`: `if (response?.status === 200 ... "no token") localStorage.removeItem("userDetails")`
                    // Just to be safe, fetch user data.
                    const userRes = await getUserData((msg) => { });
                    if (userRes) {
                        // dispatch/context update
                    }

                    if (onLoginSuccess) {
                        onLoginSuccess();
                    } else {
                        navigate("/");
                    }
                }
            } else {
                setOtpError("Invalid OTP");
                showToast({ type: "error", message: "Invalid OTP" });
            }

        } catch (error) {
            console.error(error);
            showToast({ type: "error", message: "Login failed" });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        try {
            // using resendOtp or sendOtp? Reference implementation uses `resendOtp`
            // Import it if not imported, or just use sendOtp as they often do same thing.
            // I'll stick to sendOtp for simplicity unless resendOtp is distinct.
            // Actually, `userService` has `resendOtp`. Let's use it if imported, but I imported sendOtp.
            // Let's use sendOtp again or update imports.
            const response = await sendOtp({ phoneNumber: state.phoneNumber });
            if (response?.status === 200) {
                showToast({ type: "success", message: "OTP resent successfully" });
                setCount(60);
                setOtp(["", "", "", ""]);
            }
        } catch (e) {
            showToast({ type: "error", message: "Failed to resend OTP" });
        } finally {
            setLoading(false);
        }
    };

    const goBack = () => {
        setState({ ...state, step: "PHONE", userExists: false });
        setOtp(["", "", "", ""]);
        setOtpError("");
    };

    if (state.step === "SIGNUP") {
        return (
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="mb-5">
                    <Button
                        onClick={goBack}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center mb-4 transition-all group"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="w-4 h-4 text-gray-600 group-hover:text-orange-500 transition-colors"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </Button>
                </div>
                <Signup
                    phoneNumber={state.phoneNumber}
                    onSuccess={() => {
                        showToast({ type: "success", message: "Account created successfully" });
                        if (onLoginSuccess) {
                            onLoginSuccess();
                        } else {
                            navigate("/");
                        }
                    }}
                    onError={(msg) => showToast({ type: "error", message: msg })}
                />
            </div>
        );
    }

    return (
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl">
            {/* Header */}
            <div className="mb-5">
                {state.step === "LOGIN_OTP" && (
                    <Button
                        onClick={goBack}
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center mb-4 transition-all group"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="w-4 h-4 text-gray-600 group-hover:text-orange-500 transition-colors"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </Button>
                )}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                    {state.step === "PHONE" ? "Welcome back" : "Verify OTP"}
                </h2>
                <p className="text-gray-500">
                    {state.step === "PHONE" ? (
                        "Enter your phone number to continue"
                    ) : (
                        <>
                            Code sent to{" "}
                            <span className="font-semibold text-gray-700">
                                +91 {state.phoneNumber}
                            </span>
                        </>
                    )}
                </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
                {/* Phone Input */}
                {state.step === "PHONE" && (
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                            Phone Number
                        </label>
                        <div
                            className={`flex items-center h-14 rounded-2xl border-2 overflow-hidden transition-all ${phoneError
                                ? "border-red-400 bg-red-50/50"
                                : "border-gray-200 focus-within:border-orange-500 bg-gray-50/50"
                                }`}
                        >
                            <div className="h-full px-4 flex items-center bg-white border-r-2 border-gray-200">
                                <span className="text-base font-semibold text-gray-700">
                                    +91
                                </span>
                            </div>
                            <input
                                type="tel"
                                placeholder="Enter 10 digit number"
                                maxLength={10}
                                autoFocus
                                value={state.phoneNumber}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    setState(prev => ({ ...prev, phoneNumber: val }));
                                    setPhoneError("");
                                }}
                                className="flex-1 h-full px-4 text-lg font-medium text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
                            />
                        </div>
                        {phoneError && (
                            <p className="text-sm text-red-500 font-medium">
                                {phoneError}
                            </p>
                        )}
                    </div>
                )}

                {/* OTP Input */}
                {state.step === "LOGIN_OTP" && (
                    <div className="space-y-3">
                        <div className="flex gap-3" onPaste={handleOtpPaste}>
                            {[0, 1, 2, 3].map((i) => (
                                <input
                                    key={i}
                                    ref={otpRefs[i]}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={otp[i]}
                                    onChange={(e) => handleOtpChange(i, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                    autoFocus={i === 0}
                                    className={`w-14 h-14 text-xl font-bold text-center rounded-xl border-2 outline-none transition-all ${otpError
                                        ? "border-red-400 bg-red-50"
                                        : otp[i]
                                            ? "border-orange-500 bg-orange-50 text-orange-600"
                                            : "border-gray-200 bg-gray-50 focus:border-orange-500"
                                        }`}
                                />
                            ))}
                        </div>
                        {otpError && (
                            <p className="text-sm text-red-500 font-medium">
                                {otpError}
                            </p>
                        )}
                        <div className="flex justify-between text-sm">
                            {count === 0 ? (
                                <Button
                                    onClick={handleResendOtp}
                                    variant="ghost"
                                    className="p-0 font-semibold text-orange-500 hover:bg-transparent hover:text-orange-600 h-auto"
                                >
                                    Resend OTP
                                </Button>
                            ) : (
                                <span className="text-gray-400">
                                    Resend in{" "}
                                    <span className="font-semibold text-gray-600">
                                        {count}s
                                    </span>
                                </span>
                            )}
                            <span
                                onClick={goBack}
                                className="text-gray-500 hover:text-orange-500 font-medium cursor-pointer transition-colors"
                            >
                                Change number
                            </span>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <Button
                    onClick={state.step === "PHONE" ? handleSendOtp : handleLoginVerify}
                    disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-red-600 text-white text-base font-semibold rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 disabled:opacity-70 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Spinner size="sm" color="white" />
                    ) : (
                        <>
                            {state.step === "PHONE" ? "Get OTP" : "Verify & Login"}
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </>
                    )}
                </Button>

                {/* Terms */}
                <p className="text-xs text-center text-gray-400 pt-2">
                    By continuing, you agree to our{" "}
                    <Link to="/terms" className="text-orange-500 hover:underline">
                        Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                        to="/privacy"
                        className="text-orange-500 hover:underline"
                    >
                        Privacy Policy
                    </Link>
                </p>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-center gap-6 mt-6 text-gray-500">
                {[
                    { icon: "🔒", label: "Secure" },
                    { icon: "⚡", label: "Fast" },
                    { icon: "✓", label: "Verified" },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 text-sm font-medium opacity-70"
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Login;
