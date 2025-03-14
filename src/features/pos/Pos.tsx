
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "./hooks/useCart";
import { useProductFiltering } from "./hooks/useProductFiltering";
import { getSizeLabel } from "./utils/sizeLabels";
import { categories, products } from "./data/mockData";
import { formatInvoiceDate } from "./utils/formatters";
import PosHeader from "./components/PosHeader";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { handleInvoiceExport } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import PosLayout from "./components/layout/PosLayout";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import PosProductsRenderer from "./components/PosProductsRenderer";
import PosCartRenderer from "./components/PosCartRenderer";
import { PaymentMethod } from "@/types";

const Pos: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { settings } = useBusinessSettings();
  const { width, height } = useWindowDimensions();
  
  // Force a resize event when component mounts to ensure proper layout
  useEffect(() => {
    // Wait for the DOM to be fully rendered
    const timeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    // Set up periodic resize events during the initial load sequence
    const resizeIntervalId = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
    
    // Clear the interval after 2 seconds
    setTimeout(() => {
      clearInterval(resizeIntervalId);
    }, 2000);
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(resizeIntervalId);
    };
  }, []);
  
  // Recheck layout on width/height changes
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [width, height]);
  
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
  
  const handlePrintInvoice = (invoice: any) => {
    handleInvoiceExport("print", invoice, settings);
  };
  
  // Enhanced Add to Cart function with logging for debugging
  const handleAddToCart = (product: any, variantId: string) => {
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
  
  return (
    <div 
      className={`h-screen max-w-full flex flex-col m-0 p-0 ${
        isArabic ? "font-[system-ui]" : ""
      } auto-scale-container`}
      dir={isArabic ? "rtl" : "ltr"}
      style={{ zIndex: 10 }}
    >
      <PosHeader />

      <div className="flex-1 overflow-hidden stretch-content">
        <PosLayout isArabic={isArabic}>
          <PosProductsRenderer
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
            filteredProducts={filteredProducts || []}
            searchedProducts={searchedProducts || []}
            onAddToCart={handleAddToCart}
            isArabic={isArabic}
            getSizeLabel={getSizeLabelFn}
            showAllProducts={showAllProducts}
            setShowAllProducts={setShowAllProducts}
          />
          
          <PosCartRenderer
            cartItems={cartItems}
            isArabic={isArabic}
            language={language}
            subtotal={subtotal}
            taxAmount={taxAmount}
            total={total}
            discount={discount}
            discountType={discountType}
            orderType={orderType}
            tableNumber={tableNumber}
            paymentMethod={paymentMethod}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            clearCart={clearCart}
            createInvoice={handleCreateInvoice}
            setDiscount={setDiscount}
            setDiscountType={handleSetDiscountType}
            setOrderType={handleSetOrderType}
            setTableNumber={setTableNumber}
            setPaymentMethod={handleSetPaymentMethod}
            getSizeLabel={getSizeLabelFn}
          />
        </PosLayout>
      </div>

      <InvoiceDetailsModal 
        invoice={currentInvoice}
        open={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        formatInvoiceDate={(date) => formatInvoiceDate(date, language)}
        onPrint={handlePrintInvoice}
      />
    </div>
  );
};

export default Pos;
