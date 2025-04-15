
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/context/LanguageContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import CartPanel from "@/features/pos/components/cart/CartPanel";
import { Separator } from "@/components/ui/separator";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import FullscreenToggle from "@/components/ui-custom/FullscreenToggle";

const Pos = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isMobile } = useWindowDimensions();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cartExpanded, setCartExpanded] = useState(!isMobile);
  
  const toggleViewMode = () => {
    setViewMode(prev => prev === "grid" ? "list" : "grid");
  };

  return (
    <div className="flex flex-col h-full pos-screen pos-layout">
      <div className="p-4 flex justify-between items-center relative z-20 flex-shrink-0">
        <h1 className="text-2xl font-bold">{isArabic ? "نقاط البيع" : "Point of Sale"}</h1>
        <div className="flex gap-2">
          <FullscreenToggle className="mr-2" />
          <Button variant="outline" size="sm" onClick={toggleViewMode}>
            {viewMode === "grid" ? <List size={18} /> : <Grid size={18} />}
          </Button>
        </div>
      </div>
      <Separator className="mb-4 flex-shrink-0" />
      
      <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
        {/* Products section */}
        <div className="flex-1 overflow-hidden products-section">
          <ScrollArea className="h-[calc(100vh-120px)] pos-scroll-area">
            <div className="p-4">
              <ProductsGrid viewMode={viewMode} />
            </div>
          </ScrollArea>
        </div>
        
        {/* Cart section */}
        <CartPanel 
          expanded={cartExpanded} 
          onToggleExpand={() => setCartExpanded(prev => !prev)} 
        />
      </div>
    </div>
  );
};

export default Pos;
