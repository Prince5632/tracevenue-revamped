import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from '@routes';

/**
 * Main App component
 * Uses centralized router configuration from routes/index.jsx
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
