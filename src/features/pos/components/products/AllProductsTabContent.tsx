
import React, { useCallback, useEffect } from "react";
import { Product } from "@/types";
import ProductGrid from "./ProductGrid";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

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
  const { width, height } = useWindowDimensions();
  
  // Force resize on mount and dimension changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [width, height]);
  
  // Optimize product click handler with useCallback
  const handleProductClick = useCallback((product: Product) => {
    if (product && typeof onProductClick === 'function') {
      onProductClick(product);
    }
  }, [onProductClick]);

  return (
    <div 
      className="mt-2 space-y-3 custom-scrollbar"
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
