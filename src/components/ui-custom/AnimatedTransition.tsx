
import React from "react";
import { cn } from "@/lib/utils";

type AnimationType = "fade" | "slide-up" | "scale" | "none";

interface AnimatedTransitionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  show?: boolean;
}

const AnimatedTransition = ({
  children,
  animation = "fade",
  delay = 0,
  className,
  show = true,
}: AnimatedTransitionProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!show) return null;

  const getAnimationClass = (): string => {
    switch (animation) {
      case "fade":
        return "animate-fade-in";
      case "slide-up":
        return "animate-slide-in-up";
      case "scale":
        return "animate-scale-in";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        mounted ? getAnimationClass() : "opacity-0",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
