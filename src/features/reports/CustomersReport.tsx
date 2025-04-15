
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { exportToExcel } from "@/utils/reports";

// Mock customer data
const customersData = [
  { id: "cust-1", name: "محمد عبدالله", phone: "0555123456", email: "mohammed@example.com", invoiceCount: 5, totalSpent: 1200 },
  { id: "cust-2", name: "أحمد محمد", phone: "0555987654", email: "ahmed@example.com", invoiceCount: 3, totalSpent: 850, taxNumber: "300123456700003" },
  { id: "cust-3", name: "سارة خالد", phone: "0555111222", email: "sarah@example.com", invoiceCount: 7, totalSpent: 1550 },
  { id: "cust-4", name: "فاطمة علي", phone: "0555444555", email: "fatima@example.com", invoiceCount: 2, totalSpent: 450 },
  { id: "cust-5", name: "خالد عمر", phone: "0555666777", email: "khalid@example.com", invoiceCount: 4, totalSpent: 950 }
];

const CustomersReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [reportData] = useState(customersData);

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
      ? ["رقم", "اسم العميل", "رقم الهاتف", "البريد الإلكتروني", "عدد الفواتير", "إجمالي المشتريات", "الرقم الضريبي"]
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
                <TableHead>{isArabic ? "إجمالي المشتريات" : "Total Spent"}</TableHead>
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
