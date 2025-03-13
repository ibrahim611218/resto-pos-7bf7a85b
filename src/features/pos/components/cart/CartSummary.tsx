
import React from "react";
import { formatCurrency } from "@/utils/invoice";

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
  paidAmount,
  isMobile = false,
  isArabic = false
}) => {
  // Calculate discount amount
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;
    
  // Calculate remaining amount
  const remainingAmount = paidAmount !== undefined ? Math.max(0, total - paidAmount) : 0;
  const showPaidAmount = paidAmount !== undefined && paidAmount > 0;

  const textSizeClass = isMobile ? 'text-sm' : 'text-base';
  const spacingClass = isMobile ? 'space-y-2' : 'space-y-3';
  const totalSizeClass = isMobile ? 'text-base' : 'text-lg';

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
      
      {showPaidAmount && (
        <>
          <div className="flex justify-between text-blue-600">
            <span>
              {isArabic ? "المبلغ المدفوع" : "Paid Amount"}
            </span>
            <span>
              {formatCurrency(paidAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
            </span>
          </div>
          
          <div className="flex justify-between text-red-600 font-medium">
            <span>
              {isArabic ? "المبلغ المتبقي" : "Remaining Amount"}
            </span>
            <span>
              {formatCurrency(remainingAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
