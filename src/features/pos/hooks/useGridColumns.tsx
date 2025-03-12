
import { useScreenSize } from "@/hooks/use-mobile";

export const useGridColumns = () => {
  const { width } = useScreenSize();
  
  // Calculate grid columns based on screen size - enhanced for better product display
  const getGridCols = () => {
    if (width < 500) return "grid-cols-2";
    if (width < 640) return "grid-cols-3";
    if (width < 768) return "grid-cols-4";
    if (width < 1024) return "grid-cols-5";
    if (width < 1280) return "grid-cols-6";
    return "grid-cols-8";
  };

  return { getGridCols };
};
