
import React, { useMemo } from "react";
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
  
  // حساب عدد الأعمدة بناءً على عدد المنتجات ونوع العرض
  const getOptimizedGridClass = useMemo(() => {
    if (viewMode === "list") {
      return "flex flex-col gap-2";
    }

    const productCount = products.length;
    
    // تحديد عدد الأعمدة بناءً على عدد المنتجات
    let cols = "grid-cols-2";
    let smCols = "sm:grid-cols-2";
    let mdCols = "md:grid-cols-3";
    let lgCols = "lg:grid-cols-4";
    let xlCols = "xl:grid-cols-5";
    let xxlCols = "2xl:grid-cols-6";

    if (productCount <= 4) {
      cols = "grid-cols-2";
      smCols = "sm:grid-cols-2";
      mdCols = "md:grid-cols-2";
      lgCols = "lg:grid-cols-2";
      xlCols = "xl:grid-cols-4";
      xxlCols = "2xl:grid-cols-4";
    } else if (productCount <= 6) {
      cols = "grid-cols-2";
      smCols = "sm:grid-cols-3";
      mdCols = "md:grid-cols-3";
      lgCols = "lg:grid-cols-3";
      xlCols = "xl:grid-cols-6";
      xxlCols = "2xl:grid-cols-6";
    } else if (productCount <= 12) {
      cols = "grid-cols-3";
      smCols = "sm:grid-cols-3";
      mdCols = "md:grid-cols-4";
      lgCols = "lg:grid-cols-4";
      xlCols = "xl:grid-cols-6";
      xxlCols = "2xl:grid-cols-6";
    } else if (productCount <= 20) {
      cols = "grid-cols-4";
      smCols = "sm:grid-cols-4";
      mdCols = "md:grid-cols-5";
      lgCols = "lg:grid-cols-6";
      xlCols = "xl:grid-cols-7";
      xxlCols = "2xl:grid-cols-8";
    } else {
      // للأعداد الكبيرة من المنتجات
      cols = "grid-cols-4";
      smCols = "sm:grid-cols-5";
      mdCols = "md:grid-cols-6";
      lgCols = "lg:grid-cols-7";
      xlCols = "xl:grid-cols-8";
      xxlCols = "2xl:grid-cols-10";
    }

    const gapClass = productCount > 20 ? "gap-1" : productCount > 12 ? "gap-1.5" : "gap-2";

    return `grid ${cols} ${smCols} ${mdCols} ${lgCols} ${xlCols} ${xxlCols} ${gapClass} auto-rows-max`;
  }, [viewMode, products.length]);

  return (
    <div className={getOptimizedGridClass} style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
      {products.map((product) =>
        viewMode === "list" ? (
          <ProductListItem
            key={`${product.id}-${refreshKey}`}
            product={product}
            onEdit={onEditProduct}
            onDelete={onDeleteProduct}
          />
        ) : (
          <ProductCard
            key={`${product.id}-${refreshKey}`}
            product={product}
            onEdit={onEditProduct}
            onDelete={onDeleteProduct}
          />
        )
      )}
    </div>
  );
};

export default ProductList;
