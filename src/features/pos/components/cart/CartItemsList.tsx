
import React from "react";
import { CartItem as CartItemType } from "@/types";
import CartItemComponent from "../CartItem";
import EmptyCart from "./EmptyCart";

interface CartItemsListProps {
  cartItems: CartItemType[];
  isMobile: boolean;
  isArabic: boolean;
  getSizeLabel: (size: string) => string;
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({
  cartItems,
  isMobile,
  isArabic,
  getSizeLabel,
  updateQuantity,
  removeItem,
}) => {
  const itemsContainerClass = isMobile ? "px-1 pb-1" : "px-2 pb-1";

  return (
    <div className={`flex-grow overflow-y-auto ${itemsContainerClass} min-h-0`}>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className={`space-y-${isMobile ? "1" : "2"} pt-2`}>
          {cartItems.map((item, index) => (
            <CartItemComponent
              key={item.id}
              item={item}
              index={index}
              isArabic={isArabic}
              getSizeLabel={getSizeLabel}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItemsList;
