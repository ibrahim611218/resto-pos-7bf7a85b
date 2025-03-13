
import React from "react";
import { formatCurrency } from "@/utils/invoice";
import { useLanguage } from "@/context/LanguageContext";

interface InvoicePaymentDetailsProps {
  total: number;
  paidAmount?: number;
}

export const InvoicePaymentDetails: React.FC<InvoicePaymentDetailsProps> = ({
  total,
  paidAmount = 0,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const remainingAmount = Math.max(total - paidAmount, 0);
  
  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-muted-foreground">
          {isArabic ? "المبلغ المدفوع" : "Paid Amount"}:
        </span>
        <span className="font-semibold text-green-600">
          {formatCurrency(paidAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
        </span>
      </div>
      
      {remainingAmount > 0 && (
        <div className="flex justify-between items-center">
          <span className="font-medium text-muted-foreground">
            {isArabic ? "المبلغ المتبقي" : "Remaining Amount"}:
          </span>
          <span className="font-semibold text-red-600">
            {formatCurrency(remainingAmount, isArabic ? "ar-SA" : "en-US", "SAR")}
          </span>
        </div>
      )}
    </div>
  );
};
