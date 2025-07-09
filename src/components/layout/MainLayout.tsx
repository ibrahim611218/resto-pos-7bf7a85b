
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
import { useAdvancedTheme } from "@/context/AdvancedThemeContext";

const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { isMobile, isTablet, width } = useWindowDimensions();
  
  // Use a fallback for language in case provider is not available
  let language = "ar";
  let isArabic = true;
  
  try {
    const languageContext = useLanguage();
    language = languageContext.language;
    isArabic = language === "ar";
  } catch (error) {
    console.warn("LanguageProvider not available, using Arabic as default");
  }
  
  const { currentTheme } = useAdvancedTheme();
  
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

  // Apply RTL direction to body
  useEffect(() => {
    if (isArabic) {
      document.body.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.body.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }, [isArabic]);

  return (
    <div className={cn("flex min-h-screen h-screen bg-background w-full overflow-hidden", isArabic ? "rtl" : "ltr")} dir={isArabic ? "rtl" : "ltr"}>
      {!sidebarHidden && (
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex-shrink-0 z-30"
        >
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={toggleSidebar} 
            onHide={hideSidebar}
          />
        </div>
      )}
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        {sidebarHidden && (
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "fixed top-4 z-50 bg-background/80 backdrop-blur-sm shadow-sm",
              isArabic ? "right-4" : "left-4"
            )}
            onClick={showSidebar}
            title={isArabic ? "إظهار القائمة الرئيسية" : "Show Menu"}
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        
        <main className="flex-1 overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
