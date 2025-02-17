import React from "react";
import AppSidebar from "../components/dashboard/sidebar";
import PageList from "../components/dashboard/page-list";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="flex w-screen h-screen">
      <AppSidebar />
      <PageList />
    </div>
  );
};

export default Dashboard;
