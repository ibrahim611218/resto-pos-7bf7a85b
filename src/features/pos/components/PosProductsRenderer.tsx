
import React from "react";
import { Product } from "@/types";
import ProductsPanel from "./ProductsPanel";

interface PosProductsRendererProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string | null;
  setActiveCategory: (id: string | null) => void;
  categories: any[];
  filteredProducts: Product[];
  searchedProducts: Product[];
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
  isArabic: boolean;
  showAllProducts?: boolean;
  setShowAllProducts?: (show: boolean) => void;
}

/**
 * Component that renders the products panel with search and filtering functionality
 */
const PosProductsRenderer: React.FC<PosProductsRendererProps> = (props) => {
  // Add debug logs
  console.log("PosProductsRenderer - Categories:", props.categories?.length);
  console.log("PosProductsRenderer - Filtered Products:", props.filteredProducts?.length);
  console.log("PosProductsRenderer - Searched Products:", props.searchedProducts?.length);
  
  const getSizeLabel = (size: string) => {
    // This is a simple adapter function to match the expected prop
    return size;
  };
  
  return (
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
      getSizeLabel={getSizeLabel}
      showAllProducts={props.showAllProducts}
      setShowAllProducts={props.setShowAllProducts}
    />
  );
};

export default PosProductsRenderer;
