
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdvancedTheme } from "@/context/AdvancedThemeContext";
import AnimatedTransition from "./AnimatedTransition";

interface ThemeToggleProps {
  className?: string;
  collapsed?: boolean;
}

const ThemeToggle = ({ className, collapsed = false }: ThemeToggleProps) => {
  const { mode, toggleMode } = useAdvancedTheme();

  return (
    <Button
      variant="ghost"
      size={collapsed ? "icon" : "default"}
      onClick={toggleMode}
      className={`${className} flex items-center justify-center`} // Added centering classes
      title={mode === "light" ? "التبديل للوضع الداكن" : "التبديل للوضع الفاتح"}
    >
      <AnimatedTransition animation="fade" show={mode === "light"}>
        <Moon size={18} className={collapsed ? "" : "mr-2"} />
      </AnimatedTransition>
      <AnimatedTransition animation="fade" show={mode === "dark"}>
        <Sun size={18} className={collapsed ? "" : "mr-2"} />
      </AnimatedTransition>
      {!collapsed && (
        <span>
          {mode === "light" ? "الوضع الداكن" : "الوضع الفاتح"}
        </span>
      )}
    </Button>
  );
};

export default ThemeToggle;

