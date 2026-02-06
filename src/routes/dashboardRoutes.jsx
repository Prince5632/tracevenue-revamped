import Contract from "@/features/venue/dashboard/pages/Contract";
import Dashboard from "@/features/venue/dashboard/pages/Dashboard";
import ActiveEnquiries from "@/features/venue/enquiry/pages/ActiveEnquiries";
import CompletedEnquiries from "@/features/venue/enquiry/pages/CompletedEnquiries";
import DraftEnquiries from "@/features/venue/enquiry/pages/DraftEnquiries";
import EnquiriesDetail from "@/features/venue/enquiry/pages/EnquiriesDetail";
import ExpiredEnquiries from "@/features/venue/enquiry/pages/ExpiredEnquiries";
import Enquiries from "@/features/venue/enquiry/shared/Enquiries";
import DashboardLayout from "@/layouts/DashboardLayout";
import RestaurantDetailModal from "@/features/venue/enquiry/components/shared/RestaurantDetailModal";

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
      },

      {
        path: "/service/venues/enquiry/:status",
        element: <Enquiries />,
      },
      // dummy routes for all type enquiries
      {
        path: "/service/venues/enquiry/active",
        element: <ActiveEnquiries />,
      },
      {
        path: "/service/venues/enquiry/completed",
        element: <CompletedEnquiries />,
      },
      {
        path: "/service/venues/enquiry/draft",
        element: <DraftEnquiries />,
      },
      {
        path: "/service/venues/enquiry/expired",
        element: <ExpiredEnquiries />,
      },

      // contract routes
      {
        path: "/service/venues/contracts/:status",
        element: <Contract />,
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
    ],
  },
];

// export const dashboardRoutes = [
//   {
//     path: "/dashboard",
//     element: (
//       <ProtectedRoute>
//         <DashboardLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <DashboardHome /> },
//       { path: "enquiries/*", element: <Enquiries /> },
//       { path: "contracts/*", element: <Contracts /> },
//       { path: "messages", element: <Messages /> },
//     ],
//   },
// ];
