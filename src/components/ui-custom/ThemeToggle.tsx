
import React from "react";
import { Moon, Sun } from "lucide-react";
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
      title={theme === "light" ? "التبديل للوضع الداكن" : "التبديل للوضع الفاتح"}
    >
      <AnimatedTransition animation="fade" show={theme === "light"}>
        <Moon size={18} className={collapsed ? "" : "mr-2"} />
      </AnimatedTransition>
      <AnimatedTransition animation="fade" show={theme === "dark"}>
        <Sun size={18} className={collapsed ? "" : "mr-2"} />
      </AnimatedTransition>
      {!collapsed && (
        <span>
          {theme === "light" ? "الوضع الداكن" : "الوضع الفاتح"}
        </span>
      )}
    </Button>
  );
};

export default ThemeToggle;
