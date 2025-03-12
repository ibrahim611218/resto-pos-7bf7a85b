
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CartItem as CartItemType, Language, Invoice, PaymentMethod } from "@/types";
import CartItemComponent from "./CartItem";
import KitchenAssignmentDialog from "./KitchenAssignmentDialog";
import PaymentMethodSelector from "./PaymentMethodSelector";
import EmptyCart from "./cart/EmptyCart";
import OrderTypeSelector from "./cart/OrderTypeSelector";
import DiscountInput from "./cart/DiscountInput";
import CartSummary from "./cart/CartSummary";
import CartActions from "./cart/CartActions";
import { useLanguage } from "@/context/LanguageContext";

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
  createInvoice: () => Invoice; 
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
  const [showKitchenDialog, setShowKitchenDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const { language: contextLanguage } = useLanguage();

  const handleCreateInvoice = () => {
    const invoice = createInvoice();
    setCurrentInvoice(invoice);
    setShowKitchenDialog(true);
    return invoice;
  };

  const handleSendToKitchen = () => {
    setShowKitchenDialog(true);
  };

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-card border-l p-5 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-5">
        {isArabic ? "السلة" : "Cart"}
      </h2>
      
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-5">
          {cartItems.map((item, index) => (
            <CartItemComponent
              key={item.id}
              item={item}
              index={index}
              isArabic={isArabic}
              getSizeLabel={getSizeLabel}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </div>
      )}
      
      <Separator className="my-5" />
      
      {/* Order Type Selector */}
      <OrderTypeSelector
        orderType={orderType}
        tableNumber={tableNumber}
        setOrderType={setOrderType}
        setTableNumber={setTableNumber}
      />
      
      {/* Payment Method Selector */}
      <PaymentMethodSelector 
        value={paymentMethod}
        onChange={setPaymentMethod}
      />
      
      {/* Discount Input */}
      <DiscountInput
        discount={discount}
        discountType={discountType}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
      />
      
      {/* Cart Summary */}
      <CartSummary
        subtotal={subtotal}
        taxAmount={taxAmount}
        discount={discount}
        discountType={discountType}
        total={total}
      />
      
      {/* Cart Actions */}
      <CartActions
        cartItems={cartItems}
        handleCreateInvoice={handleCreateInvoice}
        clearCart={clearCart}
        onSendToKitchen={handleSendToKitchen}
      />

      {/* Kitchen Assignment Dialog */}
      <KitchenAssignmentDialog
        isOpen={showKitchenDialog}
        onClose={() => setShowKitchenDialog(false)}
        cartItems={cartItems}
        invoiceId={currentInvoice?.number || ""}
        language={language}
      />
    </div>
  );
};

export default CartPanel;
