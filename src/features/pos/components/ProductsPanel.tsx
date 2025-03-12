
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
      <div className="p-3">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 pt-0">
        <Tabs defaultValue="categories" className="mb-2">
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="categories" className="text-base">
              {isArabic ? "الفئات" : "Categories"}
            </TabsTrigger>
            <TabsTrigger value="all" className="text-base">
              {isArabic ? "كل المنتجات" : "All Products"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="mt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
              {categories.map((category) => (
                <GlassCard 
                  key={category.id}
                  animation="fade"
                  delay={parseInt(category.id.replace("cat", "")) * 50}
                  className={`cursor-pointer hover:shadow-md transition-all duration-200 h-full
                    ${activeCategory === category.id ? "bg-[#F97316]/20 border border-[#F97316]/50" : "bg-secondary/30"}`}
                  onClick={() => setActiveCategory(category.id === activeCategory ? null : category.id)}
                >
                  <div className="text-center py-2 px-1">
                    <p className="font-medium truncate">
                      {isArabic ? category.nameAr : category.name}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            {(activeCategory || searchTerm) && (
              <div className="mt-2">
                <h3 className="font-bold mb-2 text-lg">
                  {isArabic 
                    ? (activeCategory ? categories.find(c => c.id === activeCategory)?.nameAr : "نتائج البحث") || "الأصناف" 
                    : (activeCategory ? categories.find(c => c.id === activeCategory)?.name : "Search Results") || "Products"}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                  {searchedProducts.map((product, index) => (
                    <GlassCard
                      key={product.id}
                      animation="fade"
                      delay={index * 50}
                      className="cursor-pointer hover:shadow-md transition-all bg-secondary/30 h-full"
                      onClick={() => handleProductClick(product)}
                    >
                      {product.image && (
                        <div className="aspect-square w-full overflow-hidden">
                          <img 
                            src={product.image}
                            alt={isArabic ? product.nameAr : product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="text-center p-2">
                        <p className="font-medium truncate">
                          {isArabic ? product.nameAr : product.name}
                        </p>
                        <p className="text-sm text-white mt-1 bg-black/60 rounded-full px-2 py-0.5 inline-block">
                          {product.variants[0].price} {isArabic ? "ر.س" : "SAR"}
                        </p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="mt-2">
            <div className="space-y-4">
              {categories.map((category) => (
                productsByCategory[category.id]?.length > 0 && (
                  <div key={category.id} className="mb-4">
                    <h3 className="font-bold mb-2 text-lg border-b pb-1">
                      {isArabic ? category.nameAr : category.name}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                      {productsByCategory[category.id]?.map((product, index) => (
                        <GlassCard
                          key={product.id}
                          animation="fade"
                          delay={index * 50}
                          className="cursor-pointer hover:shadow-md transition-all bg-secondary/30 h-full"
                          onClick={() => handleProductClick(product)}
                        >
                          {product.image && (
                            <div className="aspect-square w-full overflow-hidden">
                              <img 
                                src={product.image}
                                alt={isArabic ? product.nameAr : product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="text-center p-2">
                            <p className="font-medium truncate">
                              {isArabic ? product.nameAr : product.name}
                            </p>
                            <p className="text-sm text-white mt-1 bg-black/60 rounded-full px-2 py-0.5 inline-block">
                              {product.variants[0].price} {isArabic ? "ر.س" : "SAR"}
                            </p>
                          </div>
                        </GlassCard>
                      ))}
                    </div>
                  </div>
                )
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
