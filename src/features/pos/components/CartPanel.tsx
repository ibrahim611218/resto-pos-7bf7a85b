
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
  const [isDragging, setIsDragging] = useState(false);

  // Initialize width on component mount
  useEffect(() => {
    if (resizeRef.current) {
      // Set initial width based on screen size
      const initialWidth = isMobile ? window.innerWidth : 
                         isTablet ? window.innerWidth / 3 : 
                         window.innerWidth / 4;
      setWidth(initialWidth);
      resizeRef.current.style.width = `${initialWidth}px`;
    }
  }, [isMobile, isTablet]);

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
      setIsDragging(true);
      document.body.style.cursor = 'ew-resize';
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (startX !== null && startWidth !== null) {
        // Calculate width change based on drag direction and RTL/LTR layout
        const diff = isArabic ? (e.clientX - startX) : (startX - e.clientX);
        // Set minimum and maximum boundaries for cart width
        const minWidth = 250;
        const maxWidth = Math.min(600, window.innerWidth * 0.8);
        const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + diff));
        
        if (resizeRef.current) {
          resizeRef.current.style.width = `${newWidth}px`;
          setWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setStartX(null);
      setStartWidth(null);
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };

    if (startX !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [startX, startWidth, isArabic]);

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
    </div>
  );
};

export default CartPanel;
