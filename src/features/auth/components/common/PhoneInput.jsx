import React from "react";
import { Button } from "@shared/components/ui";
import { Spinner } from "@/shared/components/feedback";

const PhoneInput = ({
    phoneNumber,
    setPhoneNumber,
    onSubmit,
    loading,
    error,
    setError
}) => {

    const handleChange = (e) => {
        const val = e.target.value.replace(/\D/g, "");
        if (val.length <= 10) setPhoneNumber(val);
        if (error) setError("");
    };

    return (
        <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                <div className={`flex items-center h-[52px] rounded-xl border transition-all duration-200 ${error ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300 focus-within:border-orange-500'}`}>
                    <div className="pl-4 pr-3 text-gray-900 font-semibold border-r border-gray-200 h-[60%] flex items-center bg-transparent">
                        +91
                    </div>
                    <input
                        type="tel"
                        placeholder="Enter phone number"
                        className="flex-1 h-full px-4 outline-none bg-transparent text-gray-900 font-medium placeholder:text-gray-400 text-lg tracking-wide"
                        value={phoneNumber}
                        onChange={handleChange}
                        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                        autoFocus
                    />
                </div>
                {error && <p className="text-xs text-red-500 font-medium mt-1 ml-1 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    {error}
                </p>}
            </div>

            <Button
                onClick={onSubmit}
                disabled={loading}
                className="w-full h-[52px] bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-[16px]"
            >
                {loading ? <Spinner size="sm" color="white" /> : "Login"}
            </Button>
        </div>
    );
};

export default PhoneInput;
