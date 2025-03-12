
import React from "react";

interface CartResizeHandlerProps {
  isMobile: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  isArabic: boolean;
  isDragging?: boolean;
}

const CartResizeHandler: React.FC<CartResizeHandlerProps> = ({
  isMobile,
  onMouseDown,
  isArabic,
  isDragging = false,
}) => {
  if (isMobile) return null;

  // Position the handler based on text direction (RTL/LTR)
  const position = isArabic ? "left-full right-auto" : "right-full left-auto";
  
  return (
    <div 
      className={`absolute top-1/2 ${position} h-20 w-1.5 bg-primary ${
        isDragging ? 'opacity-100' : 'opacity-30 hover:opacity-100'
      } cursor-ew-resize -translate-y-1/2 rounded-full transition-opacity duration-200`}
      onMouseDown={onMouseDown}
      title={isArabic ? "اسحب لتغيير حجم السلة" : "Drag to resize cart"}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-10 bg-white/70 rounded-full"></div>
    </div>
  );
};

export default CartResizeHandler;
