
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarLink } from "./types";

interface SidebarItemProps {
  link: SidebarLink;
  collapsed: boolean;
  isOpen: boolean;
  currentPath: string;
  onToggleCategory: (category: string) => void;
}

const SidebarItem = ({
  link,
  collapsed,
  isOpen,
  currentPath,
  onToggleCategory,
}: SidebarItemProps) => {
  const location = useLocation();
  
  // Check if the current link is active (either exact match or contains for submenus)
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };
  
  // If this is a parent menu with subMenuItems
  if (link.subMenuItems && link.subMenuItems.length > 0) {
    // Check if any child is active to highlight the parent
    const anyChildActive = link.subMenuItems.some(item => isActive(item.path));
    
    return (
      <Collapsible 
        open={isOpen || anyChildActive}
        onOpenChange={() => onToggleCategory(link.path.replace("/", ""))}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between",
              (anyChildActive) && "bg-accent text-accent-foreground",
              collapsed && "justify-center"
            )}
          >
            <span className="flex items-center">
              {link.icon}
              {!collapsed && <span className="mr-3">{link.name}</span>}
            </span>
            {!collapsed && (
              <ChevronRight
                size={16}
                className={cn(
                  "transition-transform duration-200",
                  (isOpen || anyChildActive) && "transform rotate-90"
                )}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        
        {/* Only show submenu items if not collapsed or if a child is active */}
        {(!collapsed || anyChildActive) && (
          <CollapsibleContent className="space-y-1 mr-6 mt-1">
            {link.subMenuItems.map((child) => (
              <Link
                key={child.path}
                to={child.path}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 transition-colors",
                  isActive(child.path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {child.icon}
                <span className="mr-3">{child.name}</span>
              </Link>
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    );
  }

  // For regular menu items without submenu
  return (
    <Link
      key={link.path}
      to={link.path}
      className={cn(
        "flex items-center rounded-md px-3 py-2 transition-colors",
        isActive(link.path)
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-accent-foreground",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      {link.icon}
      {!collapsed && (
        <span className="mr-3 transition-opacity">{link.name}</span>
      )}
    </Link>
  );
};

export default SidebarItem;
