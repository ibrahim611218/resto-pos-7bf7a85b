
import { useState, useEffect, useCallback } from "react";
import productService from "@/services/products/ProductService";
import categoryService from "@/services/categories/CategoryService";
import { Product, Category } from "@/types";

export const useProductsData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    console.log("🔥 [useProductsData] loadData() called");
    setIsLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
      ]);
      
      console.log("🔥 [useProductsData] RAW productsData from service:", productsData);
      console.log("🔥 [useProductsData] productsData type:", typeof productsData);
      console.log("🔥 [useProductsData] productsData length:", productsData?.length);
      console.log("🔥 [useProductsData] productsData is array:", Array.isArray(productsData));
      
      const activeCategories = categoriesData.filter((cat) => !cat.isDeleted);
      
      console.log("🔥 [useProductsData] Setting products to:", productsData);
      setProducts(productsData || []);
      setCategories(activeCategories);
      
      console.log("🔥 [useProductsData] Products state after setting:", productsData);
    } catch (err) {
      console.error("🔥 [useProductsData] Error loading data:", err);
      setProducts([]);
      setCategories([]);
    }
    setIsLoading(false);
    console.log("🔥 [useProductsData] loadData() completed");
  }, []);

  useEffect(() => {
    console.log("🔥 [useProductsData] useEffect triggered");
    loadData();
    const updateHandler = () => {
      console.log("🔥 [useProductsData] Event listener triggered, reloading data");
      loadData();
    };
    window.addEventListener("product-updated", updateHandler);
    window.addEventListener("category-updated", updateHandler);
    window.addEventListener("data-updated", updateHandler);

    return () => {
      window.removeEventListener("product-updated", updateHandler);
      window.removeEventListener("category-updated", updateHandler);
      window.removeEventListener("data-updated", updateHandler);
    };
  }, [loadData]);

  console.log("🔥 [useProductsData] Current state - products:", products, "loading:", isLoading);

  return { products, categories, isLoading };
};
