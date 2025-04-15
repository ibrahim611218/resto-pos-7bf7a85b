
import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { sampleProducts, sampleCategories } from "@/data/sampleData";
import { Size } from "@/types";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useLanguage } from "@/context/LanguageContext";
import ProductsHeader from "@/components/products/ProductsHeader";
import SizeFilters from "@/components/products/SizeFilters";
import ProductsGrid from "@/components/products/ProductsGrid";

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const { isMobile } = useWindowDimensions();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const getCategoryName = (categoryId: string) => {
    const category = sampleCategories.find(cat => cat.id === categoryId);
    return category?.nameAr || category?.name || "تصنيف غير معروف";
  };

  // Memoize filtered products to prevent unnecessary re-renders
  const filteredProducts = useMemo(() => {
    return categoryId 
      ? sampleProducts.filter(product => product.categoryId === categoryId)
      : sampleProducts;
  }, [categoryId]);

  return (
    <div 
      className="container mx-auto p-4 overflow-auto h-full"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <ProductsHeader 
        categoryId={categoryId}
        getCategoryName={getCategoryName}
      />
      
      <SizeFilters
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        isMobile={isMobile}
        isArabic={isArabic}
      />

      <ProductsGrid 
        products={filteredProducts}
        getCategoryName={getCategoryName}
        isMobile={isMobile}
        isArabic={isArabic}
      />
    </div>
  );
};

export default Products;

