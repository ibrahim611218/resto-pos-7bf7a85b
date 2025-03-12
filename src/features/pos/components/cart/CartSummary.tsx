
import React from "react";
import { formatCurrency } from "@/utils/invoice";

export interface CartSummaryProps {
  subtotal: number;
  taxAmount: number;
  discount: number;
  discountType: "percentage" | "fixed";
  total: number;
  isMobile?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  taxAmount,
  discount,
  discountType,
  total,
  isMobile = false
}) => {
  // Calculate discount amount
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;

  const textSizeClass = isMobile ? 'text-sm' : 'text-base';
  const spacingClass = isMobile ? 'space-y-2' : 'space-y-3';
  const totalSizeClass = isMobile ? 'text-base' : 'text-lg';

  return (
    <div className={`${spacingClass} ${textSizeClass}`}>
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          المجموع الفرعي
        </span>
        <span>
          {formatCurrency(subtotal, "ar-SA", "SAR")}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          ضريبة القيمة المضافة (15%)
        </span>
        <span>
          {formatCurrency(taxAmount, "ar-SA", "SAR")}
        </span>
      </div>
      
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>
            الخصم {discountType === 'percentage' ? `(${discount}%)` : ''}
          </span>
          <span>
            - {formatCurrency(discountAmount, "ar-SA", "SAR")}
          </span>
        </div>
      )}
      
      <div className={`flex justify-between font-bold ${totalSizeClass} pt-1`}>
        <span>
          الإجمالي
        </span>
        <span>
          {formatCurrency(total, "ar-SA", "SAR")}
        </span>
      </div>
    </div>
  );
};

export default CartSummary;
