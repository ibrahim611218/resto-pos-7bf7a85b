
import { useState, useMemo } from "react";
import { Product } from "@/types";

export const useProductFiltering = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filteredProducts = useMemo(() => {
    return activeCategory
      ? products.filter((product) => product.categoryId === activeCategory)
      : products;
  }, [activeCategory, products]);
    
  const searchedProducts = useMemo(() => {
    if (!searchTerm) return filteredProducts;
    
    return products.filter((product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.nameAr && product.nameAr.includes(searchTerm))));
  }, [searchTerm, filteredProducts, products]);
    
  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    searchedProducts,
  };
};
