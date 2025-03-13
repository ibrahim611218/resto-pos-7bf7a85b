
import React, { useState } from "react";
import { CartItem as CartItemType, PaymentMethod, Invoice, Language } from "@/types";
import { useScreenSize } from "@/hooks/use-mobile";
import CartResizeHandler from "./cart/CartResizeHandler";
import CartHeader from "./cart/CartHeader";
import CartItemsList from "./cart/CartItemsList";
import CartFooter from "./cart/CartFooter";
import { useCartResize } from "../hooks/useCartResize";
import PaymentMethodDialog from "./PaymentMethodDialog";
import { usePaymentDialog } from "./cart/PaymentDialogHandler";
import PaymentAmountDialog from "./PaymentAmountDialog";

interface CartPanelProps {
  cartItems: CartItemType[];
  isArabic: boolean;
  language: Language;
  subtotal: number;
  taxAmount: number;
  total: number;
  discount: number;
  discountType: "percentage" | "fixed";
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  paymentMethod: PaymentMethod;
  createInvoice: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => Invoice; 
  clearCart: () => void;
  getSizeLabel: (size: string) => string;
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
}

const CartPanel: React.FC<CartPanelProps> = ({
  cartItems,
  isArabic,
  language,
  subtotal,
  taxAmount,
  total,
  discount,
  discountType,
  orderType,
  tableNumber,
  paymentMethod,
  createInvoice,
  clearCart,
  getSizeLabel,
  updateQuantity,
  removeItem,
  setDiscount,
  setDiscountType,
  setOrderType,
  setTableNumber,
  setPaymentMethod,
}) => {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const { isMobile, isTablet } = useScreenSize();
  const [expanded, setExpanded] = useState(false);

  // Use the cart resize hook
  const { resizeRef, width, isDragging, handleMouseDown } = useCartResize({
    isArabic,
    isMobile,
    isTablet
  });

  // Use the payment dialog hook
  const { 
    showPaymentMethodDialog, 
    setShowPaymentMethodDialog,
    showPaymentAmountDialog,
    setShowPaymentAmountDialog,
    handleCreateInvoice, 
    handlePaymentMethodSelected,
    handlePaymentAmountConfirmed
  } = usePaymentDialog({
    paymentMethod,
    setPaymentMethod,
    createInvoice,
    setCurrentInvoice,
    total
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const isEmpty = cartItems.length === 0;
  const borderClasses = isArabic 
    ? "border-r border-l-0 shadow-[2px_0_5px_rgba(0,0,0,0.1)]" 
    : "border-l border-r-0 shadow-[-2px_0_5px_rgba(0,0,0,0.1)]";

  return (
    <div 
      ref={resizeRef}
      className={`flex flex-col h-full ${borderClasses} bg-card overflow-hidden relative ${
        isMobile ? (expanded ? 'w-full' : 'w-full') : ''
      }`}
      style={{ 
        transition: isMobile ? 'width 0.3s ease' : 'none',
        width: width ? `${width}px` : undefined,
      }}
    >
      <CartResizeHandler 
        isMobile={isMobile}
        onMouseDown={handleMouseDown}
        isArabic={isArabic}
        isDragging={isDragging}
      />
      
      <CartHeader
        isMobile={isMobile}
        expanded={expanded}
        isEmpty={isEmpty}
        toggleExpand={toggleExpand}
        clearCart={clearCart}
        isArabic={isArabic}
      />
      
      <CartItemsList
        cartItems={cartItems}
        isMobile={isMobile}
        isArabic={isArabic}
        getSizeLabel={getSizeLabel}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
      
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
        setOrderType={setOrderType}
        setTableNumber={setTableNumber}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        handleCreateInvoice={handleCreateInvoice}
        clearCart={clearCart}
        isArabic={isArabic}
      />

      <PaymentMethodDialog
        isOpen={showPaymentMethodDialog}
        onClose={() => setShowPaymentMethodDialog(false)}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onConfirm={handlePaymentMethodSelected}
      />

      <PaymentAmountDialog
        isOpen={showPaymentAmountDialog}
        onClose={() => setShowPaymentAmountDialog(false)}
        onConfirm={handlePaymentAmountConfirmed}
        total={total}
      />
    </div>
  );
};

export default CartPanel;
