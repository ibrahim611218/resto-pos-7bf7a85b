
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, Category } from "@/types";
import GlassCard from "@/components/ui-custom/GlassCard";
import CategoryList from "./CategoryList";
import ProductsList from "./ProductsList";
import SizeSelectionDialog from "./SizeSelectionDialog";
import SearchBox from "@/features/invoices/components/SearchBox";
import { useScreenSize } from "@/hooks/use-mobile";

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
  showAllProducts?: boolean;
  setShowAllProducts?: (show: boolean) => void;
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
  showAllProducts = false,
  setShowAllProducts = () => {},
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { width, isMobile, isTablet } = useScreenSize();
  const [activeTab, setActiveTab] = useState("categories");

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "all") {
      setShowAllProducts(true);
    } else {
      setShowAllProducts(false);
    }
  };

  // Calculate grid columns based on screen size - enhanced for better product display
  const getGridCols = () => {
    if (width < 500) return "grid-cols-2";
    if (width < 640) return "grid-cols-3";
    if (width < 768) return "grid-cols-4";
    if (width < 1024) return "grid-cols-5";
    if (width < 1280) return "grid-cols-6";
    return "grid-cols-8";
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
      <div className="container mx-auto px-4 py-2 border-b">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
        />
      </div>
      
      <div className="container mx-auto flex-1 overflow-y-auto px-4 py-4 pb-24">
        <Tabs 
          defaultValue="categories" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="mb-2"
        >
          <TabsList className="grid grid-cols-2 mb-2 sticky top-0 z-10">
            <TabsTrigger value="categories" className={isMobile ? "text-sm" : "text-base"}>
              {isArabic ? "الفئات" : "Categories"}
            </TabsTrigger>
            <TabsTrigger value="all" className={isMobile ? "text-sm" : "text-base"}>
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
                <h3 className={`font-bold mb-2 ${isMobile ? "text-base" : "text-lg"} sticky top-12 bg-background py-1 z-10`}>
                  {isArabic 
                    ? categories.find(c => c.id === activeCategory)?.nameAr || "الأصناف" 
                    : categories.find(c => c.id === activeCategory)?.name || "Products"}
                </h3>
                <div className={`grid ${getGridCols()} gap-2`}>
                  {searchedProducts.map((product, index) => (
                    <GlassCard
                      key={product.id}
                      animation="fade"
                      delay={index * 50}
                      className="cursor-pointer hover:shadow-md bg-secondary/30 p-1"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="w-full aspect-square overflow-hidden rounded-md bg-muted mb-1">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={isArabic ? product.nameAr || product.name : product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            {isArabic ? "لا توجد صورة" : "No image"}
                          </div>
                        )}
                      </div>
                      <div className="text-center py-1">
                        <p className="font-medium truncate text-sm">
                          {isArabic ? product.nameAr : product.name}
                        </p>
                        <p className="text-xs text-white mt-0.5 bg-black/70 rounded-full px-2 py-0.5 inline-block">
                          {product.variants.length > 0 ? product.variants[0].price : product.price} {isArabic ? "ر.س" : "SAR"}
                        </p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="mt-2 space-y-3">
            <div className={`grid ${getGridCols()} gap-2`}>
              {searchedProducts.map((product, index) => (
                <GlassCard
                  key={product.id}
                  animation="fade"
                  delay={index * 50}
                  className="cursor-pointer hover:shadow-md bg-secondary/30 p-1"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="w-full aspect-square overflow-hidden rounded-md bg-muted mb-1">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={isArabic ? product.nameAr || product.name : product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        {isArabic ? "لا توجد صورة" : "No image"}
                      </div>
                    )}
                  </div>
                  <div className="text-center py-1">
                    <p className="font-medium truncate text-sm">
                      {isArabic ? product.nameAr : product.name}
                    </p>
                    <p className="text-xs text-white mt-0.5 bg-black/70 rounded-full px-2 py-0.5 inline-block">
                      {product.variants.length > 0 ? product.variants[0].price : product.price} {isArabic ? "ر.س" : "SAR"}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
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
