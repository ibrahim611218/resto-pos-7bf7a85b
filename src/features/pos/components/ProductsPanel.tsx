
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, Category } from "@/types";
import GlassCard from "@/components/ui-custom/GlassCard";
import CategoryList from "./CategoryList";
import ProductsList from "./ProductsList";
import SizeSelectionDialog from "./SizeSelectionDialog";
import SearchBox from "@/features/invoices/components/SearchBox";

interface ProductsPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string | null;
  setActiveCategory: (id: string | null) => void;
  categories: Category[];
  filteredProducts: Product[];
  searchedProducts: Product[];
  onAddToCart: (product: Product, variantId: string) => void;
  isArabic: boolean;
  getSizeLabel: (size: string) => string;
}

const ProductsPanel: React.FC<ProductsPanelProps> = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  categories,
  filteredProducts,
  searchedProducts,
  onAddToCart,
  isArabic,
  getSizeLabel,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  // Group products by category for better organization
  const productsByCategory = filteredProducts.reduce((acc: Record<string, Product[]>, product) => {
    if (!acc[product.categoryId]) {
      acc[product.categoryId] = [];
    }
    acc[product.categoryId].push(product);
    return acc;
  }, {});

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="p-4 pb-0">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
          className="mb-3"
        />
        
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isArabic={isArabic}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 pt-2">
        {searchTerm ? (
          <div className="mt-2 space-y-2">
            <h3 className="font-bold text-lg mb-3">
              {isArabic ? "نتائج البحث" : "Search Results"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {searchedProducts.map((product, index) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                  index={index}
                  isArabic={isArabic}
                />
              ))}
            </div>
          </div>
        ) : activeCategory ? (
          <div className="mt-2 space-y-2">
            <h3 className="font-bold text-lg mb-3">
              {isArabic 
                ? categories.find(c => c.id === activeCategory)?.nameAr || "الأصناف" 
                : categories.find(c => c.id === activeCategory)?.name || "Products"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filteredProducts
                .filter(product => product.categoryId === activeCategory)
                .map((product, index) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                    index={index}
                    isArabic={isArabic}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="mt-2 space-y-6 overflow-y-auto no-scrollbar">
            {categories.map((category) => (
              productsByCategory[category.id]?.length > 0 && (
                <div key={category.id} className="mb-6">
                  <h3 className="font-bold mb-3 text-lg border-b pb-2">
                    {isArabic ? category.nameAr : category.name}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {productsByCategory[category.id]?.map((product, index) => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
                        index={index}
                        isArabic={isArabic}
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
      
      <SizeSelectionDialog
        product={selectedProduct}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAddToCart={onAddToCart}
        isArabic={isArabic}
      />
    </div>
  );
};

// Create a separate ProductCard component for better organization
const ProductCard: React.FC<{
  product: Product;
  onClick: () => void;
  index: number;
  isArabic: boolean;
}> = ({ product, onClick, index, isArabic }) => (
  <GlassCard
    animation="fade"
    delay={index * 50}
    className="cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 bg-secondary/30"
    onClick={onClick}
  >
    <div className="text-center py-3 px-2">
      <p className="font-medium truncate">
        {isArabic ? product.nameAr : product.name}
      </p>
      <p className="text-sm text-muted-foreground mt-1 font-bold">
        {product.variants[0].price} {isArabic ? "ر.س" : "SAR"}
      </p>
    </div>
  </GlassCard>
);

export default ProductsPanel;
