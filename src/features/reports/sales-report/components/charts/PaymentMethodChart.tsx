
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { SalesByPaymentMethod } from "@/types";

interface PaymentMethodChartProps {
  salesByPaymentMethod: SalesByPaymentMethod[];
  chartColors: string[];
  isArabic: boolean;
}

const PaymentMethodChart: React.FC<PaymentMethodChartProps> = ({ 
  salesByPaymentMethod, 
  chartColors,
  isArabic 
}) => {
  return (
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
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
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
  );
};

export default PaymentMethodChart;
