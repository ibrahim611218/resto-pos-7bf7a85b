
import { useState, useCallback } from "react";
import { Product, CartItem, Language, Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import { generateInvoiceNumber, calculateInvoiceAmounts } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useCart = (language: Language) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"takeaway" | "dineIn">("takeaway");
  const [tableNumber, setTableNumber] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  
  const { settings } = useBusinessSettings();
  const { user } = useAuth();
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
    setDiscount(0);
    setTableNumber("");
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const taxRate = settings.taxRate / 100 || 0.15; // Use tax rate from settings
  const taxAmount = subtotal * taxRate;
  
  // Calculate discount amount
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100)
    : discount;
  
  // Calculate final total after discount
  const total = Math.max(0, subtotal + taxAmount - discountAmount);

  const createInvoice = useCallback((): Invoice => {
    const invoiceId = generateInvoiceNumber();
    
    // Create the invoice object with all needed data
    const invoice: Invoice = {
      id: Math.random().toString(36).substring(2, 9),
      number: invoiceId,
      date: new Date(),
      items: [...cartItems],
      subtotal: subtotal,
      taxAmount: taxAmount,
      total: total,
      discount: discount,
      discountType: discountType,
      paymentMethod: "نقدي", // Default payment method
      cashierId: user?.id || "unknown",
      cashierName: user?.name || "كاشير",
      status: "completed",
      orderType: orderType,
      tableNumber: orderType === "dineIn" ? tableNumber : undefined
    };
    
    // In a real app, you'd save the invoice to a database here
    toast({
      title: isArabic ? "تم إنشاء الفاتورة" : "Invoice created",
      description: isArabic 
        ? `تم إنشاء الفاتورة رقم ${invoiceId} بنجاح`
        : `Invoice #${invoiceId} has been created successfully`,
      variant: "default",
    });
    
    return invoice;
  }, [cartItems, subtotal, taxAmount, total, discount, discountType, user, isArabic, orderType, tableNumber]);

  return {
    cartItems,
    subtotal,
    taxAmount,
    total,
    discount,
    discountType,
    orderType,
    tableNumber,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    createInvoice,
    setDiscount,
    setDiscountType,
    setOrderType,
    setTableNumber,
  };
};
