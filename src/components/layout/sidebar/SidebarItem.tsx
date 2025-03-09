
import React from "react";
import { Link } from "react-router-dom";
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
  if (link.children) {
    return (
      <Collapsible 
        key={link.name}
        open={isOpen}
        onOpenChange={() => onToggleCategory(link.path.replace("/", ""))}
        className={cn(
          "w-full",
          collapsed && "hidden"
        )}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between",
              currentPath === link.path && "bg-accent text-accent-foreground"
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
                  isOpen && "transform rotate-90"
                )}
              />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 mr-6 mt-1">
          {link.children.map((child) => (
            <Link
              key={child.path}
              to={child.path}
              className={cn(
                "flex items-center rounded-md px-3 py-2 transition-colors",
                currentPath === child.path
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {child.icon}
              <span className="mr-3">{child.name}</span>
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      key={link.path}
      to={link.path}
      className={cn(
        "flex items-center rounded-md px-3 py-2 transition-colors",
        currentPath === link.path
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
