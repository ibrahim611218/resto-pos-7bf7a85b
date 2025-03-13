
import React, { useState, useMemo, useEffect } from "react";
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
import { FileText, Printer, Download } from "lucide-react";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const SalesReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { invoices } = useInvoices();
  const [uniqueUsers, setUniqueUsers] = useState<{id: string, name: string}[]>([]);
  
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);
  const [orderType, setOrderType] = useState<string | undefined>(undefined);
  const [cashier, setCashier] = useState<string | undefined>(undefined);
  const [includeRefunded, setIncludeRefunded] = useState<boolean>(true);
  
  const allInvoices = useMemo(() => {
    return invoices.length > 0 ? invoices : mockInvoices;
  }, [invoices]);
  
  useEffect(() => {
    const users = new Map<string, {id: string, name: string}>();
    
    allInvoices.forEach(invoice => {
      if (invoice.cashierId && invoice.cashierName) {
        users.set(invoice.cashierId, {
          id: invoice.cashierId,
          name: invoice.cashierName
        });
      }
    });
    
    setUniqueUsers(Array.from(users.values()));
  }, [allInvoices]);
  
  const filteredInvoices = useMemo(() => {
    return allInvoices.filter((invoice) => {
      let match = true;
      
      if (startDate) {
        const invoiceDate = new Date(invoice.date);
        match = match && invoiceDate >= startDate;
      }
      
      if (endDate) {
        const invoiceDate = new Date(invoice.date);
        match = match && invoiceDate <= endDate;
      }
      
      if (paymentMethod && paymentMethod !== "all") {
        match = match && invoice.paymentMethod === paymentMethod;
      }
      
      if (orderType && orderType !== "all" && invoice.orderType) {
        match = match && invoice.orderType === orderType;
      }
      
      if (cashier && cashier !== "all") {
        match = match && invoice.cashierId === cashier;
      }
      
      // إذا كان خيار تضمين الفواتير المستردة غير مفعل، نستبعد الفواتير ذات الحالة "refunded"
      if (!includeRefunded && invoice.status === "refunded") {
        match = false;
      }
      
      return match;
    });
  }, [allInvoices, startDate, endDate, paymentMethod, orderType, cashier, includeRefunded]);
  
  const totalSales = useMemo(() => {
    return filteredInvoices.reduce((sum, invoice) => {
      // عند حساب إجمالي المبيعات، يجب خصم قيم الفواتير المستردة
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      return sum + (invoice.total * multiplier);
    }, 0);
  }, [filteredInvoices]);
  
  const salesByPaymentMethod: SalesByPaymentMethod[] = useMemo(() => {
    const methodsMap: Map<string, number> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      const method = invoice.paymentMethod;
      const currentAmount = methodsMap.get(method) || 0;
      
      // عند حساب المبيعات حسب طريقة الدفع، يجب خصم قيم الفواتير المستردة
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      methodsMap.set(method, currentAmount + (invoice.total * multiplier));
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
        amount: Math.abs(amount), // استخدام القيمة المطلقة للمخطط
        percentage: totalSales > 0 ? (Math.abs(amount) / Math.abs(totalSales)) * 100 : 0
      });
    });
    
    return result;
  }, [filteredInvoices, totalSales, isArabic]);
  
  const salesByOrderType: SalesByOrderType[] = useMemo(() => {
    const typesMap: Map<string, { count: number, total: number }> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      const type = invoice.orderType || "unknown";
      const current = typesMap.get(type) || { count: 0, total: 0 };
      
      // عند حساب عدد الطلبات حسب النوع، نحسب الفواتير المستردة كطلبات سالبة
      const countMultiplier = invoice.status === "refunded" ? -1 : 1;
      const totalMultiplier = invoice.status === "refunded" ? -1 : 1;
      
      typesMap.set(type, { 
        count: current.count + countMultiplier,
        total: current.total + (invoice.total * totalMultiplier)
      });
    });
    
    const result: SalesByOrderType[] = [];
    typesMap.forEach(({ count, total }, type) => {
      const typeLabel = type === "takeaway" 
        ? (isArabic ? "سفري" : "Takeaway") 
        : type === "dineIn" 
          ? (isArabic ? "محلي" : "Dine In")
          : (isArabic ? "غير محدد" : "Unknown");
      
      result.push({
        orderType: typeLabel,
        count: Math.abs(count),
        percentage: filteredInvoices.length > 0 ? (Math.abs(count) / filteredInvoices.length) * 100 : 0,
        total: Math.abs(total)
      });
    });
    
    return result;
  }, [filteredInvoices, isArabic]);
  
  const topSellingProducts: TopSellingProduct[] = useMemo(() => {
    const productsMap: Map<string, { name: string, quantity: number, revenue: number }> = new Map();
    
    filteredInvoices.forEach((invoice) => {
      // حساب المضاعف بناءً على حالة الفاتورة
      const multiplier = invoice.status === "refunded" ? -1 : 1;
      
      invoice.items.forEach((item) => {
        const currentProduct = productsMap.get(item.productId) || { 
          name: item.name, 
          quantity: 0, 
          revenue: 0 
        };
        
        productsMap.set(item.productId, {
          name: item.nameAr && isArabic ? item.nameAr : item.name,
          quantity: currentProduct.quantity + (item.quantity * multiplier),
          revenue: currentProduct.revenue + (item.price * item.quantity * multiplier)
        });
      });
    });
    
    const productsArray: TopSellingProduct[] = [];
    productsMap.forEach((product, productId) => {
      if (product.quantity > 0) { // نضيف فقط المنتجات ذات الكميات الموجبة
        productsArray.push({
          productId,
          productName: product.name,
          quantity: product.quantity,
          revenue: product.revenue
        });
      }
    });
    
    return productsArray
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredInvoices, isArabic]);
  
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
    setIncludeRefunded(true);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  // تصدير التقرير كملف PDF
  const handleExportPDF = () => {
    const doc = new jsPDF(isArabic ? "p" : "p", "mm", "a4");
    
    // إضافة عنوان التقرير
    doc.setFontSize(18);
    const title = isArabic ? "تقرير المبيعات" : "Sales Report";
    doc.text(title, isArabic ? 170 : 20, 20, isArabic ? { align: "right" } : undefined);
    
    doc.setFontSize(12);
    const dateRange = `${isArabic ? "من" : "From"}: ${startDate?.toLocaleDateString()} ${isArabic ? "إلى" : "To"}: ${endDate?.toLocaleDateString()}`;
    doc.text(dateRange, isArabic ? 170 : 20, 30, isArabic ? { align: "right" } : undefined);
    
    // إضافة ملخص المبيعات
    doc.setFontSize(14);
    doc.text(isArabic ? "ملخص المبيعات" : "Sales Summary", isArabic ? 170 : 20, 40, isArabic ? { align: "right" } : undefined);
    
    // إضافة جدول المبيعات
    const tableData = filteredInvoices.map((invoice, index) => {
      const invDate = new Date(invoice.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US");
      const status = invoice.status === "refunded" ? (isArabic ? "مسترجع" : "Refunded") : (isArabic ? "مكتمل" : "Completed");
      
      return [
        (index + 1).toString(),
        invoice.number,
        invDate,
        invoice.status === "refunded" ? (isArabic ? "مسترجع" : "Refunded") : (isArabic ? "مكتمل" : "Completed"),
        invoice.paymentMethod,
        invoice.orderType || "-",
        invoice.total.toFixed(2)
      ];
    });
    
    // إنشاء الجدول مع autoTable
    // @ts-ignore - jspdf-autotable إضافة غير مدعومة في TypeScript
    doc.autoTable({
      startY: 50,
      head: [[
        "#",
        isArabic ? "رقم الفاتورة" : "Invoice",
        isArabic ? "التاريخ" : "Date",
        isArabic ? "الحالة" : "Status",
        isArabic ? "طريقة الدفع" : "Payment",
        isArabic ? "نوع الطلب" : "Order Type",
        isArabic ? "المبلغ" : "Amount"
      ]],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
      styles: { 
        font: 'helvetica',
        halign: isArabic ? 'right' : 'left',
        textColor: [0, 0, 0]
      },
      margin: { top: 50 }
    });
    
    // إجمالي المبيعات
    // @ts-ignore
    const finalY = doc.lastAutoTable.finalY || 150;
    doc.setFontSize(14);
    const totalText = `${isArabic ? "إجمالي المبيعات" : "Total Sales"}: ${totalSales.toFixed(2)} ${isArabic ? "ريال" : "SAR"}`;
    doc.text(totalText, isArabic ? 170 : 20, finalY + 10, isArabic ? { align: "right" } : undefined);
    
    // تصدير الملف
    doc.save("sales_report.pdf");
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
          <Button onClick={handleExportPDF}>
            <FileText className="h-4 w-4 mr-2" />
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
                {isArabic ? "المستخدم" : "User"}
              </Label>
              <Select value={cashier} onValueChange={setCashier}>
                <SelectTrigger>
                  <SelectValue placeholder={isArabic ? "جميع المستخدمين" : "All users"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isArabic ? "جميع المستخدمين" : "All users"}</SelectItem>
                  {uniqueUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>
                {isArabic ? "الفواتير المستردة" : "Refunded Invoices"}
              </Label>
              <Select 
                value={includeRefunded ? "include" : "exclude"} 
                onValueChange={(val) => setIncludeRefunded(val === "include")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="include">
                    {isArabic ? "تضمين الفواتير المستردة" : "Include refunded"}
                  </SelectItem>
                  <SelectItem value="exclude">
                    {isArabic ? "استبعاد الفواتير المستردة" : "Exclude refunded"}
                  </SelectItem>
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
              {filteredInvoices.length > 0 
                ? (filteredInvoices.reduce((sum, invoice) => {
                    const multiplier = invoice.status === "refunded" ? 0 : 1; // لا نعتبر الفواتير المستردة
                    return sum + (invoice.total * multiplier);
                  }, 0) / filteredInvoices.filter(inv => inv.status !== "refunded").length).toFixed(2) 
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
              {filteredInvoices.reduce((sum, invoice) => {
                const multiplier = invoice.status === "refunded" ? -1 : 1;
                return sum + (multiplier * invoice.items.reduce((itemSum, item) => itemSum + item.quantity, 0));
              }, 0)}
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
                      <TableHead>{isArabic ? "الحالة" : "Status"}</TableHead>
                      <TableHead className="text-right">{isArabic ? "المبلغ" : "Amount"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id} className={invoice.status === "refunded" ? "bg-red-50" : ""}>
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
                        <TableCell>
                          {invoice.status === "refunded" 
                            ? <span className="text-red-500">{isArabic ? "مسترجع" : "Refunded"}</span>
                            : <span className="text-green-500">{isArabic ? "مكتمل" : "Completed"}</span>
                          }
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
      
      <div className="saudi-decoration"></div>
      <div className="saudi-decoration-top"></div>
    </div>
  );
};

export default SalesReport;
