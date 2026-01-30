import './App.css'
import EnquiriesDetail from './components/Enquiries/EnquiriesDetail'
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
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
