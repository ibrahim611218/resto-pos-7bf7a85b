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

  const loadData = async () => {
    try {
      console.log("Loading mock products and categories data");
      
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories()
      ]);
      
      console.log(`Loaded ${categoriesData.length} categories`);
      console.log(`Loaded ${productsData.length} products`);
      
      setCategories(categoriesData);
      setProducts(productsData);
      
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [key]);

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

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.categoryId === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) ||
        (product.nameAr && product.nameAr.toLowerCase().includes(term))
      );
    }

    console.log(`Filtering products: ${filtered.length} results from ${products.length} products`);
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

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
