
import { useState, useCallback } from "react";
import { Product, CartItem } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export const useCartItems = () => {
  const { language } = useLanguage();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const isArabic = language === "ar";

  const addToCart = useCallback((product: Product, variantId: string) => {
    // Handle products with variants
    if (product.variants.length > 0) {
      const variant = product.variants.find((v) => v.id === variantId);
      
      if (!variant) {
        console.error("Variant not found");
        return;
      }
      
      setCartItems((prev) => {
        const existingItemIndex = prev.findIndex(
          (item) => item.productId === product.id && item.variantId === variantId
        );
        
        if (existingItemIndex >= 0) {
          const newItems = [...prev];
          newItems[existingItemIndex].quantity += 1;
          
          toast({
            title: isArabic ? "تم تحديث السلة" : "Cart updated",
            description: isArabic 
              ? `تم زيادة الكمية: ${product.nameAr || product.name}`
              : `Increased quantity: ${product.name}`,
          });
          
          return newItems;
        }
        
        const newItem: CartItem = {
          id: `${product.id}-${variantId}-${Date.now()}`,
          productId: product.id,
          variantId: variantId,
          name: product.name,
          nameAr: product.nameAr,
          price: variant.price,
          size: variant.size,
          quantity: 1,
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
      setCartItems((prev) => {
        const existingItemIndex = prev.findIndex(
          (item) => item.productId === product.id
        );
        
        if (existingItemIndex >= 0) {
          const newItems = [...prev];
          newItems[existingItemIndex].quantity += 1;
          
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
          price: product.price || 0,
          size: "", // No size for simple products
          quantity: 1,
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
