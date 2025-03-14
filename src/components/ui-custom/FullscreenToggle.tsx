
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useLanguage } from "@/context/LanguageContext";

interface FullscreenToggleProps {
  className?: string;
}

const FullscreenToggle: React.FC<FullscreenToggleProps> = ({ className = "" }) => {
  const { isFullscreen, toggleFullscreen, fullscreenEnabled } = useFullscreen();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  // Force a resize event when fullscreen state changes
  useEffect(() => {
    const resizeHandler = () => {
      window.dispatchEvent(new Event('resize'));
    };
    
    // Set multiple timeouts to ensure all components have updated
    if (isFullscreen !== null) {
      const timeouts = [10, 100, 300, 500].map(delay => 
        setTimeout(resizeHandler, delay)
      );
      
      return () => {
        timeouts.forEach(id => clearTimeout(id));
      };
    }
  }, [isFullscreen]);

  if (!fullscreenEnabled) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFullscreen}
      className={`bg-background/80 backdrop-blur-sm shadow-sm z-50 ${className}`}
      title={isArabic 
        ? (isFullscreen ? "إلغاء وضع ملء الشاشة" : "ملء الشاشة") 
        : (isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen")
      }
    >
      {isFullscreen ? (
        <Minimize2 className="h-5 w-5" />
      ) : (
        <Maximize2 className="h-5 w-5" />
      )}
    </Button>
  );
};

export default FullscreenToggle;
