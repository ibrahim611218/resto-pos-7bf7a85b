
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
    <div className="flex-1 min-h-0">
      {cartItems.length > 0 ? (
        <ScrollArea className="h-full">
          <div className="p-2">
            <CartItemsList cartItems={cartItems} isArabic={isArabic} />
          </div>
        </ScrollArea>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default CartContent;
