import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/dashboard/sidebar";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div>
      <AppSidebar />
      <SidebarTrigger />
    </div>
  );
};

export default Dashboard;
