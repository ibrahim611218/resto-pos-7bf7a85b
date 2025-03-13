
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatPaymentMethod, formatOrderType, formatOrderStatus } from "../utils/formatters";
import { Invoice } from "@/types";

interface InvoicesListProps {
  filteredInvoices: Invoice[];
  isArabic: boolean;
}

const InvoicesList: React.FC<InvoicesListProps> = ({ filteredInvoices, isArabic }) => {
  // قسم الفواتير إلى مكتملة ومسترجعة
  const completedInvoices = filteredInvoices.filter(inv => inv.status !== "refunded");
  const refundedInvoices = filteredInvoices.filter(inv => inv.status === "refunded");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isArabic ? "قائمة الفواتير" : "Invoices List"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isArabic ? "رقم الفاتورة" : "Invoice #"}</TableHead>
                <TableHead>{isArabic ? "التاريخ" : "Date"}</TableHead>
                <TableHead>{isArabic ? "طريقة الدفع" : "Payment Method"}</TableHead>
                <TableHead>{isArabic ? "نوع الطلب" : "Order Type"}</TableHead>
                <TableHead>{isArabic ? "الحالة" : "Status"}</TableHead>
                <TableHead className="text-right">{isArabic ? "المبلغ" : "Amount"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* عرض الفواتير المكتملة أولاً */}
              {completedInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.number}</TableCell>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US")}
                  </TableCell>
                  <TableCell>
                    {formatPaymentMethod(invoice.paymentMethod, isArabic)}
                  </TableCell>
                  <TableCell>
                    {formatOrderType(invoice.orderType, isArabic)}
                  </TableCell>
                  <TableCell>
                    <span className="text-green-500">{isArabic ? "مكتمل" : "Completed"}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    {invoice.total.toFixed(2)} {isArabic ? "ريال" : "SAR"}
                  </TableCell>
                </TableRow>
              ))}
              
              {/* عرض الفواتير المسترجعة بعد ذلك */}
              {refundedInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="bg-red-50">
                  <TableCell>{invoice.number}</TableCell>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US")}
                  </TableCell>
                  <TableCell>
                    {formatPaymentMethod(invoice.paymentMethod, isArabic)}
                  </TableCell>
                  <TableCell>
                    {formatOrderType(invoice.orderType, isArabic)}
                  </TableCell>
                  <TableCell>
                    <span className="text-red-500">{isArabic ? "مسترجع" : "Refunded"}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    0.00 {isArabic ? "ريال" : "SAR"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoicesList;
