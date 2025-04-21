
import React from "react";
import { CartItem } from "@/types";
import { getSizeLabel } from "@/features/pos/utils/sizeLabels";
import { formatCurrency } from "@/utils/invoice";

// helper: هل هذا المنتج فردي (حبة)؟
const isSingle = (item: CartItem) => item.type === "single" || (!item.size && !item.variantId);

interface InvoiceItemsProps {
  items: CartItem[];
}

export const InvoiceItems: React.FC<InvoiceItemsProps> = ({ items }) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">الأصناف</h3>
      <div className="space-y-2">
        {items.map((item) => {
          // إذا المنتج حبة، لا تظهر المقاس
          const shouldShowSize = !isSingle(item) && item.size !== "regular" && item.size !== "medium";
          
          return (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{item.nameAr || item.name}</span>
                {shouldShowSize && (
                  <span className="text-sm text-muted-foreground mr-2">
                    ({getSizeLabel(item.size, true)}) x {item.quantity}
                  </span>
                )}
                {!shouldShowSize && (
                  <span className="text-sm text-muted-foreground mr-2">
                    x {item.quantity}
                  </span>
                )}
              </div>
              <span>
                {formatCurrency(item.price * item.quantity, "ar-SA", "SAR")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

