
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { TopSellingProduct } from "@/types";
import TopProductsBarChart from "./top-products/TopProductsBarChart";
import TopProductsTable from "./top-products/TopProductsTable";

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
        <TopProductsBarChart 
          topSellingProducts={topSellingProducts} 
          isArabic={isArabic} 
        />
        
        <div className="mt-6">
          <TopProductsTable 
            topSellingProducts={topSellingProducts} 
            isArabic={isArabic} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProductsChart;
