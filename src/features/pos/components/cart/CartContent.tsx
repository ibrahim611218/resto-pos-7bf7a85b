
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
    <div className="flex-1 overflow-hidden flex flex-col cart-content min-h-0">
      {cartItems.length > 0 ? (
        <div className="flex-1 overflow-auto">
          <ScrollArea className="h-full max-h-full">
            <div className="p-2">
              <CartItemsList cartItems={cartItems} isArabic={isArabic} />
            </div>
          </ScrollArea>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default CartContent;
