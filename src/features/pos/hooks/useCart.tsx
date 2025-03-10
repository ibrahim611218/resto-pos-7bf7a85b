import { useState, useCallback } from "react";
import { Product, CartItem, Language } from "@/types";
import { toast } from "@/hooks/use-toast";
import { generateInvoiceNumber } from "@/utils/invoice";

export const useCart = (language: Language) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const isArabic = language === "ar";

  const addToCart = useCallback((product: Product, variantId: string) => {
    const variant = product.variants.find((v) => v.id === variantId);
    
    if (!variant) {
      console.error("Variant not found");
      return;
    }
    
    setCartItems((prev) => {
      // Check if this product variant already exists in cart
      const existingItemIndex = prev.findIndex(
        (item) => item.productId === product.id && item.variantId === variantId
      );
      
      // If found, increment quantity
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
      
      // Otherwise add new item
      const newItem: CartItem = {
        id: `${product.id}-${variantId}-${Date.now()}`,
        productId: product.id,
        variantId: variantId,
        name: product.name,
        nameAr: product.nameAr,
        price: variant.price,
        size: variant.size,
        quantity: 1,
      };
      
      toast({
        title: isArabic ? "تمت الإضافة إلى السلة" : "Added to cart",
        description: isArabic 
          ? `تمت إضافة ${product.nameAr || product.name} إلى السلة`
          : `${product.name} has been added to your cart`,
      });
      
      return [...prev, newItem];
    });
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

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const taxRate = 0.15; // 15% VAT
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const createInvoice = useCallback(() => {
    const invoiceId = generateInvoiceNumber();
    
    // In a real app, you'd save the invoice to a database here
    // For now, we'll just show a toast notification
    toast({
      title: isArabic ? "تم إنشاء الفاتورة" : "Invoice created",
      description: isArabic 
        ? `تم إنشاء الفاتورة رقم ${invoiceId} بنجاح`
        : `Invoice #${invoiceId} has been created successfully`,
      variant: "success",
    });
    
    return invoiceId;
  }, [isArabic]);

  return {
    cartItems,
    subtotal,
    taxAmount,
    total,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    createInvoice,
  };
};
