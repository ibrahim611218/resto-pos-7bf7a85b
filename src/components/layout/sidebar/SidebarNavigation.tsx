
import React from "react";
import SidebarItem from "./SidebarItem";
import { SidebarLink } from "./types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSidebarContext } from "./SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useLanguage } from "@/context/LanguageContext";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface SidebarNavigationProps {
  links: SidebarLink[];
  collapsed: boolean;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  links, 
  collapsed, 
  currentPath,
  onNavigate
}) => {
  const { user, hasPermission } = useAuth();
  const { openCategories, toggleCategory } = useSidebarContext();
  const isMobile = useIsMobile();
  const { isFullscreen } = useFullscreen();
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const sidebarContext = useSidebar();

  // Filter links based on user role, permissions, and required email
  const filteredLinks = links.filter(link => {
    // If link requires admin role, check if user has admin permissions
    if (link.isAdminOnly && (!user || !hasPermission(['admin', 'owner']))) {
      return false;
    }
    
    // If link requires specific email, check user email
    if (link.requiredEmail && (!user || user.email !== link.requiredEmail)) {
      return false;
    }
    
    // Check role-specific menu items
    if (link.roles && (!user || !link.roles.includes(user.role))) {
      return false;
    }

    // Handle role-specific submenu items
    if (link.subMenuItems && link.subMenuItems.length > 0) {
      // Filter submenu items based on roles
      const filteredSubMenuItems = link.subMenuItems.filter(subItem => {
        if (subItem.roles && (!user || !subItem.roles.includes(user.role))) {
          return false;
        }
        return true;
      });
      
      // If no submenu items left after filtering, hide the entire menu
      if (filteredSubMenuItems.length === 0) {
        return false;
      }
      
      // Update the subMenuItems array with filtered items
      link.subMenuItems = filteredSubMenuItems;
    }
    
    return true;
  });

  // Enhanced navigation handler that also collapses sidebar on mobile/fullscreen
  const handleNavigate = (path: string) => {
    onNavigate(path);
    
    // If in mobile or fullscreen, dispatch event to collapse sidebar with a slight delay
    if (isMobile || isFullscreen) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('toggle-sidebar', { 
          detail: { forceCollapse: true }
        }));
      }, 150);
    }
  };

  return (
    <nav 
      className={cn("mt-4 flex-1 space-y-1 px-3 overflow-y-auto", isArabic ? "scrollbar-rtl" : "")}
      style={{ 
        pointerEvents: "auto", 
        touchAction: "auto", 
        zIndex: 1001, 
        position: "relative",
        WebkitOverflowScrolling: "touch"
      }}
    >
      {filteredLinks.map((link) => {
        const IconComponent = link.icon as React.ComponentType<{ className?: string }>;
        return (
          <SidebarItem
            key={link.name}
            name={isArabic ? link.name : link.name_en}
            path={link.path}
            icon={IconComponent}
            subMenuItems={link.subMenuItems}
            collapsed={collapsed}
            isOpen={openCategories[link.path.replace("/", "")] || false}
            currentPath={currentPath}
            onToggleCategory={() => toggleCategory(link.path.replace("/", ""))}
            onNavigate={handleNavigate}
            isArabic={isArabic}
          />
        );
      })}
    </nav>
  );
};

export default SidebarNavigation;
