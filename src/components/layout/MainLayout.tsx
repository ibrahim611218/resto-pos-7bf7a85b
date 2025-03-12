
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarVisible(!sidebarVisible);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Floating sidebar toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-[100] bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg rounded-full w-12 h-12"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </Button>

      {/* Sidebar - only visible when toggled on mobile */}
      {(sidebarVisible || !isMobile) && (
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
      )}
      
      <AnimatedTransition animation="fade" delay={100}>
        <div 
          className="flex-1 h-screen overflow-auto transition-all duration-300 ease-in-out"
        >
          <div className="p-2 sm:p-4 md:p-6 w-full max-w-full">
            <Outlet />
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
