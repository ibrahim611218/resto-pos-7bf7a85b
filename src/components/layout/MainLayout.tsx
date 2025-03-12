
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div 
        className={`flex-1 transition-all duration-300 ${
          !sidebarCollapsed && !isMobile ? "ml-64" : "ml-0"
        } max-w-full`}
      >
        <div className="w-full h-full max-w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
