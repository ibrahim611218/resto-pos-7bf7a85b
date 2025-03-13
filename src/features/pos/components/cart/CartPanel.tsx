
import React, { useState } from "react";
import { CartItem as CartItemType, PaymentMethod, Invoice } from "@/types";
import CartHeader from "./CartHeader";
import CartItemsList from "./CartItemsList";
import CartSummary from "./CartSummary";
import CartFooter from "./CartFooter";
import EmptyCart from "./EmptyCart";
import PaymentDialogHandler from "./PaymentDialogHandler";
import { useScreenSize } from "@/hooks/use-mobile";

interface CartPanelProps {
  cartItems: CartItemType[];
  isArabic: boolean;
  language: any;
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
  const { isMobile } = useScreenSize();
  const cartPanelClasses = `
    flex flex-col h-full w-full
    ${isArabic ? "font-arabic" : "font-sans"}
  `;
  
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [paidAmount, setPaidAmount] = useState<number>(total);

  // Create a function to handle invoice creation that will be passed to the PaymentDialogHandler
  const handlePaymentDialogConfirm = (
    customerName?: string, 
    customerTaxNumber?: string, 
    customerId?: string,
    commercialRegister?: string,
    address?: string,
    paidAmount?: number
  ) => {
    return createInvoice(customerName, customerTaxNumber, customerId, commercialRegister, address, paidAmount);
  };

  return (
    <div className={cartPanelClasses}>
      <CartHeader
        isMobile={isMobile}
        expanded={false}
        isEmpty={cartItems.length === 0}
        toggleExpand={() => {}}
        clearCart={clearCart}
        isArabic={isArabic}
      />

      {cartItems.length === 0 ? (
        <div className="flex-grow overflow-y-auto">
          <EmptyCart />
        </div>
      ) : (
        <div className="flex-1 flex flex-col h-full">
          <CartItemsList
            cartItems={cartItems}
            isMobile={isMobile}
            isArabic={isArabic}
            getSizeLabel={getSizeLabel}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
          
          <div className="mt-auto border-t pt-4 px-4">
            <CartSummary
              subtotal={subtotal}
              taxAmount={taxAmount}
              discount={discount}
              discountType={discountType}
              total={total}
              paidAmount={paidAmount}
              isArabic={isArabic}
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
            setOrderType={setOrderType}
            setTableNumber={setTableNumber}
            setDiscount={setDiscount}
            setDiscountType={setDiscountType}
            handleCreateInvoice={() => {}}
            clearCart={clearCart}
            isArabic={isArabic}
          />
        </div>
      )}

      <PaymentDialogHandler
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        createInvoice={createInvoice}
        setCurrentInvoice={setCurrentInvoice}
        total={total}
        paidAmount={paidAmount}
        setPaidAmount={setPaidAmount}
      />
    </div>
  );
};

export default CartPanel;
