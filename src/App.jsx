import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes';
import { ToastProvider } from './shared';

/**
 * Main App component
 * Uses centralized router configuration from routes/index.jsx
 */
function App() {
  return <ToastProvider><RouterProvider router={router} /></ToastProvider>;
}

export default App;
