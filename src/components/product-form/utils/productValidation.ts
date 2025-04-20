
import { Product } from "@/types";

export const validateProduct = (product: Product, isArabic: boolean) => {
  // Print product details for debugging
  console.log("Validating product:", product);
  
  // Check if name is empty
  if (!product.name && !product.nameAr) {
    return {
      isValid: false,
      error: isArabic ? "يرجى إدخال اسم المنتج" : "Please enter a product name"
    };
  }
  
  // Check if category is selected
  if (!product.categoryId) {
    return {
      isValid: false,
      error: isArabic ? "يرجى اختيار تصنيف للمنتج" : "Please select a category"
    };
  }

  // For sized products, check if at least one variant exists
  if (product.type === "sized" && (!product.variants || product.variants.length === 0)) {
    return {
      isValid: false,
      error: isArabic ? "يرجى إضافة مقاس واحد على الأقل" : "Please add at least one size"
    };
  }

  // For sized products, check if prices are valid in all variants
  if (product.type === "sized" && product.variants) {
    const invalidPriceVariant = product.variants.find(variant => !variant.price || variant.price <= 0);
    if (invalidPriceVariant) {
      return {
        isValid: false,
        error: isArabic ? "يرجى إدخال أسعار صحيحة لجميع المقاسات" : "Please enter valid prices for all sizes"
      };
    }
  }

  // For single products, check if price is valid
  if (product.type === "single" && (!product.price || product.price <= 0)) {
    return {
      isValid: false,
      error: isArabic ? "يرجى إدخال سعر صحيح للمنتج" : "Please enter a valid price"
    };
  }

  return { isValid: true, error: null };
};
