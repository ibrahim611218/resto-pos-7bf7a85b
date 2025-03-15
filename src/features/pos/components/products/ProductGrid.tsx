
import React from "react";
import { Product } from "@/types";
import ProductCard from "../ProductCard";

interface ProductGridProps {
  products: Product[];
  isArabic: boolean;
  onProductClick: (product: Product) => void;
  getGridCols: string | (() => string);
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isArabic,
  onProductClick,
  getGridCols,
}) => {
  // Handle the case where getGridCols is a function
  const gridColsClass = typeof getGridCols === 'function' ? getGridCols() : getGridCols;

  if (products.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground border rounded-md border-dashed">
        {isArabic ? "لا توجد منتجات" : "No products found"}
      </div>
    );
  }

  return (
    <div className={`grid ${gridColsClass} gap-3 product-grid-container pb-4`}>
      {products.map((product) => (
        <div key={product.id} onClick={() => onProductClick(product)}>
          <ProductCard
            product={product}
            isArabic={isArabic}
            className="h-full"
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
