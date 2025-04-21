
import React from "react";
import { Product } from "@/types";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  viewMode: ViewMode;
  refreshKey?: number;
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  viewMode,
  refreshKey = 0,
  onEditProduct,
  onDeleteProduct,
}) => {
  // Use grid layout based on view mode
  const gridClassName = 
    viewMode === "list" 
      ? "grid grid-cols-1 gap-4" 
      : viewMode === "grid-small" 
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" 
        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6";

  return (
    <div className={gridClassName}>
      {products.map((product) => (
        <ProductCard
          key={`${product.id}-${refreshKey}`}
          product={product}
          viewMode={viewMode}
          onEdit={onEditProduct ? () => onEditProduct(product.id) : undefined}
          onDelete={onDeleteProduct ? () => onDeleteProduct(product.id) : undefined}
        />
      ))}
    </div>
  );
};

export default ProductList;
