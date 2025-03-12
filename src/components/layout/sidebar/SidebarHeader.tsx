
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AnimatedTransition from "../../ui-custom/AnimatedTransition";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-4 h-16 border-b">
      {!collapsed && (
        <AnimatedTransition animation="fade">
          <h2 className="text-xl font-bold">نظام المطاعم</h2>
        </AnimatedTransition>
      )}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "transition-all duration-200",
          collapsed ? "mr-auto" : "mr-auto"
        )}
        onClick={onToggle}
      >
        {collapsed ? 
          <ChevronLeft className="animate-pulse-subtle" size={18} /> : 
          <ChevronRight className="animate-pulse-subtle" size={18} />
        }
      </Button>
    </div>
  );
};

export default SidebarHeader;
