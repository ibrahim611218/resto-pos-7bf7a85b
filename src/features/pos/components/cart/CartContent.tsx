
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
              height: 'calc(100vh - 400px)', // Increased to accommodate larger footer
              maxHeight: 'calc(100vh - 400px)'
            }}
          >
            <div className="p-3 space-y-3 pb-4" dir={isArabic ? "rtl" : "ltr"}>
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
