
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import CartPanel from "@/features/pos/components/cart/CartPanel";
import { Separator } from "@/components/ui/separator";
import { LayoutGrid, List, ZoomIn, ZoomOut, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ViewMode } from "@/components/ui-custom/ViewToggle";

const Pos = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isMobile } = useWindowDimensions();
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");
  const [cartExpanded, setCartExpanded] = useState(!isMobile);
  const [cartWidth, setCartWidth] = useState(isMobile ? 100 : 25); // percentage
  const [isDragging, setIsDragging] = useState(false);
  
  const toggleViewMode = () => {
    setViewMode(prev => prev === "grid-small" ? "list" : "grid-small");
  };

  const zoomIn = () => {
    if (viewMode === "list") {
      setViewMode("grid-small");
    } else if (viewMode === "grid-small") {
      setViewMode("grid-large");
    }
  };

  const zoomOut = () => {
    if (viewMode === "grid-large") {
      setViewMode("grid-small");
    } else if (viewMode === "grid-small") {
      setViewMode("list");
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const windowWidth = window.innerWidth;
    const mouseX = e.clientX;
    const newWidth = (mouseX / windowWidth) * 100;
    
    // Limit cart width between 15% and 50%
    const clampedWidth = Math.min(Math.max(newWidth, 15), 50);
    setCartWidth(clampedWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-2 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 border-b">
        <h1 className="text-2xl font-bold">{isArabic ? "نقاط البيع" : "Point of Sale"}</h1>
        <div className="flex gap-2">
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
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Cart Panel - Fixed to the left */}
        <div 
          className="flex-shrink-0 order-first"
          style={{ 
            width: cartExpanded ? `${cartWidth}%` : 'auto',
            transition: isDragging ? 'none' : 'width 0.3s ease'
          }}
        >
          <CartPanel 
            expanded={cartExpanded} 
            onToggleExpand={() => setCartExpanded(prev => !prev)} 
          />
        </div>
        
        {/* Resize Handle */}
        {cartExpanded && (
          <div 
            className="w-1 bg-border hover:bg-primary/50 cursor-col-resize flex items-center justify-center group transition-colors"
            onMouseDown={handleMouseDown}
          >
            <GripVertical 
              size={16} 
              className="text-muted-foreground group-hover:text-primary transition-colors" 
            />
          </div>
        )}
        
        {/* Products Section */}
        <div 
          className="flex-1 flex flex-col overflow-hidden min-w-0"
          style={{ 
            width: cartExpanded ? `${100 - cartWidth}%` : '100%',
            transition: isDragging ? 'none' : 'width 0.3s ease'
          }}
        >
          <ScrollArea className="flex-1">
            <div className="p-2 h-full">
              <ProductsGrid 
                viewMode={viewMode} 
                onViewModeChange={setViewMode}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Pos;
