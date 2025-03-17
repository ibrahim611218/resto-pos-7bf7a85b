
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
  
  // Determine the order of panels based on language
  // For Arabic, cart should be on the right (order-2), otherwise on left (order-1)
  const cartOrder = isArabic ? "order-2" : "order-1";
  const productsOrder = isArabic ? "order-1" : "order-2";
  
  return (
    <>
      <ScrollArea className={`flex-1 h-full ${bgClass} ${productsOrder}`}>
        {productsPanel}
      </ScrollArea>
      
      <div className={`w-1/3 min-w-[300px] max-w-[400px] h-full overflow-hidden ${cartOrder}`}>
        {cartPanel}
      </div>
    </>
  );
};

export default DesktopPosLayout;
