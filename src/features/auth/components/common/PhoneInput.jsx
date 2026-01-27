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
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className={`flex items-center h-12 rounded-lg border focus-within:ring-2 focus-within:ring-orange-200 transition-all ${error ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-orange-500'}`}>
                    <div className="pl-4 pr-3 text-gray-500 font-medium border-r border-gray-200 h-[60%] flex items-center">
                        +91
                    </div>
                    <input
                        type="tel"
                        placeholder="Enter phone number"
                        className="flex-1 h-full px-3 outline-none bg-transparent text-gray-900 font-medium placeholder:text-gray-400"
                        value={phoneNumber}
                        onChange={handleChange}
                        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                        autoFocus
                    />
                </div>
                {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
            </div>

            <Button
                onClick={onSubmit}
                disabled={loading}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center catch-all-btn"
            >
                {loading ? <Spinner size="sm" color="white" /> : "Continue"}
            </Button>
        </div>
    );
};

export default PhoneInput;
