
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";
import ProductListItem from "./ProductListItem";
import { mockProducts, mockCategories } from "@/features/pos/data/mockData";

interface ProductsGridProps {
  viewMode: "grid" | "list";
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ viewMode }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? mockProducts 
    : mockProducts.filter(product => product.categoryId === selectedCategory);

  return (
    <div className="w-full" dir={isArabic ? "rtl" : "ltr"}>
      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
        <TabsList className="mb-4 flex w-full h-auto flex-wrap bg-card p-1 overflow-x-auto">
          <TabsTrigger value="all" className="flex-shrink-0">
            {isArabic ? "جميع الأصناف" : "All Products"}
          </TabsTrigger>
          {mockCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex-shrink-0">
              {isArabic ? category.nameAr || category.name : category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="m-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map(product => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsGrid;
