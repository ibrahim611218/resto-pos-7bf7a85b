
import React, { useState } from "react";
import { CartItem as CartItemType, PaymentMethod, Invoice, Language } from "@/types";
import { useScreenSize } from "@/hooks/use-mobile";
import { useCartResize } from "../hooks/useCartResize";
import CartResizeHandler from "./cart/CartResizeHandler";
import CartHeader from "./cart/CartHeader";
import CartItemsList from "./cart/CartItemsList";
import CartFooter from "./cart/CartFooter";
import PaymentMethodDialog from "./PaymentMethodDialog";
import PaidAmountDialog from "./cart/PaidAmountDialog";

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
  // New props from payment handling
  paidAmount: number;
  showPaidAmountDialog: boolean;
  setShowPaidAmountDialog: (show: boolean) => void;
  handlePaidAmountClick: () => void;
  handlePaidAmountConfirm: (amount: number) => void;
  showPaymentMethodDialog: boolean;
  setShowPaymentMethodDialog: (show: boolean) => void;
  handleCreateInvoice: () => void;
  handlePaymentMethodSelectedWithAmount: (method: PaymentMethod) => void;
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
  // Payment handling props
  paidAmount,
  showPaidAmountDialog,
  setShowPaidAmountDialog,
  handlePaidAmountClick,
  handlePaidAmountConfirm,
  showPaymentMethodDialog,
  setShowPaymentMethodDialog,
  handleCreateInvoice,
  handlePaymentMethodSelectedWithAmount
}) => {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const { isMobile, isTablet } = useScreenSize();
  const [expanded, setExpanded] = useState(false);

  // Cart resize hook
  const { resizeRef, width, isDragging, handleMouseDown } = useCartResize({
    isArabic,
    isMobile,
    isTablet
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
        paymentMethod={paymentMethod}
        paidAmount={paidAmount}
        setOrderType={setOrderType}
        setTableNumber={setTableNumber}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        handleCreateInvoice={handleCreateInvoice}
        clearCart={clearCart}
        isArabic={isArabic}
        onPaidAmountClick={handlePaidAmountClick}
      />

      <PaymentMethodDialog
        isOpen={showPaymentMethodDialog}
        onClose={() => setShowPaymentMethodDialog(false)}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onConfirm={handlePaymentMethodSelectedWithAmount}
      />

      <PaidAmountDialog
        isOpen={showPaidAmountDialog}
        onClose={() => setShowPaidAmountDialog(false)}
        onConfirm={handlePaidAmountConfirm}
        total={total}
        isArabic={isArabic}
      />
    </div>
  );
};

export default CartPanel;
