
import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarLink } from "./types";

export interface SidebarItemProps {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  subMenuItems?: SidebarLink[];
  collapsed: boolean;
  isOpen: boolean;
  currentPath: string;
  onToggleCategory: (category: string) => void;
  onNavigate: (path: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  path,
  icon: Icon,
  subMenuItems,
  collapsed,
  isOpen,
  currentPath,
  onToggleCategory,
  onNavigate,
}) => {
  const isActive = currentPath === path;
  const hasSubMenu = subMenuItems && subMenuItems.length > 0;

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (hasSubMenu) {
      onToggleCategory(path.replace("/", ""));
    } else {
      onNavigate(path);
    }
  };

  const handleSubItemClick = (e: React.MouseEvent, subPath: string) => {
    e.preventDefault();
    e.stopPropagation();
    onNavigate(subPath);
  };

  return (
    <div className="space-y-1">
      <button
        onClick={handleItemClick}
        className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent hover:text-accent-foreground",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        <div className="flex items-center">
          <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
          {!collapsed && <span>{name}</span>}
        </div>
        {hasSubMenu && !collapsed && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen ? "transform rotate-180" : ""
            )}
          />
        )}
      </button>

      {hasSubMenu && isOpen && !collapsed && (
        <div className="pl-8 space-y-1">
          {subMenuItems.map((subItem) => {
            const SubIcon = subItem.icon as React.ComponentType<{ className?: string }>;
            const isSubItemActive = currentPath === subItem.path;
            
            return (
              <button
                key={subItem.name}
                onClick={(e) => handleSubItemClick(e, subItem.path)}
                className={cn(
                  "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isSubItemActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {subItem.icon && typeof SubIcon === 'function' && <SubIcon className="h-4 w-4 mr-2" />}
                <span>{subItem.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
