
import React from "react";
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

  if (!fullscreenEnabled) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFullscreen}
      className={`bg-background/80 backdrop-blur-sm shadow-sm ${className}`}
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
