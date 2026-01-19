import './App.css'
import QuotationCard from './components/QuotationPageComponents/QuotationCard'
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
    path: '/quotation-card',
    element: <QuotationCard />,
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
