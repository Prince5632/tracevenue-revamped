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
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="text-center">
                <p className="text-gray-500 text-sm">
                    Enter the 4-digit code sent to
                </p>
                <p className="text-gray-900 font-semibold mt-1 flex items-center justify-center gap-2">
                    +91 {phoneNumber}
                    <button
                        onClick={onEditPhone}
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
                            className={`w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold rounded-lg border-2 outline-none focus:border-orange-500 focus:bg-orange-50 transition-all ${error ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            autoFocus={i === 0}
                        />
                    ))}
                </div>
                {error && <p className="text-xs text-red-500 font-medium text-center">{error}</p>}
            </div>

            <Button
                onClick={onSubmit}
                disabled={loading}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 flex items-center justify-center"
            >
                {loading ? <Spinner size="sm" color="white" /> : "Verify & Login"}
            </Button>

            <div className="text-center">
                {canResend ? (
                    <button
                        onClick={onResend}
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
    );
};

export default OtpInput;
