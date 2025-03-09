
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import { getSidebarLinks } from "./sidebar/sidebarLinks";
import SidebarItem from "./sidebar/SidebarItem";
import { SidebarProps } from "./sidebar/types";
import ThemeToggle from "../ui-custom/ThemeToggle";

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    products: false,
    reports: false,
    inventory: false,
    pos: false,
  });

  const toggleCategory = (category: string) => {
    if (collapsed) return;
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const mainLinks = getSidebarLinks();

  if (isMobile && collapsed) return null;

  return (
    <AnimatedTransition animation="fade">
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 right-0 z-30 flex h-screen flex-col glass border-l",
          collapsed ? "w-20" : "w-64",
          "transition-all duration-300 ease-in-out"
        )}
      >
        <div className="flex items-center justify-between p-4 h-16">
          {!collapsed && (
            <AnimatedTransition animation="fade">
              <h2 className="text-xl font-bold">نظام المطاعم</h2>
            </AnimatedTransition>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="mr-auto"
            onClick={onToggle}
          >
            {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {mainLinks.map((link) => (
            <SidebarItem
              key={link.name}
              link={link}
              collapsed={collapsed}
              isOpen={openCategories[link.path.replace("/", "")] || false}
              currentPath={location.pathname}
              onToggleCategory={toggleCategory}
            />
          ))}
        </nav>
        
        <div className="border-t p-3">
          <ThemeToggle collapsed={collapsed} className="w-full justify-start" />
        </div>
      </aside>
    </AnimatedTransition>
  );
};

export default Sidebar;
