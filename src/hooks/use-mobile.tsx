
import * as React from "react";

export const SCREEN_SIZES = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536
};

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < SCREEN_SIZES.md);
    };
    
    const mql = window.matchMedia(`(max-width: ${SCREEN_SIZES.md - 1}px)`);
    
    if (mql.addEventListener) {
      mql.addEventListener("change", checkMobile);
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', checkMobile);
    }
    
    // Initial check
    checkMobile();
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkMobile);
      } else {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

  return !!isMobile;
}

export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isMobile: width < SCREEN_SIZES.sm,
        isTablet: width >= SCREEN_SIZES.sm && width < SCREEN_SIZES.lg,
        isDesktop: width >= SCREEN_SIZES.lg && width < SCREEN_SIZES.xl,
        isLargeDesktop: width >= SCREEN_SIZES.xl
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
