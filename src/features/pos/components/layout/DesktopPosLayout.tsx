
import React, { ReactNode } from "react";

interface DesktopPosLayoutProps {
  isArabic: boolean;
  productsPanel: ReactNode;
  cartPanel: ReactNode;
}

/**
 * Desktop/tablet layout component for the POS screen
 */
const DesktopPosLayout: React.FC<DesktopPosLayoutProps> = ({ 
  isArabic,
  productsPanel,
  cartPanel
}) => {
  // Determine the order of panels based on language
  const cartOrder = isArabic ? "order-1" : "order-2";
  const productsOrder = isArabic ? "order-2" : "order-1";
  
  return (
    <>
      <div className={`flex-1 h-full overflow-auto ${productsOrder}`}>
        {productsPanel}
      </div>
      
      <div className={`h-full overflow-auto ${cartOrder}`}>
        {cartPanel}
      </div>
    </>
  );
};

export default DesktopPosLayout;
