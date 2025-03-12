
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Menu } from "lucide-react";

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const SalesReport: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  return (
    <div className="single-page-layout" dir={isArabic ? "rtl" : "ltr"}>
      <div className="single-page-header flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon"
            className="mr-2"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">
            {isArabic ? "تقارير المبيعات" : "Sales Reports"}
          </h1>
        </div>
      </div>
      
      <div className="single-page-content">
        {/* Sidebar */}
        <div 
          className={`sidebar-container ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}
          style={{
            width: sidebarVisible ? '240px' : '0',
            transition: 'width 0.3s ease'
          }}
        >
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4">
              <h2 className="text-xl font-bold mb-4 centered-text">
                {isArabic ? "فلترة التقارير" : "Report Filters"}
              </h2>
              
              <ul className="space-y-3">
                <li className="sidebar-item">
                  {isArabic ? "اليومية" : "Daily"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "الأسبوعية" : "Weekly"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "الشهرية" : "Monthly"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "السنوية" : "Yearly"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "حسب المنتج" : "By Product"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "حسب الفئة" : "By Category"}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div 
          className="single-page-main"
          style={{
            marginLeft: sidebarVisible ? '0' : '0',
            width: sidebarVisible ? 'calc(100% - 240px)' : '100%',
          }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full flex justify-center mb-2">
              <TabsTrigger value="overview" className="flex-1">
                {isArabic ? "نظرة عامة" : "Overview"}
              </TabsTrigger>
              <TabsTrigger value="daily" className="flex-1">
                {isArabic ? "يومي" : "Daily"}
              </TabsTrigger>
              <TabsTrigger value="products" className="flex-1">
                {isArabic ? "المنتجات" : "Products"}
              </TabsTrigger>
            </TabsList>
            
            <div className="scrollable-area">
              <TabsContent value="overview" className="mt-0">
                <Card className="compact-card border-0 shadow-none">
                  <CardHeader className="p-3">
                    <CardTitle className="text-lg">
                      {isArabic ? "ملخص المبيعات" : "Sales Summary"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[calc(100vh-200px)]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={data}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="sales" fill="#004d40" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="daily" className="mt-0">
                <Card className="compact-card">
                  <CardHeader className="p-3">
                    <CardTitle className="text-lg">
                      {isArabic ? "التقرير اليومي" : "Daily Report"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="compact-card">
                        <CardContent className="p-3 text-center">
                          <p className="text-muted-foreground text-sm">
                            {isArabic ? "إجمالي المبيعات" : "Total Sales"}
                          </p>
                          <h3 className="text-2xl font-bold">SAR 12,450</h3>
                        </CardContent>
                      </Card>
                      <Card className="compact-card">
                        <CardContent className="p-3 text-center">
                          <p className="text-muted-foreground text-sm">
                            {isArabic ? "عدد الطلبات" : "Order Count"}
                          </p>
                          <h3 className="text-2xl font-bold">87</h3>
                        </CardContent>
                      </Card>
                      <Card className="compact-card">
                        <CardContent className="p-3 text-center">
                          <p className="text-muted-foreground text-sm">
                            {isArabic ? "متوسط قيمة الطلب" : "Average Order"}
                          </p>
                          <h3 className="text-2xl font-bold">SAR 143</h3>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="products" className="mt-0">
                <Card className="compact-card">
                  <CardHeader className="p-3">
                    <CardTitle className="text-lg">
                      {isArabic ? "أداء المنتجات" : "Product Performance"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full compact-table">
                        <thead>
                          <tr>
                            <th className="text-left">{isArabic ? "المنتج" : "Product"}</th>
                            <th className="text-right">{isArabic ? "المبيعات" : "Sales"}</th>
                            <th className="text-right">{isArabic ? "الكمية" : "Quantity"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-left">{isArabic ? "قهوة" : "Coffee"}</td>
                            <td className="text-right">SAR 2,450</td>
                            <td className="text-right">324</td>
                          </tr>
                          <tr>
                            <td className="text-left">{isArabic ? "شاي" : "Tea"}</td>
                            <td className="text-right">SAR 1,890</td>
                            <td className="text-right">210</td>
                          </tr>
                          <tr>
                            <td className="text-left">{isArabic ? "كيك" : "Cake"}</td>
                            <td className="text-right">SAR 1,670</td>
                            <td className="text-right">98</td>
                          </tr>
                          <tr>
                            <td className="text-left">{isArabic ? "سندويش" : "Sandwich"}</td>
                            <td className="text-right">SAR 1,450</td>
                            <td className="text-right">87</td>
                          </tr>
                          <tr>
                            <td className="text-left">{isArabic ? "عصير" : "Juice"}</td>
                            <td className="text-right">SAR 1,240</td>
                            <td className="text-right">124</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
