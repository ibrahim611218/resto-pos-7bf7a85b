
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { SalesByPaymentMethod, SalesByOrderType } from "@/types";
import PaymentMethodChart from "../charts/PaymentMethodChart";
import OrderTypeChart from "../charts/OrderTypeChart";

interface ChartTabProps {
  salesByPaymentMethod: SalesByPaymentMethod[];
  salesByOrderType: SalesByOrderType[];
  chartColors: string[];
  isArabic: boolean;
}

const ChartTab: React.FC<ChartTabProps> = ({
  salesByPaymentMethod,
  salesByOrderType,
  chartColors,
  isArabic
}) => {
  return (
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
  );
};

export default ChartTab;
