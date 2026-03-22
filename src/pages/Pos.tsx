
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import CartPanel from "@/features/pos/components/cart/CartPanel";
import { LayoutGrid, List, ZoomIn, ZoomOut, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import AdvancedThemeSelector from "@/components/ui-custom/AdvancedThemeSelector";
import { cn } from "@/lib/utils";
import { useCart } from "@/features/pos/hooks/useCart";
import { Badge } from "@/components/ui/badge";

const Pos = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isMobile } = useWindowDimensions();
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");
  const [cartExpanded, setCartExpanded] = useState(!isMobile);
  const [mobileView, setMobileView] = useState<"products" | "cart">("products");
  const { cartItems } = useCart();
  
  const toggleViewMode = () => {
    setViewMode(prev => prev === "grid-small" ? "list" : "grid-small");
  };

  const zoomIn = () => {
    if (viewMode === "list") setViewMode("grid-small");
    else if (viewMode === "grid-small") setViewMode("grid-large");
  };

  const zoomOut = () => {
    if (viewMode === "grid-large") setViewMode("grid-small");
    else if (viewMode === "grid-small") setViewMode("list");
  };

  // Mobile layout
  if (isMobile) {
    return (
      <div className="h-screen w-full flex flex-col overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
        {/* Mobile Header */}
        <div className="flex-shrink-0 p-2 flex justify-between items-center bg-background border-b h-14 z-10">
          <h1 className="text-lg font-bold truncate">{isArabic ? "نقاط البيع" : "POS"}</h1>
          <div className="flex gap-1 items-center">
            <AdvancedThemeSelector />
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={zoomOut} disabled={viewMode === "list"}>
              <ZoomOut size={16} />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={zoomIn} disabled={viewMode === "grid-large"}>
              <ZoomIn size={16} />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={toggleViewMode}>
              {viewMode === "list" ? <LayoutGrid size={16} /> : <List size={16} />}
            </Button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Products view */}
          <div className={cn(
            "absolute inset-0 overflow-auto transition-transform duration-200",
            mobileView === "products" ? "translate-x-0" : isArabic ? "translate-x-full" : "-translate-x-full"
          )}>
            <div className="p-3 pb-20">
              <ProductsGrid viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </div>

          {/* Cart view */}
          <div className={cn(
            "absolute inset-0 overflow-hidden transition-transform duration-200",
            mobileView === "cart" ? "translate-x-0" : isArabic ? "-translate-x-full" : "translate-x-full"
          )}>
            <CartPanel expanded={true} onToggleExpand={() => setMobileView("products")} />
          </div>
        </div>

        {/* Bottom tab bar */}
        <div className="flex-shrink-0 border-t bg-background safe-area-bottom">
          <div className="flex">
            <button
              onClick={() => setMobileView("products")}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors",
                mobileView === "products" 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground"
              )}
            >
              <Package size={22} />
              <span className="text-xs font-medium">{isArabic ? "المنتجات" : "Products"}</span>
            </button>
            <button
              onClick={() => setMobileView("cart")}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors relative",
                mobileView === "cart" 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <ShoppingCart size={22} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-3 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] bg-destructive text-destructive-foreground">
                    {cartItems.length}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{isArabic ? "السلة" : "Cart"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="h-screen w-full flex overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex-shrink-0 p-2 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b h-16">
        <h1 className="text-2xl font-bold">{isArabic ? "نقاط البيع" : "Point of Sale"}</h1>
        <div className="flex gap-2">
          <AdvancedThemeSelector />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={zoomOut}
            disabled={viewMode === "list"}
            title={isArabic ? "تصغير" : "Zoom Out"}
          >
            <ZoomOut size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={zoomIn}
            disabled={viewMode === "grid-large"}
            title={isArabic ? "تكبير" : "Zoom In"}
          >
            <ZoomIn size={18} />
          </Button>
          <Button variant="outline" size="sm" onClick={toggleViewMode}>
            {viewMode === "list" ? <LayoutGrid size={18} /> : <List size={18} />}
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={cn("flex w-full pt-16", isArabic ? "flex-row-reverse" : "")}>
        <div className="flex-shrink-0">
          <CartPanel 
            expanded={cartExpanded} 
            onToggleExpand={() => setCartExpanded(prev => !prev)} 
          />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 h-screen">
          <div className="h-full overflow-auto">
            <div className="p-4 h-full">
              <ProductsGrid 
                viewMode={viewMode} 
                onViewModeChange={setViewMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pos;
