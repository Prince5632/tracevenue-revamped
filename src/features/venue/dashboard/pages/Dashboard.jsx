import React, { useEffect } from "react";
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";
import ComparePackages from "./ComparePackages";

const Dashboard = () => {
  const { fetchDashboardStats, dashboardStats, error, isLoading } =
    useDashboard();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  useEffect(() => {
    if (dashboardStats) {
      console.log("Dashboard Data (Context):", dashboardStats);
    }
  }, [dashboardStats]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading dashboard data</div>;

  return <ComparePackages/>
};

export default Dashboard;
