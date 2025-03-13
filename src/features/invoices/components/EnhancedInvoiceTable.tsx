
import React from "react";
import { FileTextIcon, PrinterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types";
import { formatCurrency } from "@/utils/invoice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EnhancedInvoiceTableProps {
  invoices: Invoice[];
  isArabic: boolean;
  formatInvoiceDate: (date: Date) => string;
  getStatusBadgeColor: (status: "completed" | "cancelled" | "refunded" | "pending") => string;
  viewInvoiceDetails: (id: string) => void;
  printInvoice: (invoice: Invoice) => void;
  filteredStatus?: "completed" | "refunded" | null;
}

const EnhancedInvoiceTable: React.FC<EnhancedInvoiceTableProps> = ({
  invoices,
  isArabic,
  formatInvoiceDate,
  getStatusBadgeColor,
  viewInvoiceDetails,
  printInvoice,
  filteredStatus
}) => {
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{isArabic ? "رقم الفاتورة" : "Invoice #"}</TableHead>
            <TableHead>{isArabic ? "التاريخ" : "Date"}</TableHead>
            <TableHead>{isArabic ? "العميل" : "Customer"}</TableHead>
            <TableHead>{isArabic ? "الإجمالي" : "Total"}</TableHead>
            {!filteredStatus && (
              <TableHead>{isArabic ? "الحالة" : "Status"}</TableHead>
            )}
            <TableHead className="text-right">{isArabic ? "الإجراءات" : "Actions"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.number}</TableCell>
              <TableCell>{formatInvoiceDate(invoice.date)}</TableCell>
              <TableCell>{invoice.customer?.name || "عميل عادي"}</TableCell>
              <TableCell>{formatCurrency(invoice.total, isArabic ? "ar-SA" : "en-US", "SAR")}</TableCell>
              {!filteredStatus && (
                <TableCell>
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
                </TableCell>
              )}
              <TableCell className="text-right">
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnhancedInvoiceTable;
