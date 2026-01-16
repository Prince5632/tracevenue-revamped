import './App.css'
import EnquiryLayout from './layouts/EnquiryLayout'
import ComponentDocs from './pages/ComponentDocs'
import PackageDetails from './pages/PackageDetails'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Home />,
  // },
  {
    path: '/',
    element: <EnquiryLayout />,
  },
  {
    path: '/docs',
    element: <ComponentDocs />,
  },
  {
    path: '/package-details',
    element: <PackageDetails />,
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
