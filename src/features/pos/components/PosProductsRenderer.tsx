
import React from "react";
import { Product } from "@/types";
import ProductsPanel from "./ProductsPanel";
import { ScrollArea } from "@/components/ui/scroll-area";

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
 */
const PosProductsRenderer: React.FC<PosProductsRendererProps> = (props) => {
  return (
    <div className="h-full w-full flex flex-col overflow-auto">
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
