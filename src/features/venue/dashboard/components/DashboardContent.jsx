import React from "react";
import Dashboard from "../pages/Dashboard";
import { Outlet } from "react-router-dom";

const DashboardContent = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default DashboardContent;
