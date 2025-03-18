
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, Category } from "@/types";
import SizeSelectionDialog from "./SizeSelectionDialog";
import SearchBox from "@/features/invoices/components/SearchBox";
import { useScreenSize } from "@/hooks/use-mobile";
import { useGridColumns } from "../hooks/useGridColumns";
import CategoriesTabContent from "./products/CategoriesTabContent";
import AllProductsTabContent from "./products/AllProductsTabContent";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const { isMobile } = useScreenSize();
  const [activeTab, setActiveTab] = useState("categories");
  const { getGridCols } = useGridColumns();
  const { theme } = useTheme();

  // Background color based on theme
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-card';
  const headerBgClass = theme === 'light' ? 'bg-gray-50' : 'bg-background';

  const handleProductClick = (product: Product) => {
    // For single products with price (not variants), add directly to cart
    if (product.variants.length === 0 && product.price !== undefined) {
      onAddToCart(product, "simple");
      return;
    }
    
    // For products with variants, open the dialog
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

  return (
    <div 
      className={`flex flex-col h-full overflow-hidden ${bgClass} rounded-lg`}
      style={{ contain: 'layout' }}
    >
      <div className={`sticky top-0 z-10 ${headerBgClass} p-2 shadow-sm`}>
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
          className="mb-2"
        />
        
        <Tabs 
          defaultValue="categories" 
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full mb-1">
            <TabsTrigger value="categories" className={isMobile ? "text-sm py-1.5" : "text-base"}>
              {isArabic ? "الفئات" : "Categories"}
            </TabsTrigger>
            <TabsTrigger value="all" className={isMobile ? "text-sm py-1.5" : "text-base"}>
              {isArabic ? "كل المنتجات" : "All Products"}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-1 pb-20" type="auto">
          <Tabs 
            defaultValue="categories" 
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsContent value="categories" className="mt-0 p-0">
              <CategoriesTabContent 
                categories={categories || []}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchedProducts={filteredProducts || []}
                isArabic={isArabic}
                onProductClick={handleProductClick}
                getGridCols={getGridCols}
                isMobile={isMobile}
              />
            </TabsContent>
            
            <TabsContent value="all" className="mt-0 p-0">
              <AllProductsTabContent 
                searchedProducts={searchedProducts || []}
                isArabic={isArabic}
                onProductClick={handleProductClick}
                getGridCols={getGridCols}
              />
            </TabsContent>
          </Tabs>
        </ScrollArea>
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
