
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TopSellingProduct } from "@/types";

interface TopProductsBarChartProps {
  topSellingProducts: TopSellingProduct[];
  isArabic: boolean;
}

const TopProductsBarChart: React.FC<TopProductsBarChartProps> = ({ 
  topSellingProducts, 
  isArabic 
}) => {
  return (
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
  );
};

export default TopProductsBarChart;
