
import { useState, useRef, useEffect, useCallback } from "react";

interface UseCartResizeProps {
  isArabic: boolean;
  isMobile: boolean;
  isTablet: boolean;
}

export const useCartResize = ({ isArabic, isMobile, isTablet }: UseCartResizeProps) => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const [startWidth, setStartWidth] = useState<number | null>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Use callback to prevent recreating function on each render
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (resizeRef.current) {
      setStartWidth(resizeRef.current.offsetWidth);
      setStartX(e.clientX);
      setIsDragging(true);
      document.body.style.cursor = 'ew-resize';
    }
  }, []);

  // Initialize width on component mount with debounced resize
  useEffect(() => {
    let timeoutId: number;
    
    const updateWidth = () => {
      if (resizeRef.current) {
        // Set initial width based on screen size
        const initialWidth = isMobile ? window.innerWidth : 
                          isTablet ? window.innerWidth / 3 : 
                          window.innerWidth / 4;
        setWidth(initialWidth);
        resizeRef.current.style.width = `${initialWidth}px`;
      }
    };
    
    // Initial update
    updateWidth();
    
    // Debounced resize handler
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateWidth, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isMobile, isTablet]);

  useEffect(() => {
    // Throttled mouse move handler for better performance
    let lastUpdateTime = 0;
    const throttleTime = 16; // ~60fps
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdateTime < throttleTime) return;
      lastUpdateTime = now;
      
      if (startX !== null && startWidth !== null) {
        // Calculate width change based on drag direction and RTL/LTR layout
        const diff = isArabic ? (e.clientX - startX) : (startX - e.clientX);
        // Set minimum and maximum boundaries for cart width
        const minWidth = 250;
        const maxWidth = Math.min(600, window.innerWidth * 0.8);
        const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + diff));
        
        if (resizeRef.current) {
          resizeRef.current.style.width = `${newWidth}px`;
          setWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setStartX(null);
      setStartWidth(null);
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };

    if (startX !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [startX, startWidth, isArabic]);

  return {
    resizeRef,
    width,
    isDragging,
    handleMouseDown
  };
};
