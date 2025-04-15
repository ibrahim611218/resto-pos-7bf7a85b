
import React from "react";
import CartItemsList from "./CartItemsList";
import EmptyCart from "./EmptyCart";

interface CartContentProps {
  cartItems: any[];
  isArabic: boolean;
}

const CartContent: React.FC<CartContentProps> = ({ cartItems, isArabic }) => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col cart-content">
      {cartItems.length > 0 ? (
        <CartItemsList cartItems={cartItems} isArabic={isArabic} />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default CartContent;
