
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedTransition from "../../ui-custom/AnimatedTransition";
import { SidebarContextProvider } from "./SidebarContext";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useLanguage } from "@/context/LanguageContext";

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
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  // Determine sidebar position (left or right) based on RTL setting
  const sidePosition = isArabic ? "right-0" : "left-0";
  
  // Set width transition
  const sidebarTransition = collapsed ? "w-20" : "w-64";

  // Calculate border based on language
  const borderClass = isArabic ? "border-l" : "border-r";

  return (
    <AnimatedTransition animation="fade" show={isInitialized}>
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 z-50 flex h-screen flex-col glass shadow-md",
          sidePosition,
          sidebarTransition,
          borderClass,
          "transition-all duration-300 ease-in-out",
          isFullscreen ? "fullscreen-sidebar" : "",
          collapsed && isMobile ? "transform -translate-x-full rtl:translate-x-full" : "transform translate-x-0"
        )}
        style={{ 
          direction: isArabic ? "rtl" : "ltr",
          pointerEvents: "auto", // Ensure clicks work
          touchAction: "auto", // Ensure touch events work
        }}
      >
        <SidebarContextProvider collapsed={collapsed} onToggle={onToggle}>
          {children}
        </SidebarContextProvider>
      </aside>
    </AnimatedTransition>
  );
};

export default SidebarContainer;
