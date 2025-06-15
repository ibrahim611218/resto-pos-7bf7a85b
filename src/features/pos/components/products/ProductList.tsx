
import React from "react";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import { Product } from "@/types";
import { ViewMode } from "@/components/ui-custom/ViewToggle";

interface ProductListProps {
  products: Product[];
  viewMode: ViewMode;
  refreshKey: number;
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  viewMode,
  refreshKey,
  onEditProduct,
  onDeleteProduct
}) => {
  console.log("[ProductList] Rendering with products:", products?.length || 0);
  
  // إذا لم توجد منتجات
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-lg text-muted-foreground">
          لا توجد منتجات
        </div>
      </div>
    );
  }

  const gridClass = viewMode === "list"
    ? "flex flex-col gap-2 p-2"
    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 p-2";

  return (
    <div className="w-full h-full overflow-auto">
      <div className={gridClass}>
        {products.map((product) => {
          const key = `${viewMode}-${product.id}-${refreshKey}`;
          
          return viewMode === "list" ? (
            <ProductListItem
              key={key}
              product={product}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
            />
          ) : (
            <ProductCard
              key={key}
              product={product}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
              viewMode={viewMode}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
