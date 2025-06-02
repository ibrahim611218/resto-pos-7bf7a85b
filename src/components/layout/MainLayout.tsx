
import React, { useState, useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useLanguage } from "@/context/LanguageContext";

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { isMobile, isTablet, width } = useWindowDimensions();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
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
    <div className="flex h-screen bg-background">
      {!sidebarHidden && (
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex-shrink-0"
        >
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={toggleSidebar} 
            onHide={hideSidebar}
          />
        </div>
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {sidebarHidden && (
          <Button 
            variant="ghost" 
            size="icon" 
            className={`fixed top-4 ${isArabic ? "right-4" : "left-4"} z-50 bg-background/80 backdrop-blur-sm shadow-sm`}
            onClick={showSidebar}
            title={isArabic ? "إظهار القائمة الرئيسية" : "Show Menu"}
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        
        <main className="flex-1 overflow-auto p-4" dir={isArabic ? "rtl" : "ltr"}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
