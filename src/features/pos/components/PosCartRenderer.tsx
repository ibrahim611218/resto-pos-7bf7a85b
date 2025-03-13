
import React from "react";
import CartPanel from "./CartPanel";

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
  paidAmount: number;
  remainingAmount: number;
  createInvoice: (customerName?: string, customerTaxNumber?: string) => any;
  clearCart: () => void;
  getSizeLabel: (size: string) => string;
  updateQuantity: (itemId: string, change: number) => void;
  removeItem: (itemId: string) => void;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setPaymentMethod: (method: any) => void;
  setPaidAmount: (amount: number) => void;
}

/**
 * Component that renders the cart panel with all cart-related functionality
 */
const PosCartRenderer: React.FC<PosCartRendererProps> = (props) => {
  const handleCreateInvoice = (customerName?: string, customerTaxNumber?: string) => {
    return props.createInvoice(customerName, customerTaxNumber);
  };

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
      paidAmount={props.paidAmount}
      remainingAmount={props.remainingAmount}
      createInvoice={handleCreateInvoice}
      clearCart={props.clearCart}
      getSizeLabel={props.getSizeLabel}
      updateQuantity={props.updateQuantity}
      removeItem={props.removeItem}
      setDiscount={props.setDiscount}
      setDiscountType={props.setDiscountType}
      setOrderType={props.setOrderType}
      setTableNumber={props.setTableNumber}
      setPaymentMethod={props.setPaymentMethod}
      setPaidAmount={props.setPaidAmount}
    />
  );
};

export default PosCartRenderer;
