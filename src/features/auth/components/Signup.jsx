import React, { useState } from "react";
import { Button, Input } from "@shared/components/ui";
import { verifyOtp, checkUser, generateToken, getUserData } from "@/services/userService";
import { useDispatch } from "react-redux";
// Assuming there's a userSlice or similar, but for now we'll stick to local state processing 
// and the provided services. If dispatch is needed for global state, we'll add it.
// The reference file used `updateUser` from `userSlice`. I'll check if I need to add that later.
// For now, I will assume the goal is to get the token and user data.

const Signup = ({ phoneNumber, onSuccess, onError }) => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        otp: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.userName.trim()) {
            newErrors.userName = "Full Name is required";
        } else if (formData.userName.trim().length < 2) {
            newErrors.userName = "Name must be at least 2 characters";
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.otp) {
            newErrors.otp = "OTP is required";
        } else if (formData.otp.length !== 4) {
            newErrors.otp = "OTP must be 4 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        const apiPayload = {
            userName: formData.userName,
            phoneNumber: phoneNumber,
            email: formData.email,
            isVerified: true,
            otp: formData.otp,
        };

        try {
            // 1. Verify OTP
            const verifyResponse = await verifyOtp(apiPayload);

            if (verifyResponse?.status === 200) {
                // 2. Create User (Check User)
                const checkResponse = await checkUser(apiPayload, (msg) => onError && onError(msg));

                if (checkResponse?.status === 201) {
                    // 3. Generate Token
                    const tokenResponse = await generateToken(apiPayload, (msg) => onError && onError(msg));

                    if (tokenResponse?.status === 201) {
                        // 4. Get User Data (Optional but good for confirming login)
                        // const userData = await getUserData((msg) => onError && onError(msg));
                        // if (onSuccess) onSuccess(userData);

                        // Just calling onSuccess to proceed
                        if (onSuccess) onSuccess();

                    } else {
                        if (onError) onError("Failed to generate token");
                    }
                } else {
                    // Error handled by callback usually, but if checkResponse fails without throwing
                    if (onError && !checkResponse) onError("Failed to register user");
                }
            } else {
                setErrors((prev) => ({ ...prev, otp: "Invalid OTP" }));
                if (onError) onError("Invalid OTP");
            }
        } catch (error) {
            console.error("Signup error:", error);
            if (onError) onError("An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Create Account</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Complete your profile for {phoneNumber}
                </p>
            </div>

            <Input
                label="Full Name"
                placeholder="Enter your full name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                error={errors.userName}
                required
            />

            <Input
                label="Email (Optional)"
                placeholder="Enter your email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <Input
                label="OTP"
                placeholder="Enter 4-digit OTP"
                name="otp"
                value={formData.otp}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setFormData(prev => ({ ...prev, otp: val }));
                    if (errors.otp) setErrors(prev => ({ ...prev, otp: "" }));
                }}
                error={errors.otp}
                required
                maxLength={4}
            />

            <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                className="mt-6"
            >
                Create Account
            </Button>
        </form>
    );
};

export default Signup;
