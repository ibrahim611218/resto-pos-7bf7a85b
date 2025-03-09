
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, Category } from "@/types";
import GlassCard from "@/components/ui-custom/GlassCard";
import CategoryList from "./CategoryList";
import ProductsList from "./ProductsList";
import SizeSelectionDialog from "./SizeSelectionDialog";

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

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
      </div>
      
      <Tabs defaultValue="categories" className="mb-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="categories">
            {isArabic ? "الفئات" : "Categories"}
          </TabsTrigger>
          <TabsTrigger value="all">
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
        </TabsContent>
        
        <TabsContent value="all" className="mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {filteredProducts.map((product, index) => (
              <GlassCard
                key={product.id}
                animation="fade"
                delay={index * 50}
                className="cursor-pointer hover:shadow-md"
                onClick={() => handleProductClick(product)}
              >
                <div className="text-center py-2">
                  <p className="font-medium">
                    {isArabic ? product.nameAr : product.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.variants[0].price} {isArabic ? "ر.س" : "SAR"}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <ProductsList 
        products={searchedProducts} 
        onAddToCart={onAddToCart} 
        isArabic={isArabic}
        getSizeLabel={getSizeLabel}
      />

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
