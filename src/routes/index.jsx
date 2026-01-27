import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import { enquiryRoutes } from "@routes/enquiryRoutes";
import { dashboardRoutes } from "@routes/dashboardRoutes";

// Standalone pages (no layout wrapper)
import { LoginPage } from "@features/auth";
import NotFound from "@pages/NotFound";
import Unauthorized from "@pages/Unauthorized";

/**
 * Main router configuration
 * Organizes routes into logical groups with proper layouts
 */
export const router = createBrowserRouter([
  {
    element: <MainLayout />, // Navbar + Footer wrapper
    children: [
      ...enquiryRoutes, // Enquiry step routes
      ...dashboardRoutes, // Protected dashboard routes
    ],
  },
  // Standalone routes (no layout wrapper)
  { path: "/login", element: <LoginPage /> },
  { path: "/401", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
]);
