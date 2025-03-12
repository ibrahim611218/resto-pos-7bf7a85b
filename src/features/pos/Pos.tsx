
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "./hooks/useCart";
import { useProductFiltering } from "./hooks/useProductFiltering";
import { getSizeLabel } from "./utils/sizeLabels";
import { categories, products } from "./data/mockData";
import { formatInvoiceDate } from "./utils/formatters";
import { useInvoiceSearch } from "./hooks/useInvoiceSearch";
import PosHeader from "./components/PosHeader";
import PosContent from "./components/PosContent";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";

const Pos: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const {
    invoiceNumber,
    setInvoiceNumber,
    currentInvoice,
    setCurrentInvoice,
    showInvoiceModal,
    setShowInvoiceModal,
    handleInvoiceSearch,
    handleRefundInvoice,
  } = useInvoiceSearch();
  
  const {
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
  } = useCart();
  
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
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
    window.print();
  };
  
  return (
    <div 
      className={`h-[calc(100vh-4rem)] flex flex-col ${
        isArabic ? "font-[system-ui]" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <PosHeader
        invoiceNumber={invoiceNumber}
        setInvoiceNumber={setInvoiceNumber}
        handleInvoiceSearch={handleInvoiceSearch}
      />

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
        addToCart={addToCart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
        createInvoice={handleCreateInvoice}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        setOrderType={setOrderType}
        setTableNumber={setTableNumber}
        setPaymentMethod={setPaymentMethod}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        filteredProducts={filteredProducts}
        searchedProducts={searchedProducts}
        getSizeLabel={getSizeLabelFn}
      />

      <InvoiceDetailsModal 
        invoice={currentInvoice}
        open={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        formatInvoiceDate={(date) => formatInvoiceDate(date, language)}
        onPrint={handlePrintInvoice}
        onRefund={handleRefundInvoice}
      />
    </div>
  );
};

export default Pos;
