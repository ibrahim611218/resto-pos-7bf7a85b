
import React from "react";
import { CartItem as CartItemType } from "@/types";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import ItemDetails from "./cart/ItemDetails";
import QuantityControls from "./cart/QuantityControls";
import RemoveItemButton from "./cart/RemoveItemButton";

interface CartItemProps {
  item: CartItemType;
  index: number;
  isArabic: boolean;
  getSizeLabel: (size: string) => string;
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  index,
  isArabic,
  getSizeLabel,
  updateQuantity,
  removeItem,
}) => {
  // Function to set quantity directly
  const setQuantity = (newQuantity: number) => {
    const change = newQuantity - item.quantity;
    updateQuantity(item.id, change);
  };

  return (
    <AnimatedTransition animation="slide-up" delay={index * 50}>
      <div className="flex justify-between items-center bg-secondary p-3 rounded-lg">
        <ItemDetails
          name={item.name}
          nameAr={item.nameAr}
          size={item.size}
          price={item.price}
          quantity={item.quantity}
          isArabic={isArabic}
          sizeLabel={getSizeLabel(item.size)}
        />
        <div className="flex items-center space-x-1">
          <QuantityControls
            quantity={item.quantity}
            onDecrease={() => updateQuantity(item.id, -1)}
            onIncrease={() => updateQuantity(item.id, 1)}
            onSetQuantity={(qty) => setQuantity(qty)}
          />
          <RemoveItemButton onRemove={() => removeItem(item.id)} />
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default CartItemComponent;
