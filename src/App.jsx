import './App.css'
import Home from './components/Home'
import ComponentDocs from './pages/ComponentDocs'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/docs',
    element: <ComponentDocs />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
