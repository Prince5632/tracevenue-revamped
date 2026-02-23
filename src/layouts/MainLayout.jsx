import { Outlet } from 'react-router-dom';
import { Navbar } from '@shared/components/layout';
import Login from '@/features/auth/components/Login';
import { useState, useEffect } from 'react';
import { setLoginToggle } from '@/utils/loginBridge';
import { useAuth } from '@/features/auth/context/useAuthStore';

/**
 * Main layout wrapper
 * Provides consistent Navbar + Footer across all pages
 * Uses Outlet to render child routes
 */
const MainLayout = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { fetchUserData, setIsLoggedIn } = useAuth();

    useEffect(() => {
        setLoginToggle(() => setIsLoginOpen(true));

        // Cleanup if necessary, though setLoginToggle overwrites purely
        return () => setLoginToggle(null);
    }, []);

    const handleLoginSuccess = () => {
        setIsLoginOpen(false);
        // Ensure auth state is updated - Login component does this but good to be safe
        fetchUserData();
        setIsLoggedIn(true);
    };

    return (
        <>
            {/* Navbar*/}
            <Navbar />
            <main className='mt-1 lg:mt-24 sm:mt-10 md:mt-24 pb-4'>
                <Outlet />
            </main>



            {/* 
                The Login component in this codebase seems to handle its own visibility via the `onClose` prop 
                when `isModal` is true, but it doesn't utilize an `isOpen` prop. 
                Instead, we should conditionally render it.
            */}
            {isLoginOpen && (
                <Login
                    isModal={true}
                    type="login"
                    onClose={() => setIsLoginOpen(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
};

export default MainLayout;