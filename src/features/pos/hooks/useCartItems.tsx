
import { useState, useCallback } from "react";
import { Product, CartItem, Size } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export const useCartItems = () => {
  const { language } = useLanguage();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const isArabic = language === "ar";

  const addToCart = useCallback((product: Product, quantity: number, size?: string) => {
    // Handle products with variants (sized products)
    if (product.variants.length > 0) {
      // If size is provided, find the variant with that size
      let variantId = "simple";
      
      if (size) {
        const variant = product.variants.find(v => v.size === size);
        if (variant) {
          variantId = variant.id;
        }
      } else {
        // Default to first variant if size not specified
        variantId = product.variants[0].id;
      }
      
      setCartItems((prev) => {
        const existingItemIndex = prev.findIndex(
          (item) => item.productId === product.id && item.variantId === variantId
        );
        
        if (existingItemIndex >= 0) {
          const newItems = [...prev];
          newItems[existingItemIndex].quantity += quantity;
          
          toast({
            title: isArabic ? "تم تحديث السلة" : "Cart updated",
            description: isArabic 
              ? `تم زيادة الكمية: ${product.nameAr || product.name}`
              : `Increased quantity: ${product.name}`,
          });
          
          return newItems;
        }
        
        const selectedVariant = product.variants.find(v => v.id === variantId) || product.variants[0];
        
        const newItem: CartItem = {
          id: `${product.id}-${variantId}-${Date.now()}`,
          productId: product.id,
          variantId: variantId,
          name: product.name,
          nameAr: product.nameAr,
          price: selectedVariant.price,
          size: selectedVariant.size,
          quantity: quantity,
          taxable: product.taxable,
        };
        
        toast({
          title: isArabic ? "تمت الإضافة إلى السلة" : "Added to cart",
          description: isArabic 
            ? `تمت إضافة ${product.nameAr || product.name} إلى السلة`
            : `${product.name} has been added to your cart`,
        });
        
        return [...prev, newItem];
      });
    } 
    // Handle products without variants (simple products)
    else {
      if (!product.price) {
        console.error("Simple product has no price:", product);
        return;
      }
      
      setCartItems((prev) => {
        const existingItemIndex = prev.findIndex(
          (item) => item.productId === product.id && item.variantId === "simple"
        );
        
        if (existingItemIndex >= 0) {
          const newItems = [...prev];
          newItems[existingItemIndex].quantity += quantity;
          
          toast({
            title: isArabic ? "تم تحديث السلة" : "Cart updated",
            description: isArabic 
              ? `تم زيادة الكمية: ${product.nameAr || product.name}`
              : `Increased quantity: ${product.name}`,
          });
          
          return newItems;
        }
        
        const newItem: CartItem = {
          id: `${product.id}-simple-${Date.now()}`,
          productId: product.id,
          variantId: "simple", // For simple products we use a "simple" identifier
          name: product.name,
          nameAr: product.nameAr,
          price: product.price,
          size: "medium" as Size, // Use "medium" as the default size for simple products
          quantity: quantity,
          taxable: product.taxable,
        };
        
        toast({
          title: isArabic ? "تمت الإضافة إلى السلة" : "Added to cart",
          description: isArabic 
            ? `تمت إضافة ${product.nameAr || product.name} إلى السلة`
            : `${product.name} has been added to your cart`,
        });
        
        return [...prev, newItem];
      });
    }
  }, [isArabic]);

  const updateQuantity = useCallback((itemId: string, change: number) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  }, []);

  const setQuantity = useCallback((itemId: string, quantity: number) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, quantity);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    toast({
      title: isArabic ? "تمت إزالة العنصر" : "Item removed",
      description: isArabic 
        ? "تم إزالة العنصر من السلة"
        : "Item has been removed from cart",
    });
  }, [isArabic]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    setQuantity,
    removeItem,
    clearCart
  };
};
