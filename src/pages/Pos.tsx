
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import CartPanel from "@/features/pos/components/cart/CartPanel";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{isArabic ? "نقاط البيع" : "Point of Sale"}</h1>
        <Button variant="outline" size="sm" onClick={toggleViewMode}>
          {viewMode === "grid-small" ? <List size={18} /> : <LayoutGrid size={18} />}
        </Button>
      </div>
      
      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <ProductsGrid viewMode={viewMode} />
        </div>
        
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
