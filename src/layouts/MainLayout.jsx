import { Outlet } from 'react-router-dom';

/**
 * Main layout wrapper
 * Provides consistent Navbar + Footer across all pages
 * Uses Outlet to render child routes
 */
const MainLayout = () => {
    return (
        <>
            {/* Navbar is rendered within EnquiryLayout for now */}
            <main>
                <Outlet />
            </main>
            {/* Footer is optional - can be added here if needed globally */}
        </>
    );
};

export default MainLayout;
