
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
        "h-full flex flex-col border-l bg-card cart-panel rounded-sm",
        expanded ? "w-full lg:w-1/3 xl:w-1/4" : "w-20",
        "transition-all duration-300 ease-in-out"
      )}
      style={{ maxWidth: expanded ? "100%" : "5rem" }}
    >
      <CartHeader 
        isMobile={isMobile}
        expanded={expanded}
        isEmpty={cartItems.length === 0}
        toggleExpand={onToggleExpand}
        clearCart={clearCart}
        isArabic={isArabic}
        className="cart-header"
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
            customer={customer}
            className="cart-footer"
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
      />
    </div>
  );
};

export default CartPanel;
