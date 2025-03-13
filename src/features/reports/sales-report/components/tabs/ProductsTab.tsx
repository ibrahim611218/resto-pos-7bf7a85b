
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { TopSellingProduct } from "@/types";
import TopProductsChart from "../charts/TopProductsChart";

interface ProductsTabProps {
  topSellingProducts: TopSellingProduct[];
  isArabic: boolean;
}

const ProductsTab: React.FC<ProductsTabProps> = ({
  topSellingProducts,
  isArabic
}) => {
  return (
    <TabsContent value="products">
      <TopProductsChart 
        topSellingProducts={topSellingProducts} 
        isArabic={isArabic} 
      />
    </TabsContent>
  );
};

export default ProductsTab;
