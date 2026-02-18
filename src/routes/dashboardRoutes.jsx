import Contracts from "@/features/venue/contract/shared/Contracts";
import Dashboard from "@/features/venue/dashboard/pages/Dashboard";
import EnquiriesDetail from "@/features/venue/enquiry/pages/EnquiriesDetail";
import Enquiries from "@/features/venue/enquiry/shared/Enquiries";
import DashboardLayout from "@/layouts/DashboardLayout";
import RestaurantDetailModal from "@/features/venue/enquiry/components/shared/RestaurantDetailModal";
import ComparePackages from "@/features/venue/enquiry/components/ComparePackages/ComparePackages";
import EnquiryDetailLayout from "@/features/venue/enquiry/Layout/EnquiryDetailLayout";
import Quotationpage from "@/features/venue/enquiry/components/Quotation/Quotationpage";
import Offer_booking from "@/features/venue/enquiry/components/OfferBooking/Offer_booking";
/**
 * Dashboard routes - protected routes requiring authentication
 * These will be implemented as the project grows
 */

export const dashboardRoutes = [
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      }, {
        path: "/dashboard/compare",
        element: <ComparePackages />,
      },

      {
        path: "/service/venues/enquiry/:status",
        element: <Enquiries />,
      },
      // contract routes
      {
        path: "/service/venues/contracts/:status",
        element: <Contracts />,
      },
      // enquiry detail routes
      {
        path: "/service/venues/enquiry/enquiry-detail",
        element: <EnquiriesDetail />,
      },

      // other routes
      {
        path: "/venueGallery",
        element: <RestaurantDetailModal />,
      },
      // enquiry detail route with job ID
      {
        path: "/service/venues/enquiry/details/:jobId",
        element: <EnquiryDetailLayout />,
      },
    ],
  },

];