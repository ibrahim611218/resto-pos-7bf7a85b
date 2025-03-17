
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
 */
const MobilePosLayout: React.FC<MobilePosLayoutProps> = ({ 
  isArabic,
  productsPanel,
  cartPanel
}) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-background';

  return (
    <>
      <ScrollArea className={`flex-1 w-full h-[55%] ${bgClass} ${isArabic ? 'order-2' : 'order-1'}`}>
        {productsPanel}
      </ScrollArea>
      
      <div className={`w-full h-[45%] overflow-hidden ${isArabic ? 'order-1' : 'order-2'}`}>
        {cartPanel}
      </div>
    </>
  );
};

export default MobilePosLayout;
