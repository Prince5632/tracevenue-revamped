import React from "react";
import { Button } from "@shared/components/ui";

const UserDetailsInput = ({
    fullName,
    setFullName,
    email,
    setEmail,
    onSubmit,
    errors,
    setErrors
}) => {
    return (
        <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                <input
                    type="text"
                    placeholder="Enter full name"
                    className={`w-full h-[52px] rounded-xl border px-4 outline-none transition-all duration-200 text-gray-900 font-medium placeholder:text-gray-400 ${errors.fullName ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'}`}
                    value={fullName}
                    onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors(prev => ({ ...prev, fullName: "" }))
                    }}
                />
                {errors.fullName && <p className="text-xs text-red-500 font-medium mt-1 ml-1 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    {errors.fullName}
                </p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email (Optional)</label>
                <input
                    type="email"
                    placeholder="Enter email address"
                    className={`w-full h-[52px] rounded-xl border px-4 outline-none transition-all duration-200 text-gray-900 font-medium placeholder:text-gray-400 ${errors.email ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10'}`}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }))
                    }}
                />
                {errors.email && <p className="text-xs text-red-500 font-medium mt-1 ml-1 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    {errors.email}
                </p>}
            </div>

            <Button
                onClick={onSubmit}
                className="w-full h-[52px] bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 transition-all duration-300 flex items-center justify-center text-[16px]"
            >
                Continue
            </Button>
        </div>
    );
};

export default UserDetailsInput;
