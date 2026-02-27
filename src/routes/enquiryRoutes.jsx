import PackageCard from '@/features/package/components/PackageCard';
// import RestaurantDetailModal from '@/features/venue/dashboard/components/RestaurantDetailModal';
import PackageDetails from '@/pages/PackageDetails';
import DiscoverPackages from '@/pages/DiscoverPackages';
import EnquiryLayout from '@layouts/EnquiryLayout';
import ComponentDocs from '@pages/ComponentDocs';
import QuotationCard from '@/features/venue/enquiry/components/Quotation/QuotationCard';
import Quotationpage from '@/features/venue/enquiry/components/Quotation/Quotationpage';
import EnquiryDetailLayout from '@/features/venue/enquiry/Layout/EnquiryDetailLayout';
import RestaurantDetailModal from '@/features/venue/enquiry/components/shared/RestaurantDetailModal';
import AddPackagemodal from '@/features/venue/enquiry/components/shared/AddPackagemodal';
import ChatLayout from "@features/venue/ChatSection/ChatLayout"
import ProtectedRoute from "@/routes/ProtectedRoute";
/**
 * Enquiry step routes with URL-based step progression
 * Each route segment adds to the URL path as user progresses through steps:
 * / -> Step 1 (Location)
 * /:location -> Step 2 (Service Type)
 * /:location/:serviceType -> Step 3 (Event Type)
 * etc.
 */
export const enquiryRoutes = [
  { path: "/", element: <EnquiryLayout /> },
  { path: "/:location", element: <EnquiryLayout /> },
  { path: "/:location/:serviceType", element: <EnquiryLayout /> },
  { path: "/:location/:serviceType/:eventType", element: <EnquiryLayout /> },

  { path: "/discover-packages", element: <DiscoverPackages /> },
  { path: "/package/:id/:jobId", element: <PackageDetails /> },

  { path: "/package-details", element: <PackageDetails /> },
  { path: "/quotation-card", element: <QuotationCard /> },
  { path: "/restaurant-detail-modal", element: <RestaurantDetailModal /> },
  { path: "/quotation-page", element: <Quotationpage /> },
  {
    path: '/chat-section',
    element: (
      <ProtectedRoute>
        <ChatLayout />
      </ProtectedRoute>
    )
  },
  { path: "/docs", element: <ComponentDocs /> },
  { path: "/packageModalPage", element: <AddPackagemodal /> },

];
