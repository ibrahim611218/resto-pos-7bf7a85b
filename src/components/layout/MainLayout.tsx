
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isMobile, isTablet, width } = useWindowDimensions();
  const location = useLocation();
  
  // Automatically collapse sidebar on mobile devices or small screens
  useEffect(() => {
    if (isMobile || (isTablet && width < 768)) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [isMobile, isTablet, width]);

  // Listen for the custom toggle event
  useEffect(() => {
    const handleToggleSidebar = () => {
      setSidebarCollapsed(!sidebarCollapsed);
    };

    window.addEventListener('toggle-sidebar', handleToggleSidebar);
    
    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleSidebar);
    };
  }, [sidebarCollapsed]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen h-screen bg-background w-full m-0 p-0 auto-scale-container overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <AnimatedTransition animation="fade" delay={100}>
        <div 
          className={`flex-1 transition-all duration-300 ease-in-out w-full m-0 p-0 content-container ${
            !sidebarCollapsed && !isMobile ? "md:mr-64" : "mr-0"
          }`}
        >
          {/* Floating menu button for mobile view */}
          {(isMobile || sidebarCollapsed) && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 right-4 z-30 bg-background/80 backdrop-blur-sm shadow-sm"
              onClick={toggleSidebar}
              title="فتح القائمة الرئيسية"
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <div className="h-full w-full overflow-auto m-0 p-0 flex-grow-container">
            <Outlet />
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
