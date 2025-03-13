
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TopSellingProduct } from "@/types";

interface TopProductsChartProps {
  topSellingProducts: TopSellingProduct[];
  isArabic: boolean;
}

const TopProductsChart: React.FC<TopProductsChartProps> = ({ 
  topSellingProducts,
  isArabic 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isArabic ? "المنتجات الأكثر مبيعاً" : "Top Selling Products"}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
        
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isArabic ? "المنتج" : "Product"}</TableHead>
                <TableHead className="text-right">{isArabic ? "الكمية" : "Quantity"}</TableHead>
                <TableHead className="text-right">{isArabic ? "الإيرادات" : "Revenue"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSellingProducts.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell className="text-right">{product.quantity}</TableCell>
                  <TableCell className="text-right">{product.revenue.toFixed(2)} {isArabic ? "ريال" : "SAR"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
