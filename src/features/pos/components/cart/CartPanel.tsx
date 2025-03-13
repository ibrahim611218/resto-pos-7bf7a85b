
import React, { useState } from "react";
import { CartItem as CartItemType, PaymentMethod, Invoice, Language } from "@/types";
import { useScreenSize } from "@/hooks/use-mobile";
import CartResizeHandler from "./CartResizeHandler";
import CartHeader from "./CartHeader";
import CartItemsList from "./CartItemsList";
import CartFooter from "./CartFooter";
import { useCartResize } from "../../hooks/useCartResize"; // Fixed import path
import PaymentMethodDialog from "../../components/PaymentMethodDialog"; // Fixed import path
import { usePaymentDialog } from "./PaymentDialogHandler";

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
  paidAmount?: number;
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
  paidAmount = 0,
}) => {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const { isMobile, isTablet } = useScreenSize();
  const [expanded, setExpanded] = useState(false);
  const [localPaidAmount, setLocalPaidAmount] = useState<number>(paidAmount);

  // Use the cart resize hook
  const { resizeRef, width, isDragging, handleMouseDown } = useCartResize({
    isArabic,
    isMobile,
    isTablet
  });

  // Handle creating an invoice and showing the payment dialog
  const handleInvoiceCreation = () => {
    // Forward to the payment dialog hook's handler
    paymentDialogControls.setShowPaymentMethodDialog(true);
  };

  // Use the payment dialog hook
  const paymentDialogControls = usePaymentDialog({
    paymentMethod,
    setPaymentMethod,
    createInvoice,
    setCurrentInvoice,
    total,
    paidAmount: localPaidAmount,
    setPaidAmount: setLocalPaidAmount
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
        paidAmount={localPaidAmount}
        setOrderType={setOrderType}
        setTableNumber={setTableNumber}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        handleCreateInvoice={handleInvoiceCreation}
        clearCart={clearCart}
        isArabic={isArabic}
      />

      <PaymentMethodDialog
        isOpen={paymentDialogControls.showPaymentMethodDialog}
        onClose={() => paymentDialogControls.setShowPaymentMethodDialog(false)}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onConfirm={paymentDialogControls.handlePaymentMethodSelected}
        total={total}
        paidAmount={localPaidAmount}
        setPaidAmount={setLocalPaidAmount}
      />
    </div>
  );
};

export default CartPanel;
