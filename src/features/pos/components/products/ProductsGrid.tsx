
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { mockProducts, mockCategories } from "../../data/mockData";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import { Product } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductsGridProps {
  viewMode: "grid" | "list";
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ viewMode }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts as Product[]);

  // Filter products based on search term and selected category
  useEffect(() => {
    let result = mockProducts as Product[];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        (product.nameAr && product.nameAr.toLowerCase().includes(term))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(product => product.categoryId === selectedCategory);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory]);
  
  return (
    <div className="space-y-4">
      {/* Search and category filter */}
      <div className="flex flex-col md:flex-row gap-4 sticky top-0 bg-background z-10 pb-4">
        <div className="relative flex-1">
          <Search className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-3 h-4 w-4 text-muted-foreground`} />
          <Input
            placeholder={isArabic ? "بحث عن منتج..." : "Search products..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 ${isArabic ? 'text-right pr-4' : ''}`}
            dir={isArabic ? "rtl" : "ltr"}
          />
        </div>
      </div>

      {/* Categories filter */}
      <div className="overflow-x-auto pb-2">
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="h-10 p-1">
            <TabsTrigger value="all" className="px-4">
              {isArabic ? "جميع الأصناف" : "All Categories"}
            </TabsTrigger>
            {mockCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="px-4">
                {isArabic ? category.nameAr || category.name : category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Products grid/list */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          {isArabic ? "لا توجد منتجات متطابقة مع البحث" : "No products found"}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
