
import { useState, useEffect } from 'react';

// Define the return type for the hook
interface WindowDimensions {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSmallScreen: boolean;
  scaleFactor: number;
  orientation: 'portrait' | 'landscape';
}

export const useWindowDimensions = (): WindowDimensions => {
  // Default values to prevent hydration issues
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isSmallScreen: false,
    scaleFactor: 1,
    orientation: 'landscape'
  });

  useEffect(() => {
    // Helper function to calculate dimensions and breakpoints
    const calculateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Calculate responsive breakpoints
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const isDesktop = width >= 1024;
      const isSmallScreen = height < 700;
      const orientation = width >= height ? 'landscape' : 'portrait';
      
      // Calculate a scale factor based on screen size to help with responsive sizing
      // Base scale is 1 at 1280px width
      const baseWidth = 1280;
      const scaleFactor = Math.max(0.8, Math.min(1.2, width / baseWidth));
      
      setWindowDimensions({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        isSmallScreen,
        scaleFactor,
        orientation
      });
    };

    // Calculate on mount
    calculateDimensions();
    
    // Listen for window resize events
    const handleResize = () => {
      calculateDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Set up a resize observer to detect container size changes
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        calculateDimensions();
      });
      
      const rootElement = document.getElementById('root');
      if (rootElement) {
        resizeObserver.observe(rootElement);
      }
      
      return () => {
        if (rootElement) resizeObserver.unobserve(rootElement);
        resizeObserver.disconnect();
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      };
    }
    
    // Fallback cleanup without ResizeObserver
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return windowDimensions;
};

// Shorthand hook for responsive layout decisions
export const useResponsiveLayout = () => {
  const { isMobile, isTablet, isDesktop, isSmallScreen, width, height, orientation } = useWindowDimensions();
  
  // Utility function to get the appropriate column count for grids
  const getGridColumns = (baseColumns: number = 4): number => {
    if (isMobile) return Math.max(1, baseColumns - 3);
    if (isTablet) return Math.max(2, baseColumns - 1);
    if (width < 1280) return Math.max(3, baseColumns - 1);
    return baseColumns;
  };
  
  // Utility to get responsive spacing
  const getSpacing = (base: number = 4): number => {
    if (isMobile) return Math.max(2, base - 2);
    if (isTablet) return Math.max(3, base - 1);
    return base;
  };
  
  return {
    isMobile,
    isTablet, 
    isDesktop,
    isSmallScreen,
    width,
    height,
    orientation,
    getGridColumns,
    getSpacing
  };
};
