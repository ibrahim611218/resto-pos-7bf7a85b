
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
  // 👇 طباعة المنتجات المستلمة من ProductsGrid
  console.log("[ProductList] تم استلام المنتجات من ProductsGrid:", products);

  // -------- تشخيص قوي --------
  const invalidNames = products.filter(p => !p.name && !p.nameAr);
  const missingVariants = products.filter(
    p => (p.type === "sized" || !p.type) && (!p.variants || p.variants.length === 0)
  );

  // -------- منطق التصفية --------
  const validProducts = useMemo(() => {
    // السماح بمرور المنتج طالما له اسم (إنجليزي أو عربي)، وأحد:
    //  - فردي بدون variants (سعره في الحقل الرئيس)
    //  - أو به variants واحدة على الأقل
    return products.filter(product => {
      const hasValidName = product.name || product.nameAr;
      if (!hasValidName) {
        return false;
      }

      // single: لا نهتم بوجود variants
      if (product.type === "single") {
        return true;
      }

      // sized أو بلا type: يجب variants
      if (product.type === "sized" || !product.type) {
        if (product.variants && product.variants.length > 0) {
          return true;
        }
        return false;
      }

      return true;
    });
  }, [products]);

  // -------- التشخيص في الأعلى --------
  const debugBanner = (
    <div className="w-full bg-red-200 text-red-900 font-bold text-center py-2 mb-2 rounded border border-red-400">
      <div>
        <strong>تشخيص ProductList:</strong> عدد المنتجات المستلمة:{" "}
        {products.length} | بعد التصفية: {validProducts.length}
      </div>
      <div>
        أسماء المنتجات:{" "}
        <span dir="auto">
          {[...products.map(p => p.nameAr || p.name || "?")].join(" | ")}
        </span>
      </div>
      {invalidNames.length > 0 && (
        <div className="text-xs text-red-800">
          منتجات بدون اسم: {invalidNames.map(p => p.id).join(" , ")}
        </div>
      )}
      {missingVariants.length > 0 && (
        <div className="text-xs text-orange-800">
          منتجات "sized" بلا variants: {missingVariants.map(p => p.id).join(" , ")}
        </div>
      )}
    </div>
  );

  // Banner إضافي أسفل الصفحة بمعلومات عن المنتجات
  const debugDetails = (
    <div className="w-full bg-blue-100 text-blue-700 text-xs max-h-32 overflow-auto mt-4 rounded font-mono px-2">
      products: {JSON.stringify(products, null, 2)}
      <br />
      validProducts: {JSON.stringify(validProducts, null, 2)}
    </div>
  );

  if (validProducts.length === 0) {
    return (
      <>
        {debugBanner}
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-muted-foreground">لا توجد منتجات للعرض</p>
            <p className="text-sm text-muted-foreground mt-2">
              {products.length === 0 
                ? "لم يتم إضافة أي منتجات بعد" 
                : "تأكد من فلترة البحث أو التصنيف"}
            </p>
          </div>
        </div>
        {debugDetails}
      </>
    );
  }

  // حساب عدد الأعمدة وحجم المنتجات بناءً على نوع العرض
  const getOptimizedGridClass = useMemo(() => {
    if (viewMode === "list") {
      return "flex flex-col gap-2 p-2";
    }

    const productCount = validProducts.length;
    let gridClass = "";
    let gapClass = "gap-2";

    if (viewMode === "grid-large") {
      if (productCount <= 6) {
        gridClass =
          "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4";
      } else if (productCount <= 12) {
        gridClass =
          "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6";
      } else {
        gridClass =
          "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8";
      }
      gapClass = "gap-3";
    } else {
      if (productCount <= 8) {
        gridClass =
          "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8";
      } else if (productCount <= 20) {
        gridClass =
          "grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12";
      } else {
        gridClass =
          "grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-16";
      }
      gapClass = productCount > 30 ? "gap-1" : "gap-1.5";
    }

    return `grid ${gridClass} ${gapClass} auto-rows-max p-2`;
  }, [viewMode, validProducts.length]);

  return (
    <div className="w-full h-full overflow-auto">
      {debugBanner}
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
      {debugDetails}
    </div>
  );
};

export default ProductList;

