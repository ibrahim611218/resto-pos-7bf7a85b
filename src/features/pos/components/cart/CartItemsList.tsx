import React from "react";
import { useCart } from "@/features/pos/hooks/useCart";
import { Card } from "@/components/ui/card";
import { getSizeLabel } from "@/features/pos/utils/sizeLabels";
import ItemDetails from "./ItemDetails";
import QuantityControls from "./QuantityControls";
import RemoveItemButton from "./RemoveItemButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Size } from "@/types";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  nameAr?: string;
  price: number;
  quantity: number;
  image?: string;
  size: Size | "regular";
  variantId: string;
  categoryId: string;
  taxable: boolean;
}

interface CartItemsListProps {
  cartItems: CartItem[];
  isArabic: boolean;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ cartItems, isArabic }) => {
  const { increaseQuantity, decreaseQuantity, setItemQuantity, removeItem } = useCart();
  
  return (
    <ScrollArea className="h-full max-h-[60vh]">
      <div className="p-2 space-y-2">
        {cartItems.map((item) => (
          <Card key={`${item.id}-${item.size}`} className="p-3 flex items-center">
            <ItemDetails
              name={item.name}
              nameAr={item.nameAr}
              size={item.size as string}
              price={item.price}
              quantity={item.quantity}
              isArabic={isArabic}
              sizeLabel={getSizeLabel(item.size as string, isArabic)}
              type={item.type}
            />
            
            <div className="flex items-center ml-2">
              <QuantityControls
                quantity={item.quantity}
                onIncrease={() => increaseQuantity(item.id, item.size as string)}
                onDecrease={() => decreaseQuantity(item.id, item.size as string)}
                onSetQuantity={(value) => setItemQuantity(item.id, item.size as string, value)}
              />
              <RemoveItemButton
                onRemove={() => removeItem(item.id, item.size as string)}
              />
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CartItemsList;
