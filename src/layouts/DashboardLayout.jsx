import DashboardContent from "@/features/venue/dashboard/components/DashboardContent";
import DashboardSidebar from "@/features/venue/dashboard/components/DashboardSidebar";
import React from "react";
import { DashboardProvider } from "@/features/venue/dashboard/context/DashboardContext";

const DashboardLayout = () => {
  return (
    <DashboardProvider>
      <main className="flex gap-2">
        <DashboardSidebar />
        <DashboardContent />
      </main>
    </DashboardProvider>
  );
};

export default DashboardLayout;
