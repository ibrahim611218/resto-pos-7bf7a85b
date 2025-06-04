
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
  
  // تصفية المنتجات للتأكد من وجود variants صالحة
  const validProducts = useMemo(() => {
    return products.filter(product => {
      if (!product.variants || product.variants.length === 0) {
        console.warn(`Product ${product.name} has no variants, skipping display`);
        return false;
      }
      return true;
    });
  }, [products]);

  // حساب عدد الأعمدة وحجم المنتجات بناءً على نوع العرض
  const getOptimizedGridClass = useMemo(() => {
    if (viewMode === "list") {
      return "flex flex-col gap-2 p-2";
    }

    const productCount = validProducts.length;
    let gridClass = "";
    let gapClass = "gap-2";

    if (viewMode === "grid-large") {
      // عرض كبير - أقل أعمدة، منتجات أكبر
      if (productCount <= 6) {
        gridClass = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4";
      } else if (productCount <= 12) {
        gridClass = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6";
      } else {
        gridClass = "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8";
      }
      gapClass = "gap-3";
    } else {
      // عرض صغير - أعمدة أكثر، منتجات أصغر
      if (productCount <= 8) {
        gridClass = "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8";
      } else if (productCount <= 20) {
        gridClass = "grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12";
      } else {
        gridClass = "grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-16";
      }
      gapClass = productCount > 30 ? "gap-1" : "gap-1.5";
    }

    return `grid ${gridClass} ${gapClass} auto-rows-max p-2`;
  }, [viewMode, validProducts.length]);

  if (validProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-muted-foreground">لا توجد منتجات صالحة للعرض</p>
          <p className="text-sm text-muted-foreground mt-2">تأكد من إضافة مقاسات للمنتجات</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className={getOptimizedGridClass}>
        {validProducts.map((product) =>
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
              viewMode={viewMode}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
