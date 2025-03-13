
import React from "react";
import CartPanel from "./CartPanel";
import { usePaymentHandling } from "../hooks/usePaymentHandling";

interface PosCartRendererProps {
  cartItems: any[];
  isArabic: boolean;
  language: any;
  subtotal: number;
  taxAmount: number;
  total: number;
  discount: number;
  discountType: "percentage" | "fixed";
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  paymentMethod: any;
  createInvoice: (customerName?: string, customerTaxNumber?: string, customerId?: string, commercialRegister?: string, address?: string, paidAmount?: number) => any;
  clearCart: () => void;
  getSizeLabel: (size: string) => string;
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setPaymentMethod: (method: any) => void;
}

/**
 * Component that renders the cart panel with all cart-related functionality
 */
const PosCartRenderer: React.FC<PosCartRendererProps> = (props) => {
  // Use the payment handling hook to manage all payment-related logic
  const paymentHandling = usePaymentHandling({
    total: props.total,
    paymentMethod: props.paymentMethod,
    setPaymentMethod: props.setPaymentMethod,
    createInvoice: props.createInvoice
  });

  return (
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
      createInvoice={props.createInvoice}
      clearCart={props.clearCart}
      getSizeLabel={props.getSizeLabel}
      updateQuantity={props.updateQuantity}
      removeItem={props.removeItem}
      setDiscount={props.setDiscount}
      setDiscountType={props.setDiscountType}
      setOrderType={props.setOrderType}
      setTableNumber={props.setTableNumber}
      setPaymentMethod={props.setPaymentMethod}
      // Pass payment handling props
      paidAmount={paymentHandling.paidAmount}
      showPaidAmountDialog={paymentHandling.showPaidAmountDialog}
      setShowPaidAmountDialog={paymentHandling.setShowPaidAmountDialog}
      handlePaidAmountClick={paymentHandling.handlePaidAmountClick}
      handlePaidAmountConfirm={paymentHandling.handlePaidAmountConfirm}
      showPaymentMethodDialog={paymentHandling.showPaymentMethodDialog}
      setShowPaymentMethodDialog={paymentHandling.setShowPaymentMethodDialog}
      handleCreateInvoice={paymentHandling.handleCreateInvoice}
      handlePaymentMethodSelectedWithAmount={paymentHandling.handlePaymentMethodSelectedWithAmount}
    />
  );
};

export default PosCartRenderer;
