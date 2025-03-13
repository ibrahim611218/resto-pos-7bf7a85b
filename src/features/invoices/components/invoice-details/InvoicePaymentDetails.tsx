
import React from "react";
import { Invoice } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

interface InvoicePaymentDetailsProps {
  invoice: Invoice;
}

export const InvoicePaymentDetails: React.FC<InvoicePaymentDetailsProps> = ({ invoice }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  // Calculate the remaining amount
  const remainingAmount = invoice.total - invoice.paidAmount;
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">
          {isArabic ? "تفاصيل الدفع" : "Payment Details"}
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-muted-foreground">
            {isArabic ? "وسيلة الدفع" : "Payment Method"}
          </div>
          <div className="font-medium text-right">
            {invoice.paymentMethod}
          </div>
          
          <div className="text-muted-foreground">
            {isArabic ? "المبلغ الإجمالي" : "Total Amount"}
          </div>
          <div className="font-medium text-right">
            {invoice.total.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
          </div>
          
          <div className="text-muted-foreground">
            {isArabic ? "المبلغ المدفوع" : "Paid Amount"}
          </div>
          <div className="font-medium text-right">
            {invoice.paidAmount.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
          </div>
          
          <div className="text-muted-foreground">
            {isArabic ? "المبلغ المتبقي" : "Remaining Amount"}
          </div>
          <div className={`font-medium text-right ${remainingAmount > 0 ? "text-red-500" : ""}`}>
            {remainingAmount.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
          </div>
          
          <div className="text-muted-foreground">
            {isArabic ? "حالة الفاتورة" : "Invoice Status"}
          </div>
          <div className="font-medium text-right">
            {invoice.status === "completed" ? (isArabic ? "مكتملة" : "Completed") : 
             invoice.status === "cancelled" ? (isArabic ? "ملغاة" : "Cancelled") : 
             invoice.status === "refunded" ? (isArabic ? "مسترجعة" : "Refunded") : 
             (isArabic ? "معلقة" : "Pending")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
