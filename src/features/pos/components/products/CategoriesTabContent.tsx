
import React from "react";
import { Product, Category } from "@/types";
import CategoryList from "../CategoryList";
import ProductGrid from "./ProductGrid";

interface CategoriesTabContentProps {
  categories: Category[];
  activeCategory: string | null;
  setActiveCategory: (id: string | null) => void;
  searchedProducts: Product[];
  isArabic: boolean;
  onProductClick: (product: Product) => void;
  getGridCols: string | (() => string);
  isMobile: boolean;
}

const CategoriesTabContent: React.FC<CategoriesTabContentProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  searchedProducts,
  isArabic,
  onProductClick,
  getGridCols,
  isMobile,
}) => {
  return (
    <div className="mt-1 px-1" style={{ contain: 'content' }}>
      <CategoryList
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        isArabic={isArabic}
      />
      
      {activeCategory && (
        <div className="mt-2">
          <h3 className={`font-bold mb-2 ${isMobile ? "text-base" : "text-lg"} sticky top-12 bg-background py-1 z-10 px-2 rounded-md`}>
            {isArabic 
              ? categories.find(c => c.id === activeCategory)?.nameAr || "الأصناف" 
              : categories.find(c => c.id === activeCategory)?.name || "Products"}
          </h3>
          <ProductGrid 
            products={searchedProducts}
            isArabic={isArabic}
            onProductClick={onProductClick}
            getGridCols={getGridCols}
          />
        </div>
      )}
    </div>
  );
};

export default CategoriesTabContent;
