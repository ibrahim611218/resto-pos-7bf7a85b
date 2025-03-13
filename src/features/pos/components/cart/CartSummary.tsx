
import React from "react";
import { formatCurrency } from "@/utils/invoice";

export interface CartSummaryProps {
  subtotal: number;
  taxAmount: number;
  discount: number;
  discountType: "percentage" | "fixed";
  total: number;
  isMobile?: boolean;
  isArabic?: boolean;
  paymentMethod?: string;
  paidAmount?: number;
  onPaidAmountClick?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  taxAmount,
  discount,
  discountType,
  total,
  isMobile = false,
  isArabic = false,
  paymentMethod,
  paidAmount,
  onPaidAmountClick
}) => {
  // Calculate discount amount
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;

  const textSizeClass = isMobile ? 'text-sm' : 'text-base';
  const spacingClass = isMobile ? 'space-y-2' : 'space-y-3';
  const totalSizeClass = isMobile ? 'text-base' : 'text-lg';
  const showPaymentDetails = paymentMethod === "cash";
  
  // Calculate remaining amount (for cash payments)
  const remainingAmount = showPaymentDetails ? Math.max(0, total - (paidAmount || 0)) : 0;

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

      {showPaymentDetails && (
        <div className="border-t pt-2 mt-1 space-y-2">
          <div 
            className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-1 rounded-md" 
            onClick={onPaidAmountClick}
          >
            <span className="text-blue-600">
              {isArabic ? "المبلغ المستلم" : "Paid Amount"}
            </span>
            <span className="text-blue-600 font-semibold">
              {formatCurrency(paidAmount || 0, isArabic ? "ar-SA" : "en-US", "SAR")}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className={remainingAmount > 0 ? "text-red-600" : "text-green-600"}>
              {isArabic ? "المبلغ المتبقي" : "Remaining Amount"}
            </span>
            <span className={remainingAmount > 0 ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
              {formatCurrency(remainingAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
