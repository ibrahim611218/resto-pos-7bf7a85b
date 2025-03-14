
import React, { ReactNode, useEffect, useState } from "react";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import MobilePosLayout from "./MobilePosLayout";
import DesktopPosLayout from "./DesktopPosLayout";

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
  const [childrenArray, setChildrenArray] = useState<ReactNode[]>([]);
  
  // Split children into array for proper layout placement
  useEffect(() => {
    const childArray = React.Children.toArray(children);
    setChildrenArray(childArray);
  }, [children]);
  
  // Update layout direction based on screen size and orientation
  useEffect(() => {
    // Force layout recalculation on mount and when dimensions change
    const updateLayout = () => {
      // Mobile or narrow screens - vertical layout
      if (isMobile || width < 768 || (width < height && width < 1024)) {
        setLayoutClass("flex-col");
      } 
      // Tablet landscape or desktop - horizontal layout
      else {
        setLayoutClass("flex-row");
      }
    };
    
    updateLayout();
    
    // Ensure the layout updates immediately after render
    const timeoutId = setTimeout(updateLayout, 50);
    
    return () => clearTimeout(timeoutId);
  }, [isMobile, isTablet, width, height]);
  
  // Add a debounced resize handler with immediate execution
  useEffect(() => {
    let resizeTimeout: number;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      
      // Update immediately for better user experience
      if (isMobile || width < 768 || (width < height && width < 1024)) {
        setLayoutClass("flex-col");
      } else {
        setLayoutClass("flex-row");
      }
      
      // Then finalize after a short delay
      resizeTimeout = window.setTimeout(() => {
        if (isMobile || width < 768 || (width < height && width < 1024)) {
          setLayoutClass("flex-col");
        } else {
          setLayoutClass("flex-row");
        }
      }, 100); // 100ms debounce
    };
    
    window.addEventListener('resize', handleResize);
    
    // Force an initial layout calculation
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isMobile, isTablet, width, height]);

  // Get the product and cart panels from children
  const productsPanel = childrenArray[0] || null;
  const cartPanel = childrenArray[1] || null;

  // Use different layout components based on screen size
  if (isMobile || width < 768 || (width < height && width < 1024)) {
    return (
      <div 
        dir={isArabic ? "rtl" : "ltr"} 
        className={`flex flex-col h-full w-full overflow-hidden m-0 p-0 auto-scale-container`} 
        style={{ 
          minHeight: "100vh", 
          maxWidth: "100vw",
          maxHeight: "100vh" 
        }}
      >
        <MobilePosLayout
          isArabic={isArabic}
          productsPanel={productsPanel}
          cartPanel={cartPanel}
        />
      </div>
    );
  }

  return (
    <div 
      dir={isArabic ? "rtl" : "ltr"} 
      className={`flex ${layoutClass} h-full w-full overflow-hidden m-0 p-0 auto-scale-container`} 
      style={{ 
        minHeight: "100vh", 
        maxWidth: "100vw",
        maxHeight: "100vh" 
      }}
    >
      <DesktopPosLayout
        isArabic={isArabic}
        productsPanel={productsPanel}
        cartPanel={cartPanel}
      />
    </div>
  );
};

export default PosLayout;
