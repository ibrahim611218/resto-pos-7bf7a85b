
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedTransition from "./AnimatedTransition";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fade" | "slide-up" | "scale" | "none";
  delay?: number;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({
  children,
  animation = "none",
  delay = 0,
  className,
  hover = false,
  ...props
}: GlassCardProps) => {
  return (
    <AnimatedTransition animation={animation} delay={delay}>
      <div
        className={cn(
          "glass rounded-lg p-4 transition-all duration-300",
          hover && "hover:shadow-xl hover:scale-[1.01]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AnimatedTransition>
  );
};

export default GlassCard;
