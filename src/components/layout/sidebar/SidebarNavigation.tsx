
import React from "react";
import SidebarItem from "./SidebarItem";
import { SidebarLink } from "./types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSidebarContext } from "./SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useLanguage } from "@/context/LanguageContext";

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
  const { user } = useAuth();
  const { openCategories, toggleCategory } = useSidebarContext();
  const isMobile = useIsMobile();
  const { isFullscreen } = useFullscreen();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  // Filter links based on admin access and required email
  const filteredLinks = links.filter(link => {
    if (link.isAdminOnly && (!user || user.role !== 'admin')) {
      return false;
    }
    
    if (link.requiredEmail && (!user || user.email !== link.requiredEmail)) {
      return false;
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
    <nav className="mt-4 flex-1 space-y-1 px-3 overflow-y-auto">
      {filteredLinks.map((link) => {
        const IconComponent = link.icon as React.ComponentType<{ className?: string }>;
        return (
          <SidebarItem
            key={link.name}
            name={link.name}
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
