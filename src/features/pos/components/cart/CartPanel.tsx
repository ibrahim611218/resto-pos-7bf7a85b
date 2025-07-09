
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/features/pos/hooks/useCart";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import { cn } from "@/lib/utils";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import CartContent from "./CartContent";
import { useCartInvoice } from "../../hooks/useCartInvoice";
import CartInvoiceDialogs from "./CartInvoiceDialogs";

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
    showTransferReceiptDialog,
    currentInvoice,
    showInvoiceModal,
    handleCreateInvoice,
    handlePaymentMethodSelected,
    handlePaidAmountConfirmed,
    handleTransferReceiptConfirmed,
    handleShowPaidAmountDialog,
    handleInvoiceModalClose,
    handleClosePaymentMethodDialog,
    customer
  } = useCartInvoice({
    cartItems,
    subtotal,
    taxAmount,
    discount,
    discountType,
    total,
    orderType,
    tableNumber,
    paymentMethod,
    paidAmount,
    setPaymentMethod,
    setPaidAmount,
    clearCart,
    isArabic
  });

  return (
    <div 
      className={cn(
        "h-full flex flex-col bg-card cart-panel rounded-sm overflow-hidden",
        expanded ? "w-80 xl:w-96" : "w-16",
        "transition-all duration-300 ease-in-out",
        "shadow-lg border",
        isArabic ? "border-l" : "border-r"
      )}
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <CartHeader 
        isMobile={isMobile}
        expanded={expanded}
        isEmpty={cartItems.length === 0}
        toggleExpand={onToggleExpand}
        clearCart={clearCart}
        isArabic={isArabic}
        className="cart-header flex-shrink-0 border-b"
      />
      
      {expanded ? (
        <>
          <div className="flex-1 overflow-hidden" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            <CartContent cartItems={cartItems} isArabic={isArabic} />
          </div>
          
          <div className="flex-shrink-0 border-t">
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
              customer={customer}
              className="cart-footer"
            />
          </div>
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

      <CartInvoiceDialogs
        showPaymentMethodDialog={showPaymentMethodDialog}
        showPaidAmountDialog={showPaidAmountDialog} 
        showTransferReceiptDialog={showTransferReceiptDialog}
        total={total}
        currentInvoice={currentInvoice}
        showInvoiceModal={showInvoiceModal}
        onSelectPaymentMethod={handlePaymentMethodSelected}
        onConfirmPaidAmount={handlePaidAmountConfirmed}
        onConfirmTransferReceipt={handleTransferReceiptConfirmed}
        onCloseInvoiceModal={handleInvoiceModalClose}
        onClosePaymentMethodDialog={handleClosePaymentMethodDialog}
      />
    </div>
  );
};

export default CartPanel;
