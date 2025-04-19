
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import CartPanel from "@/features/pos/components/cart/CartPanel";
import { Separator } from "@/components/ui/separator";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import FullscreenToggle from "@/components/ui-custom/FullscreenToggle";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import { CartProvider } from "@/features/pos/hooks/useCart";
import NetworkStatusIndicator from "@/components/ui-custom/NetworkStatusIndicator";

const Pos = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isMobile } = useWindowDimensions();
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");
  const [cartExpanded, setCartExpanded] = useState(!isMobile);
  
  const toggleViewMode = () => {
    setViewMode(prev => prev === "grid-small" ? "list" : "grid-small");
  };

  return (
    <CartProvider>
      <div className="flex flex-col h-dvh max-h-dvh overflow-hidden">
        <div className="p-2 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 sticky top-0">
          <h1 className="text-2xl font-bold">{isArabic ? "نقاط البيع" : "Point of Sale"}</h1>
          <div className="flex gap-2 items-center">
            <NetworkStatusIndicator />
            <FullscreenToggle className="mr-2" />
            <Button variant="outline" size="sm" onClick={toggleViewMode}>
              {viewMode === "grid-small" ? <List size={18} /> : <LayoutGrid size={18} />}
            </Button>
          </div>
        </div>
        <Separator className="mb-2" />
        
        <div className="flex-1 flex h-[calc(100%-4rem)] overflow-hidden">
          <div className="flex-1 overflow-hidden products-section">
            <ScrollArea className="h-full w-full">
              <div className="px-2">
                <ProductsGrid viewMode={viewMode} />
              </div>
            </ScrollArea>
          </div>
          
          <CartPanel 
            expanded={cartExpanded} 
            onToggleExpand={() => setCartExpanded(prev => !prev)} 
          />
        </div>
      </div>
    </CartProvider>
  );
};

export default Pos;
