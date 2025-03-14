
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
  isArabic?: boolean;
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
  isArabic = false,
}) => {
  const isActive = currentPath === path;
  const hasSubMenu = subMenuItems && subMenuItems.length > 0;

  const handleItemClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  // Handle special action links (like Windows Export)
  const isAction = path === "#";

  // Apply RTL-specific icon margin classes
  const iconMarginClass = () => {
    if (collapsed) return "";
    return isArabic ? "ml-2" : "mr-2";
  };

  // Apply RTL-specific submenu padding
  const submenuPaddingClass = isArabic ? "pr-8" : "pl-8";

  return (
    <div className="space-y-1">
      <button
        onClick={handleItemClick}
        className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isActive
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent hover:text-accent-foreground",
          collapsed ? "justify-center" : isArabic ? "justify-between flex-row-reverse" : "justify-between"
        )}
      >
        <div className={cn("flex items-center", isArabic && !collapsed ? "flex-row-reverse" : "")}>
          <Icon className={cn("h-5 w-5", iconMarginClass())} />
          {!collapsed && <span>{name}</span>}
        </div>
        {hasSubMenu && !collapsed && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen ? "transform rotate-180" : "",
              isArabic ? "transform rotate-180" : ""
            )}
          />
        )}
      </button>

      {hasSubMenu && isOpen && !collapsed && (
        <div className={cn("space-y-1", submenuPaddingClass)}>
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
                    : "hover:bg-accent hover:text-accent-foreground",
                  isArabic ? "flex-row-reverse justify-end" : ""
                )}
              >
                {subItem.icon && typeof SubIcon === 'function' && 
                  <SubIcon className={cn("h-4 w-4", isArabic ? "ml-2" : "mr-2")} />
                }
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
