import React, { useEffect } from "react";
import { useDashboard } from "@/features/venue/dashboard/context/DashboardContext";
import VenueLocationMap from "../components/VenueLocationMap";
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

  return <>
  <div>Dashboard</div>
  <VenueLocationMap/>
  </>;
};

export default Dashboard;
