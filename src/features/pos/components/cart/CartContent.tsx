
import React from "react";
import CartItemsList from "./CartItemsList";
import EmptyCart from "./EmptyCart";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartContentProps {
  cartItems: any[];
  isArabic: boolean;
}

const CartContent: React.FC<CartContentProps> = ({ cartItems, isArabic }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {cartItems.length > 0 ? (
        <div className="flex-1 overflow-hidden">
          <ScrollArea 
            className="h-full w-full" 
            style={{ 
              height: 'calc(100vh - 280px)',
              maxHeight: 'calc(100vh - 280px)'
            }}
          >
            <div className="p-2 space-y-2 pb-4">
              <CartItemsList cartItems={cartItems} isArabic={isArabic} />
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <EmptyCart />
        </div>
      )}
    </div>
  );
};

export default CartContent;
