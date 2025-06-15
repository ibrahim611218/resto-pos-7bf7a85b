
import { useMemo } from "react";
import { Product } from "@/types";

interface FilterParams {
  products: Product[];
  selectedCategory: string;
  searchTerm: string;
}

export function useFilterProducts({ products, selectedCategory, searchTerm }: FilterParams) {
  return useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.categoryId === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const nameAr = product.nameAr?.toLowerCase() || "";
        return name.includes(term) || nameAr.includes(term);
      });
    }

    return filtered;
  }, [products, selectedCategory, searchTerm]);
}
