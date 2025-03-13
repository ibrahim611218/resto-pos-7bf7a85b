
import React from "react";
import { formatCurrency } from "@/utils/invoice";
import { DollarSign } from "lucide-react";

export interface CartSummaryProps {
  subtotal: number;
  taxAmount: number;
  discount: number;
  discountType: "percentage" | "fixed";
  total: number;
  paidAmount?: number;
  isMobile?: boolean;
  isArabic?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  taxAmount,
  discount,
  discountType,
  total,
  paidAmount = 0,
  isMobile = false,
  isArabic = false
}) => {
  // Calculate discount amount
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;

  // Always calculate remaining amount for display
  const remainingAmount = Math.max(0, total - paidAmount);

  const textSizeClass = isMobile ? 'text-sm' : 'text-base';
  const spacingClass = isMobile ? 'space-y-2' : 'space-y-3';
  const totalSizeClass = isMobile ? 'text-base' : 'text-lg';

  // Only show remaining amount if there is an amount remaining
  const showRemainingAmount = remainingAmount > 0;

  return (
    <div className={`${spacingClass} ${textSizeClass}`}>
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          {isArabic ? "المجموع الفرعي" : "Subtotal"}
        </span>
        <span>
          {formatCurrency(subtotal, isArabic ? "ar-SA" : "en-US", "SAR")}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          {isArabic ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)"}
        </span>
        <span>
          {formatCurrency(taxAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
        </span>
      </div>
      
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>
            {isArabic ? "الخصم" : "Discount"} {discountType === 'percentage' ? `(${discount}%)` : ''}
          </span>
          <span>
            - {formatCurrency(discountAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
          </span>
        </div>
      )}
      
      <div className={`flex justify-between font-bold ${totalSizeClass} pt-1`}>
        <span>
          {isArabic ? "الإجمالي" : "Total"}
        </span>
        <span>
          {formatCurrency(total, isArabic ? "ar-SA" : "en-US", "SAR")}
        </span>
      </div>

      {paidAmount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>
            {isArabic ? "المدفوع" : "Paid"}
          </span>
          <span>
            {formatCurrency(paidAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
          </span>
        </div>
      )}
      
      {showRemainingAmount && (
        <div className="flex justify-between font-bold text-red-600 text-lg border-t pt-2 mt-1">
          <span className="flex items-center">
            <DollarSign className={`${isArabic ? 'ml-1' : 'mr-1'}`} size={18} />
            {isArabic ? "المتبقي" : "Remaining"}
          </span>
          <span>
            {formatCurrency(remainingAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
          </span>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
