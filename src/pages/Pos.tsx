
import React, { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";
import { useProductFiltering } from "@/features/pos/hooks/useProductFiltering";
import { getSizeLabel } from "@/features/pos/utils/sizeLabels";
import { categories, products } from "@/features/pos/data/mockData";
import { formatInvoiceDate } from "@/features/pos/utils/formatters";
import PosHeader from "@/features/pos/components/PosHeader";
import PosContent from "@/features/pos/components/PosContent";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";

const PosPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
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
    filteredProducts,
    searchedProducts,
  } = useProductFiltering(products);
  
  // Memoize getSizeLabel function to prevent unnecessary recreation
  const getSizeLabelFn = useMemo(() => (size: string) => getSizeLabel(size, language), [language]);
  
  // Memoize handlers to prevent unnecessary recreations on each render
  const handleCreateInvoice = useMemo(() => 
    (customerName?: string, customerTaxNumber?: string) => {
      const invoice = createInvoice(customerName, customerTaxNumber);
      setCurrentInvoice(invoice);
      setShowInvoiceModal(true);
      return invoice;
    }, 
    [createInvoice, setCurrentInvoice, setShowInvoiceModal]
  );
  
  const handlePrintInvoice = useMemo(() => 
    (invoice: any) => {
      window.print();
    }, 
    []
  );
  
  return (
    <div className="min-h-screen w-full bg-background">
      <div 
        className="flex flex-col h-[100dvh]"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <PosHeader />

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
        />
      </div>
    </div>
  );
};

export default PosPage;
