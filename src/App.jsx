import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes';
import { ToastProvider } from './shared';
import { AuthProvider } from '@/features/auth/context/useAuthStore.jsx';

/**
 * Main App component
 * Uses centralized router configuration from routes/index.jsx
 */
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

