
import React from "react";
import { formatCurrency } from "@/utils/invoice";

export interface CartSummaryProps {
  subtotal: number;
  taxAmount: number;
  discount: number;
  discountType: "percentage" | "fixed";
  total: number;
  paidAmount?: number; // Optional paid amount
  paymentMethod?: string; // Add paymentMethod to determine when to show paid/remaining
  isMobile?: boolean;
  isArabic?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  taxAmount,
  discount,
  discountType,
  total,
  paidAmount,
  paymentMethod,
  isMobile = false,
  isArabic = false
}) => {
  // Calculate discount amount
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;

  // Calculate remaining amount if paidAmount is provided
  const remainingAmount = paidAmount !== undefined 
    ? Math.max(0, total - paidAmount)
    : undefined;

  const textSizeClass = isMobile ? 'text-sm' : 'text-base';
  const spacingClass = isMobile ? 'space-y-2' : 'space-y-3';
  const totalSizeClass = isMobile ? 'text-base' : 'text-lg';

  // Only show paid/remaining amounts if a payment method has been selected
  const showPaymentDetails = paymentMethod && paidAmount !== undefined;

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
      
      {/* Display paid amount and remaining if payment method is selected */}
      {showPaymentDetails && (
        <>
          <div className="flex justify-between pt-1 border-t border-gray-200">
            <span className="text-muted-foreground">
              {isArabic ? "المبلغ المدفوع" : "Paid Amount"}
            </span>
            <span>
              {formatCurrency(paidAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {isArabic ? "المبلغ المتبقي" : "Remaining Amount"}
            </span>
            <span className={remainingAmount > 0 ? 'text-red-500' : 'text-green-500'}>
              {formatCurrency(remainingAmount || 0, isArabic ? "ar-SA" : "en-US", "SAR")}
            </span>
          </div>
        </>
      )}
      
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
    </div>
  );
};

export default CartSummary;
