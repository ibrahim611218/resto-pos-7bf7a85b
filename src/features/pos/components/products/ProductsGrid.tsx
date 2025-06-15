
import React, { useState } from "react";
import ProductSearchAndCategories from "./ProductSearchAndCategories";
import ProductList from "./ProductList";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import ViewToggle from "@/components/ui-custom/ViewToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useProductsData } from "@/features/pos/hooks/useProductsData";
import { useFilterProducts } from "@/features/pos/hooks/useFilterProducts";
import { Product, Category } from "@/types";

interface ProductsGridProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
  key?: string;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  viewMode,
  onViewModeChange,
  onEditProduct,
  onDeleteProduct,
  key,
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { products, categories, isLoading } = useProductsData();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useFilterProducts({
    products,
    selectedCategory,
    searchTerm,
  });

  // إضافة طباعة للمنتجات والفلاتر لمزيد من التشخيص
  console.log("[ProductsGrid] Products from hook:", products);
  console.log("[ProductsGrid] Filtered products:", filteredProducts);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            {isArabic ? "جاري تحميل البيانات..." : "Loading data..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ProductSearchAndCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        viewMode={<ViewToggle value={viewMode} onValueChange={onViewModeChange} />}
        isArabic={isArabic}
      />

      <div className="flex-1 overflow-hidden">
        <ProductList
          products={filteredProducts}
          viewMode={viewMode}
          refreshKey={0}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ProductsGrid;
