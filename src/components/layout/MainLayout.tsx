
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Automatically collapse sidebar on mobile devices
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

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
    <div className="flex min-h-screen bg-background w-full m-0 p-0 compact-ui overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <AnimatedTransition animation="fade" delay={100}>
        <div 
          className={`flex-1 transition-all duration-300 ease-in-out w-full m-0 p-0 ${
            !sidebarCollapsed && !isMobile ? "md:ml-64" : "ml-0"
          }`}
        >
          {/* Floating menu button for mobile view */}
          {isMobile && sidebarCollapsed && (
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
          <div className="h-screen w-full overflow-auto m-0 p-0">
            <Outlet />
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
