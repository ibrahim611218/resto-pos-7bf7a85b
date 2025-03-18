
import React, { useState, useEffect } from "react";

interface CartResizeHandlerProps {
  isMobile: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  isArabic: boolean;
  isDragging?: boolean;
}

/**
 * Resize handle component for the cart panel
 * Allows users to resize the cart width on desktop layouts
 * Enhanced with better touch support and visual feedback
 */
const CartResizeHandler: React.FC<CartResizeHandlerProps> = ({
  isMobile,
  onMouseDown,
  isArabic,
  isDragging = false,
}) => {
  // Don't render resize handle on mobile
  if (isMobile) return null;

  // Track hover state for better user feedback
  const [isHovered, setIsHovered] = useState(false);
  
  // Track if we're using a touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Detect touch devices on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Position the handler based on text direction (RTL/LTR)
  const position = isArabic ? "right-0 left-auto" : "left-0 right-auto";
  
  // Determine classes based on state
  const activeClass = isDragging ? 'active' : '';
  const hoverClass = isHovered ? 'hover' : '';
  const touchClass = isTouchDevice ? 'touch-target' : '';
  
  return (
    <div 
      className={`cart-resize-handle absolute top-0 ${position} h-full ${
        activeClass
      } ${hoverClass} ${touchClass} cursor-ew-resize`}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onMouseDown as any}
      title={isArabic ? "اسحب لتغيير حجم السلة" : "Drag to resize cart"}
      aria-label={isArabic ? "تغيير حجم السلة" : "Resize cart"}
    >
      <div className="drag-indicator"></div>
    </div>
  );
};

export default CartResizeHandler;
