
import React, { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import FullscreenToggle from "../ui-custom/FullscreenToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useFullscreen } from "@/hooks/useFullscreen";
import { cn } from "@/lib/utils";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isMobile, isTablet, width } = useWindowDimensions();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isFullscreen } = useFullscreen();
  
  // Handle sidebar state based on screen size and fullscreen state
  useEffect(() => {
    if (isMobile || (isTablet && width < 768) || isFullscreen) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [isMobile, isTablet, width, isFullscreen]);

  // Handle global toggle sidebar events
  useEffect(() => {
    const handleForceCollapse = () => {
      setSidebarCollapsed(true);
    };

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
    window.addEventListener('sidebar-force-collapse', handleForceCollapse);
    
    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleSidebar);
      window.removeEventListener('sidebar-force-collapse', handleForceCollapse);
    };
  }, []);

  // Toggle sidebar function - used by button and passed to child components
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prevState => !prevState);
    // Ensure the toggle event is dispatched properly
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { 
      detail: { collapsed: !sidebarCollapsed } 
    }));
  }, [sidebarCollapsed]);

  return (
    <div className={`flex min-h-screen h-screen bg-background w-full m-0 p-0 auto-scale-container overflow-hidden ${isFullscreen ? 'fullscreen-active' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <AnimatedTransition animation="fade" delay={100}>
        <div 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out w-full m-0 p-0 content-container",
            !sidebarCollapsed && !isMobile ? 
              isArabic ? "md:mr-64" : "md:ml-64" 
              : "mx-0"
          )}
          style={{ 
            zIndex: 1, 
            position: "relative" 
          }}
        >
          <div className={`fixed top-4 z-40 flex gap-2 ${isArabic ? "right-4" : "left-4"}`}>
            <FullscreenToggle />
            
            {(isMobile || sidebarCollapsed || isFullscreen) && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="bg-background/80 backdrop-blur-sm shadow-sm"
                onClick={toggleSidebar}
                title={isArabic ? "فتح القائمة الرئيسية" : "Open Menu"}
                style={{ 
                  pointerEvents: "auto",
                  touchAction: "manipulation",
                  zIndex: 50,
                  position: "relative"
                }}
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
