
import React from "react";
import { FileTextIcon, PrinterIcon, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types";
import { formatCurrency } from "@/utils/invoice";
import { toast } from "sonner";

interface InvoiceTableProps {
  invoices: Invoice[];
  isArabic: boolean;
  formatInvoiceDate: (date: string | Date) => string;
  getStatusBadgeColor: (status: "completed" | "cancelled" | "refunded" | "pending") => string;
  viewInvoiceDetails: (id: string) => void;
  printInvoice: (invoice: Invoice) => void;
  filteredStatus?: "completed" | "refunded" | null;
  onRefund?: (invoice: Invoice) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  isArabic,
  formatInvoiceDate,
  getStatusBadgeColor,
  viewInvoiceDetails,
  printInvoice,
  filteredStatus,
  onRefund
}) => {
  const handleRefund = (invoice: Invoice) => {
    if (invoice.status === "refunded") {
      toast.error(isArabic ? "تم استرداد هذه الفاتورة مسبقاً" : "This invoice has already been refunded");
      return;
    }
    if (onRefund) {
      onRefund(invoice);
    }
  };

  const filteredInvoices = filteredStatus
    ? invoices.filter(invoice => invoice.status === filteredStatus)
    : invoices;

  if (filteredInvoices.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {isArabic ? "لا توجد فواتير متطابقة مع البحث" : "No invoices found"}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-right py-3 px-4">{isArabic ? "رقم الفاتورة" : "Invoice #"}</th>
            <th className="text-right py-3 px-4">{isArabic ? "التاريخ" : "Date"}</th>
            <th className="text-right py-3 px-4">{isArabic ? "العميل" : "Customer"}</th>
            <th className="text-right py-3 px-4">{isArabic ? "الإجمالي" : "Total"}</th>
            {!filteredStatus && (
              <th className="text-right py-3 px-4">{isArabic ? "الحالة" : "Status"}</th>
            )}
            <th className="text-right py-3 px-4">{isArabic ? "الإجراءات" : "Actions"}</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b hover:bg-muted/50">
              <td className="py-3 px-4">{invoice.number}</td>
              <td className="py-3 px-4">{formatInvoiceDate(invoice.date)}</td>
              <td className="py-3 px-4">{invoice.customer?.name || "عميل عادي"}</td>
              <td className="py-3 px-4">{formatCurrency(invoice.total, isArabic ? "ar-SA" : "en-US", "SAR")}</td>
              {!filteredStatus && (
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-white text-xs ${getStatusBadgeColor(invoice.status)}`}>
                    {isArabic 
                      ? invoice.status === "completed" 
                        ? "مكتملة" 
                        : invoice.status === "cancelled" 
                          ? "ملغاة" 
                          : invoice.status === "pending"
                            ? "معلقة"
                            : "مستردة"
                      : invoice.status}
                  </span>
                </td>
              )}
              <td className="py-3 px-4">
                <div className="flex space-x-2 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => viewInvoiceDetails(invoice.id)}
                    className="h-8 px-2"
                  >
                    <FileTextIcon className="h-4 w-4" />
                    <span className="sr-only">
                      {isArabic ? "عرض" : "View"}
                    </span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => printInvoice(invoice)}
                    className="h-8 px-2"
                  >
                    <PrinterIcon className="h-4 w-4" />
                    <span className="sr-only">
                      {isArabic ? "طباعة" : "Print"}
                    </span>
                  </Button>
                  {onRefund && invoice.status !== "refunded" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRefund(invoice)}
                      className="h-8 px-2 text-red-500 hover:text-red-700"
                    >
                      <ReceiptText className="h-4 w-4" />
                      <span className="sr-only">
                        {isArabic ? "استرداد" : "Refund"}
                      </span>
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
