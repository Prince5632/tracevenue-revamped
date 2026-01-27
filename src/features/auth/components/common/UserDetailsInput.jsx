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
                onClick={onSubmit}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
                Continue
            </Button>
        </div>
    );
};

export default UserDetailsInput;
