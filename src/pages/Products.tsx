import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Size } from "@/types";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { useLanguage } from "@/context/LanguageContext";
import ProductsHeader from "@/components/products/ProductsHeader";
import SizeFilters from "@/components/products/SizeFilters";
import ProductsGrid from "@/components/products/ProductsGrid";
import { toast } from "sonner";
import { Product } from "@/types";
import productService from "@/services/products/ProductService";
import categoryService from "@/services/categories/CategoryService";

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const { isMobile } = useWindowDimensions();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Check if we're in Electron environment with DB access
        if (window.db) {
          const [categoriesResult, productsResult] = await Promise.all([
            window.db.getCategories(),
            window.db.getProducts()
          ]);
          setCategories(categoriesResult);
          setProducts(productsResult);
        } else {
          // In browser preview, we'll use our local storage services
          console.log('Loading data from local storage services');
          const [categoriesResult, productsResult] = await Promise.all([
            categoryService.getCategories(),
            productService.getProducts()
          ]);
          setCategories(categoriesResult);
          setProducts(productsResult);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error(isArabic ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [isArabic]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.nameAr || category?.name || "تصنيف غير معروف";
  };

  const filteredProducts = React.useMemo(() => {
    return categoryId 
      ? products.filter(product => product.categoryId === categoryId)
      : products;
  }, [categoryId, products]);

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

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductsGrid 
          products={filteredProducts}
          getCategoryName={getCategoryName}
          isMobile={isMobile}
          isArabic={isArabic}
        />
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {isArabic ? "لا توجد منتجات" : "No products available"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
