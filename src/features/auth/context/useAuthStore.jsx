import { createContext, useContext, useState, useEffect } from "react";
import { userIsLogged, getUserData } from "@/services/userService";

/**
 * Auth Context - Global authentication state using React Context API
 * Provides user state (isLoggedIn, user details) across the application
 * Uses localStorage to persist auth state across refreshes
 */
const AuthContext = createContext(null);

// Get initial values from localStorage synchronously
const getInitialLoginState = () => {
    try {
        return localStorage.getItem("isLoggedIn") === "true";
    } catch {
        return false;
    }
};

const getInitialUser = () => {
    try {
        const cached = localStorage.getItem("authUser");
        return cached ? JSON.parse(cached) : null;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    // Initialize from localStorage cache for immediate UI state
    const [isLoggedIn, setIsLoggedInState] = useState(() => getInitialLoginState());
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUserState] = useState(() => getInitialUser());

    // Wrapper to also persist to localStorage
    const setIsLoggedIn = (value) => {
        setIsLoggedInState(value);
        try {
            if (value) {
                localStorage.setItem("isLoggedIn", "true");
            } else {
                localStorage.removeItem("isLoggedIn");
            }
        } catch (e) {
            console.error("Failed to persist login state", e);
        }
    };

    // Wrapper to also persist to localStorage
    const setUser = (userData) => {
        setUserState(userData);
        try {
            if (userData) {
                localStorage.setItem("authUser", JSON.stringify(userData));
            } else {
                localStorage.removeItem("authUser");
            }
        } catch (e) {
            console.error("Failed to persist user data", e);
        }
    };

    // Check auth status and fetch user data on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await userIsLogged();

                // Only update state if we get a definitive response
                if (response?.status === 200) {
                    if (response?.data?.message === "no token") {
                        // Explicitly not authenticated - clear everything
                        setIsLoggedIn(false);
                        setUser(null);
                    } else {
                        // Authenticated - update state and fetch fresh user data
                        setIsLoggedIn(true);
                        const userData = await getUserData(() => { });
                        if (userData) {
                            setUser(userData);
                        }
                    }
                }
                // If response is not 200 (network error, etc.), keep cached state
                // Don't clear localStorage on transient errors
            } catch (error) {
                console.error("Auth check failed", error);
                // On error, keep the cached state - don't log out the user
                // The API interceptor will handle token refresh if needed
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    // Fetch user data after login
    const fetchUserData = async () => {
        try {
            const userData = await getUserData(() => { });
            if (userData) {
                setUser(userData);
            }
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    // Clear user data on logout
    const clearUser = () => {
        setUserState(null);
        setIsLoggedInState(false);
        try {
            localStorage.removeItem("authUser");
            localStorage.removeItem("isLoggedIn");
        } catch (e) {
            console.error("Failed to clear localStorage", e);
        }
    };

    // Convenience getters
    const userId = user?._id || user?.id || null;
    const userName = user?.userName || user?.name || null;
    const userEmail = user?.email || null;
    const userPhone = user?.phoneNumber || null;

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            isLoading,
            user,
            setUser,
            fetchUserData,
            clearUser,
            // Convenience properties
            userId,
            userName,
            userEmail,
            userPhone
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
