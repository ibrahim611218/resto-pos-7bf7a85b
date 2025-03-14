
import React, { useEffect } from "react";
import Pos from "@/features/pos/Pos";

const PosPage: React.FC = () => {
  // Force the page to take the full viewport on mount
  useEffect(() => {
    // Save original styles to restore on unmount
    const originalHtmlStyle = {
      height: document.documentElement.style.height,
      overflow: document.documentElement.style.overflow
    };
    
    const originalBodyStyle = {
      height: document.body.style.height,
      overflow: document.body.style.overflow,
      margin: document.body.style.margin,
      padding: document.body.style.padding
    };
    
    // Add fullscreen classes to the root elements
    document.documentElement.style.height = "100%";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    
    // Force layout recalculation
    window.dispatchEvent(new Event('resize'));
    
    // Set a timeout to trigger another resize event after components have rendered
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
    
    // Cleanup on unmount
    return () => {
      document.documentElement.style.height = originalHtmlStyle.height;
      document.documentElement.style.overflow = originalHtmlStyle.overflow;
      document.body.style.height = originalBodyStyle.height;
      document.body.style.overflow = originalBodyStyle.overflow;
      document.body.style.margin = originalBodyStyle.margin;
      document.body.style.padding = originalBodyStyle.padding;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen max-w-full w-full h-full overflow-hidden m-0 p-0 pos-screen">
      <Pos />
    </div>
  );
};

export default PosPage;
