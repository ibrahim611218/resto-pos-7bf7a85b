
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockInvoices } from "@/features/invoices/data/mockInvoices";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { SalesByPaymentMethod, SalesByOrderType, TopSellingProduct, SalesByTimeFrame } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePdf, Printer } from "lucide-react";

const SalesReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);
  const [orderType, setOrderType] = useState<string | undefined>(undefined);
  const [cashier, setCashier] = useState<string | undefined>(undefined);
  
  // Process invoices based on filters
  const filteredInvoices = useMemo(() => {
    return mockInvoices.filter((invoice) => {
      let match = true;
      
      if (startDate) {
        match = match && new Date(invoice.date) >= startDate;
      }
      
      if (endDate) {
        match = match && new Date(invoice.date) <= endDate;
      }
      
      if (paymentMethod) {
        match = match && invoice.paymentMethod === paymentMethod;
      }
      
      if (orderType && invoice.orderType) {
        match = match && invoice.orderType === orderType;
      }
      
      if (cashier) {
        match = match && invoice.cashierId === cashier;
      }
      
      return match;
    });
  }, [startDate, endDate, paymentMethod, orderType, cashier]);
  
  // Calculate total sales
  const totalSales = useMemo(() => {
    return filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
  }, [filteredInvoices]);
  
  // Calculate sales by payment method
  const salesByPaymentMethod: SalesByPaymentMethod[] = useMemo(() => {
    const methodsMap: Map<string, number> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      const method = invoice.paymentMethod;
      const currentAmount = methodsMap.get(method) || 0;
      methodsMap.set(method, currentAmount + invoice.total);
    });
    
    const result: SalesByPaymentMethod[] = [];
    methodsMap.forEach((amount, method) => {
      const methodLabel = method === "cash" 
        ? (isArabic ? "نقدي" : "Cash") 
        : method === "card" 
          ? (isArabic ? "بطاقة" : "Card")
          : method;
      
      result.push({
        paymentMethod: methodLabel,
        amount,
        percentage: totalSales > 0 ? (amount / totalSales) * 100 : 0
      });
    });
    
    return result;
  }, [filteredInvoices, totalSales, isArabic]);
  
  // Calculate sales by order type
  const salesByOrderType: SalesByOrderType[] = useMemo(() => {
    const typesMap: Map<string, number> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      const type = invoice.orderType || "unknown";
      const currentCount = typesMap.get(type) || 0;
      typesMap.set(type, currentCount + 1);
    });
    
    const result: SalesByOrderType[] = [];
    typesMap.forEach((count, type) => {
      const typeLabel = type === "takeaway" 
        ? (isArabic ? "سفري" : "Takeaway") 
        : type === "dineIn" 
          ? (isArabic ? "محلي" : "Dine In")
          : (isArabic ? "غير محدد" : "Unknown");
      
      result.push({
        orderType: typeLabel,
        count,
        percentage: filteredInvoices.length > 0 ? (count / filteredInvoices.length) * 100 : 0
      });
    });
    
    return result;
  }, [filteredInvoices, isArabic]);
  
  // Get top selling products
  const topSellingProducts: TopSellingProduct[] = useMemo(() => {
    const productsMap: Map<string, { name: string, quantity: number, revenue: number }> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      invoice.items.forEach((item) => {
        const currentProduct = productsMap.get(item.productId) || { 
          name: item.name, 
          quantity: 0, 
          revenue: 0 
        };
        
        productsMap.set(item.productId, {
          name: item.nameAr && isArabic ? item.nameAr : item.name,
          quantity: currentProduct.quantity + item.quantity,
          revenue: currentProduct.revenue + (item.price * item.quantity)
        });
      });
    });
    
    const productsArray: TopSellingProduct[] = [];
    productsMap.forEach((product, productId) => {
      productsArray.push({
        productId,
        productName: product.name,
        quantity: product.quantity,
        revenue: product.revenue
      });
    });
    
    // Sort by revenue and take top 5
    return productsArray
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredInvoices, isArabic]);
  
  // Define chart colors
  const CHART_COLORS = [
    "#10B981", // Green
    "#3B82F6", // Blue
    "#F59E0B", // Yellow
    "#EF4444", // Red
    "#8B5CF6", // Purple
  ];
  
  const resetFilters = () => {
    setStartDate(new Date(new Date().setDate(new Date().getDate() - 30)));
    setEndDate(new Date());
    setPaymentMethod(undefined);
    setOrderType(undefined);
    setCashier(undefined);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="container p-4" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isArabic ? "تقرير المبيعات" : "Sales Report"}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            {isArabic ? "طباعة" : "Print"}
          </Button>
          <Button>
            <FilePdf className="h-4 w-4 mr-2" />
            {isArabic ? "تصدير PDF" : "Export PDF"}
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
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
            <div className="space-y-2">
              <Label>
                {isArabic ? "طريقة الدفع" : "Payment Method"}
              </Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder={isArabic ? "جميع طرق الدفع" : "All payment methods"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? "جميع طرق الدفع" : "All payment methods"}</SelectItem>
                  <SelectItem value="cash">{isArabic ? "نقدي" : "Cash"}</SelectItem>
                  <SelectItem value="card">{isArabic ? "بطاقة" : "Card"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>
                {isArabic ? "نوع الطلب" : "Order Type"}
              </Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger>
                  <SelectValue placeholder={isArabic ? "جميع أنواع الطلبات" : "All order types"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? "جميع أنواع الطلبات" : "All order types"}</SelectItem>
                  <SelectItem value="takeaway">{isArabic ? "سفري" : "Takeaway"}</SelectItem>
                  <SelectItem value="dineIn">{isArabic ? "محلي" : "Dine In"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>
                {isArabic ? "الكاشير" : "Cashier"}
              </Label>
              <Select value={cashier} onValueChange={setCashier}>
                <SelectTrigger>
                  <SelectValue placeholder={isArabic ? "جميع الكاشيرية" : "All cashiers"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? "جميع الكاشيرية" : "All cashiers"}</SelectItem>
                  <SelectItem value="1">{isArabic ? "أحمد محمد" : "Ahmed Mohamed"}</SelectItem>
                  <SelectItem value="2">{isArabic ? "محمد علي" : "Mohamed Ali"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={resetFilters} className="w-full">
                {isArabic ? "إعادة تعيين الفلاتر" : "Reset Filters"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">
              {isArabic ? "إجمالي المبيعات" : "Total Sales"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalSales.toFixed(2)} {isArabic ? "ريال" : "SAR"}</div>
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
              {filteredInvoices.length > 0 
                ? (totalSales / filteredInvoices.length).toFixed(2) 
                : "0.00"} {isArabic ? "ريال" : "SAR"}
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
              {filteredInvoices.reduce((sum, invoice) => 
                sum + invoice.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">
              {isArabic ? "إجمالي العناصر" : "Total items"}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="charts" className="w-full mb-6">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-4">
          <TabsTrigger value="charts">
            {isArabic ? "الرسوم البيانية" : "Charts"}
          </TabsTrigger>
          <TabsTrigger value="products">
            {isArabic ? "المنتجات الأكثر مبيعاً" : "Top Products"}
          </TabsTrigger>
          <TabsTrigger value="invoices">
            {isArabic ? "الفواتير" : "Invoices"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isArabic ? "المبيعات حسب طريقة الدفع" : "Sales by Payment Method"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByPaymentMethod}
                        dataKey="amount"
                        nameKey="paymentMethod"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ paymentMethod, percentage }) => `${paymentMethod}: ${percentage.toFixed(1)}%`}
                      >
                        {salesByPaymentMethod.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => [`${value.toFixed(2)} ${isArabic ? "ريال" : "SAR"}`, ""]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {isArabic ? "الطلبات حسب النوع" : "Orders by Type"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByOrderType}
                        dataKey="count"
                        nameKey="orderType"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ orderType, percentage }) => `${orderType}: ${percentage.toFixed(1)}%`}
                      >
                        {salesByOrderType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>
                {isArabic ? "المنتجات الأكثر مبيعاً" : "Top Selling Products"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topSellingProducts}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="productName" 
                      angle={-45} 
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`${value}`, ""]} />
                    <Legend />
                    <Bar dataKey="quantity" name={isArabic ? "الكمية" : "Quantity"} fill="#10B981" />
                    <Bar dataKey="revenue" name={isArabic ? "الإيرادات" : "Revenue"} fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isArabic ? "المنتج" : "Product"}</TableHead>
                      <TableHead className="text-right">{isArabic ? "الكمية" : "Quantity"}</TableHead>
                      <TableHead className="text-right">{isArabic ? "الإيرادات" : "Revenue"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topSellingProducts.map((product) => (
                      <TableRow key={product.productId}>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell className="text-right">{product.quantity}</TableCell>
                        <TableCell className="text-right">{product.revenue.toFixed(2)} {isArabic ? "ريال" : "SAR"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices">
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
                      <TableHead className="text-right">{isArabic ? "المبلغ" : "Amount"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.number}</TableCell>
                        <TableCell>
                          {new Date(invoice.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US")}
                        </TableCell>
                        <TableCell>
                          {invoice.paymentMethod === "cash" 
                            ? (isArabic ? "نقدي" : "Cash") 
                            : invoice.paymentMethod === "card" 
                              ? (isArabic ? "بطاقة" : "Card")
                              : invoice.paymentMethod}
                        </TableCell>
                        <TableCell>
                          {invoice.orderType === "takeaway" 
                            ? (isArabic ? "سفري" : "Takeaway") 
                            : invoice.orderType === "dineIn" 
                              ? (isArabic ? "محلي" : "Dine In")
                              : (isArabic ? "غير محدد" : "Unknown")}
                        </TableCell>
                        <TableCell className="text-right">
                          {invoice.total.toFixed(2)} {isArabic ? "ريال" : "SAR"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Saudi decoration for theme */}
      <div className="saudi-decoration"></div>
      <div className="saudi-decoration-top"></div>
    </div>
  );
};

export default SalesReport;
