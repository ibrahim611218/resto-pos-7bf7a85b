
import React from "react";
import { useCart } from "@/features/pos/hooks/useCart";
import { Card } from "@/components/ui/card";
import { getSizeLabel } from "@/features/pos/utils/sizeLabels";
import ItemDetails from "./ItemDetails";
import QuantityControls from "./QuantityControls";
import RemoveItemButton from "./RemoveItemButton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartItemsListProps {
  cartItems: any[]; // We're using any[] to avoid type conflicts during this transition
  isArabic: boolean;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ cartItems, isArabic }) => {
  const { increaseQuantity, decreaseQuantity, setItemQuantity, removeItem } = useCart();
  
  return (
    <ScrollArea className="p-2 h-full">
      <div className="space-y-2">
        {cartItems.map((item) => (
          <Card key={`${item.id}-${item.size}`} className="p-3 flex items-center">
            <ItemDetails
              name={item.name}
              nameAr={item.nameAr}
              size={item.size}
              price={item.price}
              quantity={item.quantity}
              isArabic={isArabic}
              sizeLabel={getSizeLabel(item.size, isArabic)}
            />
            
            <div className="flex items-center ml-2">
              <QuantityControls
                quantity={item.quantity}
                onIncrease={() => increaseQuantity(item.id, item.size)}
                onDecrease={() => decreaseQuantity(item.id, item.size)}
                onSetQuantity={(value) => setItemQuantity(item.id, item.size, value)}
              />
              <RemoveItemButton
                onRemove={() => removeItem(item.id, item.size)}
              />
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CartItemsList;
