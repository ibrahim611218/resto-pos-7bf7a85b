
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
 * Shows products on the left/right and cart on the right/left based on language direction
 */
const DesktopPosLayout: React.FC<DesktopPosLayoutProps> = ({ 
  isArabic,
  productsPanel,
  cartPanel
}) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-background';
  
  // Define the ordering of elements based on language direction
  const cartOrder = isArabic ? "order-1" : "order-2";
  const productsOrder = isArabic ? "order-2" : "order-1";
  
  return (
    <div className="flex w-full h-full gap-4 p-2 overflow-hidden">
      <div className={`flex-1 h-full ${bgClass} rounded-lg ${productsOrder} overflow-hidden`}>
        <ScrollArea className="h-full w-full" type="hover">
          {productsPanel}
        </ScrollArea>
      </div>
      
      <div className={`w-1/3 min-w-[300px] max-w-[400px] h-full overflow-hidden rounded-lg ${cartOrder}`}>
        <ScrollArea className="h-full w-full" type="hover">
          {cartPanel}
        </ScrollArea>
      </div>
    </div>
  );
};

export default DesktopPosLayout;
