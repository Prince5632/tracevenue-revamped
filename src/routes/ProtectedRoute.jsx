import { Navigate } from 'react-router-dom';

/**
 * Protected Route wrapper component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
    // TODO: Replace with actual auth check (e.g., Redux selector, context, etc.)
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
