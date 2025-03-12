
import React, { useState } from "react";
import { useCart } from "./hooks/useCart";
import { useProductFiltering } from "./hooks/useProductFiltering";
import { getSizeLabel } from "./utils/sizeLabels";
import { categories, products } from "./data/mockData";
import ProductsPanel from "./components/ProductsPanel";
import CartPanel from "./components/CartPanel";
import { useLanguage } from "@/context/LanguageContext";
import InvoiceDetailsModal from "@/features/invoices/components/InvoiceDetailsModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import { Receipt } from "lucide-react";

const Pos: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  
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

  // Mock function to find an invoice by number
  const findInvoiceByNumber = (number: string): Invoice | null => {
    // This is a mock implementation. In a real app, you'd fetch from an API
    const mockInvoices = [
      {
        id: "inv123",
        number: "INV-20230001",
        date: new Date(),
        items: [
          { id: "item1", name: "Espresso", nameAr: "إسبريسو", quantity: 2, price: 10, size: "medium", taxable: true },
          { id: "item2", name: "Cappuccino", nameAr: "كابتشينو", quantity: 1, price: 15, size: "large", taxable: true }
        ],
        subtotal: 35,
        taxAmount: 5.25,
        total: 40.25,
        discount: 0,
        discountType: "percentage" as const,
        paymentMethod: "نقدي",
        cashierId: "user1",
        cashierName: "كاشير",
        status: "completed" as const,
        orderType: "takeaway" as const
      }
    ];
    
    return mockInvoices.find(inv => inv.number === number) || null;
  };

  const handleRefundInvoice = (invoiceId: string): boolean => {
    // This is where you'd handle the refund logic
    // For now, we'll just show a success message
    toast({
      title: isArabic ? "تم إرجاع الفاتورة" : "Invoice Refunded",
      description: isArabic 
        ? `تم إرجاع الفاتورة رقم ${invoiceId} بنجاح` 
        : `Invoice #${invoiceId} has been refunded successfully`,
      variant: "default",
    });
    
    return true;
  };

  const handleInvoiceSearch = () => {
    if (!invoiceNumber.trim()) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "الرجاء إدخال رقم الفاتورة" : "Please enter an invoice number",
        variant: "destructive",
      });
      return;
    }
    
    const invoice = findInvoiceByNumber(invoiceNumber.trim());
    
    if (invoice) {
      setCurrentInvoice(invoice);
      setShowInvoiceModal(true);
    } else {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "لم يتم العثور على الفاتورة" : "Invoice not found",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div 
      className={`h-[calc(100vh-4rem)] flex flex-col ${
        isArabic ? "font-[system-ui]" : ""
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Invoice Return Section */}
      <div className="bg-muted/20 p-4 border-b flex flex-col sm:flex-row gap-3 items-center">
        <div className="flex-1 text-xl font-semibold">
          {isArabic ? "نقاط البيع" : "Point of Sale"}
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            placeholder={isArabic ? "رقم الفاتورة" : "Invoice Number"}
            className="flex-1 min-w-[200px]"
          />
          <Button
            variant="outline"
            onClick={handleInvoiceSearch}
            className="flex gap-2 items-center whitespace-nowrap"
          >
            <Receipt className="h-4 w-4" />
            {isArabic ? "استرجاع الفاتورة" : "Return Invoice"}
          </Button>
        </div>
      </div>

      {/* Main POS Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
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
      </div>

      <InvoiceDetailsModal 
        invoice={currentInvoice}
        open={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        formatInvoiceDate={formatInvoiceDate}
        onPrint={handlePrintInvoice}
        onRefund={handleRefundInvoice}
      />
    </div>
  );
};

export default Pos;
