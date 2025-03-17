
import React, { ReactNode } from "react";
import { useScreenSize } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar/sidebar-context";
import { useTheme } from "@/context/ThemeContext";

interface PosLayoutProps {
  isArabic: boolean;
  children: ReactNode;
}

/**
 * Main layout component for the POS screen that handles basic styling
 */
const PosLayout: React.FC<PosLayoutProps> = ({ 
  isArabic,
  children
}) => {
  const { isMobile } = useScreenSize();
  const { theme } = useTheme();
  
  // Background color based on theme
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-background';
  
  // Adjust the layout based on device type and orientation
  return (
    <SidebarProvider>
      <div 
        className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full w-full max-w-full overflow-hidden ${bgClass}`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {children}
      </div>
    </SidebarProvider>
  );
};

export default PosLayout;
