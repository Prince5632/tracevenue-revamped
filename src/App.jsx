import './App.css'
import ActiveEnquiries from './components/common/ActiveEnquiries'
import EnquiryLayout from './layouts/EnquiryLayout'
import ComponentDocs from './pages/ComponentDocs'
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
    path:'/dashboard',
    element:<ActiveEnquiries/>
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
