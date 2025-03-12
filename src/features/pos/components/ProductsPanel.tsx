
import React, { useState } from "react";
import { Product, Category } from "@/types";
import CategoryList from "./CategoryList";
import ProductCard from "./ProductCard";
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
    <div className="pos-products-panel">
      <div className="p-3 text-center border-b border-border/60 bg-muted/30">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
          className="mb-3 mx-auto max-w-md"
        />
        
        <div className="pos-categories">
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isArabic={isArabic}
          />
        </div>
      </div>
      
      <div className="pos-products-grid">
        {searchTerm ? (
          <div className="mt-2 space-y-2 w-full">
            <h3 className="font-bold text-lg mb-3 centered-text">
              {isArabic ? "نتائج البحث" : "Search Results"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 place-items-center">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 place-items-center">
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
          <div className="mt-2 space-y-6 w-full">
            {categories.map((category) => (
              productsByCategory[category.id]?.length > 0 && (
                <div key={category.id} className="mb-6">
                  <h3 className="font-bold mb-3 text-lg border-b pb-2 centered-text">
                    {isArabic ? category.nameAr : category.name}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 place-items-center">
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
