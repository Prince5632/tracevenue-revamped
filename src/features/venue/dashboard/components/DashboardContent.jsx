import React from "react";
import Dashboard from "../pages/Dashboard";
import { Outlet } from "react-router-dom";

const DashboardContent = () => {
  return (
    <>
      <Outlet />
      {/* <div className="fixed z-80">
        <div>div1</div>
        <div>div2</div>
      </div> */}
    </>
  );
};

export default DashboardContent;
