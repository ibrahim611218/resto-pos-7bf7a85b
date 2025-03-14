
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarFooter from "./sidebar/SidebarFooter";
import SidebarContainer from "./sidebar/SidebarContainer";
import SidebarUserProfile from "./sidebar/SidebarUserProfile";
import SidebarEventHandler from "./sidebar/SidebarEventHandler";
import { getSidebarLinks } from "./sidebar/sidebarLinks";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  SidebarProvider,
  useSidebar
} from "@/components/ui/sidebar";

// Sidebar component that wraps all sidebar sections
const Sidebar: React.FC<{ collapsed: boolean; onToggle: () => void }> = ({ 
  collapsed, 
  onToggle 
}) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [isInitialized, setIsInitialized] = useState(false);
  const sidebarLinks = getSidebarLinks();

  // Set initialized after a brief delay to allow for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle navigation from sidebar item clicks
  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
    
    // On mobile, collapse the sidebar after navigation with a delay
    if (isMobile) {
      setTimeout(() => {
        onToggle();
      }, 300);
    }
  };

  // Log clicks to help with debugging
  const handleClick = (e: React.MouseEvent) => {
    console.log("Sidebar clicked");
    e.stopPropagation();
  };

  return (
    <SidebarProvider>
      <div 
        onClick={handleClick}
        style={{ 
          pointerEvents: "auto", 
          touchAction: "auto", 
          position: "relative", 
          zIndex: 1000,
          isolation: "isolate" 
        }}
      >
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
              links={sidebarLinks} 
              collapsed={collapsed} 
              currentPath={location.pathname}
              onNavigate={handleNavigate} 
            />
            <SidebarFooter 
              collapsed={collapsed} 
              language={language} 
              onLogout={logout} 
            />
          </SidebarContainer>
        </SidebarEventHandler>
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;
