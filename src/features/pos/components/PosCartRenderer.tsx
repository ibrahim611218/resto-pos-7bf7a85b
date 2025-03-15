
import React from "react";
import CartPanel from "./CartPanel";
import { useCartResize } from "../hooks/useCartResize";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import CartResizeHandler from "./cart/CartResizeHandler";
import { Language, PaymentMethod } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  return (
    <div
      ref={resizeRef}
      className={`relative h-full overflow-hidden ${
        isMobile ? "w-full" : props.isArabic ? "border-l" : "border-r"
      } border-border bg-card/30 backdrop-blur-sm`}
      style={{
        width: isMobile ? "100%" : "35%",
        minWidth: isMobile ? "100%" : "300px",
        maxWidth: isMobile ? "100%" : "500px"
      }}
    >
      <CartResizeHandler
        isMobile={isMobile}
        onMouseDown={handleMouseDown}
        isArabic={props.isArabic}
        isDragging={isDragging}
      />
      
      <ScrollArea className="h-full w-full overflow-auto">
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
