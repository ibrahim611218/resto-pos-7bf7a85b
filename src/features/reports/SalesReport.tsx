
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Download, Search } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { mockInvoices } from "@/features/invoices/data/mockInvoices";
import { Invoice } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { exportReportToPDF } from "@/utils/reports/export";
import { BarChart } from "@/components/ui/chart";

const SalesReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 30)));
  const [endDate, setEndDate] = useState<Date>(new Date());
  
  // Filter invoices based on date range
  const filteredInvoices = mockInvoices.filter(invoice => {
    const invoiceDate = new Date(invoice.date);
    return invoiceDate >= startDate && invoiceDate <= endDate;
  });
  
  // Calculate totals
  const totalSales = filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const totalTax = filteredInvoices.reduce((sum, invoice) => sum + invoice.taxAmount, 0);
  
  // Group by date for chart data
  const salesByDate = filteredInvoices.reduce((acc, invoice) => {
    const dateKey = format(new Date(invoice.date), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = 0;
    }
    acc[dateKey] += invoice.total;
    return acc;
  }, {} as Record<string, number>);
  
  // Create chart data
  const chartData = Object.keys(salesByDate).map(date => ({
    name: date,
    total: salesByDate[date],
  })).sort((a, b) => a.name.localeCompare(b.name)).slice(-10);
  
  const formatDate = (date: Date): string => {
    return format(date, 'dd/MM/yyyy', { locale: isArabic ? ar : undefined });
  };
  
  const handleExportPDF = () => {
    exportReportToPDF(
      filteredInvoices, 
      startDate, 
      endDate, 
      totalSales, 
      totalTax,
      language
    );
  };
  
  return (
    <div className="container p-4" dir={isArabic ? "rtl" : "ltr"}>
      <Card>
        <CardHeader>
          <CardTitle>{isArabic ? "تقرير المبيعات" : "Sales Report"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[250px]">
              <Label>{isArabic ? "من تاريخ" : "From Date"}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? formatDate(startDate) : isArabic ? "اختر تاريخ" : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex-1 min-w-[250px]">
              <Label>{isArabic ? "إلى تاريخ" : "To Date"}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? formatDate(endDate) : isArabic ? "اختر تاريخ" : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-end">
              <Button className="mb-px">
                <Search className="h-4 w-4 mr-2" />
                {isArabic ? "بحث" : "Search"}
              </Button>
            </div>
            
            <div className="flex items-end ml-auto">
              <Button variant="outline" onClick={handleExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                {isArabic ? "تصدير PDF" : "Export PDF"}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{totalSales.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? "إجمالي المبيعات" : "Total Sales"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{totalTax.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? "إجمالي الضريبة" : "Total Tax"}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <BarChart 
              data={chartData}
              index="name"
              categories={["total"]}
              yAxisWidth={48}
              className="h-[300px]"
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isArabic ? "رقم الفاتورة" : "Invoice #"}</TableHead>
                  <TableHead>{isArabic ? "التاريخ" : "Date"}</TableHead>
                  <TableHead>{isArabic ? "الكاشير" : "Cashier"}</TableHead>
                  <TableHead>{isArabic ? "المبلغ" : "Amount"}</TableHead>
                  <TableHead>{isArabic ? "الضريبة" : "Tax"}</TableHead>
                  <TableHead>{isArabic ? "الإجمالي" : "Total"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      {isArabic ? "لا توجد بيانات" : "No data available"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.number}</TableCell>
                      <TableCell>{formatDate(new Date(invoice.date))}</TableCell>
                      <TableCell>{invoice.cashierName}</TableCell>
                      <TableCell>{invoice.subtotal.toFixed(2)}</TableCell>
                      <TableCell>{invoice.taxAmount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReport;
