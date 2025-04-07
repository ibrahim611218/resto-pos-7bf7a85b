
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import { cn } from "@/lib/utils";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { createInvoiceObject } from "@/utils/invoice";
import { Invoice } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
import { useInvoiceFormatting } from "@/features/invoices/hooks/useInvoiceFormatting";
import { usePaymentDialogs } from "../../hooks/usePaymentDialogs";
import CartContent from "./CartContent";
import InvoiceDialogs from "./InvoiceDialogs";

interface CartPanelProps {
  expanded: boolean;
  onToggleExpand: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ 
  expanded, 
  onToggleExpand 
}) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const { isMobile } = useWindowDimensions();
  const { settings } = useBusinessSettings();
  const { formatInvoiceDate, printInvoice } = useInvoiceFormatting();
  
  const { 
    cartItems, 
    clearCart, 
    subtotal, 
    taxAmount, 
    total,
    discount,
    discountType,
    setDiscount,
    setDiscountType,
    orderType,
    setOrderType,
    tableNumber,
    setTableNumber,
    paymentMethod,
    paidAmount,
    setPaymentMethod,
    setPaidAmount
  } = useCart();

  const {
    showPaymentMethodDialog,
    showPaidAmountDialog,
    currentInvoice,
    showInvoiceModal,
    setCurrentInvoice,
    setShowInvoiceModal,
    handleCreateInvoice,
    handlePaymentMethodSelected,
    handlePaidAmountConfirmed,
    handleShowPaidAmountDialog,
    handleCloseInvoiceModal
  } = usePaymentDialogs({
    paymentMethod,
    setPaymentMethod,
    setPaidAmount,
    total
  });

  const createAndShowInvoice = (paymentMethod: "cash" | "card", paidAmount: number) => {
    // Use the cartItems directly since they now have all required properties
    const invoice = createInvoiceObject(
      cartItems,
      subtotal,
      taxAmount,
      discount,
      discountType,
      total,
      paymentMethod
    );
    
    // Add additional invoice details
    invoice.paidAmount = paidAmount;
    invoice.orderType = orderType;
    if (orderType === "dineIn" && tableNumber) {
      invoice.tableNumber = tableNumber;
    }
    
    // Save invoice to current state and show invoice modal
    setCurrentInvoice(invoice);
    setShowInvoiceModal(true);
    
    // Clear cart
    clearCart();
    
    // Show success notification
    toast({
      title: isArabic ? "تم إنشاء الفاتورة بنجاح" : "Invoice created successfully",
      description: isArabic ? `رقم الفاتورة: ${invoice.number}` : `Invoice Number: ${invoice.number}`,
    });
  };
  
  // Override the completeInvoiceProcess method
  React.useEffect(() => {
    if (paymentMethod && paidAmount !== undefined) {
      createAndShowInvoice(paymentMethod, paidAmount);
    }
  }, [paymentMethod, paidAmount]);

  return (
    <div 
      className={cn(
        "h-full flex flex-col border-r bg-card",
        expanded ? "w-full lg:w-1/3 xl:w-1/4" : "w-20",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <CartHeader 
        isMobile={isMobile}
        expanded={expanded}
        isEmpty={cartItems.length === 0}
        toggleExpand={onToggleExpand}
        clearCart={clearCart}
        isArabic={isArabic}
      />
      
      {expanded ? (
        <>
          <CartContent cartItems={cartItems} isArabic={isArabic} />
          
          <CartFooter 
            isMobile={isMobile}
            cartItems={cartItems}
            orderType={orderType}
            tableNumber={tableNumber}
            discount={discount}
            discountType={discountType}
            subtotal={subtotal}
            taxAmount={taxAmount}
            total={total}
            paymentMethod={paymentMethod}
            paidAmount={paidAmount}
            setOrderType={setOrderType}
            setTableNumber={setTableNumber}
            setDiscount={setDiscount}
            setDiscountType={setDiscountType}
            handleCreateInvoice={handleCreateInvoice}
            clearCart={clearCart}
            isArabic={isArabic}
            onPaidAmountClick={handleShowPaidAmountDialog}
          />
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center pt-4 text-center">
          <div className="text-sm font-medium mb-2">
            {cartItems.length}
          </div>
          <div className="text-xs text-muted-foreground">
            {isArabic ? 'العناصر' : 'Items'}
          </div>
        </div>
      )}

      {/* Dialogs */}
      <InvoiceDialogs
        showPaymentMethodDialog={showPaymentMethodDialog}
        onClosePaymentDialog={() => handlePaymentMethodSelected("card")} 
        onSelectPaymentMethod={handlePaymentMethodSelected}
        showPaidAmountDialog={showPaidAmountDialog}
        onClosePaidAmountDialog={() => handlePaidAmountConfirmed(total)}
        onConfirmPaidAmount={handlePaidAmountConfirmed}
        total={total}
        currentInvoice={currentInvoice}
        showInvoiceModal={showInvoiceModal}
        onCloseInvoiceModal={handleCloseInvoiceModal}
        formatInvoiceDate={formatInvoiceDate}
        onPrintInvoice={printInvoice}
      />
    </div>
  );
};

export default CartPanel;
