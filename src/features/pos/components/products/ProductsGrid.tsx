
import React, { useState, useEffect } from "react";
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

  const loadData = async () => {
    try {
      console.log("Loading products and categories data...");
      setIsLoading(true);
      
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories()
      ]);
      
      console.log(`Loaded ${categoriesData.length} categories:`, categoriesData);
      console.log(`Loaded ${productsData.length} products:`, productsData);
      
      // تصفية التصنيفات المحذوفة
      const activeCategories = categoriesData.filter(cat => !cat.isDeleted);
      console.log(`Active categories: ${activeCategories.length}`);
      
      // تحديث البيانات فوراً
      setCategories(activeCategories);
      setProducts(productsData);
      setFilteredProducts(productsData); // تعيين المنتجات المفلترة مباشرة
      
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // تحميل البيانات عند تحميل المكون لأول مرة
  useEffect(() => {
    loadData();
  }, []);

  // الاستماع لتحديثات البيانات
  useEffect(() => {
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
  }, []);

  // تطبيق الفلاتر عند تغيير المنتجات أو الفلاتر
  useEffect(() => {
    if (products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];

    // تصفية حسب التصنيف
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.categoryId === selectedCategory);
      console.log(`Filtered by category ${selectedCategory}: ${filtered.length} products`);
    }

    // تصفية حسب البحث
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) ||
        (product.nameAr && product.nameAr.toLowerCase().includes(term))
      );
      console.log(`Filtered by search "${searchTerm}": ${filtered.length} products`);
    }

    console.log(`Final filtered products: ${filtered.length} from ${products.length} total`);
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
