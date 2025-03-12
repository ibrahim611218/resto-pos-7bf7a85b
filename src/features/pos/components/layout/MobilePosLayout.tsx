
import React, { ReactNode } from "react";

interface MobilePosLayoutProps {
  isArabic: boolean;
  productsPanel: ReactNode;
  cartPanel: ReactNode;
}

/**
 * Mobile-specific layout component for the POS screen
 */
const MobilePosLayout: React.FC<MobilePosLayoutProps> = ({ 
  isArabic,
  productsPanel,
  cartPanel
}) => {
  return (
    <>
      <div className={`flex-1 w-full h-1/2 overflow-hidden ${isArabic ? 'order-2' : 'order-1'}`}>
        {productsPanel}
      </div>
      
      <div className={`w-full h-1/2 overflow-hidden ${isArabic ? 'order-1' : 'order-2'}`}>
        {cartPanel}
      </div>
    </>
  );
};

export default MobilePosLayout;
