import React from "react";
import AppSidebar from "../components/dashboard/sidebar";
import PageList from "../components/dashboard/page-list";

const Dashboard = () => {
  return (
    <div className="flex w-screen h-screen">
      <AppSidebar />
      <PageList />
    </div>
  );
};

export default Dashboard;
