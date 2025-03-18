
import React from "react";

interface CartResizeHandlerProps {
  isMobile: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  isArabic: boolean;
  isDragging?: boolean;
}

/**
 * Resize handle component for the cart panel
 * Allows users to resize the cart width on desktop layouts
 */
const CartResizeHandler: React.FC<CartResizeHandlerProps> = ({
  isMobile,
  onMouseDown,
  isArabic,
  isDragging = false,
}) => {
  // Don't render resize handle on mobile
  if (isMobile) return null;

  // Position the handler based on text direction (RTL/LTR)
  const position = isArabic ? "right-0 left-auto" : "left-0 right-auto";
  
  return (
    <div 
      className={`cart-resize-handle absolute top-0 ${position} h-full w-2 ${
        isDragging ? 'active' : ''
      } cursor-ew-resize`}
      onMouseDown={onMouseDown}
      title={isArabic ? "اسحب لتغيير حجم السلة" : "Drag to resize cart"}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-16 bg-primary/50 rounded-full"></div>
    </div>
  );
};

export default CartResizeHandler;
