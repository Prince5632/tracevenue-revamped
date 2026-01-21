import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common';

/**
 * 404 Not Found Page
 */
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-200">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mt-2 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Button
                    variant="gradient"
                    onClick={() => navigate('/')}
                >
                    Go to Home
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
