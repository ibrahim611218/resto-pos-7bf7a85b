
import React from "react";

interface CartResizeHandlerProps {
  isMobile: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

const CartResizeHandler: React.FC<CartResizeHandlerProps> = ({
  isMobile,
  onMouseDown,
}) => {
  if (isMobile) return null;

  return (
    <div 
      className="absolute top-1/2 right-full h-16 w-1 bg-primary opacity-0 hover:opacity-100 cursor-ew-resize -translate-y-1/2"
      onMouseDown={onMouseDown}
      title="سحب لتغيير حجم السلة"
    />
  );
};

export default CartResizeHandler;
