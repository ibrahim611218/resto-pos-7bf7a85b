
import React, { useState, useMemo, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Invoice } from "@/types";
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";

interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  paymentMethod: string;
  notes?: string;
}

const FinancialReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { invoices, loadInvoicesFromStorage } = useInvoices();
  
  // Set default dates to today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  
  const [startDate, setStartDate] = useState<Date | undefined>(today);
  const [endDate, setEndDate] = useState<Date | undefined>(endOfToday);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load data on mount
  useEffect(() => {
    loadInvoicesFromStorage();
    
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
    
    // Listen for updates
    const handleUpdate = () => {
      loadInvoicesFromStorage();
      const updatedExpenses = localStorage.getItem("expenses");
      if (updatedExpenses) {
        setExpenses(JSON.parse(updatedExpenses));
      }
    };
    
    window.addEventListener("expense-added", handleUpdate);
    window.addEventListener("invoice-created", handleUpdate);
    window.addEventListener("invoice-updated", handleUpdate);
    
    return () => {
      window.removeEventListener("expense-added", handleUpdate);
      window.removeEventListener("invoice-created", handleUpdate);
      window.removeEventListener("invoice-updated", handleUpdate);
    };
  }, [loadInvoicesFromStorage]);

  // Calculate financial metrics
  const financialData = useMemo(() => {
    // Filter invoices by date
    const filteredInvoices = invoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.date);
      let match = true;
      
      if (startDate) {
        match = match && invoiceDate >= startDate;
      }
      
      if (endDate) {
        match = match && invoiceDate <= endDate;
      }
      
      return match;
    });

    // Calculate total sales (excluding refunded)
    const totalSales = filteredInvoices
      .filter(inv => inv.status !== "refunded")
      .reduce((sum, inv) => sum + inv.total, 0);

    // Calculate sales by payment method
    const cashSales = filteredInvoices
      .filter(inv => inv.paymentMethod === 'cash' && inv.status !== 'refunded')
      .reduce((sum, inv) => sum + inv.total, 0);
      
    const cardSales = filteredInvoices
      .filter(inv => inv.paymentMethod === 'card' && inv.status !== 'refunded')
      .reduce((sum, inv) => sum + inv.total, 0);
      
    const transferSales = filteredInvoices
      .filter(inv => inv.paymentMethod === 'transfer' && inv.status !== 'refunded')
      .reduce((sum, inv) => sum + inv.total, 0);

    // Filter expenses by date
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      let match = true;
      
      if (startDate) {
        match = match && expenseDate >= startDate;
      }
      
      if (endDate) {
        match = match && expenseDate <= endDate;
      }
      
      return match;
    });

    // Calculate total expenses
    const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate net profit
    const netProfit = totalSales - totalExpenses;

    return {
      totalSales,
      totalExpenses,
      netProfit,
      cashSales,
      cardSales,
      transferSales,
      invoiceCount: filteredInvoices.filter(inv => inv.status !== "refunded").length,
      expenseCount: filteredExpenses.length
    };
  }, [invoices, expenses, startDate, endDate]);

  const resetFilters = () => {
    const resetToday = new Date();
    resetToday.setHours(0, 0, 0, 0);
    
    const resetEndOfToday = new Date();
    resetEndOfToday.setHours(23, 59, 59, 999);
    
    setStartDate(resetToday);
    setEndDate(resetEndOfToday);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {isArabic ? "التقرير المالي الشامل" : "Comprehensive Financial Report"}
        </h1>
      </div>

      {/* Date Filter */}
      <Card>
        <CardHeader>
          <CardTitle>
            {isArabic ? "تصفية البيانات" : "Filter Data"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>
                {isArabic ? "من تاريخ" : "Start Date"}
              </Label>
              <DatePicker
                selected={startDate}
                onSelect={setStartDate}
                placeholderText={isArabic ? "اختر تاريخ البداية" : "Select start date"}
              />
            </div>
            <div className="space-y-2">
              <Label>
                {isArabic ? "إلى تاريخ" : "End Date"}
              </Label>
              <DatePicker
                selected={endDate}
                onSelect={setEndDate}
                placeholderText={isArabic ? "اختر تاريخ النهاية" : "Select end date"}
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters} className="w-full">
                {isArabic ? "إعادة تعيين الفلاتر" : "Reset Filters"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              {isArabic ? "إجمالي المبيعات" : "Total Sales"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {financialData.totalSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {isArabic ? `${financialData.invoiceCount} فاتورة` : `${financialData.invoiceCount} invoices`}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              {isArabic ? "إجمالي المصروفات" : "Total Expenses"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {financialData.totalExpenses.toFixed(2)} {isArabic ? "ريال" : "SAR"}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {isArabic ? `${financialData.expenseCount} مصروف` : `${financialData.expenseCount} expenses`}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              {isArabic ? "صافي الربح" : "Net Profit"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${financialData.netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {financialData.netProfit.toFixed(2)} {isArabic ? "ريال" : "SAR"}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {isArabic ? "بعد خصم المصروفات" : "After expenses"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wallet className="h-4 w-4 text-purple-600" />
              {isArabic ? "هامش الربح" : "Profit Margin"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {financialData.totalSales > 0 
                ? ((financialData.netProfit / financialData.totalSales) * 100).toFixed(1)
                : "0.0"}%
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {isArabic ? "نسبة الربح" : "Profit percentage"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Breakdown */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">
            {isArabic ? "المبيعات حسب طريقة الدفع" : "Sales by Payment Method"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="text-sm font-medium text-green-800 mb-1">
                {isArabic ? "نقدي" : "Cash"}
              </div>
              <div className="text-2xl font-bold text-green-700">
                {financialData.cashSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
              </div>
              <div className="text-xs text-green-600 mt-1">
                {financialData.totalSales > 0 
                  ? ((financialData.cashSales / financialData.totalSales) * 100).toFixed(1)
                  : "0.0"}%
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-sm font-medium text-blue-800 mb-1">
                {isArabic ? "بطاقة" : "Card"}
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {financialData.cardSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
              </div>
              <div className="text-xs text-blue-600 mt-1">
                {financialData.totalSales > 0 
                  ? ((financialData.cardSales / financialData.totalSales) * 100).toFixed(1)
                  : "0.0"}%
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-sm font-medium text-purple-800 mb-1">
                {isArabic ? "تحويل بنكي" : "Transfer"}
              </div>
              <div className="text-2xl font-bold text-purple-700">
                {financialData.transferSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
              </div>
              <div className="text-xs text-purple-600 mt-1">
                {financialData.totalSales > 0 
                  ? ((financialData.transferSales / financialData.totalSales) * 100).toFixed(1)
                  : "0.0"}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              {isArabic ? "تفاصيل المبيعات" : "Sales Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">{isArabic ? "نقدي" : "Cash"}</span>
                <span className="font-bold text-green-700">
                  {financialData.cashSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">{isArabic ? "بطاقة" : "Card"}</span>
                <span className="font-bold text-blue-700">
                  {financialData.cardSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">{isArabic ? "تحويل بنكي" : "Transfer"}</span>
                <span className="font-bold text-purple-700">
                  {financialData.transferSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg border-2 border-green-300">
                <span className="font-bold">{isArabic ? "الإجمالي" : "Total"}</span>
                <span className="font-bold text-xl text-green-700">
                  {financialData.totalSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              {isArabic ? "الملخص المالي" : "Financial Summary"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="font-medium text-green-800">{isArabic ? "المبيعات" : "Sales"}</span>
                <span className="font-bold text-green-700">
                  +{financialData.totalSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <span className="font-medium text-red-800">{isArabic ? "المصروفات" : "Expenses"}</span>
                <span className="font-bold text-red-700">
                  -{financialData.totalExpenses.toFixed(2)} {isArabic ? "ريال" : "SAR"}
                </span>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-lg border-2 ${
                financialData.netProfit >= 0 
                  ? 'bg-blue-100 border-blue-300' 
                  : 'bg-red-100 border-red-300'
              }`}>
                <span className="font-bold">{isArabic ? "صافي الربح" : "Net Profit"}</span>
                <span className={`font-bold text-xl ${
                  financialData.netProfit >= 0 ? 'text-blue-700' : 'text-red-700'
                }`}>
                  {financialData.netProfit.toFixed(2)} {isArabic ? "ريال" : "SAR"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialReport;
