
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
  
  // Apply RTL-specific text alignment
  const textAlignClass = isArabic ? "text-right" : "text-left";

  return (
    <div 
      className="space-y-1" 
      style={{ 
        pointerEvents: "auto", 
        zIndex: 1001, 
        position: "relative",
        direction: isArabic ? "rtl" : "ltr" 
      }}
    >
      <button
        onClick={handleItemClick}
        className={cn(
          "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
          isActive
            ? "bg-[#00695c] text-white sidebar-item-active"
            : "hover:bg-[#00695c] hover:text-white sidebar-item-hover",
          collapsed ? "justify-center" : isArabic ? "justify-between flex-row-reverse" : "justify-between",
          "text-white sidebar-text",
          isArabic ? "text-right" : "text-left"
        )}
        style={{ 
          pointerEvents: "auto", 
          touchAction: "manipulation",
          cursor: "pointer",
          userSelect: "none",
          zIndex: 1001,
          position: "relative"
        }}
      >
        <div className={cn("flex items-center", isArabic && !collapsed ? "flex-row-reverse w-full" : "")}>
          <Icon className={cn("h-5 w-5 text-white", iconMarginClass())} />
          {!collapsed && (
            <span 
              className={cn("text-white flex-1", isArabic ? 'text-right mr-2' : 'text-left ml-2')}
            >
              {name}
            </span>
          )}
        </div>
        {hasSubMenu && !collapsed && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform text-white",
              isOpen ? "transform rotate-180" : "",
              isArabic ? "transform rotate-180" : ""
            )}
          />
        )}
      </button>

      {hasSubMenu && isOpen && !collapsed && (
        <div 
          className={cn("space-y-1", submenuPaddingClass)}
          style={{ 
            pointerEvents: "auto", 
            zIndex: 1001, 
            position: "relative" 
          }}
        >
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
                    ? "bg-[#00695c] text-white sidebar-item-active"
                    : "hover:bg-[#00695c] hover:text-white sidebar-item-hover",
                  isArabic ? "flex-row-reverse justify-end text-right" : "text-left",
                  "text-white sidebar-text"
                )}
                style={{ 
                  pointerEvents: "auto", 
                  touchAction: "manipulation",
                  cursor: "pointer",
                  userSelect: "none",
                  zIndex: 1001,
                  position: "relative"
                }}
              >
                {subItem.icon && typeof SubIcon === 'function' && 
                  <SubIcon className={cn("h-4 w-4 text-white", isArabic ? "ml-2" : "mr-2")} />
                }
                <span className={cn("text-white flex-1", isArabic ? 'text-right mr-2' : 'text-left ml-2')}>
                  {subItem.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
