import { useState, useCallback } from "react";
import { Product, CartItem, Invoice, PaymentMethod, Customer } from "@/types";
import { toast } from "@/hooks/use-toast";
import { generateInvoiceNumber, calculateInvoiceAmounts } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";

export const useCart = () => {
  const { language } = useLanguage();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"takeaway" | "dineIn">("takeaway");
  const [tableNumber, setTableNumber] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  
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
    setOrderType("takeaway");
    setPaymentMethod("cash");
  }, []);

  const { subtotal, taxAmount, total } = calculateInvoiceAmounts(
    cartItems,
    settings.taxRate,
    discount,
    discountType,
    settings.taxIncluded
  );

  const createInvoice = useCallback((customerName?: string, customerTaxNumber?: string): Invoice => {
    const invoiceId = generateInvoiceNumber();
    
    let customer: Customer | undefined;
    if (customerName) {
      customer = {
        name: customerName,
        taxNumber: customerTaxNumber
      };
    }
    
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
      paymentMethod: paymentMethod === "cash" ? "نقدي" : "شبكة",
      cashierId: user?.id || "unknown",
      cashierName: user?.name || "كاشير",
      status: "completed",
      orderType: orderType,
      tableNumber: orderType === "dineIn" ? tableNumber : undefined,
      customer: customer
    };
    
    toast({
      title: isArabic ? "تم إنشاء الفاتورة" : "Invoice created",
      description: isArabic 
        ? `تم إنشاء الفاتورة رقم ${invoiceId} بنجاح`
        : `Invoice #${invoiceId} has been created successfully`,
      variant: "default",
    });
    
    return invoice;
  }, [cartItems, subtotal, taxAmount, total, discount, discountType, paymentMethod, user, isArabic, orderType, tableNumber]);

  return {
    cartItems,
    subtotal,
    taxAmount,
    total,
    discount,
    discountType,
    orderType,
    tableNumber,
    paymentMethod,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    createInvoice,
    setDiscount,
    setDiscountType,
    setOrderType,
    setTableNumber,
    setPaymentMethod,
  };
};
