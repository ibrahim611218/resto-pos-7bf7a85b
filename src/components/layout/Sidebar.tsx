
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { getSidebarLinks } from "./sidebar/sidebarLinks";
import { SidebarProps } from "./sidebar/types";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarUserProfile from "./sidebar/SidebarUserProfile";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarFooter from "./sidebar/SidebarFooter";
import SidebarContainer from "./sidebar/SidebarContainer";
import SidebarEventHandler from "./sidebar/SidebarEventHandler";
import { useFullscreen } from "@/hooks/useFullscreen";

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, logout, hasPermission } = useAuth();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isFullscreen } = useFullscreen();
  const [isInitialized, setIsInitialized] = useState(false);

  // Mark sidebar as initialized after first render
  useEffect(() => {
    setIsInitialized(true);
  }, []);
  
  // Improved navigation handler
  const handleNavigate = (path: string) => {
    // Special case for action links
    if (path === "#") {
      // Handle desktop export action
      window.dispatchEvent(new CustomEvent('desktop-export-action'));
      return;
    }
    
    // Regular navigation
    navigate(path);
    
    // Auto-collapse sidebar on mobile or fullscreen after navigation
    if (isMobile || isFullscreen) {
      setTimeout(() => {
        onToggle();
      }, 150);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const allLinks = getSidebarLinks();
  
  const mainLinks = allLinks.filter(link => {
    if (hasPermission("admin")) return true;
    
    if (link.path === "/pos" || link.path.includes("pos")) {
      return hasPermission(["admin", "cashier"]);
    }
    
    if (link.path === "/kitchen") {
      return hasPermission(["admin", "kitchen"]);
    }
    
    if (link.name === "الأصناف" || link.name === "المخزون") {
      return hasPermission(["admin", "supervisor"]);
    }
    
    if (link.name === "التقارير") {
      return hasPermission(["admin", "supervisor", "cashier"]);
    }
    
    if (link.path === "/settings") {
      return hasPermission("admin");
    }
    
    return true;
  });

  return (
    <SidebarEventHandler onToggle={onToggle}>
      <SidebarContainer 
        collapsed={collapsed} 
        onToggle={onToggle} 
        isInitialized={isInitialized}
        isMobile={isMobile}
      >
        <SidebarHeader collapsed={collapsed} onToggle={onToggle} />
        <SidebarUserProfile user={user} collapsed={collapsed} />
        <SidebarNavigation 
          links={mainLinks} 
          collapsed={collapsed} 
          currentPath={location.pathname}
          onNavigate={handleNavigate}
        />
        <SidebarFooter 
          collapsed={collapsed} 
          language={language}
          onLogout={handleLogout}
        />
      </SidebarContainer>
    </SidebarEventHandler>
  );
};

export default Sidebar;
