
import React, { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/context/ThemeContext";

interface MobilePosLayoutProps {
  isArabic: boolean;
  productsPanel: ReactNode;
  cartPanel: ReactNode;
}

/**
 * Mobile-specific layout component for the POS screen
 * Shows products and cart in a vertical layout
 */
const MobilePosLayout: React.FC<MobilePosLayoutProps> = ({ 
  isArabic,
  productsPanel,
  cartPanel
}) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-background';

  // Define element ordering based on language direction
  const productsOrder = isArabic ? "order-2" : "order-1";
  const cartOrder = isArabic ? "order-1" : "order-2";

  return (
    <div className="flex flex-col w-full h-full gap-2 pos-layout-mobile overflow-hidden">
      <div className={`flex-1 w-full h-[55%] ${bgClass} rounded-lg ${productsOrder} overflow-hidden`}>
        <ScrollArea className="h-full w-full" type="hover">
          {productsPanel}
        </ScrollArea>
      </div>
      
      <div className={`w-full h-[45%] overflow-hidden rounded-lg ${cartOrder} border-t border-gray-200 dark:border-gray-800`}>
        <ScrollArea className="h-full w-full" type="hover">
          {cartPanel}
        </ScrollArea>
      </div>
    </div>
  );
};

export default MobilePosLayout;
