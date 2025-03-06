import React from "react";
import AppSidebar from "../components/dashboard/sidebar";
import PageList from "../components/dashboard/page-list";
import { SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex w-screen h-screen">
        <AppSidebar />
        <PageList />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
