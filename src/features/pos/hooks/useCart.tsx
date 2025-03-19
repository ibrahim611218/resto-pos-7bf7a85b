
import React, { createContext, useContext, useState, useEffect } from "react";
import { PaymentMethod } from "@/types";

interface CartItem {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
  quantity: number;
  image?: string;
  size: string;
  categoryId: string;
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

  // Calculate subtotal (sum of all item prices * quantities)
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate tax amount (15% VAT)
  const taxAmount = subtotal * 0.15;
  
  // Calculate discount amount
  const discountAmount = discountType === "percentage" 
    ? (subtotal + taxAmount) * (discount / 100) 
    : discount;
  
  // Calculate total
  const total = subtotal + taxAmount - discountAmount;

  const addToCart = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && item.size === newItem.size
      );
      
      if (existingItemIndex !== -1) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
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
        setPaidAmount
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
