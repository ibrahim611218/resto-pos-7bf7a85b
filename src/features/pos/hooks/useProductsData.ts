
import { useState, useEffect, useCallback } from "react";
import productService from "@/services/products/ProductService";
import categoryService from "@/services/categories/CategoryService";
import { Product, Category } from "@/types";

export const useProductsData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
      ]);
      const activeCategories = categoriesData.filter((cat) => !cat.isDeleted);
      setProducts(productsData);
      setCategories(activeCategories);
    } catch (err) {
      // يمكن تحسين التعامل مع الأخطاء لاحقًا حسب الحاجة
      setProducts([]);
      setCategories([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
    const updateHandler = () => loadData();

    window.addEventListener("product-updated", updateHandler);
    window.addEventListener("category-updated", updateHandler);
    window.addEventListener("data-updated", updateHandler);

    return () => {
      window.removeEventListener("product-updated", updateHandler);
      window.removeEventListener("category-updated", updateHandler);
      window.removeEventListener("data-updated", updateHandler);
    };
  }, [loadData]);

  return { products, categories, isLoading };
};
