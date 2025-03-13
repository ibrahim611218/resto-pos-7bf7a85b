
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Invoice } from "@/types";

interface SummaryCardsProps {
  totalSales: number;
  filteredInvoices: Invoice[];
  isArabic: boolean;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalSales, filteredInvoices, isArabic }) => {
  // Calculate average order value excluding refunded invoices
  const averageOrderValue = filteredInvoices.length > 0
    ? (filteredInvoices.reduce((sum, invoice) => {
        const multiplier = invoice.status === "refunded" ? 0 : 1; // Don't count refunded invoices
        return sum + (invoice.total * multiplier);
      }, 0) / filteredInvoices.filter(inv => inv.status !== "refunded").length).toFixed(2)
    : "0.00";
  
  // Calculate total items sold
  const totalItemsSold = filteredInvoices.reduce((sum, invoice) => {
    const multiplier = invoice.status === "refunded" ? -1 : 1;
    return sum + (multiplier * invoice.items.reduce((itemSum, item) => itemSum + item.quantity, 0));
  }, 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">
            {isArabic ? "إجمالي المبيعات" : "Total Sales"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {totalSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}
          </div>
          <div className="text-sm text-muted-foreground">
            {isArabic ? `${filteredInvoices.length} فاتورة` : `${filteredInvoices.length} invoices`}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">
            {isArabic ? "معدل قيمة الفاتورة" : "Average Order Value"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {averageOrderValue} {isArabic ? "ريال" : "SAR"}
          </div>
          <div className="text-sm text-muted-foreground">
            {isArabic ? "متوسط قيمة الطلب" : "Average per order"}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">
            {isArabic ? "العناصر المباعة" : "Items Sold"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {totalItemsSold}
          </div>
          <div className="text-sm text-muted-foreground">
            {isArabic ? "إجمالي العناصر" : "Total items"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
