
import React from "react";
import { Product } from "@/types";
import ProductGrid from "./ProductGrid";

interface AllProductsTabContentProps {
  searchedProducts: Product[];
  isArabic: boolean;
  onProductClick: (product: Product) => void;
  getGridCols: string | (() => string);
}

const AllProductsTabContent: React.FC<AllProductsTabContentProps> = ({
  searchedProducts,
  isArabic,
  onProductClick,
  getGridCols,
}) => {
  const handleProductClick = (product: Product) => {
    console.log("Product clicked in AllProductsTabContent:", product.name);
    onProductClick(product);
  };

  return (
    <div className="mt-2 space-y-3">
      <ProductGrid 
        products={searchedProducts}
        isArabic={isArabic}
        onProductClick={handleProductClick}
        getGridCols={getGridCols}
      />
    </div>
  );
};

export default AllProductsTabContent;
