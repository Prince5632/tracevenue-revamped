import Contract from "@/features/venue/dashboard/pages/Contract";
import Dashboard from "@/features/venue/dashboard/pages/Dashboard";
import EnquiriesDetail from "@/features/venue/enquiry/pages/EnquiriesDetail";
import Enquiries from "@/features/venue/enquiry/shared/Enquiries";
import DashboardLayout from "@/layouts/DashboardLayout";
import RestaurantDetailModal from "@/features/venue/enquiry/components/shared/RestaurantDetailModal";
import ComparePackages from "@/features/venue/enquiry/components/ComparePackages/ComparePackages";
import EnquiryDetailLayout from "@/features/venue/enquiry/Layout/EnquiryDetailLayout";
import Quotationpage from "@/features/venue/enquiry/components/Quotation/Quotationpage";
import Offer_booking from "@/features/venue/enquiry/components/OfferBooking/Offer_booking";
import ProtectedRoute from "@/routes/ProtectedRoute";
/**
 * Dashboard routes - protected routes requiring authentication
 * These will be implemented as the project grows
 */

export const dashboardRoutes = [
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
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
      // dummy routes for all type enquiries
      // {
      //   path: "/service/venues/enquiry/active",
      //   element: <ActiveEnquiries />,
      // },
      // {
      //   path: "/service/venues/enquiry/completed",
      //   element: <CompletedEnquiries />,
      // },
      // {
      //   path: "/service/venues/enquiry/draft",
      //   element: <DraftEnquiries />,
      // },
      // {
      //   path: "/service/venues/enquiry/expired",
      //   element: <ExpiredEnquiries />,
      // },

      // contract routes
      {
        path: "/service/venues/contracts/:status",
        element: <Contract />,
      },
      {
        path: "/venueGallery",
        element: <RestaurantDetailModal />,
      },

      {
        path: "/service/venues/enquiry/details/:id",
        element: <EnquiryDetailLayout />,
        children: [
          { index: true, element: <Quotationpage /> }, // default
          { path: "quotation-pages", element: <Quotationpage /> },
          { path: "compare-packages", element: <ComparePackages /> },
          { path: "offer-booking", element: <Offer_booking /> },
          { path: "", element: <EnquiriesDetail /> }
        ],
      },
    ],
  },

];