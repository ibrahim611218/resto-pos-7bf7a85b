
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
    <div className="flex-1 flex flex-col min-h-0" style={{ height: 'calc(100vh - 200px)' }}>
      {cartItems.length > 0 ? (
        <ScrollArea className="flex-1 w-full">
          <div className="p-2 space-y-2">
            <CartItemsList cartItems={cartItems} isArabic={isArabic} />
          </div>
        </ScrollArea>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <EmptyCart />
        </div>
      )}
    </div>
  );
};

export default CartContent;
