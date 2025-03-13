
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesByPaymentMethod, SalesByOrderType, TopSellingProduct, Invoice } from "@/types";
import PaymentMethodChart from "./charts/PaymentMethodChart";
import OrderTypeChart from "./charts/OrderTypeChart";
import TopProductsChart from "./charts/TopProductsChart";
import InvoicesList from "./InvoicesList";

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
          <PaymentMethodChart 
            salesByPaymentMethod={salesByPaymentMethod} 
            chartColors={chartColors} 
            isArabic={isArabic} 
          />
          <OrderTypeChart 
            salesByOrderType={salesByOrderType} 
            chartColors={chartColors} 
            isArabic={isArabic} 
          />
        </div>
      </TabsContent>
      
      <TabsContent value="products">
        <TopProductsChart 
          topSellingProducts={topSellingProducts} 
          isArabic={isArabic} 
        />
      </TabsContent>
      
      <TabsContent value="invoices">
        <InvoicesList 
          filteredInvoices={filteredInvoices} 
          isArabic={isArabic} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default ChartsTabs;
