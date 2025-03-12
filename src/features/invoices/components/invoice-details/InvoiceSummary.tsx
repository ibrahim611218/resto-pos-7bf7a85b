
import React from "react";
import { Invoice, BusinessSettings } from "@/types";
import { formatCurrency } from "@/utils/invoice";
import { Separator } from "@/components/ui/separator";

interface InvoiceSummaryProps {
  invoice: Invoice;
  settings: BusinessSettings;
  discountAmount: number;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
  invoice,
  settings,
  discountAmount
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground">الكاشير</h3>
          <p>{invoice.cashierName}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground">العميل</h3>
          <p>{invoice.customer?.name || "عميل عادي"}</p>
          {invoice.customer?.phone && <p className="text-sm">{invoice.customer.phone}</p>}
        </div>
      </div>

      {invoice.orderType && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground">نوع الطلب</h3>
            <p>{invoice.orderType === "dineIn" ? "محلي" : "سفري"}</p>
          </div>
          {invoice.orderType === "dineIn" && invoice.tableNumber && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">رقم الطاولة</h3>
              <p>{invoice.tableNumber}</p>
            </div>
          )}
        </div>
      )}

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">المجموع الفرعي</span>
          <span>{formatCurrency(invoice.subtotal, "ar-SA", "SAR")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">ضريبة القيمة المضافة ({settings.taxRate}%)</span>
          <span>{formatCurrency(invoice.taxAmount, "ar-SA", "SAR")}</span>
        </div>
        
        {invoice.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>الخصم {invoice.discountType === 'percentage' ? `(${invoice.discount}%)` : ''}</span>
            <span>- {formatCurrency(discountAmount, "ar-SA", "SAR")}</span>
          </div>
        )}
        
        <div className="flex justify-between font-bold">
          <span>الإجمالي</span>
          <span>{formatCurrency(invoice.total, "ar-SA", "SAR")}</span>
        </div>
      </div>
    </>
  );
};
