import React, { useRef, useEffect } from "react";
import { Button } from "@shared/components/ui";
import { Spinner } from "@/shared/components/feedback";

const OtpInput = ({
    phoneNumber,
    otp,
    setOtp,
    error,
    setError,
    onEditPhone,
    onSubmit,
    loading,
    canResend,
    timer,
    onResend,
    otpRefs
}) => {

    // Internal refs if not passed (though we passed them for parent control if needed, 
    // but better to keep refs internal if possible or passed down for focus management).
    // The original code managed focus, so we use the passed refs.

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (error) setError(""); // Clear error here instead of passing setErrors object
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

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-300">
            <div className="text-center space-y-2 mb-2">
                <p className="text-gray-500 font-medium">
                    Enter the 4-digit code sent to
                </p>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-900 font-bold text-lg tracking-wide">+91 {phoneNumber}</span>
                    <button
                        onClick={onEditPhone}
                        className="text-orange-600 hover:text-orange-700 text-sm font-semibold hover:underline cursor-pointer transition-colors"
                    >
                        Edit
                    </button>
                </div>
            </div>

            <div className="space-y-4 mb-2">
                <div className="flex gap-4 justify-center" onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={otpRefs[i]}
                            type="text"
                            maxLength={1}
                            className={`w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold rounded-2xl border-2 outline-none transition-all duration-200 transform focus:scale-110 ${error ? 'border-red-500 bg-red-50/50 text-red-600' : 'border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:bg-white text-gray-800 shadow-sm focus:shadow-lg focus:shadow-orange-500/20'}`}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            autoFocus={i === 0}
                        />
                    ))}
                </div>
                {error && <p className="text-sm text-red-500 font-medium text-center bg-red-50 py-2 rounded-lg">{error}</p>}
            </div>
            <div className="text-center mb-1">
                {canResend ? (
                    <p className="text-gray-600 font-medium text-sm">
                        Didn't receive code?{" "}
                        <button
                            onClick={onResend}
                            className="text-orange-600 hover:text-orange-700 font-bold hover:underline transition-colors cursor-pointer ml-1"
                        >
                            Resend OTP
                        </button>
                    </p>
                ) : (
                    <p className="text-gray-400 text-sm font-medium">
                        Resend OTP in <span className="text-gray-900 font-bold">{timer}s</span>
                    </p>
                )}
            </div>
            <div className="space-y-6">
                <Button
                    onClick={onSubmit}
                    disabled={loading}
                    className="w-full h-[52px] bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-[16px]"
                >
                    {loading ? <Spinner size="sm" color="white" /> : "Verify & Login"}
                </Button>


            </div>
        </div>
    );
};

export default OtpInput;
