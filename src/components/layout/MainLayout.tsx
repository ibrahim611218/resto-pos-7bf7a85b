import React, { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/context/ThemeContext";

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { isMobile, isTablet, width } = useWindowDimensions();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { theme } = useTheme();
  
  useEffect(() => {
    if (isMobile || (isTablet && width < 768)) {
      setSidebarCollapsed(true);
      setSidebarHidden(true);
    } else {
      setSidebarCollapsed(!isHovering);
      setSidebarHidden(false);
    }
  }, [isMobile, isTablet, width, isHovering]);

  useEffect(() => {
    const handleForceCollapse = () => {
      setSidebarCollapsed(true);
      setSidebarHidden(true);
    };

    const handleToggleSidebar = (e: Event) => {
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

  const toggleSidebar = useCallback(() => {
    setSidebarHidden(false);
    setSidebarCollapsed(prev => !prev);
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { 
      detail: { collapsed: !sidebarCollapsed } 
    }));
  }, [sidebarCollapsed]);

  const hideSidebar = useCallback(() => {
    setSidebarHidden(true);
  }, []);

  const showSidebar = useCallback(() => {
    setSidebarHidden(false);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile && !isTablet) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isTablet) {
      setIsHovering(false);
    }
  };

  return (
    <div className="flex min-h-screen h-screen bg-background w-full m-0 p-0 auto-scale-container overflow-hidden relative">
      {!sidebarHidden && (
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative z-30"
        >
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={toggleSidebar} 
            onHide={hideSidebar}
          />
        </div>
      )}
      
      <AnimatedTransition animation="fade" delay={100}>
        <div 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out w-full m-0 p-0 content-container relative z-10",
            !sidebarHidden && !sidebarCollapsed && !isMobile ? 
              isArabic ? "md:mr-64" : "md:ml-64" 
              : "mx-0"
          )}
        >
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
              <Outlet />
            </div>
          </ScrollArea>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
