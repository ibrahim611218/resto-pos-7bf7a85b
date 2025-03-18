
import React, { ReactNode } from "react";
import { useScreenSize } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar/sidebar-context";
import { useTheme } from "@/context/ThemeContext";

interface PosLayoutProps {
  isArabic: boolean;
  children: ReactNode;
}

/**
 * Main layout component for the POS screen that handles basic styling and structure
 * Wraps the entire POS interface and provides proper RTL/LTR support
 */
const PosLayout: React.FC<PosLayoutProps> = ({ 
  isArabic,
  children
}) => {
  const { isMobile } = useScreenSize();
  const { theme } = useTheme();
  
  // Background color based on theme
  const bgClass = theme === 'light' ? 'bg-gray-50' : 'bg-background';
  
  return (
    <SidebarProvider>
      <div 
        className={`pos-screen ${bgClass} rounded-lg shadow-sm overflow-hidden`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="auto-scale-container h-full">
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full w-full max-w-full overflow-hidden rounded-lg`}>
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PosLayout;
