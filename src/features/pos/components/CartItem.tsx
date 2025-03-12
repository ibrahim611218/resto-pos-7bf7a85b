
import React from "react";
import { CartItem as CartItemType } from "@/types";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";
import ItemDetails from "./cart/ItemDetails";
import QuantityControls from "./cart/QuantityControls";
import RemoveItemButton from "./cart/RemoveItemButton";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  return (
    <AnimatedTransition animation="slide-up" delay={index * 50}>
      <div className={`flex justify-between items-center ${isLightTheme ? 'bg-secondary/20 hover:bg-secondary/30' : 'bg-secondary hover:bg-secondary/80'} p-4 rounded-xl border border-border/50 transition-colors duration-200`}>
        <ItemDetails
          name={item.name}
          nameAr={item.nameAr}
          size={item.size}
          price={item.price}
          quantity={item.quantity}
          isArabic={isArabic}
          sizeLabel={getSizeLabel(item.size)}
        />
        <div className="flex items-center space-x-2">
          <QuantityControls
            quantity={item.quantity}
            onDecrease={() => updateQuantity(item.id, -1)}
            onIncrease={() => updateQuantity(item.id, 1)}
          />
          <RemoveItemButton onRemove={() => removeItem(item.id)} />
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default CartItemComponent;
