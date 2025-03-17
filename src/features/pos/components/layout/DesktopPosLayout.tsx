
import React, { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-background';
  
  // For Arabic, products should be on the right, cart on the left (opposite of LTR)
  // For non-Arabic, cart is on the right, products on the left
  const cartOrder = isArabic ? "order-1" : "order-2";
  const productsOrder = isArabic ? "order-2" : "order-1";
  
  return (
    <>
      <ScrollArea className={`flex-1 h-full ${bgClass} rounded-lg ${productsOrder}`}>
        {productsPanel}
      </ScrollArea>
      
      <div className={`w-1/3 min-w-[300px] max-w-[400px] h-full overflow-hidden rounded-lg ${cartOrder}`}>
        {cartPanel}
      </div>
    </>
  );
};

export default DesktopPosLayout;
