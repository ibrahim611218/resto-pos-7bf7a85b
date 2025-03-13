
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import { SalesByPaymentMethod, SalesByOrderType, TopSellingProduct, Invoice } from "@/types";
import TabsNavigation from "./tabs/TabsNavigation";
import ChartTab from "./tabs/ChartTab";
import ProductsTab from "./tabs/ProductsTab";
import InvoicesTab from "./tabs/InvoicesTab";

interface ChartsTabsProps {
  salesByPaymentMethod: SalesByPaymentMethod[];
  salesByOrderType: SalesByOrderType[];
  topSellingProducts: TopSellingProduct[];
  filteredInvoices: Invoice[];
  chartColors: string[];
  isArabic: boolean;
}

const ChartsTabs: React.FC<ChartsTabsProps> = ({
  salesByPaymentMethod,
  salesByOrderType,
  topSellingProducts,
  filteredInvoices,
  chartColors,
  isArabic
}) => {
  return (
    <Tabs defaultValue="charts" className="w-full mb-6">
      <TabsNavigation isArabic={isArabic} />
      
      <ChartTab 
        salesByPaymentMethod={salesByPaymentMethod}
        salesByOrderType={salesByOrderType}
        chartColors={chartColors}
        isArabic={isArabic}
      />
      
      <ProductsTab 
        topSellingProducts={topSellingProducts}
        isArabic={isArabic}
      />
      
      <InvoicesTab 
        filteredInvoices={filteredInvoices}
        isArabic={isArabic}
      />
    </Tabs>
  );
};

export default ChartsTabs;
