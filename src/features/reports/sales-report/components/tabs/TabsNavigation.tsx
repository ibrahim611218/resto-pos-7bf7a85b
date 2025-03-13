
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsNavigationProps {
  isArabic: boolean;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ isArabic }) => {
  return (
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
  );
};

export default TabsNavigation;
