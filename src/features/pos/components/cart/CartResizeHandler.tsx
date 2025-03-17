
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
  const position = isArabic ? "right-0 left-auto" : "left-0 right-auto";
  
  return (
    <div 
      className={`absolute top-1/2 ${position} h-24 w-1.5 bg-primary ${
        isDragging ? 'opacity-100' : 'opacity-40 hover:opacity-100'
      } cursor-ew-resize -translate-y-1/2 rounded-full transition-opacity duration-200`}
      onMouseDown={onMouseDown}
      title={isArabic ? "اسحب لتغيير حجم السلة" : "Drag to resize cart"}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-16 bg-white/70 rounded-full"></div>
    </div>
  );
};

export default CartResizeHandler;
