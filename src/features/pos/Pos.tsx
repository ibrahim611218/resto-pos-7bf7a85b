
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "./hooks/useCart";
import { useProductFiltering } from "./hooks/useProductFiltering";
import { getSizeLabel } from "./utils/sizeLabels";
import { categories, products } from "./data/mockData";
import { formatInvoiceDate } from "./utils/formatters";
import PosHeader from "./components/PosHeader";
import PosContent from "./components/PosContent";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { handleInvoiceExport } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";

const Pos: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { settings } = useBusinessSettings();
  
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
  
  const handleCreateInvoice = (customerName?: string, customerTaxNumber?: string) => {
    const invoice = createInvoice(customerName, customerTaxNumber);
    setCurrentInvoice(invoice);
    setShowInvoiceModal(true);
    return invoice;
  };
  
  const handlePrintInvoice = (invoice: any) => {
    handleInvoiceExport("print", invoice, settings);
  };
  
  // Create a wrapper for addToCart that matches the expected signature
  const handleAddToCart = (product: any, quantity: number = 1, size?: string) => {
    addToCart(product, quantity, size);
  };
  
  return (
    <div 
      className={`h-screen max-w-full flex flex-col m-0 p-0 ${
        isArabic ? "font-[system-ui]" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
      style={{ zIndex: 10 }}
    >
      <PosHeader />

      <div className="flex-1 overflow-hidden">
        <PosContent 
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
          paidAmount={paidAmount}
          remainingAmount={remainingAmount}
          addToCart={handleAddToCart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          clearCart={clearCart}
          createInvoice={handleCreateInvoice}
          setDiscount={setDiscount}
          setDiscountType={setDiscountType}
          setOrderType={setOrderType}
          setTableNumber={setTableNumber}
          setPaymentMethod={setPaymentMethod}
          setPaidAmount={setPaidAmount}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          filteredProducts={filteredProducts}
          searchedProducts={searchedProducts}
          getSizeLabel={getSizeLabelFn}
          showAllProducts={showAllProducts}
          setShowAllProducts={setShowAllProducts}
        />
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
