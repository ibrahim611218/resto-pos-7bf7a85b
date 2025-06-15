import React, { useState, useEffect, useCallback } from "react";
import ProductSearchAndCategories from "./ProductSearchAndCategories";
import ProductList from "./ProductList";
import { ViewMode } from "@/components/ui-custom/ViewToggle";
import ViewToggle from "@/components/ui-custom/ViewToggle";
import { useLanguage } from "@/context/LanguageContext";
import { Product, Category } from "@/types";
import productService from "@/services/products/ProductService";
import categoryService from "@/services/categories/CategoryService";

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
  key
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      console.log("ProductsGrid: Loading products and categories data...");
      setIsLoading(true);
      
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories()
      ]);
      
      console.log(`ProductsGrid: Loaded ${categoriesData.length} categories.`);
      console.log(`ProductsGrid: Loaded ${productsData.length} products.`);
      
      const activeCategories = categoriesData.filter(cat => !cat.isDeleted);
      
      setCategories(activeCategories);
      setProducts(productsData);
      
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error("ProductsGrid: Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      console.log("ProductsGrid detected update, refreshing...");
      loadData();
    };

    window.addEventListener('product-updated', handleUpdate);
    window.addEventListener('category-updated', handleUpdate);
    window.addEventListener('data-updated', handleUpdate);

    return () => {
      window.removeEventListener('product-updated', handleUpdate);
      window.removeEventListener('category-updated', handleUpdate);
      window.removeEventListener('data-updated', handleUpdate);
    };
  }, [loadData]);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.categoryId === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product => {
        const name = product.name?.toLowerCase() || "";
        const nameAr = product.nameAr?.toLowerCase() || "";
        return name.includes(term) || nameAr.includes(term);
      });
    }

    console.log(`ProductsGrid: Filtering complete. Displaying ${filtered.length} of ${products.length} products.`);
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

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
          refreshKey={refreshKey}
          onEditProduct={onEditProduct}
          onDeleteProduct={onDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ProductsGrid;
