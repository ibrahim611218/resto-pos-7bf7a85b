
import React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedTransition from "./AnimatedTransition";
import { Language } from "@/types";

interface LanguageToggleProps {
  className?: string;
  collapsed?: boolean;
  language: Language;
  onToggle: () => void;
}

const LanguageToggle = ({ 
  className, 
  collapsed = false, 
  language, 
  onToggle 
}: LanguageToggleProps) => {
  const isArabic = language === "ar";

  return (
    <Button
      variant="ghost"
      size={collapsed ? "icon" : "default"}
      onClick={onToggle}
      className={className}
      title={isArabic ? "Switch to English" : "التبديل للغة العربية"}
    >
      <Globe size={18} className={collapsed ? "" : "mr-2"} />
      {!collapsed && (
        <AnimatedTransition animation="fade" show={true}>
          <span>{isArabic ? "English" : "العربية"}</span>
        </AnimatedTransition>
      )}
    </Button>
  );
};

export default LanguageToggle;
