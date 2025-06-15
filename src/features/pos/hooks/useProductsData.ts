
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
      // 👇 إضافة طباعة تفاصيل المنتجات الأصلية
      console.log("[useProductsData] productsData (from service):", productsData);
      const activeCategories = categoriesData.filter((cat) => !cat.isDeleted);
      setProducts(productsData);
      setCategories(activeCategories);
    } catch (err) {
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

  // 👇 عداد لإظهار المنتجات المتوفرة (تحت الفنكشن)
  if (!isLoading) {
    console.log(`[useProductsData] (debug): يوجد ${products.length} منتج مقروء من الخدمة:`, products.map((p) => ({id: p.id, name: p.name, nameAr: p.nameAr})));
  }

  return { products, categories, isLoading };
};
