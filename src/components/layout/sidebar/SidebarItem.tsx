
import React from "react";
import { Link } from "react-router-dom";
import { SidebarLink } from "./types";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SidebarItemProps {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  subMenuItems?: SidebarLink[];
  collapsed: boolean;
  isOpen: boolean;
  currentPath: string;
  onToggleCategory: (category: string) => void;
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
}) => {
  const isActive = currentPath === path;
  const hasSubMenu = subMenuItems && subMenuItems.length > 0;

  const toggleSubMenu = (e: React.MouseEvent) => {
    if (hasSubMenu) {
      e.preventDefault();
      onToggleCategory(path.replace("/", ""));
    }
  };

  return (
    <div className="space-y-1">
      <Link
        to={hasSubMenu ? "#" : path}
        onClick={toggleSubMenu}
        className={cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
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
      </Link>

      {hasSubMenu && isOpen && !collapsed && (
        <div className="pl-8 space-y-1">
          {subMenuItems.map((subItem) => {
            const SubIcon = subItem.icon as React.ComponentType<{ className?: string }>;
            return (
              <Link
                key={subItem.name}
                to={subItem.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  currentPath === subItem.path
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {subItem.icon && typeof SubIcon === 'function' && <SubIcon className="h-4 w-4 mr-2" />}
                <span>{subItem.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
