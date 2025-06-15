
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
  // Banner تشخيصي دائم أعلى الصفحة
  const debugBanner = (
    <div className="w-full bg-red-200 text-red-900 font-bold text-center py-2 mb-2 rounded border border-red-400">
      <div>
        Debug: عدد المنتجات المحملة: {products.length} — ViewMode: {viewMode}
      </div>
      <div>
        المنتجات:
        <span dir="auto">
          {[...products.map(p => p.nameAr || p.name || "?")].join(" | ")}
        </span>
      </div>
    </div>
  );

  // في حال عدم وجود منتجات أبدًا
  if (!products || products.length === 0) {
    return (
      <>
        {debugBanner}
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-lg text-red-600 font-bold">
            🚫 لا توجد بيانات منتجات من الخدمة (products.length == 0)
          </div>
        </div>
      </>
    );
  }

  // grid class واضح وبسيط
  const gridClass = viewMode === "list"
    ? "flex flex-col gap-2 p-2"
    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 p-2";

  return (
    <div className="w-full h-full overflow-auto">
      {debugBanner}
      <div className={gridClass}>
        {products.map((product, idx) => {
          // التحقق من صلاحية المنتج بشكل صريح
          const missingName = !product.name && !product.nameAr;
          const missingVariants = (product.type === "sized" || !product.type) && (!product.variants || product.variants.length === 0);
          const isInvalid = missingName || missingVariants;

          // ديف بطاقة واضحة جداً إذا المنتج فيه خلل
          if (isInvalid) {
            return (
              <div
                key={`invalid-${product.id}-${refreshKey}`}
                className="border-4 border-red-700 bg-red-100 p-4 rounded-xl flex flex-col items-center justify-center min-h-40"
              >
                <div className="text-xl font-bold text-red-700">
                  ⚠️ منتج غير صالح  
                </div>
                <div className="text-red-700 mt-2 text-xs">
                  {missingName && <div>لا يوجد اسم</div>}
                  {missingVariants && <div>لا يوجد variants لهذا المنتج النوع Sized</div>}
                  <div>ID: {product.id}</div>
                </div>
              </div>
            );
          }

          // المنتج صالح – استخدم بطاقة المنتج العادية أو list item
          return viewMode === "list" ? (
            <ProductListItem
              key={`listok-${product.id}-${refreshKey}`}
              product={product}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
            />
          ) : (
            <ProductCard
              key={`cardok-${product.id}-${refreshKey}`}
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

