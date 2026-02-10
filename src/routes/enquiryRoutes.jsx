import PackageCard from '@/features/package/components/PackageCard';
// import RestaurantDetailModal from '@/features/venue/dashboard/components/RestaurantDetailModal';
import PackageDetails from '@/pages/PackageDetails';
import EnquiryLayout from '@layouts/EnquiryLayout';
import ComponentDocs from '@pages/ComponentDocs';
import CustomerCard from '@/features/venue/enquiry/components/CustomerCard'
import QuotationCard from '@/features/venue/enquiry/components/Quotation/QuotationCard';
import Quotationpage from '@/features/venue/enquiry/components/Quotation/Quotationpage';
import EnquiryDetailLayout from '@/features/venue/enquiry/Layout/EnquiryDetailLayout';
import RestaurantDetailModal from '@/features/venue/enquiry/components/shared/RestaurantDetailModal';
/**
 * Enquiry step routes with URL-based step progression
 * Each route segment adds to the URL path as user progresses through steps:
 * / -> Step 1 (Location)
 * /:location -> Step 2 (Service Type)
 * /:location/:serviceType -> Step 3 (Event Type)
 * etc.
 */
export const enquiryRoutes = [
    // Step-based enquiry routes
    { path: '/', element: <EnquiryLayout /> },
    { path: '/:location', element: <EnquiryLayout /> },
    { path: '/:location/:serviceType', element: <EnquiryLayout /> },
    { path: '/:location/:serviceType/:eventType', element: <EnquiryLayout /> },
    { path: '/:location/:serviceType/:eventType/:gatheringAndBudget', element: <EnquiryLayout /> },
    { path: '/:location/:serviceType/:eventType/:gatheringAndBudget/:eventDate', element: <EnquiryLayout /> },
    { path: '/:location/:serviceType/:eventType/:gatheringAndBudget/:eventDate/:foodPreference', element: <EnquiryLayout /> },

    // Package details route
    { path: "/package-details", element: <PackageDetails /> },
    {path: '/quotation-card' , element:<QuotationCard/>}, 
    { path: '/restaurant-detail-modal', element: <RestaurantDetailModal /> },
    { path: "/package-details", element: <PackageDetails /> },
    {path:'/quotation-page',element:<Quotationpage/>},
    

    // Component documentation (dev only)
    { path: '/docs', element: <ComponentDocs /> },
    { path: '/CustomerCard', element: <CustomerCard /> }
];
