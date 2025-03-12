
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
    <div className="flex min-h-screen bg-background w-full m-0 p-0">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <AnimatedTransition animation="fade" delay={100}>
        <div 
          className={`flex-1 transition-all duration-300 ease-in-out w-full m-0 p-0 ${
            !sidebarCollapsed && !isMobile ? "md:ml-64" : "ml-0"
          }`}
        >
          <div className="h-screen w-full overflow-hidden m-0 p-0">
            <Outlet />
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
