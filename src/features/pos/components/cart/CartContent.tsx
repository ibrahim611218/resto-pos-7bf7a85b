
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
        <ScrollArea className="flex-1 h-full">
          <CartItemsList cartItems={cartItems} isArabic={isArabic} />
        </ScrollArea>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default CartContent;
