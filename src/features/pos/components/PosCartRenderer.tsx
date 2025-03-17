
import React from "react";
import CartPanel from "./CartPanel";
import { useCartResize } from "../hooks/useCartResize";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import CartResizeHandler from "./cart/CartResizeHandler";
import { Language, PaymentMethod } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/context/ThemeContext";

interface PosCartRendererProps {
  cartItems: any[];
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
  updateQuantity: (item: any, quantity: number) => void;
  removeItem: (item: any) => void;
  clearCart: () => void;
  createInvoice: (
    customerName?: string,
    customerTaxNumber?: string,
    customerId?: string,
    commercialRegister?: string,
    address?: string,
    paidAmount?: number
  ) => any;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  getSizeLabel?: (size: string) => string;
}

/**
 * Component that renders the cart and handles cart resizing
 */
const PosCartRenderer: React.FC<PosCartRendererProps> = (props) => {
  const { isMobile, isTablet } = useWindowDimensions();
  const { resizeRef, handleMouseDown, isDragging } = useCartResize({
    isArabic: props.isArabic,
    isMobile,
    isTablet
  });
  const { theme } = useTheme();

  // Set background color based on theme
  const bgClass = theme === 'light' ? 'bg-white' : 'bg-card/30';

  return (
    <div
      ref={resizeRef}
      className={`relative h-full overflow-hidden flex flex-col ${
        isMobile ? "w-full" : props.isArabic ? "border-l" : "border-r"
      } border-border ${bgClass} backdrop-blur-sm`}
      style={{
        width: isMobile ? "100%" : "30%",
        minWidth: isMobile ? "100%" : "280px",
        maxWidth: isMobile ? "100%" : "400px"
      }}
    >
      <CartResizeHandler
        isMobile={isMobile}
        onMouseDown={handleMouseDown}
        isArabic={props.isArabic}
        isDragging={isDragging}
      />
      
      <ScrollArea className="flex-1 h-full overflow-auto">
        <CartPanel 
          cartItems={props.cartItems}
          isArabic={props.isArabic}
          language={props.language}
          subtotal={props.subtotal}
          taxAmount={props.taxAmount}
          total={props.total}
          discount={props.discount}
          discountType={props.discountType}
          orderType={props.orderType}
          tableNumber={props.tableNumber}
          paymentMethod={props.paymentMethod}
          updateQuantity={props.updateQuantity}
          removeItem={props.removeItem}
          clearCart={props.clearCart}
          createInvoice={props.createInvoice}
          setDiscount={props.setDiscount}
          setDiscountType={props.setDiscountType}
          setOrderType={props.setOrderType}
          setTableNumber={props.setTableNumber}
          setPaymentMethod={props.setPaymentMethod}
          getSizeLabel={props.getSizeLabel}
        />
      </ScrollArea>
    </div>
  );
};

export default PosCartRenderer;
