
import React from "react";
import { Invoice } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { formatPaymentMethod, formatOrderType, formatOrderStatus } from "@/features/reports/sales-report/utils/formatters";

interface InvoicePaymentDetailsProps {
  invoice: Invoice;
}

export const InvoicePaymentDetails: React.FC<InvoicePaymentDetailsProps> = ({ invoice }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  // Calculate the remaining amount
  const paidAmount = invoice.paidAmount || 0;
  const remainingAmount = invoice.total - paidAmount;
  
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
            {formatPaymentMethod(invoice.paymentMethod, isArabic)}
          </div>
          
          {invoice.paymentMethod === "transfer" && invoice.transferReceiptNumber && (
            <>
              <div className="text-muted-foreground">
                {isArabic ? "رقم إيصال التحويل" : "Transfer Receipt"}
              </div>
              <div className="font-medium text-right">
                {invoice.transferReceiptNumber}
              </div>
            </>
          )}
          
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
            {paidAmount.toFixed(2)} {isArabic ? "ر.س" : "SAR"}
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
            {formatOrderStatus(invoice.status, isArabic)}
          </div>

          {invoice.customer && (
            <>
              <div className="col-span-2 mt-4 mb-2">
                <h4 className="font-medium text-sm">
                  {isArabic ? "بيانات العميل" : "Customer Information"}
                </h4>
              </div>
              <div className="text-muted-foreground">
                {isArabic ? "اسم العميل" : "Customer Name"}
              </div>
              <div className="font-medium text-right">
                {invoice.customer.name}
              </div>
              
              {invoice.customer.phone && (
                <>
                  <div className="text-muted-foreground">
                    {isArabic ? "رقم الهاتف" : "Phone Number"}
                  </div>
                  <div className="font-medium text-right">
                    {invoice.customer.phone}
                  </div>
                </>
              )}
              
              {invoice.customer.taxNumber && (
                <>
                  <div className="text-muted-foreground">
                    {isArabic ? "الرقم الضريبي" : "Tax Number"}
                  </div>
                  <div className="font-medium text-right">
                    {invoice.customer.taxNumber}
                  </div>
                </>
              )}
              
              {invoice.customer.commercialRegister && (
                <>
                  <div className="text-muted-foreground">
                    {isArabic ? "السجل التجاري" : "Commercial Register"}
                  </div>
                  <div className="font-medium text-right">
                    {invoice.customer.commercialRegister}
                  </div>
                </>
              )}
              
              {invoice.customer.address && (
                <>
                  <div className="text-muted-foreground">
                    {isArabic ? "العنوان" : "Address"}
                  </div>
                  <div className="font-medium text-right">
                    {invoice.customer.address}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
