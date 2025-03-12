import React, { useState } from "react";
import { useCart } from "./hooks/useCart";
import { useProductFiltering } from "./hooks/useProductFiltering";
import { getSizeLabel } from "./utils/sizeLabels";
import { categories, products } from "./data/mockData";
import ProductsPanel from "./components/ProductsPanel";
import CartPanel from "./components/CartPanel";
import { useLanguage } from "@/context/LanguageContext";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { Invoice } from "@/types";

const Pos: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  
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
  
  const handleCreateInvoice = () => {
    const invoice = createInvoice();
    setCurrentInvoice(invoice);
    setShowInvoiceModal(true);
    return invoice;
  };
  
  const formatInvoiceDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handlePrintInvoice = (invoice: Invoice) => {
    window.print();
  };
  
  return (
    <div 
      className={`h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden ${
        isArabic ? "font-[system-ui]" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <CartPanel 
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
        createInvoice={handleCreateInvoice}
        clearCart={clearCart}
        getSizeLabel={getSizeLabelFn}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        setOrderType={setOrderType}
        setTableNumber={setTableNumber}
        setPaymentMethod={setPaymentMethod}
      />
      
      <ProductsPanel 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        filteredProducts={filteredProducts}
        searchedProducts={searchedProducts}
        onAddToCart={addToCart}
        isArabic={isArabic}
        getSizeLabel={getSizeLabelFn}
      />

      <InvoiceDetailsModal 
        invoice={currentInvoice}
        open={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        formatInvoiceDate={formatInvoiceDate}
        onPrint={handlePrintInvoice}
      />
    </div>
  );
};

export default Pos;
