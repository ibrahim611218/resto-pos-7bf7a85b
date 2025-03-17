
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
    <div className="flex flex-col w-full h-full">
      <ScrollArea className={`flex-1 w-full h-[60%] ${bgClass} rounded-t-lg ${isArabic ? 'order-2' : 'order-1'}`}>
        {productsPanel}
      </ScrollArea>
      
      <div className={`w-full h-[40%] overflow-hidden rounded-b-lg ${isArabic ? 'order-1' : 'order-2'} border-t border-gray-200 dark:border-gray-800`}>
        {cartPanel}
      </div>
    </div>
  );
};

export default MobilePosLayout;
