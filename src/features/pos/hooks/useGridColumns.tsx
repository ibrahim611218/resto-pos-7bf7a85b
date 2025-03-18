
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useMemo } from "react";

/**
 * Hook that provides responsive grid column settings based on screen size
 * Used to optimize product grid display on different devices
 */
export const useGridColumns = () => {
  const { width, isMobile, isTablet } = useWindowDimensions();
  
  // Memoize grid columns based on screen size to prevent unnecessary recalculations
  const getGridCols = useMemo(() => {
    if (width < 500) return "grid-cols-2"; // Very small screens
    if (width < 640) return "grid-cols-3"; // Small mobile
    if (width < 768) return "grid-cols-3"; // Mobile
    if (width < 1024) return "grid-cols-4"; // Small tablet
    if (width < 1280) return "grid-cols-5"; // Tablet/small desktop
    if (width < 1536) return "grid-cols-6"; // Medium desktop
    return "grid-cols-7"; // Large desktop
  }, [width]);

  // Function to get pixel-based grid columns - useful for programmatic calculations
  const getColumnsCount = (): number => {
    if (width < 500) return 2;
    if (width < 640) return 3;
    if (width < 768) return 3;
    if (width < 1024) return 4;
    if (width < 1280) return 5;
    if (width < 1536) return 6;
    return 7;
  };

  // Calculate optimal height for product cards
  const getCardHeight = useMemo(() => {
    if (isMobile) return "130px";
    if (isTablet) return "150px";
    return "170px";
  }, [isMobile, isTablet]);

  // Calculate optimal grid gap based on screen size
  const getGridGap = useMemo(() => {
    if (isMobile) return "gap-2";
    if (isTablet) return "gap-3";
    return "gap-4";
  }, [isMobile, isTablet]);

  return { 
    getGridCols,
    getColumnsCount,
    getCardHeight,
    getGridGap
  };
};
