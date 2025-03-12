
import React, { useState } from "react";
import { Product, Category } from "@/types";
import GlassCard from "@/components/ui-custom/GlassCard";
import SearchBox from "@/features/invoices/components/SearchBox";
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

  // Group products by category for better organization
  const productsByCategory = filteredProducts.reduce((acc: Record<string, Product[]>, product) => {
    if (!acc[product.categoryId]) {
      acc[product.categoryId] = [];
    }
    acc[product.categoryId].push(product);
    return acc;
  }, {});

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0f1729]">
      <div className="p-4 border-b border-gray-800">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={isArabic ? "بحث عن منتجات..." : "Search products..."}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filteredProducts.map((product, index) => (
            <GlassCard
              key={product.id}
              animation="fade"
              delay={index * 50}
              className="cursor-pointer hover:shadow-md transition-all bg-[#1c2537] border-gray-700 overflow-hidden"
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-square w-full overflow-hidden bg-gray-800">
                {product.image ? (
                  <img 
                    src={product.image}
                    alt={isArabic ? product.nameAr : product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <span>{isArabic ? "لا توجد صورة" : "No Image"}</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-white mb-2">
                  {isArabic ? product.nameAr : product.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {product.variants[0].price} {isArabic ? "ر.س" : "SAR"}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
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
