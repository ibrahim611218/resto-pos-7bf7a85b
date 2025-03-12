
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
    <div className="flex flex-col h-full overflow-hidden border-r">
      <div className="p-2 border-b">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <Tabs defaultValue="categories" className="mb-2">
          <TabsList className="grid grid-cols-2 mb-2 sticky top-0 z-10">
            <TabsTrigger value="categories" className="text-base">
              {isArabic ? "الفئات" : "Categories"}
            </TabsTrigger>
            <TabsTrigger value="all" className="text-base">
              {isArabic ? "كل المنتجات" : "All Products"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="mt-2">
            <CategoryList
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              isArabic={isArabic}
            />
            
            {activeCategory && (
              <div className="mt-2">
                <h3 className="font-bold mb-2 text-lg sticky top-12 bg-background py-1 z-10">
                  {isArabic 
                    ? categories.find(c => c.id === activeCategory)?.nameAr || "الأصناف" 
                    : categories.find(c => c.id === activeCategory)?.name || "Products"}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2">
                  {searchedProducts.map((product, index) => (
                    <GlassCard
                      key={product.id}
                      animation="fade"
                      delay={index * 50}
                      className="cursor-pointer hover:shadow-md bg-secondary/30 p-1"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="text-center py-1">
                        <p className="font-medium truncate text-sm">
                          {isArabic ? product.nameAr : product.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {product.variants[0].price} {isArabic ? "ر.س" : "SAR"}
                        </p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="mt-2 space-y-3">
            {categories.map((category) => (
              productsByCategory[category.id]?.length > 0 && (
                <div key={category.id} className="mb-3">
                  <h3 className="font-bold mb-2 text-sm border-b pb-1 sticky top-12 bg-background z-10">
                    {isArabic ? category.nameAr : category.name}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2">
                    {productsByCategory[category.id]?.map((product, index) => (
                      <GlassCard
                        key={product.id}
                        animation="fade"
                        delay={index * 50}
                        className="cursor-pointer hover:shadow-md bg-secondary/30 p-1"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="text-center py-1">
                          <p className="font-medium truncate text-sm">
                            {isArabic ? product.nameAr : product.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {product.variants[0].price} {isArabic ? "ر.س" : "SAR"}
                          </p>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )
            ))}
          </TabsContent>
        </Tabs>
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
