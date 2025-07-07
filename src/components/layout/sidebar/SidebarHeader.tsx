
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AnimatedTransition from "../../ui-custom/AnimatedTransition";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { useAdvancedTheme } from "@/context/AdvancedThemeContext";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, onToggle }) => {
  const { settings } = useBusinessSettings();
  const { mode } = useAdvancedTheme();
  const isDark = mode === "dark";
  
  return (
    <div className="flex items-center justify-between p-4 h-16 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
      {!collapsed ? (
        <AnimatedTransition animation="fade">
          <div className="flex items-center">
            <img src="/lovable-uploads/b8da0625-ebda-4a08-8f51-5ebf33b24b30.png" alt="RestoPOS" className="h-10 w-10 ml-2" />
            <div className="flex flex-col">
              <h2 className="text-xl font-bold sidebar-text">
                <span className="text-[#00825A]">Resto</span>
                <span className="text-[#FF6B00]">POS</span>
              </h2>
              <span className="text-xs sidebar-subtext">نظام المطاعم</span>
            </div>
          </div>
        </AnimatedTransition>
      ) : (
        <img src="/lovable-uploads/b8da0625-ebda-4a08-8f51-5ebf33b24b30.png" alt="RestoPOS" className="h-10 w-10" />
      )}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "transition-all duration-200 text-white",
          collapsed ? "mr-auto" : ""
        )}
        onClick={onToggle}
      >
        {collapsed ? 
          <ChevronLeft className="animate-pulse-subtle text-white" size={18} /> : 
          <ChevronRight className="animate-pulse-subtle text-white" size={18} />
        }
      </Button>
    </div>
  );
};

export default SidebarHeader;
