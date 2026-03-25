
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
  const { isMobile, isTablet } = useWindowDimensions();
  
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
    deliveryAddress,
    setDeliveryAddress,
    deliveryFee,
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

  // Mobile: full screen (handled by parent in Pos.tsx)
  // Tablet: 70% width overlay
  // Desktop: sidebar drawer 400-500px
  const getContainerClasses = () => {
    if (isMobile) {
      // Full screen - fixed overlay
      return "fixed inset-0 z-50 w-full h-full";
    }
    if (isTablet) {
      // 70% width overlay from the side
      if (expanded) {
        return cn(
          "fixed top-0 bottom-0 z-50 w-[70vw]",
          isArabic ? "right-0" : "left-0"
        );
      }
      return "relative w-14 flex-shrink-0";
    }
    // Desktop: drawer sidebar
    if (expanded) {
      return "relative flex-shrink-0 w-[400px] xl:w-[480px] max-w-[500px]";
    }
    return "relative flex-shrink-0 w-16";
  };

  return (
    <>
      {/* Overlay backdrop for tablet */}
      {isTablet && expanded && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={onToggleExpand}
        />
      )}

      <div 
        className={cn(
          "flex flex-col bg-card cart-panel overflow-hidden",
          "transition-all duration-300 ease-in-out",
          getContainerClasses(),
          !isMobile && "shadow-lg border",
          !isMobile && !isTablet && (isArabic ? "border-l" : "border-r")
        )}
        style={{ 
          direction: isArabic ? "rtl" : "ltr",
          height: isMobile ? '100%' : isTablet ? '100vh' : 'calc(100vh - 4rem)'
        }}
        dir={isArabic ? "rtl" : "ltr"}
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
            {/* Scrollable cart items area */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              <CartContent cartItems={cartItems} isArabic={isArabic} />
            </div>
            
            {/* Sticky footer */}
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
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
                deliveryFee={deliveryFee}
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
    </>
  );
};

export default CartPanel;
