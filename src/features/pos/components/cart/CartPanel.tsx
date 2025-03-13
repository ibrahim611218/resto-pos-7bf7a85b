import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCartItems } from "../../hooks/useCartItems";
import { useOrderConfig } from "../../hooks/useOrderConfig";
import { calculateInvoiceAmounts } from "@/utils/invoice";
import { Product } from "@/types";
import CartHeader from "./CartHeader";
import CartItemsList from "./CartItemsList";
import CartSummary from "./CartSummary";
import CartFooter from "./CartFooter";
import EmptyCart from "./EmptyCart";
import PaymentDialogHandler from "./PaymentDialogHandler";
import { usePaymentDialog } from "./PaymentDialogHandler";

export interface CartPanelProps {
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
  const cartPanelClasses = `
    flex flex-col h-full w-full
    ${isArabic ? "font-arabic" : "font-sans"}
  `;
  
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  
  const handleCreateInvoice = (customerName?: string, customerTaxNumber?: string) => {
    return createInvoice(customerName, customerTaxNumber);
  };
  
  const [paidAmount, setPaidAmount] = useState<number>(0);

  const handleCreateInvoice = () => {
    setShowPaymentMethodDialog(true);
  };
  
  const {
    showPaymentMethodDialog,
    setShowPaymentMethodDialog,
    handlePaymentMethodSelected
  } = usePaymentDialog({
    paymentMethod,
    setPaymentMethod,
    createInvoice,
    setCurrentInvoice: () => {},
    total,
    paidAmount,
    setPaidAmount
  });

  return (
    <div className={cartPanelClasses}>
      <CartHeader
        isArabic={isArabic}
        clearCart={clearCart}
        itemCount={cartItems.length}
      />

      {cartItems.length === 0 ? (
        <EmptyCart isArabic={isArabic} />
      ) : (
        <div className="flex-1 flex flex-col h-full">
          <CartItemsList
            cartItems={cartItems}
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
            isArabic={isArabic}
            discount={discount}
            discountType={discountType}
            setDiscount={setDiscount}
            setDiscountType={setDiscountType}
            orderType={orderType}
            tableNumber={tableNumber}
            setOrderType={setOrderType}
            setTableNumber={setTableNumber}
            onCreateInvoice={handleCreateInvoice}
          />
        </div>
      )}

      <PaymentDialogHandler
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        createInvoice={createInvoice}
        setCurrentInvoice={() => {}}
        total={total}
        paidAmount={paidAmount}
        setPaidAmount={setPaidAmount}
      />
    </div>
  );
};

export default CartPanel;
