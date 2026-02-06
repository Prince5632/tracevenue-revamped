import { Outlet } from 'react-router-dom';
import { Navbar } from '@shared/components/layout';

/**
 * Main layout wrapper
 * Provides consistent Navbar + Footer across all pages
 * Uses Outlet to render child routes
 */
const MainLayout = () => {
    return (
        <>
            {/* Navbar*/}
            <Navbar />
            <main className='mt-1 lg:mt-24 sm:mt-10 md:mt-24 pb-48'>
                <Outlet />
            </main>
            {/* Footer is optional - can be added here if needed globally */}
        </>
    );
};

export default MainLayout;