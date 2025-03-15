
import React, { ReactNode } from "react";
import { useScreenSize } from "@/hooks/use-mobile";

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
  
  // Adjust the layout based on device type and orientation
  return (
    <div 
      className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full overflow-hidden`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {children}
    </div>
  );
};

export default PosLayout;
