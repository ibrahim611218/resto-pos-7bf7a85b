
import React from "react";
import { Sun, Palmtree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import AnimatedTransition from "./AnimatedTransition";

interface ThemeToggleProps {
  className?: string;
  collapsed?: boolean;
}

const ThemeToggle = ({ className, collapsed = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size={collapsed ? "icon" : "default"}
      onClick={toggleTheme}
      className={className}
      title={theme === "light" ? "التبديل للوضع السعودي" : "التبديل للوضع الفاتح"}
    >
      <AnimatedTransition animation="fade" show={theme === "light"}>
        <Palmtree size={18} className={collapsed ? "" : "mr-2"} />
      </AnimatedTransition>
      <AnimatedTransition animation="fade" show={theme === "saudi"}>
        <Sun size={18} className={collapsed ? "" : "mr-2"} />
      </AnimatedTransition>
      {!collapsed && (
        <span>
          {theme === "light" 
            ? "الوضع السعودي"
            : "الوضع الفاتح"}
        </span>
      )}
    </Button>
  );
};

export default ThemeToggle;
