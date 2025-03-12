
import React from "react";
import { Separator } from "@/components/ui/separator";
import { PaymentMethod } from "@/types";
import OrderTypeSelector from "./OrderTypeSelector";
import DiscountInput from "./DiscountInput";
import CartSummary from "./CartSummary";
import CartActions from "./CartActions";

interface CartFooterProps {
  isMobile: boolean;
  cartItems: any[];
  orderType: "takeaway" | "dineIn";
  tableNumber: string;
  discount: number;
  discountType: "percentage" | "fixed";
  subtotal: number;
  taxAmount: number;
  total: number;
  setOrderType: (type: "takeaway" | "dineIn") => void;
  setTableNumber: (number: string) => void;
  setDiscount: (discount: number) => void;
  setDiscountType: (type: "percentage" | "fixed") => void;
  handleCreateInvoice: () => void;
  clearCart: () => void;
}

const CartFooter: React.FC<CartFooterProps> = ({
  isMobile,
  cartItems,
  orderType,
  tableNumber,
  discount,
  discountType,
  subtotal,
  taxAmount,
  total,
  setOrderType,
  setTableNumber,
  setDiscount,
  setDiscountType,
  handleCreateInvoice,
  clearCart,
}) => {
  const footerClass = isMobile ? "p-1" : "p-2";

  return (
    <div className={`${footerClass} border-t bg-card flex-shrink-0`}>
      <Separator className={isMobile ? "mb-1" : "mb-2"} />
      
      <OrderTypeSelector
        orderType={orderType}
        tableNumber={tableNumber}
        setOrderType={setOrderType}
        setTableNumber={setTableNumber}
        isMobile={isMobile}
      />
      
      <DiscountInput
        discount={discount}
        discountType={discountType}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        isMobile={isMobile}
      />
      
      <CartSummary
        subtotal={subtotal}
        taxAmount={taxAmount}
        discount={discount}
        discountType={discountType}
        total={total}
        isMobile={isMobile}
      />
      
      <CartActions
        cartItems={cartItems}
        handleCreateInvoice={handleCreateInvoice}
        clearCart={clearCart}
        isMobile={isMobile}
      />
    </div>
  );
};

export default CartFooter;
