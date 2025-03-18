
import React from "react";
import { Product } from "@/types";
import ProductsPanel from "./ProductsPanel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/context/ThemeContext";

interface PosProductsRendererProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string | null;
  setActiveCategory: (id: string | null) => void;
  categories: any[];
  filteredProducts: Product[];
  searchedProducts: Product[];
  onAddToCart: (product: Product, variantId: string) => void;
  isArabic: boolean;
  getSizeLabel: (size: string) => string;
  showAllProducts?: boolean;
  setShowAllProducts?: (show: boolean) => void;
}

/**
 * Component that renders the products panel with search and filtering functionality
 * Handles product grid display and category navigation
 */
const PosProductsRenderer: React.FC<PosProductsRendererProps> = (props) => {
  const { theme } = useTheme();
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-card/30';

  return (
    <div className={`h-full w-full flex flex-col overflow-hidden ${bgClass} border border-border/30 rounded-lg shadow-sm`}>
      <ProductsPanel 
        searchTerm={props.searchTerm}
        setSearchTerm={props.setSearchTerm}
        activeCategory={props.activeCategory}
        setActiveCategory={props.setActiveCategory}
        categories={props.categories}
        filteredProducts={props.filteredProducts}
        searchedProducts={props.searchedProducts}
        onAddToCart={props.onAddToCart}
        isArabic={props.isArabic}
        getSizeLabel={props.getSizeLabel}
        showAllProducts={props.showAllProducts}
        setShowAllProducts={props.setShowAllProducts}
      />
    </div>
  );
};

export default PosProductsRenderer;
