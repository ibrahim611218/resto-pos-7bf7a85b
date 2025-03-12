
import React, { ReactNode } from "react";
import { useScreenSize } from "@/hooks/use-mobile";

interface PosLayoutProps {
  isArabic: boolean;
  children: ReactNode;
}

/**
 * A responsive layout component for the POS screen
 * Handles different layouts for mobile, tablet and desktop
 */
const PosLayout: React.FC<PosLayoutProps> = ({ isArabic, children }) => {
  const { isMobile } = useScreenSize();
  
  // Determine the order of panels based on language
  // For Arabic, cart should be on the right side
  const cartOrder = isArabic ? "order-1" : "order-2";
  const productsOrder = isArabic ? "order-2" : "order-1";

  // On mobile, we'll use a flex column layout instead of row
  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full w-full overflow-hidden m-0 p-0`}>
      {children}
    </div>
  );
};

export default PosLayout;
