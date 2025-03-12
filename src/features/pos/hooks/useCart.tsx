
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
    setOrderType,
    setTableNumber,
    setDiscount,
    setDiscountType,
    setPaymentMethod,
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
  const createInvoice = (customerName?: string, customerTaxNumber?: string): Invoice => {
    const invoice = internalCreateInvoice(customerName, customerTaxNumber);
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
    setOrderType,
    setTableNumber,
    setDiscount,
    setDiscountType,
    setPaymentMethod,
    
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
