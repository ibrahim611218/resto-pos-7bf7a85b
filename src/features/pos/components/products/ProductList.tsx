
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
  console.log("🔥 [ProductList] DIAGNOSTIC:");
  console.log("🔥 [ProductList] Products received:", products);
  console.log("🔥 [ProductList] Products count:", products?.length || 0);
  console.log("🔥 [ProductList] ViewMode:", viewMode);
  console.log("🔥 [ProductList] RefreshKey:", refreshKey);

  // FORCE RENDER ProductTable ALWAYS - Remove all blocking conditions
  console.log("🔥 [ProductList] FORCING ProductTable render...");
  
  return (
    <div className="w-full h-full">
      {/* DIAGNOSTIC BANNER */}
      <div className="bg-yellow-100 border-2 border-yellow-500 p-2 mb-4 text-yellow-800 font-bold text-center">
        🔥 ProductList: Passing {products?.length || 0} products to ProductTable
      </div>
      
      <ProductTable
        products={products || []}
        onEditProduct={onEditProduct}
        onDeleteProduct={onDeleteProduct}
      />
    </div>
  );
};

export default ProductList;
