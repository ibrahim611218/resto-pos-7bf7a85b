
import { Product } from "@/types";

export const validateProduct = (product: Product, isArabic: boolean) => {
  if (!product.name || !product.categoryId) {
    return {
      isValid: false,
      error: isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields"
    };
  }

  if (product.type === "sized" && (!product.variants || product.variants.length === 0)) {
    return {
      isValid: false,
      error: isArabic ? "يرجى إضافة مقاس واحد على الأقل" : "Please add at least one size"
    };
  }

  if (product.type === "single" && (!product.price || product.price <= 0)) {
    return {
      isValid: false,
      error: isArabic ? "يرجى إدخال سعر صحيح للمنتج" : "Please enter a valid price for the product"
    };
  }

  return { isValid: true, error: null };
};
