import { useEffect, useState } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/useAuthStore';
import { useLogin } from '@/hooks/useLogin';

/**
 * Protected Route wrapper component
 * Triggers login modal if user is not authenticated
 * Renders children only if authenticated
 */
const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, isLoading } = useAuth();
    const { login } = useLogin();
    const location = useLocation();
    const [isTriggered, setIsTriggered] = useState(false);

    useEffect(() => {
        if (!isLoading && !isLoggedIn && !isTriggered) {
            login();
            setIsTriggered(true);
        }
    }, [isLoading, isLoggedIn, login, isTriggered]);

    if (isLoading) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
    }

    if (!isLoggedIn) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                <p className="text-gray-500">Authentication Required to access this page.</p>
                <button
                    onClick={() => login()}
                    className="px-4 py-2 bg-primary text-white rounded-md"
                >
                    Login to Continue
                </button>
            </div>
        );
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
