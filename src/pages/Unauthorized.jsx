import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common';

/**
 * 401 Unauthorized Page
 */
const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-200">401</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                    Unauthorized Access
                </h2>
                <p className="text-gray-600 mt-2 mb-6">
                    You need to be logged in to access this page.
                </p>
                <div className="space-x-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/')}
                    >
                        Go to Home
                    </Button>
                    <Button
                        variant="gradient"
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
