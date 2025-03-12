
import React, { useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";
import { useProductFiltering } from "@/features/pos/hooks/useProductFiltering";
import { getSizeLabel } from "@/features/pos/utils/sizeLabels";
import { categories, products } from "@/features/pos/data/mockData";
import { formatInvoiceDate } from "@/features/pos/utils/formatters";
import PosHeader from "@/features/pos/components/PosHeader";
import PosContent from "@/features/pos/components/PosContent";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const PosPage: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
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

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  return (
    <div className="h-screen w-full overflow-hidden fixed inset-0 bg-background pos-screen">
      <div className="flex h-full relative">
        {/* Sidebar Toggle Button */}
        <Button 
          variant="outline" 
          size="icon"
          className="absolute top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        {/* Collapsible Sidebar */}
        <div 
          className={`sidebar-container ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}
          style={{
            width: sidebarVisible ? '240px' : '0',
            transition: 'width 0.3s ease'
          }}
        >
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4">
              <h2 className="text-xl font-bold mb-4 centered-text">
                {isArabic ? "القائمة الجانبية" : "Sidebar"}
              </h2>
              
              <ul className="space-y-3">
                <li className="sidebar-item">
                  {isArabic ? "نقطة البيع" : "Point of Sale"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "المخزون" : "Inventory"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "المنتجات" : "Products"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "الفواتير" : "Invoices"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "التقارير" : "Reports"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "الإعدادات" : "Settings"}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div 
          className={`flex flex-col h-full flex-1 overflow-hidden transition-all duration-300`}
          style={{
            marginLeft: sidebarVisible ? '0' : '0',
            width: sidebarVisible ? 'calc(100% - 240px)' : '100%',
          }}
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
        </div>
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

export default PosPage;
