
import { useCartItems } from "./useCartItems";
import { useOrderConfig } from "./useOrderConfig";
import { useInvoiceCreation } from "./useInvoiceCreation";
import { calculateInvoiceAmounts } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { Product, Customer, Invoice } from "@/types";

export const useCart = () => {
  const { settings } = useBusinessSettings();
  
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart: clearCartItems
  } = useCartItems();
  
  const {
    orderType,
    tableNumber,
    discount,
    discountType,
    paymentMethod,
    paidAmount,
    setOrderType,
    setTableNumber,
    setDiscount,
    setDiscountType,
    setPaymentMethod,
    setPaidAmount,
    resetOrderConfig
  } = useOrderConfig();

  // Calculate invoice amounts
  const { subtotal, taxAmount, total } = calculateInvoiceAmounts(
    cartItems,
    settings.taxRate,
    discount,
    discountType,
    settings.taxIncluded
  );
  
  // Calculate remaining amount
  const remainingAmount = Math.max(0, total - paidAmount);
  
  // Clear the entire cart (items + config)
  const clearCart = () => {
    clearCartItems();
    resetOrderConfig();
  };
  
  const {
    createInvoice: internalCreateInvoice,
    currentInvoice,
    setCurrentInvoice,
    showInvoiceModal,
    setShowInvoiceModal
  } = useInvoiceCreation(
    cartItems,
    subtotal,
    taxAmount,
    total,
    discount,
    discountType,
    orderType,
    tableNumber,
    paymentMethod,
    clearCart
  );
  
  // Wrapper for create invoice that also clears the cart
  const createInvoice = (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string): Invoice => {
    // Pass the remaining amount to the invoice creation
    const invoice = internalCreateInvoice(customerName, customerTaxNumber, customerId, commercialRegister, address, paidAmount, remainingAmount);
    clearCart();
    return invoice;
  };

  return {
    // Cart items
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    
    // Order configuration
    orderType,
    tableNumber,
    discount,
    discountType,
    paymentMethod,
    paidAmount,
    remainingAmount,
    setOrderType,
    setTableNumber,
    setDiscount,
    setDiscountType,
    setPaymentMethod,
    setPaidAmount,
    
    // Invoice
    subtotal,
    taxAmount,
    total,
    createInvoice,
    currentInvoice,
    setCurrentInvoice,
    showInvoiceModal,
    setShowInvoiceModal
  };
};
