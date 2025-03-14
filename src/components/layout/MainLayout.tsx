
import React, { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import FullscreenToggle from "../ui-custom/FullscreenToggle";
import { useLanguage } from "@/context/LanguageContext";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isMobile, isTablet, width } = useWindowDimensions();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  useEffect(() => {
    if (isMobile || (isTablet && width < 768)) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [isMobile, isTablet, width]);

  useEffect(() => {
    const handleToggleSidebar = (e: Event) => {
      // Check if there is a detail with forceCollapse
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.forceCollapse) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(prevState => !prevState);
      }
    };

    window.addEventListener('toggle-sidebar', handleToggleSidebar);
    
    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleSidebar);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prevState => !prevState);
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: { collapsed: !sidebarCollapsed } }));
  }, [sidebarCollapsed]);

  return (
    <div className="flex min-h-screen h-screen bg-background w-full m-0 p-0 auto-scale-container overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <AnimatedTransition animation="fade" delay={100}>
        <div 
          className={`flex-1 transition-all duration-300 ease-in-out w-full m-0 p-0 content-container ${
            !sidebarCollapsed && !isMobile ? "md:mr-64" : "mr-0"
          }`}
        >
          <div className="fixed top-4 right-4 z-30 flex gap-2">
            <FullscreenToggle />
            
            {(isMobile || sidebarCollapsed) && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="bg-background/80 backdrop-blur-sm shadow-sm"
                onClick={toggleSidebar}
                title={isArabic ? "فتح القائمة الرئيسية" : "Open Menu"}
              >
                <Menu className="h-6 w-6" />
              </Button>
            )}
          </div>
          
          <div className="h-full w-full overflow-auto m-0 p-0 flex-grow-container">
            <Outlet />
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
