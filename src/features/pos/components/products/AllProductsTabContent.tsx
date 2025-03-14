
import React, { useCallback } from "react";
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
  // Optimize product click handler with useCallback
  const handleProductClick = useCallback((product: Product) => {
    console.log("Product clicked in AllProductsTabContent:", product.name);
    if (product && typeof onProductClick === 'function') {
      onProductClick(product);
    }
  }, [onProductClick]);

  return (
    <div 
      className="mt-2 space-y-3 overflow-auto custom-scrollbar stretch-content"
      style={{ flexGrow: 1, minHeight: 0 }}
    >
      <ProductGrid 
        products={searchedProducts || []}
        isArabic={isArabic}
        onProductClick={handleProductClick}
        getGridCols={getGridCols}
      />
    </div>
  );
};

export default AllProductsTabContent;
