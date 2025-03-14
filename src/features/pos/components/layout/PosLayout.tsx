
import React, { ReactNode, useEffect, useState } from "react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

interface PosLayoutProps {
  isArabic: boolean;
  children: ReactNode;
}

/**
 * A responsive layout component for the POS screen
 * Handles different layouts for mobile, tablet and desktop
 */
const PosLayout: React.FC<PosLayoutProps> = ({ isArabic, children }) => {
  const { isMobile, isTablet, width, height } = useWindowDimensions();
  const [layoutClass, setLayoutClass] = useState("flex-row");
  
  // Update layout direction based on screen size and orientation
  useEffect(() => {
    // Mobile or narrow screens - vertical layout
    if (isMobile || width < 768 || (width < height && width < 1024)) {
      setLayoutClass("flex-col");
    } 
    // Tablet landscape or desktop - horizontal layout
    else {
      setLayoutClass("flex-row");
    }
  }, [isMobile, isTablet, width, height]);

  return (
    <div className={`flex ${layoutClass} h-full w-full overflow-hidden m-0 p-0 auto-scale-container`}>
      {children}
    </div>
  );
};

export default PosLayout;
