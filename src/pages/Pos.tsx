
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import ProductsGrid from "@/features/pos/components/products/ProductsGrid";
import CartPanel from "@/features/pos/components/cart/CartPanel";
import { Separator } from "@/components/ui/separator";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import OnScreenKeyboard from "@/features/settings/components/touch-mode/OnScreenKeyboard";

const Pos = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isMobile } = useWindowDimensions();
  const [viewMode, setViewMode] = useState<ViewMode>("grid-small");
  const [cartExpanded, setCartExpanded] = useState(!isMobile);
  
  // Touch mode keyboard states
  const [kbVisible, setKbVisible] = useState(false);
  const [kbTarget, setKbTarget] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
  
  // Check if touch mode is enabled from settings
  useEffect(() => {
    const checkTouchMode = () => {
      const stored = localStorage.getItem("display-settings");
      if (stored) {
        const settings = JSON.parse(stored);
        if (settings.touchMode) {
          document.documentElement.classList.add("touch-mode-active");
          document.body.classList.add("touch-target-fix");
          document.body.classList.add("pos-page-active");
          console.log("Touch mode active in POS");
          
          // Set up keyboard listeners
          setupKeyboardListeners();
        }
      }
    };
    
    checkTouchMode();
    
    return () => {
      document.body.classList.remove("pos-page-active");
      cleanupKeyboardListeners();
    };
  }, []);
  
  const setupKeyboardListeners = () => {
    const handleFocusIn = (e: FocusEvent) => {
      const tgt = e.target as HTMLElement;
      if (
        tgt &&
        (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA") &&
        (tgt as HTMLInputElement | HTMLTextAreaElement).type !== "hidden" &&
        !tgt.hasAttribute("readonly") &&
        !tgt.hasAttribute("disabled")
      ) {
        console.log("POS: Input focused:", tgt);
        setKbTarget(tgt as HTMLInputElement | HTMLTextAreaElement);
        setKbVisible(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      // Use setTimeout to handle focus changing between elements
      setTimeout(() => {
        const activeElement = document.activeElement;
        console.log("POS: Focus out, active element:", activeElement);
        
        if (activeElement !== kbTarget && 
            activeElement?.tagName !== "INPUT" && 
            activeElement?.tagName !== "TEXTAREA") {
          setKbVisible(false);
          setKbTarget(null);
        }
      }, 100); // delay to allow switching focus
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    
    // Store references for cleanup
    window._posKeyboardListeners = {
      focusIn: handleFocusIn,
      focusOut: handleFocusOut
    };
  };
  
  const cleanupKeyboardListeners = () => {
    if (window._posKeyboardListeners) {
      window.removeEventListener("focusin", window._posKeyboardListeners.focusIn);
      window.removeEventListener("focusout", window._posKeyboardListeners.focusOut);
      delete window._posKeyboardListeners;
    }
  };
  
  const toggleViewMode = () => {
    setViewMode(prev => prev === "grid-small" ? "list" : "grid-small");
  };

  return (
    <div className="flex flex-col h-dvh max-h-dvh overflow-hidden pos-screen">
      <div className="p-2 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 sticky top-0">
        <h1 className="text-2xl font-bold">{isArabic ? "نقاط البيع" : "Point of Sale"}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleViewMode}>
            {viewMode === "grid-small" ? <List size={18} /> : <LayoutGrid size={18} />}
          </Button>
        </div>
      </div>
      <Separator className="mb-2" />
      
      <div className="flex-1 flex h-[calc(100%-4rem)] overflow-hidden">
        <div className="flex-1 overflow-hidden products-section products-panel">
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
      
      <OnScreenKeyboard
        visible={kbVisible}
        target={kbTarget}
        onClose={() => {
          setKbVisible(false);
          if (kbTarget) kbTarget.blur();
        }}
        isArabic={isArabic}
      />
    </div>
  );
};

// Add a type declaration to window for keyboard listeners
declare global {
  interface Window {
    _posKeyboardListeners?: {
      focusIn: (e: FocusEvent) => void;
      focusOut: (e: FocusEvent) => void;
    };
  }
}

export default Pos;
