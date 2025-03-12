
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isPosPage = location.pathname === "/pos";
  
  // Automatically collapse sidebar on mobile devices
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Determine content class based on sidebar state and current page
  const getContentClass = () => {
    // Base content class
    let contentClass = "flex-1 transition-all duration-300 ease-in-out w-full m-0 p-0";
    
    // Adjust margin for sidebar state
    if (!sidebarCollapsed && !isMobile) {
      contentClass += " md:ml-64";
    } else {
      contentClass += " ml-0";
    }
    
    // Add special class for POS page when sidebar is collapsed
    if (isPosPage && (sidebarCollapsed || isMobile)) {
      contentClass += " pos-fullwidth";
    }
    
    return contentClass;
  };

  return (
    <div className="flex min-h-screen bg-background w-full m-0 p-0 compact-ui overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <AnimatedTransition animation="fade" delay={100}>
        <div className={getContentClass()}>
          <div className="h-screen w-full overflow-auto m-0 p-0">
            <Outlet />
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
