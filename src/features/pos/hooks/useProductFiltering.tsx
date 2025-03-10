
import { useState } from "react";
import { Product } from "@/types";

export const useProductFiltering = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const filteredProducts = activeCategory
    ? products.filter((product) => product.categoryId === activeCategory)
    : products;
    
  const searchedProducts = searchTerm
    ? products.filter((product) =>
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.nameAr && product.nameAr.includes(searchTerm))))
    : filteredProducts;
    
  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    searchedProducts,
  };
};
