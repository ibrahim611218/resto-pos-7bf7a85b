
import React from "react";
import { Product } from "@/types";
import ProductGrid from "./ProductGrid";

interface AllProductsTabContentProps {
  searchedProducts: Product[];
  isArabic: boolean;
  onProductClick: (product: Product) => void;
  getGridCols: () => string;
}

const AllProductsTabContent: React.FC<AllProductsTabContentProps> = ({
  searchedProducts,
  isArabic,
  onProductClick,
  getGridCols,
}) => {
  return (
    <div className="mt-2 space-y-3">
      <ProductGrid 
        products={searchedProducts}
        isArabic={isArabic}
        onProductClick={onProductClick}
        getGridCols={getGridCols}
      />
    </div>
  );
};

export default AllProductsTabContent;
