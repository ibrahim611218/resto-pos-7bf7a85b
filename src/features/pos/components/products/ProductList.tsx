
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
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  viewMode,
  refreshKey,
  onEditProduct,
}) => {
  const getGridClass = () => {
    switch (viewMode) {
      case "list":
        return "flex flex-col gap-2";
      case "grid-small":
        return "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2";
      case "grid-large":
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4";
      default:
        return "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2";
    }
  };

  return (
    <div className={getGridClass()}>
      {products.map((product) =>
        viewMode === "list" ? (
          <ProductListItem
            key={`${product.id}-${refreshKey}`}
            product={product}
            onEdit={onEditProduct}
          />
        ) : (
          <ProductCard
            key={`${product.id}-${refreshKey}`}
            product={product}
            onEdit={onEditProduct}
          />
        )
      )}
    </div>
  );
};

export default ProductList;
