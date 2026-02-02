import React from "react";
import { Outlet } from "react-router-dom";

const DashboardContent = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default DashboardContent;
