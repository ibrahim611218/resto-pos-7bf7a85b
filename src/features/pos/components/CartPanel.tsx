
import React, { useState, useRef, useEffect } from "react";
import { CartItem as CartItemType, PaymentMethod, Invoice, Language } from "@/types";
import { useScreenSize } from "@/hooks/use-mobile";
import PaymentMethodDialog from "./PaymentMethodDialog";
import CartResizeHandler from "./cart/CartResizeHandler";
import CartHeader from "./cart/CartHeader";
import CartItemsList from "./cart/CartItemsList";
import CartFooter from "./cart/CartFooter";

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
  createInvoice: (customerName?: string, customerTaxNumber?: string) => Invoice; 
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
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const { isMobile, isTablet } = useScreenSize();
  const [expanded, setExpanded] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const [startWidth, setStartWidth] = useState<number | null>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (resizeRef.current) {
      setWidth(resizeRef.current.offsetWidth);
    }
  }, []);

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };

  const handlePaymentMethodSelected = (customerName?: string, customerTaxNumber?: string) => {
    const invoice = createInvoice(customerName, customerTaxNumber);
    setCurrentInvoice(invoice);
    setShowPaymentMethodDialog(false);
    return invoice;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (resizeRef.current) {
      setStartWidth(resizeRef.current.offsetWidth);
      setStartX(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (startX !== null && startWidth !== null) {
        const diff = startX - e.clientX;
        const newWidth = Math.max(250, Math.min(600, startWidth + diff));
        if (resizeRef.current) {
          resizeRef.current.style.width = `${newWidth}px`;
          setWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setStartX(null);
      setStartWidth(null);
    };

    if (startX !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [startX, startWidth]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const isEmpty = cartItems.length === 0;
  const borderClasses = "border-l border-r-0 shadow-[-2px_0_5px_rgba(0,0,0,0.1)]";

  return (
    <div 
      ref={resizeRef}
      className={`flex flex-col h-full ${borderClasses} bg-card overflow-hidden relative ${
        isMobile ? (expanded ? 'w-full' : 'w-full') : ''
      }`}
      style={{ 
        transition: isMobile ? 'width 0.3s ease' : 'none',
      }}
    >
      <CartResizeHandler 
        isMobile={isMobile}
        onMouseDown={handleMouseDown}
      />
      
      <CartHeader
        isMobile={isMobile}
        expanded={expanded}
        isEmpty={isEmpty}
        toggleExpand={toggleExpand}
        clearCart={clearCart}
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
      />

      <PaymentMethodDialog
        isOpen={showPaymentMethodDialog}
        onClose={() => setShowPaymentMethodDialog(false)}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onConfirm={handlePaymentMethodSelected}
      />
    </div>
  );
};

export default CartPanel;
