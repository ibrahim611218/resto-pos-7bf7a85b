
import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types";
import AnimatedTransition from "@/components/ui-custom/AnimatedTransition";

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
  return (
    <AnimatedTransition animation="slide-up" delay={index * 50}>
      <div className="flex justify-between items-center bg-secondary p-3 rounded-lg">
        <div className="flex-1">
          <p className="font-medium">
            {isArabic ? item.nameAr : item.name}
            <span className="text-xs ml-1 text-muted-foreground">
              ({getSizeLabel(item.size)})
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            {item.price} {isArabic ? "ر.س" : "SAR"} x {item.quantity}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(item.id, -1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => updateQuantity(item.id, 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default CartItemComponent;
