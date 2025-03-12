
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <AnimatedTransition animation="fade" delay={100}>
        <div 
          className={`flex-1 h-screen overflow-auto transition-all duration-300 ease-in-out ${
            !sidebarCollapsed && !isMobile ? "md:ml-64" : "ml-0"
          }`}
        >
          <div className="p-2 sm:p-4 md:p-6 w-full max-w-full">
            <Outlet />
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
