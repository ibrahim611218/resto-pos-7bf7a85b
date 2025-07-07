
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedTransition from "../../ui-custom/AnimatedTransition";
import { SidebarContextProvider } from "./SidebarContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAdvancedTheme } from "@/context/AdvancedThemeContext";

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
  const { language } = useLanguage();
  const { mode } = useAdvancedTheme();
  const isArabic = language === "ar";
  const isDark = mode === "dark";
  
  // Set width transition
  const sidebarTransition = collapsed ? "w-20" : "w-64";

  // Calculate border based on language
  const borderClass = isArabic ? "border-l" : "border-r";

  return (
    <AnimatedTransition animation="fade" show={isInitialized}>
      <aside
        className={cn(
          "relative inset-y-0 z-40 flex h-screen flex-col shadow-md",
          sidebarTransition,
          borderClass,
          "transition-all duration-300 ease-in-out",
          "restopos-sidebar"
        )}
        style={{ 
          direction: isArabic ? "rtl" : "ltr",
          pointerEvents: "auto", 
          touchAction: "auto", 
          userSelect: "none",
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          borderColor: 'hsl(var(--border))'
        }}
        data-sidebar="sidebar"
      >
        <SidebarContextProvider collapsed={collapsed} onToggle={onToggle}>
          {children}
        </SidebarContextProvider>
      </aside>
    </AnimatedTransition>
  );
};

export default SidebarContainer;
