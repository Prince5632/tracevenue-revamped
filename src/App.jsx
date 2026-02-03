import './App.css'
import ChatLayout from './features/venue/ChatSection/ChatLayout'
import ChatPage from './features/venue/ChatSection/ChatLayout'
import ActiveEnquirieslayout from './features/venue/enquiry/components/ActiveEnquiries/ActiveEnquirieslayout'
import EnquiriesDetail from './features/venue/enquiry/components/Enquiries/EnquiriesDetail'
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
    path:'/enquiriesDetail',
    element:<EnquiriesDetail/>
  },
  {
    path:'/chat',
    element:<ChatLayout/>
  },
  {
    path:'/activeEnquiries',
    element:<ActiveEnquirieslayout/>
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
