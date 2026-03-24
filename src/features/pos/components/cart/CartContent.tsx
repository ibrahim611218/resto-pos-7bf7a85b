
import React from "react";
import CartItemsList from "./CartItemsList";
import EmptyCart from "./EmptyCart";

interface CartContentProps {
  cartItems: any[];
  isArabic: boolean;
}

const CartContent: React.FC<CartContentProps> = ({ cartItems, isArabic }) => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {cartItems.length > 0 ? (
        <div className="flex-1 overflow-auto min-h-0">
          <div className="p-2 sm:p-3 space-y-2 pb-4" dir={isArabic ? "rtl" : "ltr"}>
            <CartItemsList cartItems={cartItems} isArabic={isArabic} />
          </div>
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
