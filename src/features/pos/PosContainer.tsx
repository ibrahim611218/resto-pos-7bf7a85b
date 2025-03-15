
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PosHeader from "./components/PosHeader";
import PosContent from "./components/PosContent";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { formatInvoiceDate } from "./utils/formatters";
import { handleInvoiceExport } from "@/utils/invoice";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { usePosState } from "./hooks/usePosState";

const PosContainer: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { settings } = useBusinessSettings();
  const { width, height } = useWindowDimensions();
  
  // Use our new custom hook for POS state
  const posState = usePosState();
  
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

  const handlePrintInvoice = (invoice: any) => {
    handleInvoiceExport("print", invoice, settings);
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
        <PosContent
          cartItems={posState.cartItems}
          isArabic={isArabic}
          language={language}
          subtotal={posState.subtotal}
          taxAmount={posState.taxAmount}
          total={posState.total}
          discount={posState.discount}
          discountType={posState.discountType}
          orderType={posState.orderType}
          tableNumber={posState.tableNumber}
          paymentMethod={posState.paymentMethod}
          addToCart={posState.handleAddToCart}
          updateQuantity={posState.updateQuantity}
          removeItem={posState.removeItem}
          clearCart={posState.clearCart}
          createInvoice={posState.handleCreateInvoice}
          setDiscount={posState.setDiscount}
          setDiscountType={posState.handleSetDiscountType}
          setOrderType={posState.handleSetOrderType}
          setTableNumber={posState.setTableNumber}
          setPaymentMethod={posState.handleSetPaymentMethod}
          searchTerm={posState.searchTerm}
          setSearchTerm={posState.setSearchTerm}
          activeCategory={posState.activeCategory}
          setActiveCategory={posState.setActiveCategory}
          categories={posState.categories}
          filteredProducts={posState.filteredProducts}
          searchedProducts={posState.searchedProducts}
          getSizeLabel={posState.getSizeLabelFn}
          showAllProducts={posState.showAllProducts}
          setShowAllProducts={posState.setShowAllProducts}
        />
      </div>

      <InvoiceDetailsModal 
        invoice={posState.currentInvoice}
        open={posState.showInvoiceModal}
        onClose={() => posState.setShowInvoiceModal(false)}
        formatInvoiceDate={(date) => formatInvoiceDate(date, language)}
        onPrint={handlePrintInvoice}
      />
    </div>
  );
};

export default PosContainer;
