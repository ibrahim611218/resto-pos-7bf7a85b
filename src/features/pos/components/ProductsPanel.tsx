
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, Category } from "@/types";
import SizeSelectionDialog from "./SizeSelectionDialog";
import SearchBox from "@/features/invoices/components/SearchBox";
import { useScreenSize } from "@/hooks/use-mobile";
import { useGridColumns } from "../hooks/useGridColumns";
import CategoriesTabContent from "./products/CategoriesTabContent";
import AllProductsTabContent from "./products/AllProductsTabContent";

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
          
          <TabsContent value="categories">
            <CategoriesTabContent 
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchedProducts={searchedProducts}
              isArabic={isArabic}
              onProductClick={handleProductClick}
              getGridCols={getGridCols}
              isMobile={isMobile}
            />
          </TabsContent>
          
          <TabsContent value="all">
            <AllProductsTabContent 
              searchedProducts={searchedProducts}
              isArabic={isArabic}
              onProductClick={handleProductClick}
              getGridCols={getGridCols}
            />
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
