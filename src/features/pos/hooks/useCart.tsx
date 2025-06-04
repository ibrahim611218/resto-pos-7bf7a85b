import React, { createContext, useContext, useState, useEffect } from "react";
import { PaymentMethod, CartItem as InvoiceCartItem, Size } from "@/types";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  nameAr?: string;
  price: number;
  quantity: number;
  image?: string;
  size: Size | "regular";
  variantId: string;
  categoryId: string;
  taxable: boolean;
  type?: "sized" | "single";
}

interface CartContextType {
  cartItems: CartItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  discount: number;
  discountType: "percentage" | "fixed";
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  paymentMethod?: PaymentMethod;
  paidAmount?: number;
  addToCart: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  increaseQuantity: (id: string, size: string) => void;
  decreaseQuantity: (id: string, size: string) => void;
  setItemQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPaidAmount: (amount: number) => void;
  taxIncluded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [orderType, setOrderType] = useState<"takeaway" | "dineIn">("takeaway");
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const [paidAmount, setPaidAmount] = useState<number>();
  
  // استخدام إعدادات العمل التجاري للحصول على إعداد تضمين الضريبة
  const { settings } = useBusinessSettings();
  const taxIncluded = settings?.taxIncluded || false;
  
  // حساب المجموع الفرعي: جميع الأسعار × الكميات
  const rawSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // حساب الضريبة ومبلغ الضريبة بناءً على إعداد تضمين الضريبة
  let subtotal: number;
  let taxAmount: number;
  
  if (taxIncluded) {
    // إذا كانت الضريبة مضمنة في السعر، يجب استخراجها من المجموع الفرعي
    const taxRate = 0.15; // نسبة الضريبة 15%
    subtotal = rawSubtotal / (1 + taxRate);
    taxAmount = rawSubtotal - subtotal;
  } else {
    // إذا لم تكن الضريبة مضمنة، نضيفها إلى المجموع الفرعي
    subtotal = rawSubtotal;
    taxAmount = subtotal * 0.15;
  }
  
  // حساب مبلغ الخصم
  const discountAmount = discountType === "percentage" 
    ? (rawSubtotal) * (discount / 100) 
    : discount;
  
  // حساب المجموع النهائي
  const total = rawSubtotal - discountAmount;

  const addToCart = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && item.size === newItem.size
      );
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (id: string, size: string) => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  const increaseQuantity = (id: string, size: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.size === size 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decreaseQuantity = (id: string, size: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.size === size && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  const setItemQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) quantity = 1;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.size === size 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setTableNumber("");
    setPaymentMethod(undefined);
    setPaidAmount(undefined);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        subtotal,
        taxAmount,
        total,
        discount,
        discountType,
        orderType,
        tableNumber,
        paymentMethod,
        paidAmount,
        addToCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        setItemQuantity,
        clearCart,
        setDiscount,
        setDiscountType,
        setOrderType,
        setTableNumber,
        setPaymentMethod,
        setPaidAmount,
        taxIncluded
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
