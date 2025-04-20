
import React, { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useLanguage } from "@/context/LanguageContext";
import { useFullscreen } from "@/hooks/useFullscreen";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/context/ThemeContext";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const { isMobile, isTablet, width } = useWindowDimensions();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isFullscreen } = useFullscreen();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // Handle sidebar state based on screen size and fullscreen state
  useEffect(() => {
    if (isMobile || (isTablet && width < 768) || isFullscreen) {
      setSidebarCollapsed(true);
      setSidebarHidden(true);
    } else {
      setSidebarCollapsed(false);
      setSidebarHidden(false);
    }
  }, [isMobile, isTablet, width, isFullscreen]);

  // Handle global toggle sidebar events
  useEffect(() => {
    const handleForceCollapse = () => {
      setSidebarCollapsed(true);
      setSidebarHidden(true);
    };

    const handleToggleSidebar = (e: Event) => {
      // Check if there is a detail with forceCollapse
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.forceCollapse) {
        setSidebarCollapsed(true);
        setSidebarHidden(true);
      } else {
        toggleSidebar();
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
    setSidebarHidden(false); // Always show the sidebar when toggling
    setSidebarCollapsed(prevState => !prevState);
    // Ensure the toggle event is dispatched properly
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { 
      detail: { collapsed: !sidebarCollapsed } 
    }));
  }, [sidebarCollapsed]);

  // Function to completely hide the sidebar
  const hideSidebar = useCallback(() => {
    setSidebarHidden(true);
  }, []);

  // Function to show the sidebar
  const showSidebar = useCallback(() => {
    setSidebarHidden(false);
  }, []);

  return (
    <div className={`flex min-h-screen h-screen bg-background w-full m-0 p-0 auto-scale-container overflow-hidden ${isFullscreen ? 'fullscreen-active' : ''}`}>
      {!sidebarHidden && (
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
          onHide={hideSidebar}
        />
      )}
      
      <AnimatedTransition animation="fade" delay={100}>
        <div 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out w-full m-0 p-0 content-container",
            !sidebarHidden && !sidebarCollapsed && !isMobile ? 
              isArabic ? "md:mr-64" : "md:ml-64" 
              : "mx-0"
          )}
          style={{ 
            zIndex: 1, 
            position: "relative" 
          }}
        >
          {/* Show floating toggle button when sidebar is hidden */}
          {sidebarHidden && (
            <Button 
              variant="ghost" 
              size="icon" 
              className={`fixed top-4 ${isArabic ? "right-4" : "left-4"} z-50 bg-background/80 backdrop-blur-sm shadow-sm sidebar-toggle-floating`}
              onClick={showSidebar}
              title={isArabic ? "إظهار القائمة الرئيسية" : "Show Menu"}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
          
          <ScrollArea className="h-full w-full scrollable-content">
            <div className="centered-content" dir={isArabic ? "rtl" : "ltr"}>
              {children || <Outlet />}
            </div>
          </ScrollArea>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
