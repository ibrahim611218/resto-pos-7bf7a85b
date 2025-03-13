
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
import AnimatedTransition from "../../ui-custom/AnimatedTransition";
import { handleDesktopExport } from "@/utils/desktopExport";
import { useLanguage } from "@/context/LanguageContext";

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
  const { language } = useLanguage();
  
  // Check if the current link is active (either exact match or contains for submenus)
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    if (path === "#") return false; // Special case for action items
    return location.pathname.startsWith(path);
  };
  
  // Handle special actions like desktop export
  const handleSpecialAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (link.action === "desktop-export") {
      handleDesktopExport(language);
    }
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
              "w-full justify-between transition-all duration-200 ease-in-out",
              (anyChildActive) && "bg-accent text-accent-foreground",
              collapsed && "justify-center"
            )}
          >
            <span className="flex items-center">
              {link.icon}
              {!collapsed && (
                <AnimatedTransition animation="fade">
                  <span className="mr-3">{link.name}</span>
                </AnimatedTransition>
              )}
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
                  "flex items-center rounded-md px-3 py-2 transition-colors duration-200 ease-in-out",
                  isActive(child.path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {child.icon}
                <AnimatedTransition animation="fade">
                  <span className="mr-3">{child.name}</span>
                </AnimatedTransition>
              </Link>
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    );
  }

  // For action items (like desktop export)
  if (link.isAction) {
    return (
      <Button
        variant="ghost"
        className={cn(
          "flex w-full items-center rounded-md px-3 py-2 transition-colors duration-200 ease-in-out",
          "hover:bg-accent hover:text-accent-foreground",
          collapsed ? "justify-center" : "justify-start"
        )}
        onClick={handleSpecialAction}
      >
        {link.icon}
        {!collapsed && (
          <AnimatedTransition animation="fade">
            <span className="mr-3">{link.name}</span>
          </AnimatedTransition>
        )}
      </Button>
    );
  }

  // For regular menu items without submenu
  return (
    <Link
      key={link.path}
      to={link.path}
      className={cn(
        "flex items-center rounded-md px-3 py-2 transition-all duration-200 ease-in-out",
        isActive(link.path)
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent hover:text-accent-foreground",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      {link.icon}
      {!collapsed && (
        <AnimatedTransition animation="fade">
          <span className="mr-3">{link.name}</span>
        </AnimatedTransition>
      )}
    </Link>
  );
};

export default SidebarItem;
