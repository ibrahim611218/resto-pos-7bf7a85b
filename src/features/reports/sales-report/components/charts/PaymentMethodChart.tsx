
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
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
  const chartData = salesByPaymentMethod.map((item, index) => ({
    name: item.method,
    amount: item.total,
    fill: chartColors[index % chartColors.length]
  }));

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">
          {isArabic ? "توزيع المبيعات حسب طريقة الدفع" : "Sales Distribution by Payment Method"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 14, fontWeight: 500 }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 14 }}
                stroke="#666"
                label={{ 
                  value: isArabic ? 'المبلغ (ريال)' : 'Amount (SAR)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: 14, fontWeight: 500 }
                }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500
                }}
                formatter={(value: any) => [`${value.toFixed(2)} ${isArabic ? "ريال" : "SAR"}`, isArabic ? "المبلغ" : "Amount"]}
              />
              <Legend 
                wrapperStyle={{ fontSize: '14px', fontWeight: 500 }}
              />
              <Bar 
                dataKey="amount" 
                name={isArabic ? "المبلغ" : "Amount"}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodChart;
