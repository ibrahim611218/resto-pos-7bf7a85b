
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SalesReport from "@/features/reports/sales-report/SalesReport";
import InventoryReport from "@/features/reports/inventory-report/InventoryReport";
import VatReport from "@/features/reports/vat-report/VatReport";

const ReportsPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [activeTab, setActiveTab] = useState("sales");
  
  const tabs = [
    {
      id: "sales",
      label: isArabic ? "تقرير المبيعات" : "Sales Report",
      component: <SalesReport />
    },
    {
      id: "inventory", 
      label: isArabic ? "تقرير المخزون" : "Inventory Report",
      component: <InventoryReport />
    },
    {
      id: "vat",
      label: isArabic ? "تقرير ضريبة القيمة المضافة" : "VAT Report", 
      component: <VatReport />
    },
    {
      id: "customers",
      label: isArabic ? "تقرير العملاء" : "Customers Report",
      component: (
        <Card>
          <CardHeader>
            <CardTitle>{isArabic ? "تقرير العملاء" : "Customers Report"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {isArabic 
                ? "سيتم إضافة تقرير العملاء قريباً" 
                : "Customer report will be added soon"}
            </p>
          </CardContent>
        </Card>
      )
    }
  ];
  
  return (
    <div className="space-y-6" dir={isArabic ? "rtl" : "ltr"}>
      <h1 className="text-2xl font-bold">
        {isArabic ? "التقارير" : "Reports"}
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ReportsPage;
