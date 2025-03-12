
import { useState, useEffect, useMemo } from "react";
import { Product } from "@/types";

export const useProductFiltering = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter products by active category
  const filteredProducts = useMemo(() => {
    return activeCategory
      ? products.filter((product) => product.categoryId === activeCategory)
      : products;
  }, [products, activeCategory]);

  // Filter products by search term
  const searchedProducts = useMemo(() => {
    if (!searchTerm.trim()) return filteredProducts;
    
    return filteredProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const nameArMatch = product.nameAr && product.nameAr.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || nameArMatch;
    });
  }, [filteredProducts, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    searchedProducts,
  };
};
