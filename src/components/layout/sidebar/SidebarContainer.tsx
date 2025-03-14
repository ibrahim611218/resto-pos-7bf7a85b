import React from "react";
import { cn } from "@/lib/utils";
import AnimatedTransition from "../../ui-custom/AnimatedTransition";
import { SidebarContextProvider } from "./SidebarContext";
import { useFullscreen } from "@/hooks/useFullscreen";

interface SidebarContainerProps {
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isInitialized: boolean;
  isMobile: boolean;
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({ 
  collapsed, 
  onToggle, 
  children, 
  isInitialized,
  isMobile
}) => {
  const { isFullscreen } = useFullscreen();
  
  // Don't return null in fullscreen, just keep the sidebar visible but collapsed
  if (isMobile && collapsed) return null;

  const sidebarTransition = collapsed ? "w-20" : "w-64";

  return (
    <AnimatedTransition animation="fade" show={isInitialized}>
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 right-0 z-50 flex h-screen flex-col glass border-l shadow-md",
          sidebarTransition,
          "transition-all duration-300 ease-in-out",
          isFullscreen ? "fullscreen-sidebar" : ""
        )}
      >
        <SidebarContextProvider collapsed={collapsed} onToggle={onToggle}>
          {children}
        </SidebarContextProvider>
      </aside>
    </AnimatedTransition>
  );
};

export default SidebarContainer;
