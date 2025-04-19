
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
  taxIncluded?: boolean;
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
  onPaidAmountClick,
  taxIncluded = false
}) => {
  // حساب مبلغ الخصم
  const discountAmount = discountType === "percentage" 
    ? total * (discount / 100)
    : discount;

  // تقريب المجموع الإجمالي
  const roundedTotal = Math.round(total);

  const textSizeClass = isMobile ? 'text-sm' : 'text-base';
  const spacingClass = isMobile ? 'space-y-2' : 'space-y-3';
  const totalSizeClass = isMobile ? 'text-base' : 'text-lg';
  const showPaymentDetails = paymentMethod === "cash";
  
  // حساب المبلغ المتبقي للعميل (للدفع النقدي)
  const changeAmount = showPaymentDetails && paidAmount 
    ? Math.max(0, paidAmount - roundedTotal)
    : 0;

  return (
    <div className={`${spacingClass} ${textSizeClass}`}>
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          {isArabic 
            ? taxIncluded 
              ? "المجموع (شامل الضريبة)" 
              : "المجموع الفرعي" 
            : taxIncluded 
              ? "Total (Tax Included)" 
              : "Subtotal"
          }
        </span>
        <span>
          {formatCurrency(subtotal + (taxIncluded ? taxAmount : 0), isArabic ? "ar-SA" : "en-US", "SAR")}
        </span>
      </div>
      
      {!taxIncluded && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            {isArabic ? "ضريبة القيمة المضافة (15%)" : "VAT (15%)"}
          </span>
          <span>
            {formatCurrency(taxAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
          </span>
        </div>
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
          {formatCurrency(roundedTotal, isArabic ? "ar-SA" : "en-US", "SAR")}
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
            <span className={changeAmount > 0 ? "text-green-600" : "text-gray-500"}>
              {isArabic ? "المبلغ المتبقي للعميل" : "Change Amount"}
            </span>
            <span className={changeAmount > 0 ? "text-green-600 font-semibold" : "text-gray-500 font-semibold"}>
              {formatCurrency(changeAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
