
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
import { useTheme } from "@/context/ThemeContext";

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
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  getSizeLabel?: (size: string) => string;
  // The following props are optional and may be provided by usePaymentHandling
  paidAmount?: number;
  showPaidAmountDialog?: boolean;
  setShowPaidAmountDialog?: (show: boolean) => void;
  handlePaidAmountClick?: () => void;
  handlePaidAmountConfirm?: (amount: number) => void;
  showPaymentMethodDialog?: boolean;
  setShowPaymentMethodDialog?: (show: boolean) => void;
  handleCreateInvoice?: () => void;
  handlePaymentMethodSelectedWithAmount?: (method: PaymentMethod) => void;
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
  // Payment handling props (optional)
  paidAmount = 0,
  showPaidAmountDialog = false,
  setShowPaidAmountDialog = () => {},
  handlePaidAmountClick = () => {},
  handlePaidAmountConfirm = () => {},
  showPaymentMethodDialog = false,
  setShowPaymentMethodDialog = () => {},
  handleCreateInvoice = () => {},
  handlePaymentMethodSelectedWithAmount = () => {}
}) => {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const { isMobile, isTablet } = useScreenSize();
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();

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
    ? "border-r border-l-0" 
    : "border-l border-r-0";
  
  // Set background color based on theme
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-card';

  return (
    <div 
      className={`flex flex-col h-full ${borderClasses} ${bgClass} overflow-hidden relative rounded-lg shadow-sm pos-cart ${
        isMobile ? (expanded ? 'w-full' : 'w-full') : ''
      }`}
      ref={resizeRef}
    >
      <CartHeader
        isMobile={isMobile}
        expanded={expanded}
        isEmpty={isEmpty}
        toggleExpand={toggleExpand}
        clearCart={clearCart}
        isArabic={isArabic}
      />
      
      <div className="flex-1 overflow-hidden pos-cart-items">
        <CartItemsList
          cartItems={cartItems}
          isMobile={isMobile}
          isArabic={isArabic}
          getSizeLabel={getSizeLabel || ((size) => size)}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </div>
      
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

      <CartResizeHandler
        isMobile={isMobile}
        onMouseDown={handleMouseDown}
        isArabic={isArabic}
        isDragging={isDragging}
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
