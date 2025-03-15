
import { useCart } from "./useCart";
import { useProductFiltering } from "./useProductFiltering";
import { getSizeLabel } from "../utils/sizeLabels";
import { categories, products } from "../data/mockData";
import { PaymentMethod, Product } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export const usePosState = () => {
  const { language } = useLanguage();
  
  const {
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
  } = useCart();
  
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    showAllProducts,
    setShowAllProducts,
    filteredProducts,
    searchedProducts,
  } = useProductFiltering(products);
  
  const getSizeLabelFn = (size: string) => getSizeLabel(size, language);
  
  const handleCreateInvoice = (
    customerName?: string, 
    customerTaxNumber?: string, 
    customerId?: string,
    commercialRegister?: string,
    address?: string,
    paidAmount?: number
  ) => {
    const invoice = createInvoice(customerName, customerTaxNumber, customerId, commercialRegister, address, paidAmount);
    setCurrentInvoice(invoice);
    setShowInvoiceModal(true);
    return invoice;
  };
  
  // Enhanced Add to Cart function with logging for debugging
  const handleAddToCart = (product: Product, variantId: string) => {
    console.log("Adding product to cart:", product?.name, "variant:", variantId);
    if (product) {
      addToCart(product, variantId);
    } else {
      console.error("Attempted to add undefined product to cart");
    }
  };
  
  // Type-safe wrapper functions to handle type conversions
  const handleSetDiscountType = (type: "percentage" | "fixed") => {
    setDiscountType(type);
  };
  
  const handleSetOrderType = (type: "takeaway" | "dineIn") => {
    setOrderType(type);
  };
  
  const handleSetPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  return {
    // Cart items
    cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    
    // Order configuration
    orderType,
    tableNumber,
    discount,
    discountType,
    paymentMethod,
    setTableNumber,
    setDiscount,
    
    // Invoice
    subtotal,
    taxAmount,
    total,
    currentInvoice,
    setCurrentInvoice,
    showInvoiceModal,
    setShowInvoiceModal,
    
    // Product filtering
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    showAllProducts,
    setShowAllProducts,
    filteredProducts,
    searchedProducts,
    
    // Utility functions
    getSizeLabelFn,
    
    // Handler functions
    handleCreateInvoice,
    handleAddToCart,
    handleSetDiscountType,
    handleSetOrderType,
    handleSetPaymentMethod,
    
    // Data
    categories
  };
};
