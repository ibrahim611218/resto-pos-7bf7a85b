
import React from "react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { SidebarLink } from "./types";

interface SidebarNavigationProps {
  links: SidebarLink[];
  collapsed: boolean;
  openCategories: Record<string, boolean>;
  onToggleCategory: (category: string) => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  links, 
  collapsed, 
  openCategories,
  onToggleCategory
}) => {
  const location = useLocation();

  return (
    <nav className="mt-4 flex-1 space-y-1 px-3 overflow-y-auto">
      {links.map((link) => {
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
            currentPath={location.pathname}
            onToggleCategory={onToggleCategory}
          />
        );
      })}
    </nav>
  );
};

export default SidebarNavigation;
