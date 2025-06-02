
import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Product, Category } from "@/types";
import { toast } from "sonner";
import productService from "@/services/products/ProductService";
import categoryService from "@/services/categories/CategoryService";
import ViewToggle, { ViewMode } from "@/components/ui-custom/ViewToggle";
import ProductSearchAndCategories from "./ProductSearchAndCategories";
import ProductList from "./ProductList";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface ProductsGridProps {
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  onEditProduct?: (id: string) => void;
  onDeleteProduct?: (id: string) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  viewMode = "grid-small",
  onViewModeChange,
  onEditProduct,
  onDeleteProduct
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { user } = useAuth();
  const companyId = user?.companyId || localStorage.getItem('currentCompanyId');
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Loading products and categories data');
      const [categoriesResult, productsResult] = await Promise.all([
        categoryService.getCategories(),
        productService.getProducts(),
      ]);
      console.log('Loaded categories:', categoriesResult.length);
      console.log('Loaded products:', productsResult.length);

      const activeCategories = categoriesResult.filter(cat => cat && !cat.isDeleted);
      console.log('Active (non-deleted) categories:', activeCategories.length);

      const validCategoryIds = new Set(activeCategories.map(c => c.id));
      
      // Filter products by the current company ID if available
      let companyProducts = productsResult;
      if (companyId) {
        companyProducts = productsResult.filter(product => 
          !product.companyId || product.companyId === companyId
        );
      }
      
      const activeProducts = companyProducts.filter(product =>
        validCategoryIds.has(product.categoryId) || !product.categoryId
      );

      setCategories(activeCategories);
      setProducts(activeProducts);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error(isArabic ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
    } finally {
      setLoading(false);
    }
  }, [isArabic, companyId]);

  useEffect(() => {
    loadData();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Page is now visible, refreshing products and categories');
        loadData();
      }
    };

    const handleDataUpdate = () => {
      console.log('Data update event detected, refreshing products and categories');
      loadData();
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('data-updated', handleDataUpdate);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('product-updated', handleDataUpdate);
    window.addEventListener('category-updated', handleDataUpdate);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('data-updated', handleDataUpdate);
      window.removeEventListener('product-updated', handleDataUpdate);
      window.removeEventListener('category-updated', handleDataUpdate);
    };
  }, [loadData]);

  useEffect(() => {
    if (selectedCategory !== "all") {
      const categoryExists = categories.some(cat => cat.id === selectedCategory);
      if (!categoryExists) {
        console.log('Selected category no longer exists, resetting to all');
        setSelectedCategory("all");
      }
    }

    let result = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(term) ||
        (product.nameAr && product.nameAr.toLowerCase().includes(term))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(product => product.categoryId === selectedCategory);
    }

    console.log(`Filtering products: ${result.length} results from ${products.length} products`);
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products, categories, refreshKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-shrink-0">
        <ProductSearchAndCategories
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={categories}
          isArabic={isArabic}
          viewMode={
            onViewModeChange ? (
              <ViewToggle value={viewMode} onValueChange={onViewModeChange} />
            ) : null
          }
        />
      </div>

      <div className="flex-1 overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            {isArabic ? "لا توجد منتجات متطابقة مع البحث" : "No products found"}
          </div>
        ) : (
          <ProductList
            products={filteredProducts}
            viewMode={viewMode}
            refreshKey={refreshKey}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;
