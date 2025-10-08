
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Invoice } from "@/types";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

interface SummaryCardsProps {
  totalSales: number;
  filteredInvoices: Invoice[];
  isArabic: boolean;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalSales, filteredInvoices, isArabic }) => {
  // Calculate metrics by payment method
  const cashSales = filteredInvoices
    .filter(inv => inv.paymentMethod === 'cash' && inv.status !== 'refunded')
    .reduce((sum, inv) => sum + inv.total, 0);
    
  const cardSales = filteredInvoices
    .filter(inv => inv.paymentMethod === 'card' && inv.status !== 'refunded')
    .reduce((sum, inv) => sum + inv.total, 0);
    
  const transferSales = filteredInvoices
    .filter(inv => inv.paymentMethod === 'transfer' && inv.status !== 'refunded')
    .reduce((sum, inv) => sum + inv.total, 0);
  
  // Calculate average order value excluding refunded invoices
  const activeInvoices = filteredInvoices.filter(inv => inv.status !== "refunded");
  const averageOrderValue = activeInvoices.length > 0
    ? (activeInvoices.reduce((sum, invoice) => sum + invoice.total, 0) / activeInvoices.length).toFixed(2)
    : "0.00";
  
  // Calculate total items sold
  const totalItemsSold = filteredInvoices.reduce((sum, invoice) => {
    const multiplier = invoice.status === "refunded" ? -1 : 1;
    return sum + (multiplier * invoice.items.reduce((itemSum, item) => itemSum + item.quantity, 0));
  }, 0);
  
  return (
    <div className="space-y-4 mb-6">
      {/* Main Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              {isArabic ? "إجمالي المبيعات" : "Total Sales"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {totalSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {isArabic ? `${filteredInvoices.length} فاتورة` : `${filteredInvoices.length} invoices`}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              {isArabic ? "معدل قيمة الفاتورة" : "Average Order Value"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {averageOrderValue} {isArabic ? "ريال" : "SAR"}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {isArabic ? "متوسط قيمة الطلب" : "Average per order"}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-purple-600" />
              {isArabic ? "العناصر المباعة" : "Items Sold"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {totalItemsSold}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {isArabic ? "إجمالي العناصر" : "Total items"}
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
                {cashSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
              </div>
              <div className="text-xs text-green-600 mt-1">
                {((cashSales / totalSales) * 100 || 0).toFixed(1)}%
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-sm font-medium text-blue-800 mb-1">
                {isArabic ? "بطاقة" : "Card"}
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {cardSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
              </div>
              <div className="text-xs text-blue-600 mt-1">
                {((cardSales / totalSales) * 100 || 0).toFixed(1)}%
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-sm font-medium text-purple-800 mb-1">
                {isArabic ? "تحويل بنكي" : "Transfer"}
              </div>
              <div className="text-2xl font-bold text-purple-700">
                {transferSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
              </div>
              <div className="text-xs text-purple-600 mt-1">
                {((transferSales / totalSales) * 100 || 0).toFixed(1)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
