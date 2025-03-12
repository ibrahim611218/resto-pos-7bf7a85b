
import React from "react";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AnimatedTransition from "../../ui-custom/AnimatedTransition";
import ThemeToggle from "../../ui-custom/ThemeToggle";
import LanguageToggle from "../../ui-custom/LanguageToggle";
import { Language } from "@/types";

interface SidebarFooterProps {
  collapsed: boolean;
  language: Language;
  onToggleLanguage: () => void;
  onLogout: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ 
  collapsed, 
  language, 
  onToggleLanguage, 
  onLogout 
}) => {
  return (
    <div className="border-t p-3 space-y-2">
      <ThemeToggle collapsed={collapsed} className="w-full justify-start" />
      <LanguageToggle 
        collapsed={collapsed} 
        className="w-full justify-start" 
        language={language}
        onToggle={onToggleLanguage}
      />
      
      <Button 
        variant="outline"
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          collapsed ? "justify-center" : "justify-start"
        )}
        onClick={onLogout}
      >
        <LogOut size={18} />
        {!collapsed && (
          <AnimatedTransition animation="fade">
            <span className="mr-2">تسجيل الخروج</span>
          </AnimatedTransition>
        )}
      </Button>
    </div>
  );
};

export default SidebarFooter;
