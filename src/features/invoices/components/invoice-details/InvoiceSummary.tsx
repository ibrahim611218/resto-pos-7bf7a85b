
import React from "react";
import { Invoice, BusinessSettings } from "@/types";
import { formatCurrency } from "@/utils/invoice";
import { DollarSign } from "lucide-react";

interface InvoiceSummaryProps {
  invoice: Invoice;
  settings: BusinessSettings;
  discountAmount: number;
}

const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({
  invoice,
  settings,
  discountAmount
}) => {
  // Calculate remaining amount if not already in the invoice
  const paidAmount = invoice.paidAmount || 0;
  const remainingAmount = Math.max(0, invoice.total - paidAmount);

  return (
    <div className="space-y-3 text-right rtl:text-right ltr:text-left">
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          المجموع الفرعي
        </span>
        <span>
          {formatCurrency(invoice.subtotal, "ar-SA", "SAR")}
        </span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          ضريبة القيمة المضافة ({settings.taxRate || 15}%)
        </span>
        <span>
          {formatCurrency(invoice.taxAmount, "ar-SA", "SAR")}
        </span>
      </div>
      
      {invoice.discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>
            الخصم {invoice.discountType === "percentage" ? `(${invoice.discount}%)` : ""}
          </span>
          <span>
            - {formatCurrency(discountAmount, "ar-SA", "SAR")}
          </span>
        </div>
      )}
      
      <div className="flex justify-between font-bold text-lg pt-1">
        <span>
          الإجمالي
        </span>
        <span>
          {formatCurrency(invoice.total, "ar-SA", "SAR")}
        </span>
      </div>

      {paidAmount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>
            المدفوع
          </span>
          <span>
            {formatCurrency(paidAmount, "ar-SA", "SAR")}
          </span>
        </div>
      )}
      
      {remainingAmount > 0 && (
        <div className="flex justify-between font-bold text-red-600 text-lg border-t pt-2 mt-1">
          <span className="flex items-center">
            <DollarSign className="ml-1" size={18} />
            المتبقي
          </span>
          <span>
            {formatCurrency(remainingAmount, "ar-SA", "SAR")}
          </span>
        </div>
      )}
    </div>
  );
};

export default InvoiceSummary;
