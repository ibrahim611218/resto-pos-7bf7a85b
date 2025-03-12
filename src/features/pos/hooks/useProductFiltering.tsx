
import { useState, useMemo } from "react";
import { Product } from "@/types";

export const useProductFiltering = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // First filter by category
  const filteredProducts = useMemo(() => {
    return activeCategory
      ? products.filter((product) => product.categoryId === activeCategory)
      : products;
  }, [activeCategory, products]);
    
  // Then search from the category-filtered products
  const searchedProducts = useMemo(() => {
    if (!searchTerm) return filteredProducts;
    
    const lowerSearch = searchTerm.toLowerCase();
    return filteredProducts.filter((product) =>
      (product.name.toLowerCase().includes(lowerSearch) ||
      (product.nameAr && product.nameAr.includes(searchTerm)))
    );
  }, [searchTerm, filteredProducts]);
    
  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    searchedProducts,
  };
};
