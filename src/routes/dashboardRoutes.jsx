import Contract from "@/features/venue/dashboard/pages/Contract";
import Dashboard from "@/features/venue/dashboard/pages/Dashboard";
import Enquiries from "@/features/venue/enquiry/shared/Enquiries";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@routes/ProtectedRoute";
import { Children } from "react";

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
      {
        path: "/service/venues/contracts/:status",
        element: <Contract />,
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
