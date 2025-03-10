
import { useState } from "react";
import { toast } from "sonner";
import { Product, CartItem, Language, Invoice } from "@/types";
import { calculateInvoiceAmounts, generateInvoiceNumber } from "@/utils/invoice";
import { getSizeLabel } from "../utils/sizeLabels";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useCart = (language: Language) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const isArabic = language === "ar";
  const { user } = useAuth();
  
  const addToCart = (product: Product, variantId: string) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) return;
    
    const existingItem = cartItems.find(
      (item) => item.productId === product.id && item.variantId === variantId
    );
    
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: `${Date.now()}`,
        productId: product.id,
        name: product.name,
        nameAr: product.nameAr,
        variantId,
        size: variant.size,
        price: variant.price,
        quantity: 1,
        taxable: product.taxable,
      };
      setCartItems([...cartItems, newItem]);
    }
    
    toast.success(
      isArabic
        ? `تمت إضافة ${product.nameAr || product.name} (${
            getSizeLabel(variant.size, "ar")
          })`
        : `Added ${product.name} (${getSizeLabel(variant.size, "en")})`
    );
  };
  
  const updateQuantity = (itemId: string, change: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  const removeItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  
  const createInvoice = () => {
    if (cartItems.length === 0) {
      toast.error(
        isArabic ? "السلة فارغة" : "Cart is empty"
      );
      return;
    }
    
    const { subtotal, taxAmount, total } = calculateInvoiceAmounts(cartItems, 15); // 15% VAT
    
    const invoice: Invoice = {
      id: `${Date.now()}`,
      number: generateInvoiceNumber(),
      date: new Date(),
      items: [...cartItems],
      subtotal,
      taxAmount,
      total,
      paymentMethod: "Cash",
      cashierId: user?.id || "1",
      cashierName: user?.name || "Unknown Cashier",
      status: "completed",
    };
    
    console.log("Created invoice:", invoice);
    
    // Send order to kitchen
    const kitchenOrder = {
      id: `order-${invoice.id}`,
      invoiceId: invoice.id,
      items: [...cartItems],
      status: "pending",
      timestamp: new Date(),
    };
    
    // In a real app, this would be sent to a database
    // For now, we'll just log it
    console.log("Sending order to kitchen:", kitchenOrder);
    
    // Add to local storage as a simple way to simulate persistence
    const existingOrders = JSON.parse(localStorage.getItem('kitchenOrders') || '[]');
    localStorage.setItem('kitchenOrders', JSON.stringify([...existingOrders, kitchenOrder]));
    
    toast.success(
      isArabic
        ? `تم إنشاء الفاتورة رقم ${invoice.number} وإرسالها للمطبخ`
        : `Created invoice #${invoice.number} and sent to kitchen`
    );
    
    clearCart();
    return invoice;
  };
  
  const { subtotal, taxAmount, total } = calculateInvoiceAmounts(cartItems, 15); // 15% VAT
  
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
