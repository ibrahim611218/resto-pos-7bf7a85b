
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileDown, Search, Plus, RefreshCw, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { exportToExcel } from "@/utils/reports";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  paymentMethod: string;
  notes?: string;
}

const ExpensesReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    try {
      const storedExpenses = localStorage.getItem('expenses');
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      } else {
        setExpenses([]);
      }
    } catch (error) {
      console.error("Error loading expenses:", error);
      setExpenses([]);
    }
  };

  const filteredData = useMemo(() => {
    let filtered = expenses;

    // Apply date range filter
    if (startDate) {
      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date);
        const from = startDate;
        const to = endDate || startDate;
        return expenseDate >= from && expenseDate <= to;
      });
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(expense => 
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
        expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [expenses, searchTerm, startDate, endDate]);

  const totalExpenses = useMemo(() => {
    return filteredData.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredData]);

  const handleExport = () => {
    const headers = isArabic 
      ? ["التاريخ", "الوصف", "التصنيف", "المبلغ", "طريقة الدفع", "ملاحظات"]
      : ["Date", "Description", "Category", "Amount", "Payment Method", "Notes"];
    
    const data = filteredData.map(item => [
      item.date,
      item.description,
      item.category,
      item.amount.toString(),
      item.paymentMethod,
      item.notes || ""
    ]);
    
    exportToExcel({
      headers,
      data,
      fileName: 'expenses_report',
      title: isArabic ? "تقرير المصروفات" : "Expenses Report",
      isArabic
    });
  };

  return (
    <div className="container p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isArabic ? "تقرير المصروفات" : "Expenses Report"}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={loadExpenses} title={isArabic ? "تحديث" : "Refresh"}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button onClick={handleExport}>
              <FileDown className="h-4 w-4 mr-2" />
              {isArabic ? "تصدير" : "Export"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isArabic ? "بحث..." : "Search..."}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[150px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? startDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US') : (isArabic ? "من تاريخ" : "From")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[150px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? endDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US') : (isArabic ? "إلى تاريخ" : "To")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mb-4 p-4 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                {isArabic ? "إجمالي المصروفات:" : "Total Expenses:"}
              </span>
              <span className="text-2xl font-bold text-primary">
                {totalExpenses.toFixed(2)} {isArabic ? "ريال" : "SAR"}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {isArabic ? `عدد المصروفات: ${filteredData.length}` : `Count: ${filteredData.length}`}
            </div>
          </div>

          {filteredData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {isArabic ? "لا توجد مصروفات" : "No expenses found"}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isArabic ? "التاريخ" : "Date"}</TableHead>
                  <TableHead>{isArabic ? "الوصف" : "Description"}</TableHead>
                  <TableHead>{isArabic ? "التصنيف" : "Category"}</TableHead>
                  <TableHead>{isArabic ? "المبلغ" : "Amount"}</TableHead>
                  <TableHead>{isArabic ? "طريقة الدفع" : "Payment Method"}</TableHead>
                  <TableHead>{isArabic ? "ملاحظات" : "Notes"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{new Date(expense.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell className="font-semibold">{expense.amount.toFixed(2)} {isArabic ? "ريال" : "SAR"}</TableCell>
                    <TableCell>{expense.paymentMethod}</TableCell>
                    <TableCell>{expense.notes || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesReport;
