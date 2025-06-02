
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import CartPanel from "@/features/pos/components/cart/CartPanel";
import { Separator } from "@/components/ui/separator";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ViewMode } from "@/components/ui-custom/ViewToggle";

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
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-2 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 border-b">
        <h1 className="text-2xl font-bold">{isArabic ? "نقاط البيع" : "Point of Sale"}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleViewMode}>
            {viewMode === "grid-small" ? <List size={18} /> : <LayoutGrid size={18} />}
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Products Section */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <ScrollArea className="flex-1">
            <div className="p-2 h-full">
              <ProductsGrid viewMode={viewMode} />
            </div>
          </ScrollArea>
        </div>
        
        {/* Cart Panel */}
        <div className="flex-shrink-0">
          <CartPanel 
            expanded={cartExpanded} 
            onToggleExpand={() => setCartExpanded(prev => !prev)} 
          />
        </div>
      </div>
    </div>
  );
};

export default Pos;
