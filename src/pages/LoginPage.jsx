import { Button } from '../components/common';
import { useNavigate } from 'react-router-dom';

/**
 * Login Page
 * Standalone page without the main layout wrapper
 */
const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // TODO: Implement actual login logic
        localStorage.setItem('token', 'demo-token');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">TraceVenue</h1>
                    <p className="text-gray-600 mt-2">Sign in to continue</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    <Button
                        variant="gradient"
                        size="lg"
                        className="w-full"
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="#" className="text-orange-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
