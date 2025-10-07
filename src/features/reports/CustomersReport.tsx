
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { exportToExcel } from "@/utils/reports";

import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import { useEffect, useMemo } from "react";
import { useReportsSync } from "@/hooks/useReportsSync";

interface CustomerData {
  id: string;
  name: string;
  phone: string;
  email: string;
  invoiceCount: number;
  totalSpent: number;
  taxNumber?: string;
}

const CustomersReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const { invoices, loadInvoicesFromStorage } = useInvoices();

  // Sync reports with invoices
  useReportsSync();

  useEffect(() => {
    loadInvoicesFromStorage();
  }, [loadInvoicesFromStorage]);
  
  // Listen for reports data updates
  useEffect(() => {
    const handleReportsUpdate = () => {
      loadInvoicesFromStorage();
    };
    
    window.addEventListener('reports-data-updated', handleReportsUpdate);
    return () => window.removeEventListener('reports-data-updated', handleReportsUpdate);
  }, [loadInvoicesFromStorage]);

  const reportData = useMemo(() => {
    const customerMap = new Map<string, CustomerData>();

    invoices.forEach(invoice => {
      if (invoice.customer && invoice.status !== 'cancelled') {
        const customerId = invoice.customer.taxNumber || invoice.customer.phone || invoice.customer.name;
        
        if (customerMap.has(customerId)) {
          const existing = customerMap.get(customerId)!;
          existing.invoiceCount += 1;
          existing.totalSpent += invoice.status === 'refunded' ? 0 : invoice.total;
        } else {
          customerMap.set(customerId, {
            id: customerId,
            name: invoice.customer.name,
            phone: invoice.customer.phone || "",
            email: invoice.customer.email || "",
            taxNumber: invoice.customer.taxNumber || "",
            invoiceCount: 1,
            totalSpent: invoice.status === 'refunded' ? 0 : invoice.total
          });
        }
      }
    });

    return Array.from(customerMap.values());
  }, [invoices]);

  const filteredData = searchTerm 
    ? reportData.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        customer.phone.includes(searchTerm) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.taxNumber && customer.taxNumber.includes(searchTerm))
      )
    : reportData;

  const handleExport = () => {
    const headers = isArabic 
      ? ["رقم", "اسم العميل", "رقم الهاتف", "البريد الإلكتروني", "عدد الفواتير", "إجمالي المبيعات", "الرقم الضريبي"]
      : ["ID", "Customer Name", "Phone", "Email", "Invoice Count", "Total Spent", "Tax Number"];
    
    const data = filteredData.map(item => [
      item.id,
      item.name,
      item.phone || "",
      item.email || "",
      item.invoiceCount.toString(),
      item.totalSpent.toString(),
      item.taxNumber || ""
    ]);
    
    exportToExcel({
      headers,
      data,
      fileName: 'customers_report',
      title: isArabic ? "تقرير العملاء" : "Customers Report",
      isArabic
    });
  };

  return (
    <div className="container p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isArabic ? "تقرير العملاء" : "Customers Report"}</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isArabic ? "بحث..." : "Search..."}
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleExport}>
              <FileDown className="h-4 w-4 mr-2" />
              {isArabic ? "تصدير" : "Export"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isArabic ? "اسم العميل" : "Customer Name"}</TableHead>
                <TableHead>{isArabic ? "رقم الهاتف" : "Phone"}</TableHead>
                <TableHead>{isArabic ? "البريد الإلكتروني" : "Email"}</TableHead>
                <TableHead>{isArabic ? "عدد الفواتير" : "Invoice Count"}</TableHead>
                <TableHead>{isArabic ? "إجمالي المبيعات" : "Total Spent"}</TableHead>
                <TableHead>{isArabic ? "الرقم الضريبي" : "Tax Number"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phone || "-"}</TableCell>
                  <TableCell>{customer.email || "-"}</TableCell>
                  <TableCell>{customer.invoiceCount}</TableCell>
                  <TableCell>{customer.totalSpent} ريال</TableCell>
                  <TableCell>{customer.taxNumber || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersReport;
