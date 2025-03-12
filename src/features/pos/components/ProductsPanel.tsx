
import React, { useState } from "react";
import { Product, Category } from "@/types";
import CategoryList from "./CategoryList";
import ProductCard from "./ProductCard";
import SizeSelectionDialog from "./SizeSelectionDialog";
import SearchBox from "@/features/invoices/components/SearchBox";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const productsByCategory = filteredProducts.reduce((acc: Record<string, Product[]>, product) => {
    if (!acc[product.categoryId]) {
      acc[product.categoryId] = [];
    }
    acc[product.categoryId].push(product);
    return acc;
  }, {});

  return (
    <div className="flex-grow h-full flex flex-col overflow-hidden border-r border-border">
      <div className={`p-2 border-b ${isLightTheme ? 'bg-background' : 'bg-card/80'}`}>
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
          className="mb-2 mx-auto max-w-md"
        />
        
        <div className={`overflow-x-auto flex gap-2 p-2 rounded-lg ${isLightTheme ? 'bg-muted/50' : 'bg-muted/30'}`}>
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isArabic={isArabic}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {searchTerm ? (
          <div className="mt-2 space-y-2 w-full">
            <h3 className="font-bold text-lg mb-3 centered-text">
              {isArabic ? "نتائج البحث" : "Search Results"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center">
              {searchedProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                  isArabic={isArabic}
                />
              ))}
            </div>
          </div>
        ) : activeCategory ? (
          <div className="mt-2 space-y-2 w-full">
            <h3 className="font-bold text-lg mb-3 centered-text">
              {isArabic 
                ? categories.find(c => c.id === activeCategory)?.nameAr || "الأصناف" 
                : categories.find(c => c.id === activeCategory)?.name || "Products"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center">
              {filteredProducts
                .filter(product => product.categoryId === activeCategory)
                .map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                    isArabic={isArabic}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className="mt-2 space-y-4 w-full">
            {categories.map((category) => (
              productsByCategory[category.id]?.length > 0 && (
                <div key={category.id} className="mb-4">
                  <h3 className={`font-bold mb-2 text-lg border-b pb-1 centered-text ${isLightTheme ? 'text-primary' : 'text-primary-foreground'}`}>
                    {isArabic ? category.nameAr : category.name}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center">
                    {productsByCategory[category.id]?.map((product) => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product)}
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

export default ProductsPanel;
