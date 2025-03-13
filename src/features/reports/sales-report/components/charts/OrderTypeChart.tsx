
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { SalesByOrderType } from "@/types";

interface OrderTypeChartProps {
  salesByOrderType: SalesByOrderType[];
  chartColors: string[];
  isArabic: boolean;
}

const OrderTypeChart: React.FC<OrderTypeChartProps> = ({ 
  salesByOrderType, 
  chartColors,
  isArabic 
}) => {
  return (
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
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTypeChart;
