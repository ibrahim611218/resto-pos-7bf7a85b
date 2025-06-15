
import React from "react";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import ProductTable from "./ProductTable";
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

  // استخدام الجدول البسيط دائماً لضمان ظهور المنتجات
  return (
    <ProductTable
      products={products}
      onEditProduct={onEditProduct}
      onDeleteProduct={onDeleteProduct}
    />
  );
};

export default ProductList;
