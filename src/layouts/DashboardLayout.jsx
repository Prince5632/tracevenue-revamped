import DashboardContent from "@/features/venue/dashboard/components/DashboardContent";
import DashboardSidebar from "@/features/venue/dashboard/components/DashboardSidebar";
import React, { useState } from "react";
import { DashboardProvider } from "@/features/venue/dashboard/context/DashboardContext";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { ChevronRight } from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <DashboardProvider>
      <main className="flex gap-7 mt-22 relative">

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div
          className={`
            fixed lg:static top-0 lg:top-auto left-0 z-50 lg:z-auto
            transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <DashboardSidebar setIsSidebarOpen={setIsSidebarOpen}/>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-7 right-2 lg:top-1 lg:-right-2 bg-primary text-white rounded-full p-1 shadow cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <div className="">
          <Button
            className="mb-4 lg:hidden rounded-l-xl bg-orange-600 "
            onClick={() => setIsSidebarOpen(true)}
          >
            <ChevronRight />
          </Button>

          <DashboardContent />
        </div>

      </main>
    </DashboardProvider>
  );
};

export default DashboardLayout;
